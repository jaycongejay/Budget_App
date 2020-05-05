
const expenseBtn = document.querySelector('.tab1');
const incomeBtn = document.querySelector('.tab2');
const allBtn = document.querySelector('.tab3');
const dashboardBtn = document.querySelector('.dash-title');

expenseBtn.addEventListener('click', function(){
    active(expenseBtn);
})
incomeBtn.addEventListener('click', function(){
    active(incomeBtn);
})
allBtn.addEventListener('click', function(){
    active(allBtn);
})

dashboardBtn.addEventListener('click', function(){
    hide(expenseBtn);
    hide(incomeBtn);
    hide(allBtn);
})




function active(element){
    element.classList.add('activeToggle')
}
function hide(element){
    element.classList.remove('activeToggle')
}


const item = document.getElementById('income-title-input');
const amount = document.getElementById('income-amount-input');
const list = document.querySelector('.list');
const deleteItem = document.querySelector('.list #delete');
const add = document.getElementById('addList');

var listItems = [];    // To store 
var itemContents = []; // To store objects( Title, Amount ) from user input


// Add user inputs
add.addEventListener('click', function(){

    // Store HTML elements from user in every click
    listItems.push(`
    
        <li id="${listItems.length}" class="income">
            <div class="entry">${item.value}: $ ${amount.value}</div>
            <i class="fas fa-edit"></i>
            <i class="fas fa-trash-alt" style="color: red"></i>
        </li>
    `);

    // Store Object (Title, Amount) from user in every Click
    let content = {
        title : item.value,
        amount : amount.value
    }

    itemContents.push(content)

    
    // Display all collected HTML elements
    list.innerHTML = listItems.map(item => item).join('');

    // clear user input fields
    item.value = '';
    amount.value = '';

    localStorage.setItem('title', content.title);
    localStorage.setItem('amount', content.amount);

    console.log(localStorage.getItem('title'));
    console.log(localStorage.getItem('amount'));
})


// Delete selected item and update the display
list.addEventListener('click', (e) => {
    
    // Get LI tag selected by clicking delete icon
    const targetBtn = e.target;
    const entry = targetBtn.parentNode;


    // Remove selected item from Object Array
    itemContents.splice(entry.id, 1);
    // Clear all elements of the HTML Array
    listItems = [];

    // Re-assign LI element with new index number
    itemContents.map((content, index) => {

        listItems.push(`
        
            <li id="${index}" class="income">
                <div class="entry">${content.title}: $ ${content.amount}</div>
                <i class="fas fa-edit"></i>
                <i class="fas fa-trash-alt" style="color: red"></i>
            </li>
        `);

    })

    // Display HTML elements
    list.innerHTML = listItems.map(item => item).join('');

})
