const achievement_names = [
    'First',
    'Default',
    'Default',
    'Default',
    'Default',
    'Default'
];

const jsonBaseURL = 'https://javasaurusstudios.github.io/viewers/profiles/';

var body = document.getElementById("achievement-body");
body.onload = function () { loadAchievements() };

var badges = document.getElementById("badges");
achievement_names.forEach(addAchievement);

function loadAchievements() {
    const urlParams = new URLSearchParams(window.location.search);
    var userName = urlParams.get('username');
    var title = document.getElementById("Title");
    title.innerHTML = userName;
    loadProfileJson(userName);
}

function addAchievement(achievementName) {
    var newDiv = document.createElement("div");
    newDiv.className = "achievement-container tooltip";
    newDiv.innerHTML = '<img id="' + achievementName + '" src="badges/' + achievementName + '.png" alt="' + achievementName + '" class="achievement locked"> <span class="tooltiptext">' + achievementName + '</span>';
    badges.appendChild(newDiv);
}

function loadProfileJson(userName) {
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', jsonBaseURL + userName + '.json', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                parseUserData(JSON.parse(request.responseText));
                return request.responseText;
            }
        }
    }
}

function parseUserData(data) {
    console.log(data.name);
    data.achievements.forEach(unlockAchievement);
}

function unlockAchievement(achievement) {
    console.log(achievement);
    var achievementBadge = document.getElementById(achievement);
    if (achievementBadge) {
        achievementBadge.className = "achievement";
    }
}
