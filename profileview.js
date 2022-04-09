const jsonBaseURL = 'https://javasaurusstudios.github.io/viewers/profiles/';

var body = document.getElementById("achievement-body");
body.onload = function () { loadAchievements() };

var badges = document.getElementById("badges");

function loadAchievements() {
    const urlParams = new URLSearchParams(window.location.search);
    var userName = urlParams.get('username');

    var title = document.getElementById("Title");
    title.innerHTML = userName;
    loadAchievementModels(userName);
}

function addAchievement(achievementName,achievementDesc) {

    var newDiv = document.createElement("div");
    newDiv.className = "achievement-container tooltip";
    newDiv.innerHTML = '<img id="' + achievementName + '" src="badges/blocked.png" alt="' + achievementName + '" class="achievement locked"> <span id="' + achievementName + '-tooltip" class="tooltiptext">' + achievementDesc + '</span>';
    badges.appendChild(newDiv);
}

function loadAchievementModels(userName) {
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', 'https://javasaurusstudios.github.io/viewers/achievements.json', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                var achievements = JSON.parse(request.responseText);
                for (var key in achievements) {
                    var value = achievements[key];
                    addAchievement(key,value);
                }
                loadProfileJson(userName);
                return request.responseText;
            }
        }
    }
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
        achievementBadge.src = "badges/" + achievement + ".png";
        achievementBadge.className = "achievement";
    }
}
