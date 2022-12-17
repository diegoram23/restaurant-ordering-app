//menu array data file
import { menuArray } from './data.js'



//Listens for clicks on entire document
document.addEventListener('click', function (e) {
    //Checks if add item btn is clicked
    if (e.target.dataset.addBtn) {
        handleAddBtn(e.target.dataset.addBtn)
    }
    //Checks if remove item btn is clicked
    else if (e.target.dataset.removeBtn){
        console.log(e.target.dataset.removeBtn)
    }
})

//Matches addBtn clicked to correct item
function handleAddBtn(addBtnId) {
    const btnObj = menuArray.filter(function (menu) {
        return menu.id === addBtnId
    })[0]
    console.log(btnObj)
}

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
            <p class="item-price">${menu.price}</p>
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