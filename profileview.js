const jsonBaseURL = 'https://raw.githubusercontent.com/JavaSaurusStudios/viewers/main/profiles/';

var body = document.getElementById("achievement-body");
body.onload = function () { loadAchievements() };

function loadAchievements() {
    const urlParams = new URLSearchParams(window.location.search);
    var userName = urlParams.get('username');

    var title = document.getElementById("Title");
    title.innerHTML = userName + " 's Stream Achievements";

    loadProfileJson(userName);
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
    achievementBadge.className = "achievement";
}