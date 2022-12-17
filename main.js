//menu array data file
import { menuArray } from './data.js'

let itemsOrderedArray = []
const orderContainer = document.getElementById('order')


//Listens for clicks on entire document
document.addEventListener('click', function (e) {
    //Checks if add item btn is clicked
    if (e.target.dataset.addBtn) {
        addItemsToOrder(e.target.dataset.addBtn)
        console.log(e.target.dataset.addBtn)
        orderContainer.classList.remove('hidden')

    }
    //Checks if remove item btn is clicked
    else if (e.target.dataset.removeBtn) {
        console.log(e.target.dataset.removeBtn)
    }
})

// Function that loops through each menu array data 
function getFeedHtml() {
    let feedHtml = ''

    menuArray.forEach(menu => {
        feedHtml += `
    <div class="menu-item-container">
        <p class="item-emoji">${menu.emoji}</p>
        <div class="item-info-container">
            <h2 class="item-name">${menu.name}</h2>
            <p class="item-ingredients">${menu.ingredients}</p>
            <p class="item-price">$${menu.price}</p>
        </div>
        <div class='add-btn-container'>
            <button class='add-btn' data-add-btn='${menu.id}'>+</btn>
        </div>
    </div>
`
    });
    return feedHtml
}

// Renders html to page
function render() {
    document.getElementById('menu').innerHTML = getFeedHtml()
}
render()



//Matches items added and pushes them to an array
function addItemsToOrder(addBtnId) {
    const addItemBtnObj = menuArray.filter(function (chosenItem) {
        return chosenItem.id == addBtnId
    })[0]
    itemsOrderedArray.push(addItemBtnObj)
    getOrderHtml()
}

// Generate html string based on user selection of items
function getOrderHtml() {
    let orderHtml = '<h2 class="order-title">Your order</h2>'
    if (itemsOrderedArray.length === 0) {
        orderContainer.classList.add('hidden')
    }
    for (let item of itemsOrderedArray) {
        orderHtml += `
        <div class="order-line">
            <h3>${item.name}</h3>
            <p class="remove-btn" data-remove-btn="${item.id}">Remove</p>
            <h3 class="price">$${item.price}</h3>
        </div>
        `
    }
    orderContainer.innerHTML = orderHtml
    getPrice()
}

function renderOrder() {
    document.getElementById('order').innerHTML = getOrderHtml()
}


