//menu array data file
import { menuArray } from './data.js'

let itemsOrderedArray = []
const payForm = document.getElementById('pay-form')

//Listens for clicks on entire document
document.addEventListener('click', function (e) {
    //Checks if add item btn is clicked
    if (e.target.dataset.addBtn) {
        addItemsToOrder(e.target.dataset.addBtn)
    }
    //Checks if remove item btn is clicked
    else if (e.target.dataset.removeBtn) {
        removeItemsFromOrder(e.target.dataset.removeBtn)
    }

    else if (e.target.id === 'order-now') {
        finishOrder()
    }

    else if (e.target.id === 'go-back') {
        goBack()
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
function addItemsToOrder(items) {
    const targetItemObj = menuArray.filter(chosenItem => {
        return chosenItem.id == items
    })[0]
    document.getElementById('order').classList.remove('hidden')
    itemsOrderedArray.push(targetItemObj)
    getOrderHtml()
}

//Function that removes each item clicked by user
function removeItemsFromOrder(items) {
    const targetItemObj = menuArray.filter(chosenItem => {
        return chosenItem.id == items
    })
    //If user removes all items from order, order display hides
    itemsOrderedArray.shift(targetItemObj)
    getOrderHtml()
}


// Generate html string based on user selection of items
function getOrderHtml() {
    let orderHtml = '<h2 class="order-title">Your Order</h2>'
    if (itemsOrderedArray.length === 0) {
        document.getElementById('order').classList.add('hidden')
    }
    for (let item of itemsOrderedArray) {
        orderHtml += `
        <div class="order-line">
            <h3 class="order-selected">${item.name}</h3>
            <p class="remove-btn" data-remove-btn="${item.id}">Remove</p>
            <h3 class="price">$${item.price}</h3>
        </div>
        `
    }
    document.getElementById('order').innerHTML = orderHtml
    renderPrice()
}

//Function renders total price of items selected by user
function renderPrice() {
    let totalPrice = 0
    let totalHtml = ''
    for (let item of itemsOrderedArray) {
        totalPrice += item.price
        totalHtml = `
        <div class="price-line">
            <h3 class="price-title">Total price:</h3>
            <h3 class="total-price">$${totalPrice}</h3>
        </div>
        <div id="order-now">
        <!--Pay for order elements here-->
        <button class="order-now" id="order-now" data-order-now="order-now">Order Now</button>
    </div>
        `
    }
    document.getElementById('order-total').innerHTML = totalHtml
}

//Function takes user to pay modal
function finishOrder() {
    document.getElementById('modal').style.display = 'inline'
}

//Function that completes purchase and submits user information
payForm.addEventListener('submit', function(e) {
    //prevents default submit behavior
    e.preventDefault()

    //Gathers name of user to later render
    const userFormData = new FormData(payForm)
    const fullName = userFormData.get('fullName')

    //Changes display on modal once user submits
    document.getElementById("modal").innerHTML =
    `
        <div class = "payment-loading">
        <h2 class="modal-title">Almost Done!</h2>
        <p class='moda-text'>Gathering your information</p>
        </div>
    `
    setTimeout(() => {
        document.getElementById('modal').innerHTML = `
        <div class = "payment-loading">
        <h2 class="modal-title">Finished!</h2>

        <p class='modal-text'>Thank you for your purchase</p>
        </div>
        `
    }, 2500);
    
})

//Function returns user to order page
function goBack() {
    document.getElementById('modal').style.display = 'none'
}