    let token = localStorage.getItem('token')
    console.log(token)

//////////////////////////////////////////////////////
// Get Todos
/////////////////////////////////////////////////
function getTodos(){
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
}

function displayText(responseJson) {
    const text = responseJson.map(data => {
         return `
        <div class="display-todo"> 
        <textarea cols="30" rows="5">${data.todo}</textarea><br>
        <button class="edit">edit</button>
        <button id="${data._id}" class="delete">delete</button><br>
        </div>
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
    .then(todos => location.reload(true))
    .catch(error => console.error(error))
})

///////////////////////////////////////
// Delete Todos
///////////////////////////////////////

$('.displayText').on('click', '.delete', function(e) {
    e.preventDefault();
    const todoId = $(this).attr('id');
    console.log(todoId)
    const todogrid = $(this).closest('.display-todo')
    
    $.ajax({
        type:'Delete',
        url: `/todo/${todoId}`,
        success: function() {
            todogrid.remove();
        },
        error: function(err) {
            console.log(err)
        }
    })
})

function watchForm() {
    getTodos()
}

watchForm()