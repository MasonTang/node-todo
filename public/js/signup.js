
$('#signup').submit(function (event) {
    event.preventDefault();
    const username = $('#username').val();
    const password = $('#password').val();
    console.log(username)
    console.log(password)
    fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        localStorage.setItem('token', response.authToken)
        window.location = '../html/dashboard.html'
    })
    .catch(error => console.log(error));
});