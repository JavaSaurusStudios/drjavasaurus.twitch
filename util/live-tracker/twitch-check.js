function loadAuth() {
    const urlParams = new URLSearchParams(window.location.search);
    const access_token = urlParams.get('access_token')
    console.log(access_token);
    alert(access_token);
    document.getElementById("access_token").value = access_token;
}