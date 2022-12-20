//menu array data file
import { menuArray } from './data.js'

let itemsOrderedArray = []
const payForm = document.getElementById('pay-form')

//Listens for clicks on entire document
document.addEventListener('click', function (e) {
    //Checks if add item btn is clicked
    if (e.target.dataset.addItem) {
        getItemsChosen(e.target.dataset.addItem)
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
        //returns user to order page
        goBack()
        renderChosenItems()
    }
})

// Loops through each item menu array data 
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


// Renders menu items html to page
function renderFeedHtml() {
    document.getElementById('menu').innerHTML = getFeedHtml()
}
renderFeedHtml()



//Gets and pushes items that user chooses to an array
function getItemsChosen(items) {
    const targetItemObj = menuArray.filter(chosenItem => {
        return chosenItem.id == items
    })[0]
    document.getElementById('order').classList.remove('hidden')
    itemsOrderedArray.push(targetItemObj)
    renderChosenItems()
}

//Removes items chosen by user
function removeItemsFromOrder(items) {
    const targetItemObj = menuArray.filter(chosenItem => {
        return chosenItem.id == items
    })
    itemsOrderedArray.shift(targetItemObj)
    renderChosenItems()
}


//Renders html based on user selection of items
function renderChosenItems() {
    let orderHtml = '<h2 class="order-title">Your Order</h2>'
    if (itemsOrderedArray.length === 0) {
            //If there are zero items on order, display hides
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

//Returns user to order page
function goBack() {
    document.getElementById('modal').style.display = 'none'
}

//Prevents user from adding or removing items while pay modal is displayed
function disableButtons(){
    document.getElementById('add-item').disabled = true;
    let orderHtml = '<h2 class="order-title">Your Order</h2>'
    //If no items added, your order container is hidden
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
    //Thanks user for ordering
    setTimeout(() => {
        document.getElementById('modal').innerHTML = `
        <div class = "payment-loading">
        <h2 class="modal-title">Finished!</h2>

        <p class='modal-text'><span class='user-name'>${fullName}</span>, your order is on the way!
        <span class='car'> 🚘</span></p>
        </div>
        `
    }, 2500);
    //Refreshes page after order completion
    setTimeout(() => {
        window.location.reload()

    }, 6000);
})
