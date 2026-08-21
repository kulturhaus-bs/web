let youthJson = null;
let youthJsonPromise = null;
let youthActivityNames = [];
let currentYouthIndex = 0;

function setYouthActivities(data) {
    youthJson = data;
    youthActivityNames = Object.keys(data);
    currentYouthIndex = 0;
    showYouthActivity();
}

async function onCurrentYouthClick() {
    if (youthJson === null && youthJsonPromise !== null) {
        clearBlogContent();
        await youthJsonPromise;
    }

    if (youthActivityNames.length === 0) return;
    onYouthClick(youthActivityNames[currentYouthIndex]);
}

async function onYouthClick(activityName) {
    if (youthJson === null) {
        clearBlogContent();
        if (youthJsonPromise !== null) {
            await youthJsonPromise;
        }
    }

    const activity = youthJson === null ? undefined : youthJson[activityName];
    if (activity === undefined) {
        clearBlogContent();
        return;
    }

    currentBlogTitle = activity["title"];
    currentBlogDescription = activity["description"];
    currentBlogDate = activity["date"];
    currentBlogImages = activity["images"];

    changeBlogContent();
}

function showPrevYouthActivity() {
    if (youthActivityNames.length === 0) return;

    currentYouthIndex--;
    if (currentYouthIndex < 0) {
        currentYouthIndex = youthActivityNames.length - 1;
    }

    showYouthActivity();
}

function showNextYouthActivity() {
    if (youthActivityNames.length === 0) return;

    currentYouthIndex++;
    if (currentYouthIndex >= youthActivityNames.length) {
        currentYouthIndex = 0;
    }

    showYouthActivity();
}

function showYouthActivity() {
    if (youthJson === null || youthActivityNames.length === 0) return;

    const youthImage = document.getElementById("youth-image");
    const youthTitle = document.getElementById("youth-title");
    const youthNumber = document.getElementById("youth-number");
    if (youthImage === null || youthTitle === null || youthNumber === null) return;

    const activity = youthJson[youthActivityNames[currentYouthIndex]];

    youthImage.src = activity["images"][0];
    youthTitle.textContent = activity["title"];
    youthNumber.textContent = (currentYouthIndex + 1) + " / " + youthActivityNames.length;
}
