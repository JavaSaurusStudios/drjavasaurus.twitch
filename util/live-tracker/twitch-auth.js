var client_id = "wep38t0x9n5oe1iyid2ff21o5iesjp";
var redirect = "https://javasaurusstudios.github.io/viewers/util/live-tracker/twitch-check.html";
var access_token = "";

function requestAuth() {
    location.href = 'https://id.twitch.tv/oauth2/authorize?client_id=' + client_id + '&redirect_uri=' + encodeURIComponent(redirect) + '&response_type=token';
}

function loadAuth() {
    access_token = getParameterByName('access_token');
    document.getElementById("access_token").textContent = access_token;
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?#&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}