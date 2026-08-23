let youthJson = null;
let youthJsonPromise = null;
let youthActivityNames = [];
let currentYouthIndex = 0;
let currentYouthProjectYear = null;

function setYouthActivities(data) {
    youthJson = data;
    youthActivityNames = Object.keys(data).sort((first, second) =>
        (data[second]["sortDate"] || "").localeCompare(data[first]["sortDate"] || "")
    );
    currentYouthIndex = 0;
    currentYouthProjectYear = youthActivityNames
        .map(name => getYouthProjectYear(data[name]))
        .sort((first, second) => second.localeCompare(first))[0] || null;
    showYouthActivity();
    updateYouthProjectYearLabel();
    showYouthActivityList();
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

function showYouthActivityList() {
    const activityList = document.getElementById("youth-activity-list");
    if (activityList === null || youthJson === null) return;

    const sortedActivities = youthActivityNames
        .map(name => [name, youthJson[name]])
        .filter(([, activity]) => getYouthProjectYear(activity) === currentYouthProjectYear)
        .sort((first, second) => (second[1]["sortDate"] || "").localeCompare(first[1]["sortDate"] || ""));

    activityList.innerHTML = sortedActivities.map(([name, activity], index) => `
        <div class="youth-timeline-item youth-timeline-item-${index % 2 === 0 ? "left" : "right"}">
            <span class="youth-timeline-line" aria-hidden="true"></span>
            <span class="youth-timeline-date">${formatYouthTimelineDate(activity["sortDate"], activity["date"])}</span>
            <a class="youth-timeline-card p-3" onclick="onYouthClick('${name}')" data-bs-toggle="modal" href="#portfolioModal">
                <div class="d-flex align-items-center gap-3">
                    <img class="youth-activity-thumbnail rounded" src="${activity["images"][0]}" alt="${activity["title"]}" />
                    <h4 class="mb-0">${activity["title"]}</h4>
                </div>
                <p class="youth-timeline-description text-muted mb-0 mt-3">${activity["description"]}</p>
            </a>
        </div>
    `).join("");
}

function selectYouthProjectYear(projectYear) {
    currentYouthProjectYear = String(projectYear);
    updateYouthProjectYearLabel();
    showYouthActivityList();
}

function updateYouthProjectYearLabel() {
    const projectYearLabel = document.getElementById("youth-project-year-label");
    if (projectYearLabel === null || currentYouthProjectYear === null) return;

    projectYearLabel.textContent = formatYouthProjectYear(currentYouthProjectYear);
}

function getYouthProjectYear(activity) {
    const [year, month] = (activity["sortDate"] || "").split("-").map(Number);
    if (!year || !month) return "";

    return String(month >= 9 ? year + 1 : year);
}

function formatYouthProjectYear(projectYear) {
    const year = Number(projectYear);
    if (!year) return "";

    return `Projektjahr ${year}`;
}

function formatYouthTimelineDate(sortDate, fallbackDate) {
    const dateParts = (sortDate || "").split("-");
    if (dateParts.length !== 3) return fallbackDate;

    return dateParts[2] + "." + dateParts[1] + "." + dateParts[0].slice(-2);
}
