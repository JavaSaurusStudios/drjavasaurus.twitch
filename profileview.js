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
    //request.open('GET', jsonBaseURL + userName + '.json', true);
    var tmpBase = "https://raw.githubusercontent.com/JavaSaurusStudios/viewers/main/profiles/";
    request.open('GET', tmpBase + userName + '.json?v='+Math.random(), true);
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
    var viewRef = document.getElementById("views");
		viewRef.innerHTML=data.minutesInChat===undefined?0:convertToDays(data.minutesInChat);
    var messageRef = document.getElementById("messages");
		messageRef.innerHTML=data.messagesInChat===undefined?0:data.messagesInChat;
	var triviaRef = document.getElementById("trivia");
		triviaRef.innerHTML=data.triviaPoints===undefined?0:data.triviaPoints;
}

function convertToDays(minutesInChat){
	return  Math.floor(minutesInChat/24/60) + " days ," +  Math.floor(minutesInChat/60%24) + ' hours and ' +  Math.floor(minutesInChat%60)+ ' minutes ';
}

function unlockAchievement(achievement) {
    console.log(achievement);
    var achievementBadge = document.getElementById(achievement);
    if (achievementBadge) {
        achievementBadge.src = "badges/" + achievement + ".png";
        achievementBadge.className = "achievement";
    }
}
