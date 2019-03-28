//need event listener to submit
$("#login").submit(function (event) {
    event.preventDefault();
    const username = $('#username').val();
    const password = $('#password').val();

    fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }), // data can be `string` or {object}!
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

//future get request, I want to use localStorage.getItem 
//read localStorage 






