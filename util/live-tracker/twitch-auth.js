function doAuth() {

    var client_id = document.getElementById("clientID").value;
    var redirect = "https://javasaurusstudios.github.io/viewers/util/live-tracker/twitch-check.html";

    alert(client_id);
    alert(redirect);

    location.href = 'https://id.twitch.tv/oauth2/authorize?client_id=' + client_id + '&redirect_uri=' + encodeURIComponent(redirect) + '&response_type=token';
    if (document.location.hash && document.location.hash != '') {
        var parsedHash = new URLSearchParams(window.location.hash.slice(1));
        if (parsedHash.get('access_token')) {
            var access_token = parsedHash.get('access_token');
            document.getElementById('access_token').textContent = 'Your Access Key from the #url: ' + access_token;
        } else if (document.location.search && document.location.search != '') {
            var parsedParams = new URLSearchParams(window.location.search);
            if (parsedParams.get('error_description')) {
                document.getElementById('access_token').textContent = parsedParams.get('error') + ' - ' + parsedParams.get('error_description');
            }
        }
    }
}