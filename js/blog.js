let blogJson = null;
let currentBlogName;
let currentBlogTitle;
let currentBlogDescription;
let currentBlogDate;
let currentBlogImages;
let currentImageIndex;

function onBlogClick(blogName) {
    if (blogJson === null) return;

    const jsonData = blogJson[blogName]
    if (jsonData !== undefined) {
        currentBlogName = blogName;
        currentBlogTitle = jsonData["title"];
        currentBlogDescription = jsonData["description"];
        currentBlogDate = jsonData["date"];
        currentBlogImages = jsonData["images"];

        changeBlogContent();
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
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = currentBlogImages.length - 1;
    }

    showImage();
}

function showNextBlogImage() {
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

function onBlogClose() {
    currentBlogName = null;
    currentBlogImages = null;
    currentImageIndex = 0;
}
