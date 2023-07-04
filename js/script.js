// Firebase Setup
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js'

const appSettings = {
  databaseURL: "https://realtime-database-faebf-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

// App Setup
const addBtn = document.getElementById("add-button")
const inputEl = document.getElementById("input-field")
const shoppingListEl = document.getElementById('shopping-list')


addBtn.addEventListener("click", function () {
  let inputValue = inputEl.value;
  push(shoppingListInDB, inputValue)

  clearInputField()
})
// Functions

// Firebase onValue function will run whenever there is change in database.
onValue(shoppingListInDB, function (snapshot) {
  // Object.values - used to convert Object type into an array
  // It has three methods values, keys, entries { (key:value) -> entry } 

  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val())

    clearShoppingListEl()
    clearInputField()
    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i]
      addItemToShoppingListEl(currentItem)
    }
  }
  else {
    shoppingListEl.textContent = "No Items to Show!"
  }
})
function clearInputField() {
  inputEl.value = ""
}
function clearShoppingListEl() {
  shoppingListEl.innerHTML = ""
}

function addItemToShoppingListEl(item) {
  // shoppingListEl.innerHTML += `
  //   <li>${itemValue}</li>
  //   `

  let itemID = item[0]
  let itemValue = item[1]
  let newEl = document.createElement('li')
  newEl.textContent = itemValue

  newEl.addEventListener("click", function () {
    let exactLoactionOfItemInDB = ref(database, `shoppingList/${itemID}`)
    remove(exactLoactionOfItemInDB)
  })


  shoppingListEl.append(newEl)

}