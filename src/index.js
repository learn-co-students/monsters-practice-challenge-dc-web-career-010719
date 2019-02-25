'use strict'
let page = 1

document.addEventListener("DOMContentLoaded", function(e) {
  let backButton = document.querySelector("#back")
  let forwardButton = document.querySelector("#forward")

  backButton.addEventListener("click", handleBackClick)
  forwardButton.addEventListener("click", handleForwardClick)
  monsterForm().addEventListener("submit", handleFormSubmission)

  getMonsters(page)
})

function monsterBox() {
  return document.querySelector("#monster-container")
}

function monsterForm() {
  return document.querySelector("#monster-form")
}

function getMonsters(page) {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
  .then(res => res.json())
  .then(data => displayMonsters(data))
}

function displayMonsters(monsterData) {
  for (const key in monsterData) {
    formatMonster(monsterData[key])
  }
}

function formatMonster(monster) {
  let div = document.createElement('div')
  let name = document.createElement('h2')
  let age = document.createElement('h4')
  let bio = document.createElement('p')
  name.innerText = monster.name
  age.innerText = `Age: ${monster.age}`
  bio.innerText = `Bio: ${monster.description}`
  monsterBox().appendChild(div)
  div.appendChild(name)
  div.appendChild(age)
  div.appendChild(bio)
}

function clearPage() {
  while (monsterBox().firstChild) {
    monsterBox().removeChild(monsterBox().firstChild)
  }
}

function handleBackClick() {
  if (page > 1) {
    page--
    clearPage()
    getMonsters(page)
  } else {
    alert("There are no monsters on page 0!")
  }
}

function handleForwardClick() {
    page++
    clearPage()
    getMonsters(page)
}

function handleFormSubmission(e) {
  e.preventDefault()
  let name = document.querySelector("#name").value
  let age = document.querySelector("#age").value
  let desc = document.querySelector("#description").value
  createMonster(name, age, desc)
  monsterForm().reset()
}

function createMonster(name, age, desc) {
  let m = new Monster(name, age, desc)
  postMonster(m)
}

function postMonster(monster) {
  fetch(`http://localhost:3000/monsters`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(monster)
  }).then(res => res.json())
  .then(newMonster => console.log(newMonster))
}
