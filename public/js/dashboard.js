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
        <textarea class='text-area' cols="30" rows="5">${data.todo}</textarea><br>
        <button id="${data._id}" class="edit">edit</button>
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
// Put Todos
///////////////////////////////////////
$('.displayText').on('click', '.edit', function(e){
    e.preventDefault();
    const todoId = $(this).attr('id');
    const todo = $(this).closest('.display-todo').find('.text-area').val();
    console.log(todo)

    $.ajax({
        type:'Put',
        url: `/todo/${todoId}`,
        data: JSON.stringify({todo}),
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        success: function(){
           location.reload(true)
        },
        error: function(err){
            console.log(err)
        }
    })
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
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
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