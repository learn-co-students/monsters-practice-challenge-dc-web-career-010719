document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:3000/monsters/?_limit=51&_page=${pageNum}`, {
    }).then (res => res.json())
    .then(json => json.forEach(showMonster))
})

    let pageNum = 1


    let form = `<form> 
    <input id="name" placeholder = "name...">
    <input id="age" placeholder = "age...">
    <input id="description" placeholder = "description...">
    <button>Create</button>
    </form>`
    document.querySelector('#create-monster').innerHTML += form

    let createBtn = document.querySelector('button')
    createBtn.addEventListener('click', newMonster)

function showMonster(monster) {
    let monContainer = document.querySelector('#monster-container')
    let newMon = `<p> Name: ${monster.name} <br> Age: ${Number((monster.age).toFixed(1))} <br> Description: ${monster.description}<p>`
    monContainer.innerHTML += newMon
}

let backBtn = document.querySelector('#back')
let forwardBtn = document.querySelector('#forward')
forwardBtn.addEventListener('click', changePage)
backBtn.addEventListener('click', () => {changePage(-1)} )

function changePage(change = 1) {
    incrementPageNum(change)
    document.querySelector('#monster-container').innerHTML = ''
    fetch(`http://localhost:3000/monsters/?_limit=51&_page=${pageNum}`)
    .then (res => res.json())
    .then (json => json.forEach(showMonster))
}

function incrementPageNum(change = 1) {
    if (change === 1){
        pageNum += 1
        if(pageNum > 20){
            pageNum = 1
        }
    } else {
        pageNum -= 1
        if (pageNum < 1) {
            pageNum = 20
        }
    }
}

function newMonster(e){
    e.preventDefault()

    const monData = {
        name: document.querySelector('#name').value,
        age: document.querySelector('#age').value,
        description: document.querySelector('#description').value
    }

    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        body: JSON.stringify(monData),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    })
}