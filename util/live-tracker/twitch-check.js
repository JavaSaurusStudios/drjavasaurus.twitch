function getUserStreamInfo() {
    var username = document.getElementById('fname').textContent;
    const endpoint = "https://api.twitch.tv/helix/users?login=" + username;
    headers = {
        "Authorization": "Bearer " + access_token,
        "Client_id": client_id
    }
    fetch(endpoint, { headers, })
        .then((res) => res.json())
        .then((data) => getStreamInfo(data[0].id));

}

async function getStreamInfo(username,user_id) {
    const endpoint = "https://api.twitch.tv/helix/streams";
    headers = {
        "Authorization": "Bearer " + access_token,
        "Client_id": client_id
    }

    stream_key = requests.get('https://api.twitch.tv/helix/stream', params = { 'broadcaster_id': user_id }, headers = headers).json()
    fetch(endpoint, { headers, })
        .then((res) => res.json())
        .then((data) => displayStreamInfo(username,data));
}

async function displayStreamInfo(username,data) {
    if (data === null || data.length == 0) {
        alert(username= " Not live");
    } else {
        alert(data);
    }
}
