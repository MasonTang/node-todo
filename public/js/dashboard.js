/////////////////////////////////////////////
//Users
///////////////////////////////////////////


$('#signup').submit(function (event) {
    event.preventDefault();
    const username = $('#username').val();
    const password = $('#password').val();
    console.log(username)
    console.log(password)
    fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
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


    let token = localStorage.getItem('token')
    console.log(token)

//////////////////////////////////////////////////////
// Get Todos
/////////////////////////////////////////////////
$('#data').click(e => {
    e.preventDefault();
    fetch('/todo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(response => {
        displayText(response)
    })
    .catch(error => console.log(error))
})

function displayText(responseJson) {
    const text = responseJson.map(data => {
         return `
        <textarea cols="30" rows="5">${data.todo}</textarea><br>
        <button class="edit">edit</button>
        <button class="delete">delete</button><br>
         `
    })
    $('.displayText').append(text)
}

///////////////////////////////////////
// Post Todos
///////////////////////////////////////

$('#todo-button').click(e => {
    e.preventDefault();
    const todo = $('#todoText').val();
    fetch('/todo', {
        method:'POST',
        body:JSON.stringify({todo}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(todos => console.log(todos))
    .catch(error => console.log(error))
})


