Ever thought of having your own math blog but didn't know where to start? Well, today's your lucky day! I'm going to walk you through the process of creating a math blog that supports LaTeX and comments, using GitHub Pages, Jekyll, MathJax, and Utterances. Think of it as building a Lego house - GitHub Pages is our baseplate, Jekyll is our Lego bricks, MathJax is our Lego decorator, and Utterances is our Lego mailbox.

## Step 1: Set Your Baseplate (Create a Repository on GitHub)

First, we need to set our baseplate. In the GitHub universe, this means creating a repository. Let's call it "math".

## Step 2: Start Building (Create a Jekyll Site)

Next, we start building with our Lego bricks, which is Jekyll in this case. Jekyll is a simple, blog-aware, static site generator. Here's how to create a new Jekyll site and push it to GitHub:

```bash
gem install jekyll bundler
jekyll new math
cd math
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:argszero/math.git
git push -u origin main
```

Then, start the Jekyll server and open your site in a web browser:

```bash
bundle exec jekyll serve
open http://127.0.0.1:4000/
```

## Step 3: Build Your Lego House (Configure GitHub Pages)

Now, it's time to build our Lego house. We need to configure GitHub Pages to host our Jekyll site. Edit the `_config.yml` file to change the baseurl from `""` to `"/math"`. Then, push your changes to GitHub:

```bash
git pull;git add .;git commit -m "change baseurl";git push
```

Next, go to your repository settings on GitHub, navigate to the Pages section, select the main branch for deployment, and save your changes. After waiting for about 5 minutes, your site should be live at `https://argszero.github.io/math/`.

## Step 4: Decorate Your Lego House (Enable MathJax)

Our Lego house is built, but it's not a math blog without some math, right? This is where MathJax comes in. MathJax is a JavaScript library that displays mathematical notation in web browsers, using LaTeX, MathML, or AsciiMath notation. It's like our Lego decorator.

First, let's add some math formula to the example post Jekyll generated for us:
add the following text to the end of _posts/2023-11-15-welcome-to-jekyll.markdown
```markdown
$$e=mc^2$$
$e=mc^2$
\\( e=mc^2 \\)
```
and remove the meta in the file top:
```
---
layout: post
title:  "Welcome to Jekyll!"
date:   2023-11-15 17:05:58 +0800
categories: jekyll update
---
```

To enable MathJax, we need to create a post layout which enabled MathJax script . 
create new file _layouts/posts.html with the following text:
```
---
layout: default
---
<article class="post h-entry" itemscope itemtype="http://schema.org/BlogPosting">

    <header class="post-header">
        <h1 class="post-title p-name" itemprop="name headline">{{ page.title | escape }}</h1>
        <p class="post-meta">
            <time class="dt-published" datetime="{{ page.date | date_to_xmlschema }}" itemprop="datePublished">
                {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
                {{ page.date | date: date_format }}
            </time>
            {%- if page.author -%}
            • <span itemprop="author" itemscope itemtype="http://schema.org/Person"><span class="p-author h-card"
                    itemprop="name">{{ page.author }}</span></span>
            {%- endif -%}
        </p>
    </header>

    <div class="post-content e-content" itemprop="articleBody">
        {{ content }}
    </div>

    {%- if site.disqus.shortname -%}
    {%- include disqus_comments.html -%}
    {%- endif -%}

    <a class="u-url" href="{{ page.url | relative_url }}" hidden></a>
</article>

<script>
    MathJax = {
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']]
        }
    };
</script>
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
```
Then, we need tell Jekyll that all posts should use the layout we created:
edit _config.yml,add the following to the end:
```
defaults:
  - scope:
      path: "_posts"
    values:
      layout: "posts"
```

Then, restart the Jekyll server and push your changes to GitHub. Your math should now be beautifully formatted!



## Step 5: Install Your Lego Mailbox (Enable Utterances)

Finally, we need to install our Lego mailbox - Utterances. Utterances is a lightweight comments widget built on GitHub issues, perfect for blogs hosted on GitHub Pages. 

To enable Utterances, first install the Utterances app to your GitHub repository:
open https://github.com/apps/utterances , follow the instructions to install the app to the repository you created earlier.

Then, get the Utterances script and add it to your post layout. 
open https://utteranc.es/

Fill in: repo: argszero/math

Blog Post ↔️ Issue Mapping： Choose as needed, you can use the default

Label：Fill in as needed, you can leave it blank or fill in utterances

Theme: Choose as needed, you can use the default

The final script should look something like this:
```
<script src="https://utteranc.es/client.js"
        repo="argszero/math"
        issue-term="pathname"
        label="utterances"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
```

Add this script to the bottom of the _layouts/posts.html file.

Push your changes to GitHub, and voila! Your visitors can now leave comments on your posts.

And there you have it - your very own math blog, built from scratch! Happy blogging!