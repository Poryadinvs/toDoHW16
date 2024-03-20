const todos = [
    { id: 1, title: "Todo #1", completed: true },
    { id: 2, title: "Todo #2", completed: false },
    { id: 3, title: "Todo #3", completed: false },
    { id: 4, title: "Todo #4", completed: true },
    { id: 5, title: "Todo #5", completed: false }
]

const form = document.querySelector('form')
const todoContainer = document.querySelector('.todos');
const modal = document.querySelector('.modal')
const modalText = document.querySelector('.modal-text')
const modalClose = document.querySelector('.modal-close')
const todoChild = todoContainer.firstElementChild
// console.log(todoChild);

modalClose.onclick = (event)=>{
    event.preventDefault()
    modal.classList.remove('is-active')
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(form.todo.value);

    if (!form.todo.value) return
    
    if (form.todo.value == " ") {
        modal.classList.add('is-active')
        modalText.textContent = 'Текст не может быть пустым'
        return
    }

    const existingTodo = todos.find(todo => todo.title === form.todo.value.trim())

    if(existingTodo){
        modal.classList.add('is-active')
        modalText.textContent = 'Такая задача уже существует'
        return
    }

    const newTodo = {
        title: form.todo.value,
        complited: false,

        id: new Date().getTime()
    }

    generateHTML(newTodo)
    todos.push(newTodo)
    form.reset()
})

function generateHTML(object) {
    let clone = todoChild.cloneNode(true)

    clone.setAttribute('id', object.id)
    clone.querySelector('.text').textContent = object.title
    clone.querySelector('[type="checkbox"]').checked = object.completed

    clone.classList.remove('is-hidden')
    todoContainer.append(clone)
}

todos.forEach((todo) => generateHTML(todo))