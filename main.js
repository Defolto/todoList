let tasks = ["побрить кота", "выгулить молоко", "отшлёпать Захара"]
const list = document.querySelector(".list")
const newTask = document.getElementById("newTask")
const addNewTask = document.getElementById("addNewTask")
const filter = document.getElementById("filter")
const TASK_ID = 'tasks'

let filterText = ''
filter.addEventListener("input", () => {
    filterText = filter.value
    render()
})

function getLocalStorage() {
    return JSON.parse(localStorage.getItem(TASK_ID))
}

function setLocalStorage() {
    localStorage.setItem(TASK_ID, JSON.stringify(tasks))
}

if (!getLocalStorage()) {
    setLocalStorage()
} else {
    tasks = getLocalStorage()
}

function render() {
    setLocalStorage()
    list.innerHTML = ''
    let currentTasks = getLocalStorage()

    if (filterText) {
        currentTasks = currentTasks.filter((item) => { return item.includes(filterText) })
    }

    currentTasks.forEach((item, i) => {
        list.insertAdjacentHTML("beforeend", `<div>
        <p>${item}</p>
        <button onClick="deleteTask(${i})">Удалить</button>
        <button onClick="editTask(${i})">Редактировать</button>
    </div>`)
    })
}

render()

addNewTask.addEventListener('click', () => {
    const text = newTask.value
    tasks.push(text)
    render()
})

function deleteTask(index) {
    tasks.splice(index, 1)
    render()
}

function editTask(index) {
    const editedTask = prompt("Отредактируйте задачу", tasks[index])
    tasks[index] = editedTask
    render()
}