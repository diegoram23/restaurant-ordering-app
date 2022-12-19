//menu array data file
import { menuArray } from './data.js'

let itemsOrderedArray = []
const payForm = document.getElementById('pay-form')
const removeItem = document.getElementById('removeItem')

//Listens for clicks on entire document
document.addEventListener('click', function (e) {
    //Checks if add item btn is clicked
    if (e.target.dataset.addItem) {
        addItemsToOrder(e.target.dataset.addItem)
    }
    //Checks if remove item btn is clicked
    else if (e.target.dataset.removeItem) {
        removeItemsFromOrder(e.target.dataset.removeItem)
    }

    else if (e.target.id === 'order-now') {
        finishOrder()
        //Prevents user from adding or removing items while pay modal present
        disableButtons()
    }

    else if (e.target.id === 'go-back') {
        goBack()
        getOrderHtml()
    }
})

// Loops through each menu array data 
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
        <div class='add-item-container'>
            <button class='add-item' id='add-item' data-add-item='${menu.id}'>+</btn>
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

//Removes each item clicked by user
function removeItemsFromOrder(items) {
    const targetItemObj = menuArray.filter(chosenItem => {
        return chosenItem.id == items
    })
    //If user removes all items from order, order display hides
    itemsOrderedArray.shift(targetItemObj)
    getOrderHtml()
}


//Generates html string based on user selection of items
function getOrderHtml() {
    let orderHtml = '<h2 class="order-title">Your Order</h2>'
    if (itemsOrderedArray.length === 0) {
        document.getElementById('order').classList.add('hidden')
    }
    for (let item of itemsOrderedArray) {
        orderHtml += `
        <div class="order-line">
            <h3 class="order-selected">${item.name}</h3>
            <p class="remove-item" id="remove-item" data-remove-item="${item.id}">Remove</p>
            <h3 class="price">$${item.price}</h3>
        </div>
        `
    }
    document.getElementById('order').innerHTML = orderHtml
    renderPrice()
}

//Renders total price of items selected by user
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

//Takes user to pay modal
function finishOrder() {
    document.getElementById('modal').style.display = 'inline'
}

//Prevents user from adding or removing items while pay modal is displayed
function disableButtons(){
    document.getElementById('add-item').disabled = true;
    let orderHtml = '<h2 class="order-title">Your Order</h2>'
    if (itemsOrderedArray.length === 0) {
        document.getElementById('order').classList.add('hidden')
    }
    for (let item of itemsOrderedArray) {
        orderHtml += `
        <div class="order-line">
            <h3 class="order-selected">${item.name}</h3>
            <h3 class="price">$${item.price}</h3>
        </div>
        `
    }
    document.getElementById('order').innerHTML = orderHtml
    renderPrice()
}

//Completes purchase and submits user information
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
        <p class='modal-text'>Processing your order...</p>
        </div>
    `
    setTimeout(() => {
        document.getElementById('modal').innerHTML = `
        <div class = "payment-loading">
        <h2 class="modal-title">Finished!</h2>

        <p class='modal-text'><span class='user-name'>${fullName}</span>, your order is on the way!
        <span class='car'> 🚘</span></p>
        </div>
        `
    }, 2500);

    setTimeout(() => {
        window.location.reload()

    }, 6000);
})

//Returns user to order page
function goBack() {
    document.getElementById('modal').style.display = 'none'
}