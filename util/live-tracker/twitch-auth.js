var client_id = "wep38t0x9n5oe1iyid2ff21o5iesjp";
var redirect = "https://javasaurusstudios.github.io/viewers/util/live-tracker/twitch-check.html";
var access_token="";

function requestAuth() {
    location.href = 'https://id.twitch.tv/oauth2/authorize?client_id=' + client_id + '&redirect_uri=' + encodeURIComponent(redirect) + '&response_type=token';
    if (document.location.hash && document.location.hash != '') {
        var parsedHash = new URLSearchParams(window.location.hash.slice(1));
        if (!parsedHash.get('access_token') && (document.location.search && document.location.search != '')) {
            var parsedParams = new URLSearchParams(window.location.search);
            if (parsedParams.get('error_description')) {
                document.getElementById('access_token').textContent = parsedParams.get('error') + ' - ' + parsedParams.get('error_description');
            }
        }
    }
}

function loadAuth() {
    const urlParams = new URLSearchParams(window.location.search);
    access_token = urlParams.get('access_token')
    document.getElementById("access_token").textContent = access_token;
}