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
    const image = document.getElementById("blog-modal-image");
    let video = document.getElementById("blog-modal-video");
    const source = currentBlogImages[currentImageIndex];
    if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
        video.hidden = true;
    }
    const isVideo = /\.mp4(?:[?#]|$)/i.test(source);
    image.classList.toggle("d-block", !isVideo);
    image.hidden = isVideo;
    if (isVideo) {
        image.removeAttribute("src");
        if (!video) {
            video = document.createElement("video");
            video.id = "blog-modal-video";
            video.className = "img-fluid mx-auto";
            video.controls = true;
            video.playsInline = true;
            video.preload = "metadata";
            video.style.maxHeight = "70vh";
            image.insertAdjacentElement("afterend", video);
        }
        video.setAttribute("aria-label", currentBlogTitle + " – Video");
        video.src = source;
        video.hidden = false;
    } else {
        image.src = source;
        image.alt = currentBlogTitle;
    }
    document.getElementById("image-number").textContent = (currentImageIndex + 1) + " / " + currentBlogImages.length;
}

function clearBlogContent() {
    const video = document.getElementById("blog-modal-video");
    if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
        video.hidden = true;
    }
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

document.addEventListener("hidden.bs.modal", event => {
    if (event.target.id === "portfolioModal") onBlogClose();
});
