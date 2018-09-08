---
title: Imprint
permalink: /imprint/
display-title: false
right-aside-top: false
right-aside-bottom: false
---
<h1 class="uk-h3 uk-text-center">{{ page.title }}</h1>
<ul uk-accordion>
{% for i in (0..8) %}
<li>
<a class="uk-accordion-title">{{ site.data.imprint[i].name }}</a>
<div class="uk-accordion-content">
{{ site.data.imprint[i].text | replace: '!SITE_URL!', site.url | replace: '!COMPANY_NAME!', site.company.name | replace: '!SITE_NAME!', site.company.url | replace: '!COMPANY_LOCATION!', site.company.location}}
</div>
</li>
{% endfor %}
</ul>

<hr>
<p class="uk-text-center">
Set in <a href="https://fonts.google.com/specimen/Fira+Sans">Fira Sans</a> and <a href="https://fonts.google.com/specimen/Fira+Sans+Condensed">Fira Sans Condensed</a>.
<br><br>
Website content by Virginia Hammon.<br> Copyright © {{ 'now' | date: "%Y" }}&ensp;All rights reserved.<br><br>
Book cover, interior book layout, <br> web design and development by <a href="https://telemann.ink/">C.B. Telemann.</a><br>
Built with :heart: with <a href="https://jekyllrb.com/">Jekyll</a>,
<a href="https://cloudinary.com/">Cloudinary</a>,  
<a href="https://getuikit.com/">UIKit</a>, and <a href="https://www.netlify.com/">Netlify</a>.
<p>
