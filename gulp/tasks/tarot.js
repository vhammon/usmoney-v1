'use strict';
const gulp = require('gulp');
const shell = require('shelljs');
const size = require('gulp-size');
const argv = require('yargs').argv;
const log = require('fancy-log');
const rn = require('random-number');
const KeyValue = require('keyvalue');
const fs = require('fs');
const request = require('request');
const mergeImages = require('merge-images');
const imageDataURI = require('image-data-uri');
const Canvas = require('canvas');
const cloudinary = require('cloudinary');

gulp.task('tarot', done => {

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  var monthNum = today.getMonth();

  if(dd<10) {
      dd = '0'+dd
  }

  if(mm<10) {
      mm = '0'+mm
  }

  today = mm + '-' + dd + '-' + yyyy;

  var today2 = yyyy + '-' + mm + '-' + dd;

var month = new Array();
month[0] = "january";
month[1] = "february";
month[2] = "march";
month[3] = "april";
month[4] = "may";
month[5] = "june";
month[6] = "july";
month[7] = "august";
month[8] = "september";
month[9] = "october";
month[10] = "november";
month[11] = "december";

var pathMonth = month[monthNum];

 var checkPath = "./src/my_collections/_posts/meditations/tarot/" + today2 + "-daily-tarot-3-card-spread-for-" + pathMonth + '-' + dd + "-" + yyyy  +".md"

 // console.log(checkPath);
 // console.log(fs.existsSync(checkPath));

 if (fs.existsSync(checkPath) == false) {

  var dataURI;
  var filePath;
  var image1;
  var image2;
  var image3;
  var spread;
  var spreadName = 'tarot-' + today + '.png';
  var image1URL;
  var image2URL;
  var image3URL;

  var options = {
    min:  1
  , max:  78
  , integer: true
  }

  image1 = rn(options);
  var i = 0;

  while (i < 100) {
    image2 = rn(options);
    if (image1 != image2) {
      break;
    }
    i = i + 1;
  }
  var i = 0;

  while (i < 100) {
    image3 = rn(options);
    if (image1 != image3 && image2 != image3 ) {
      break;
    }
    i = i + 1;
  }

  var instance = new KeyValue({
      indent: 4,
      atomic: false
  });

  instance.load('./src/_data/tarot-upright-new.yml');

//
//   console.log(image1);
//   console.log(image2);
//   console.log(image3);
//
// console.log(instance.get(image1));
// console.log(instance.get(image2));
// console.log(instance.get(image3));

  cloudinary.config({
    cloud_name: 'telemann',
    api_key: '511152815254263',
    api_secret: process.env.CLOUDINARY
  });

var tarotImage1 = instance.get(image1, ['image']);
var tarotImage2 = instance.get(image2, ['image']);
var tarotImage3 = instance.get(image3, ['image']);

  image1URL = cloudinary.url(tarotImage1);
  image2URL = cloudinary.url(tarotImage2);
  image3URL = cloudinary.url(tarotImage3);

  // image2URL = cloudinary.url(instance.get(image2, ['image']));
  //
  // image3URL = cloudinary.url(instance.get(image3, ['image']));

  // console.log(instance.get(image1URL));
  // console.log(instance.get(image2URL));
  // console.log(instance.get(image3URL));

  var table = 'wood-table.jpg';
  var tableURL = 'https://res.cloudinary.com/telemann/image/upload/v1524332405/wood-table.jpg';


  var dir = 'tarot-tmp';

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }

  var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);

      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };

  download(tableURL, 'tarot-tmp/'+ table, function(){
    console.log(tableURL + ' done');
  });
  download(image1URL, 'tarot-tmp/'+ tarotImage1, function(){
    console.log(image1URL + ' done');
  });
  download(image2URL, 'tarot-tmp/'+ tarotImage2, function(){
    console.log(image2URL +' done');
  });
  download(image3URL, 'tarot-tmp/'+ tarotImage3, function(){
    console.log(image3URL +' done');
  });

  setTimeout(function(){

  mergeImages([
    { src: './tarot-tmp/' + table, x: 0, y: 0 },
    { src: './tarot-tmp/' + tarotImage1, x: 27, y: 68 },
    { src: './tarot-tmp/' + tarotImage2, x: 277, y: 68 },
    { src: './tarot-tmp/' + tarotImage3, x: 527, y: 68 }

  ], {
    Canvas: Canvas
  })
    .then(b64 => dataURI = b64);

  }, 10000);


  setTimeout(function(){

    filePath = './.tmp/tarot-' + today +'.png';
    // // Returns a Promise
    imageDataURI.outputFile(dataURI, filePath)
        .then(res => spread = res);

  },20000);
  //
  //
  setTimeout(function(){

  cloudinary.uploader.upload(spread, function(result) { console.log(result) }, {public_id: 'tarot-' + today + '', overwrite: false })

  fs.unlink('./tarot-tmp/' + table, (err) => {
    if (err) throw err;
    console.log('./tarot-tmp/' + table + ' was deleted');
  });

  fs.unlink('./tarot-tmp/' + tarotImage1, (err) => {
    if (err) throw err;
    console.log('./tarot-tmp/' + tarotImage1 + ' was deleted');
  });

  fs.unlink('./tarot-tmp/' + tarotImage2, (err) => {
    if (err) throw err;
    console.log('./tarot-tmp/' + tarotImage2 + ' was deleted');
  });

  fs.unlink('./tarot-tmp/' + tarotImage3, (err) => {
    if (err) throw err;
    console.log('./tarot-tmp/' + tarotImage3 + ' was deleted');
  });

  shell.exec('git config credential.helper "/bin/sh ./credential-helper.sh"');

  shell.exec('git remote set-url origin https://github.com/cbtelemann/cbtelemann.git');

  shell.exec('git config --global user.email "hello@telemann.ink"');

  shell.exec('git config --global user.name "cbtelemann"');

  shell.exec('git checkout -b temp');

  shell.exec('git add --all');

  shell.exec('git commit -m "add daily tarot"');

  shell.exec('git checkout -B cbt-new temp');

  shell.exec('git branch -d temp');

  shell.exec('git push origin cbt-new');

  }, 30000);

  var thor = "thor post:new 'Daily Tarot' --category=meditations --spread=" + spreadName + " --card1=" + image1 + " --card2=" + image2 + " --card3=" + image3 + "";

  shell.exec(thor);

}

  done();
  });
