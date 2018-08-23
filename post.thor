require "stringex"
class Post < Thor

  desc "new", "create a new post"
  method_option :editor, :default => "vim"
  method_option :date
  method_option :category, :default => "blog"
  method_option :spread
  method_option :card1
  method_option :card2
  method_option :card3

  def new(*title)
    title = title.join(" ")
    spread = options[:spread]
    card1 = options[:card1]
    card2 = options[:card2]
    card3 = options[:card3]
    date = options[:date] || Time.now.strftime('%Y-%m-%d')
    date2= Time.now.strftime("%B %d, %Y")
    date3= Time.now.strftime("%B-%d-%Y")
    category = options[:category]
    layout = options[:category] == 'blog' ? 'post' : 'project'
    filename = "./src/my_collections/_posts/#{category}/tarot/#{date}-#{title.to_url}-3-card-spread-for-#{date3.downcase}.md"

    if File.exist?(filename)
      abort("#{filename} already exists!")
    end

    puts "Creating new post: #{filename}"
    File.open(filename, 'w') do |post|
      post.puts "---"
      post.puts "layout: tarot"
      post.puts "title: #{title.gsub(/&/,'&amp;')} 3-Card Spread for #{date2}"
      post.puts "date: #{date}"
      post.puts "tags: tarot"
      post.puts "categories: meditations"
      post.puts "download: false"
      post.puts "comments: false"
      post.puts "image: #{spread}"
      post.puts "cards: [#{card1},#{card2},#{card3}]"
      post.puts "---"
    end

    #system(options[:editor], filename)
  end

end
