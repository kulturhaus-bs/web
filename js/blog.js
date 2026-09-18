let blogJson = null;
let blogJsonPromise = null;
let currentBlogName;
let currentBlogTitle;
let currentBlogDescription;
let currentBlogDate;
let currentBlogImages;
let currentImageIndex;

async function onBlogClick(blogName) {
    if (blogJson === null) {
        clearBlogContent();
        if (blogJsonPromise !== null) {
            await blogJsonPromise;
        }
    }

    if (blogJson === null) return;

    const jsonData = blogJson[blogName]
    if (jsonData !== undefined) {
        currentBlogName = blogName;
        currentBlogTitle = jsonData["title"];
        currentBlogDescription = jsonData["description"];
        currentBlogDate = jsonData["date"];
        currentBlogImages = jsonData["images"];

        changeBlogContent();
    } else {
        clearBlogContent();
    }
}

function changeBlogContent() {
    currentImageIndex = 0;
    //const languageSelect = document.getElementById("language-select");
    //const language = languageSelect.value;
    //const currentBlogContent = translations["blogs"][currentBlogName];

    //document.getElementById("blog-modal-type").textContent = currentBlogContent["type"][language];
    document.getElementById("blog-modal-title").textContent = currentBlogTitle;
    document.getElementById("blog-modal-description").textContent = currentBlogDescription;
    document.getElementById("blog-modal-date").textContent = currentBlogDate;

    showImage();
}

function showPrevBlogImage() {
    if (!currentBlogImages || currentBlogImages.length === 0) return;

    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = currentBlogImages.length - 1;
    }

    showImage();
}

function showNextBlogImage() {
    if (!currentBlogImages || currentBlogImages.length === 0) return;

    currentImageIndex++;
    if (currentImageIndex >= currentBlogImages.length) {
        currentImageIndex = 0;
    }

    showImage();
}

function showImage() {
    document.getElementById("blog-modal-image").src= currentBlogImages[currentImageIndex];
    document.getElementById("image-number").textContent = (currentImageIndex + 1) + " / " + currentBlogImages.length;
}

function clearBlogContent() {
    currentBlogName = null;
    currentBlogTitle = null;
    currentBlogDescription = null;
    currentBlogDate = null;
    currentBlogImages = null;
    currentImageIndex = 0;

    document.getElementById("blog-modal-title").textContent = "";
    document.getElementById("blog-modal-description").textContent = "";
    document.getElementById("blog-modal-date").textContent = "";
    document.getElementById("blog-modal-image").removeAttribute("src");
    document.getElementById("image-number").textContent = "";
}

function onBlogClose() {
    clearBlogContent();
}

function addBlogsToHomepage() {
    if (blogJson === null) {
        if (blogJsonPromise !== null) {
            blogJsonPromise.then(() => {
                addBlogsToHomepage();
            });
        }
        return;
    }

    const entries = Object.entries(blogJson).slice(0, 5);
    entries.forEach(([blogName, entry]) => {
        const imgSrc = Array.isArray(entry.images) && entry.images.length ? entry.images[0] : 'images/blog/more-blogs.jpg';
        const heading = entry.title || blogName;
        addPortfolioItem({ imgSrc, heading, clickArg: blogName });
    });

    addPortfolioItem({imgSrc:'images/blog/more-blogs.jpg', heading:'Mehr anzeigen', href:'blog-and-gallery.html'});
}

function addBlogsToBlogPage() {
    if (blogJson === null) {
        if (blogJsonPromise !== null) {
            blogJsonPromise.then(() => {
                addBlogsToBlogPage();
            });
        }
        return;
    }

    const entries = Object.entries(blogJson).slice(5);
    entries.forEach(([blogName, entry]) => {
        const imgSrc = Array.isArray(entry.images) && entry.images.length ? entry.images[0] : 'images/blog/more-blogs.jpg';
        const heading = entry.title || blogName;
        addPortfolioItem({ imgSrc, heading, clickArg: blogName });
    });
}

/*function addPortfolioItem({imgSrc, heading, clickArg}) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-sm-6 mb-4';
    col.innerHTML = `
    <div class="portfolio-item">
      <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal">
        <div class="portfolio-hover">
          <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
        </div>
        <img class="img-fluid" src="${imgSrc}" alt="" />
      </a>
      <div class="portfolio-caption"><div class="portfolio-caption-heading">${heading}</div></div>
    </div>`;

    const link = col.querySelector('.portfolio-link');
    link.addEventListener('click', () => onBlogClick(clickArg));
    document.getElementById('portfolio-container').appendChild(col);
}*/

function addPortfolioItem({imgSrc, heading, clickArg, href}) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-sm-6 mb-4';

    const item = document.createElement('div');
    item.className = 'portfolio-item';

    const link = document.createElement('a');
    link.className = 'portfolio-link';
    if (href) { link.setAttribute('href', href); }
    else { link.setAttribute('data-bs-toggle', 'modal');
    link.setAttribute('href', '#portfolioModal');
    if (clickArg) link.addEventListener('click', () => onBlogClick(clickArg)); }
    link.innerHTML = `
    <div class="portfolio-hover">
        <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
    </div>
    <img class="img-fluid" src="${imgSrc}" alt="" />`;

    item.appendChild(link);

    const caption = document.createElement('div');
    caption.className = 'portfolio-caption';
    caption.innerHTML = `<div class="portfolio-caption-heading">${heading}</div>`;
    item.appendChild(caption);

    col.appendChild(item);
    document.getElementById('portfolio-container').appendChild(col);
    return col;
}