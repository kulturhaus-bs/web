let blogJson = null;
let currentBlogName;
let currentBlogImages;
let currentImageIndex;

function onBlogClick(blogName) {
    if (blogJson === null) return;

    const jsonData = blogJson[blogName]
    if (jsonData !== undefined) {
        currentBlogName = blogName;
        currentBlogImages = jsonData["images"];
        changeBlogContent();
    }
}

function changeBlogContent() {
    currentImageIndex = 0;
    const languageSelect = document.getElementById("language-select");
    const language = languageSelect.value;
    const currentBlogContent = translations["blogs"][currentBlogName];

    document.getElementById("blog-modal-type").textContent = currentBlogContent["type"][language];
    document.getElementById("blog-modal-image").src= currentBlogImages[currentImageIndex];
    document.getElementById("blog-modal-title").textContent = currentBlogContent["title"][language];
    document.getElementById("blog-modal-description").textContent = currentBlogContent["description"][language];
    document.getElementById("blog-modal-date").textContent = currentBlogContent["date"][language];
}

function showPrevBlogImage() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = currentBlogImages.length - 1;
    }

    document.getElementById("blog-modal-image").src= currentBlogImages[currentImageIndex];
}

function showNextBlogImage() {
    currentImageIndex++;
    if (currentImageIndex >= currentBlogImages.length) {
        currentImageIndex = 0;
    }

    document.getElementById("blog-modal-image").src= currentBlogImages[currentImageIndex];
}

function onBlogClose() {
    currentBlogName = null;
    currentBlogImages = null;
    currentImageIndex = 0;
}
