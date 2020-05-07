
const expenseBtn   = document.querySelector('.tab1');
const incomeBtn    = document.querySelector('.tab2');
const allBtn       = document.querySelector('.tab3');
const dashboardBtn = document.querySelector('.dash-title');
const expense      = document.querySelector('.expense-section');
const income       = document.querySelector('.income-section');
const all          = document.querySelector('.all-section');
const incomeTotal  = document.querySelector('.income-total');
const outcomeTotal  = document.querySelector('.outcome-total');
const balance        = document.querySelector('.balance .value');
const expenseListInAll  = document.querySelector('.expenseListInAll ul');
const incomeListInAll   = document.querySelector('.incomeListInAll ul');



// ***** Dashboard - Buttons - Expense, Income, and All *****
expenseBtn.addEventListener('click', function(){
    active(expenseBtn);
    hide(incomeBtn);
    hide(allBtn);

    expense.style.display = 'block'; // show the content of Expense
    income.style.display = 'none'; // show the content of Income
    all.style.display = 'none'; // show the content of All
})
incomeBtn.addEventListener('click', function(){
    hide(expenseBtn);
    active(incomeBtn);
    hide(allBtn);

    income.style.display = 'block'; // show the content of Income
    expense.style.display = 'none'; // show the content of Expense
    all.style.display = 'none'; // show the content of All
})
allBtn.addEventListener('click', function(){
    hide(expenseBtn);
    hide(incomeBtn);
    active(allBtn);

    all.style.display = 'block'; // show the content of All
    income.style.display = 'none'; // show the content of Income
    expense.style.display = 'none'; // show the content of Expense

    expenseListInAll.innerHTML = expenseContents.map(item => {
        return `<li>- ${item.title} $${item.amount}</li>` ;
    }).join('');

    incomeListInAll.innerHTML = incomeContents.map(item => {
        return `<li>+ ${item.title} $${item.amount}</li>` ;
    }).join('');

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

// Dashboard - Input fields
const expenseItem        = document.getElementById('expense-title-input');
const expenseAmount      = document.getElementById('expense-amount-input');
const incomeItem         = document.getElementById('income-title-input');
const incomeAmount       = document.getElementById('income-amount-input');

// Dashboard - UL 
const expenseList        = document.querySelector('.expenseList');
const incomeList         = document.querySelector('.incomeList');
const allList            = document.querySelector('.allList');

// Dashboard - Input area - Icon - Add
const expenseAddList     = document.getElementById('expenseAddList');
const incomeAddList      = document.getElementById('incomeAddList');

// Dashboard - Icon - Edit, Delete
const expenseEditIcon    = document.querySelector('.expenseEdit');
const expenseDeleteIcon  = document.querySelector('.expenseDelete');
const incomeEditIcon     = document.querySelector('.incomeEdit');
const incomeDeleteIcon   = document.querySelector('.incomeDelete');

// ***** Data management *****
var expenseListHTML = [];    // To store 
var expenseContents = [];    // To store objects( Title, Amount ) from user input

var incomeListHTML  = [];    // To store 
var incomeContents  = [];    // To store objects( Title, Amount ) from user input

var allListHTML     = [];    // To store 
var allContents     = [];    // To store objects( Title, Amount ) from user input

// *** Calculation - total - income, outcome, balance ***
var incomeTotalV = 0;
var outcomeTotalV = 0;


function updateTotalAmount(){

    // income
    incomeTotalV = incomeContents.reduce((sum, content) => {
        return sum += parseFloat(content.amount);
    }, 0)
    
    incomeTotal.innerHTML = '$ ' + incomeTotalV;

    // outcome
    outcomeTotalV = expenseContents.reduce((sum, content) => {
        return sum += parseFloat(content.amount);
    }, 0)
    
    outcomeTotal.innerHTML = '$ ' + outcomeTotalV;

    // balance
    balance.innerHTML = '$ ' + (incomeTotalV - outcomeTotalV);
}


outcomeTotal.innerHTML = '$ ' + outcomeTotalV;

// *** Add Button click ***
expenseAddList.addEventListener('click', function(){

    // Store HTML elements from user in every click
    expenseListHTML.push(`
    
        <li id="${expenseListHTML.length}" class="expense">
            <div class="entryExpense">${expenseItem.value}: $ ${expenseAmount.value}</div>
            <i id='edit' class="fas fa-edit expenseEdit"></i>
            <i id='delete' class="fas fa-trash-alt expenseDelete" style="color: red"></i>
        </li>
    `);

    // Store Object (Title, Amount) from user in every Click
    let content = {
        title : expenseItem.value,
        amount : expenseAmount.value
    }

    expenseContents.push(content)

    
    // Display all collected HTML elements
    expenseList.innerHTML = expenseListHTML.map(item => item).join('');

    // clear user input fields
    expenseItem.value = '';
    expenseAmount.value = '';

    updateTotalAmount()
})

incomeAddList.addEventListener('click', function(){

    // Store HTML elements from user in every click
    incomeListHTML.push(`
    
        <li id="${incomeListHTML.length}" class="income">
            <div class="entryIncome">${incomeItem.value}: $ ${incomeAmount.value}</div>
            <i id='edit' class="fas fa-edit incomeEdit"></i>
            <i id='delete' class="fas fa-trash-alt incomeDelete" style="color: red"></i>
        </li>
    `);

    // Store Object (Title, Amount) from user in every Click
    let content = {
        title : incomeItem.value,
        amount : incomeAmount.value
    }

    incomeContents.push(content)

    
    // Display all collected HTML elements
    incomeList.innerHTML = incomeListHTML.map(item => item).join('');

    // clear user input fields
    incomeItem.value = '';
    incomeAmount.value = '';

    updateTotalAmount()
})


// *** Edit or Delete button click ***
var expenseEntry = ''; // clicked html
expenseList.addEventListener('click', (e) => {
    
    // Get LI tag selected by clicking delete icon
    const targetBtn = e.target;
    expenseEntry = targetBtn.parentNode;
    console.log(expenseEntry)

    if(targetBtn.id == 'edit'){ // edit

        // Get selected LI and then get DIV in the LI tag and then switch it into edit mode
        let entryField = document.getElementById(`${expenseEntry.id}`).childNodes;
        editModeExpense();
        

        document.getElementById('expense-title-input').value = expenseContents[expenseEntry.id].title;
        document.getElementById('expense-amount-input').value = expenseContents[expenseEntry.id].amount;

        switchIconsForAddOrEdit('expenseAddList'); // AddIcon <-> ChangeIcon
        
        updateTotalAmount()
    }
    if(targetBtn.id == 'delete'){ // delete

        // Remove selected item from Object Array
        expenseContents.splice(expenseEntry.id, 1);

        expenseReAssginLIToDashboard();

        updateTotalAmount()
    }


});

var incomeEntry = ''; // clicked html
incomeList.addEventListener('click', (e) => {
    
    // Get LI tag selected by clicking delete icon
    const targetBtn = e.target;
    incomeEntry = targetBtn.parentNode;
    console.log(incomeEntry)

    if(targetBtn.id == 'edit'){ // edit

        // Get selected LI and then get DIV in the LI tag and then switch it into edit mode
        let entryField = document.getElementById(`${incomeEntry.id}`).childNodes;
        editModeIncome();
        

        document.getElementById('income-title-input').value = incomeContents[incomeEntry.id].title;
        document.getElementById('income-amount-input').value = incomeContents[incomeEntry.id].amount;

        switchIconsForAddOrEdit('incomeAddList'); // AddIcon <-> ChangeIcon

        updateTotalAmount()
        
    }
    if(targetBtn.id == 'delete'){ // delete

        // Remove selected item from Object Array
        incomeContents.splice(incomeEntry.id, 1);

        incomeReAssginLIToDashboard();

        updateTotalAmount()
    }


});


// *** Change icon clicked ***
let expenseEditList = document.getElementById('expenseEditList');

expenseEditList.addEventListener('click', () => {

    expenseContents[expenseEntry.id].title  = expenseItem.value;
    expenseContents[expenseEntry.id].amount = expenseAmount.value;

    // Update dashboard
    updateExpenseDashboard()

    switchIconsForAddOrEdit('expenseEditList'); // AddIcon <-> ChangeIcon

    // clear user input fields
    expenseItem.value = '';
    expenseAmount.value = '';

    updateTotalAmount()
    
});

let incomeEditList = document.getElementById('incomeEditList');

incomeEditList.addEventListener('click', () => {

    incomeContents[incomeEntry.id].title  = incomeItem.value;
    incomeContents[incomeEntry.id].amount = incomeAmount.value;

    // Update dashboard
    updateIncomeDashboard();

    switchIconsForAddOrEdit('incomeEditList'); // AddIcon <-> ChangeIcon

    // clear user input fields
    incomeItem.value = '';
    incomeAmount.value = '';

    updateTotalAmount()
});


// color background effect indicating edit mode
function editModeExpense(){
    let element = document.querySelector('.entryExpense');
    element.classList.add('editModeExpense');
}
function editModeIncome(){
    let element = document.querySelector('.entryIncome');
    element.classList.add('editModeIncome');
}

// *** Update dashboard when edited ***
function updateExpenseDashboard(){

    // Clear all elements of the HTML Array
    expenseListHTML = [];
    
     // Re-assign LI element with new index number
     expenseContents.map((content, index) => {
 
         expenseListHTML.push(`
         
             <li id="${index}" class="expense">
                 <div class="entryExpense">${content.title}: $ ${content.amount}</div>
                 <i id='edit' class="fas fa-edit expenseEdit"></i>
                 <i id='delete' class="fas fa-trash-alt expenseDelete" style="color: red"></i>
             </li>
         `);
 
     })
 
     // Display HTML elements
     expenseList.innerHTML = expenseListHTML.map(item => item).join('');
}

function updateIncomeDashboard(){

    // Clear all elements of the HTML Array
    incomeListHTML = [];
    
     // Re-assign LI element with new index number
     incomeContents.map((content, index) => {
 
         incomeListHTML.push(`
         
             <li id="${index}" class="income">
                 <div class="entryIncome">${content.title}: $ ${content.amount}</div>
                 <i id='edit' class="fas fa-edit incomeEdit"></i>
                 <i id='delete' class="fas fa-trash-alt incomeDelete" style="color: red"></i>
             </li>
         `);
 
     })
 
     // Display HTML elements
     incomeList.innerHTML = incomeListHTML.map(item => item).join('');
}

// Update dashboard when deleted
function expenseReAssginLIToDashboard(){

     // Clear all elements of the HTML Array
     expenseListHTML = [];
    
     // Re-assign LI element with new index number
     expenseContents.map((content, index) => {
 
         expenseListHTML.push(`
         
             <li id="${index}" class="expense">
                 <div class="entryExpense">${content.title}: $ ${content.amount}</div>
                 <i id='edit' class="fas fa-edit expenseEdit"></i>
                 <i id='delete' class="fas fa-trash-alt expenseDelete" style="color: red"></i>
             </li>
         `);
 
     })
 
     // Display HTML elements
     expenseList.innerHTML = expenseListHTML.map(item => item).join('');
}

function incomeReAssginLIToDashboard(){

     // Clear all elements of the HTML Array
     incomeListHTML = [];
    
     // Re-assign LI element with new index number
     incomeContents.map((content, index) => {
 
         incomeListHTML.push(`
         
             <li id="${index}" class="income">
                 <div class="entryIncome">${content.title}: $ ${content.amount}</div>
                 <i id='edit' class="fas fa-edit incomeEdit"></i>
                 <i id='delete' class="fas fa-trash-alt incomeDelete" style="color: red"></i>
             </li>
         `);
 
     })
 
     // Display HTML elements
     incomeList.innerHTML = incomeListHTML.map(item => item).join('');
}

// Icon display ( Add <-> Change)
function switchIconsForAddOrEdit(type){

    let expenseAddIcon = document.getElementById('expenseAddList');
    let expenseEditIcon = document.getElementById('expenseEditList');
    let incomeAddIcon = document.getElementById('incomeAddList');
    let incomeEditIcon = document.getElementById('incomeEditList');

        if(type == 'expenseAddList'){
            expenseAddIcon.classList.add('hideAddIcon')
            expenseEditIcon.classList.add('showEditIcon')
            expenseAddIcon.classList.remove('showAddIcon')
        }
        if(type == 'expenseEditList'){

            expenseEditIcon.classList.add('hideEditIcon')
            expenseEditIcon.classList.remove('showEditIcon')
            expenseAddIcon.classList.add('showAddIcon')
        }
        if(type == 'incomeAddList'){
            incomeAddIcon.classList.add('hideAddIcon')
            incomeEditIcon.classList.add('showEditIcon')
            incomeAddIcon.classList.remove('showAddIcon')
        }
        if(type == 'incomeEditList'){

            incomeEditIcon.classList.add('hideEditIcon')
            incomeEditIcon.classList.remove('showEditIcon')
            incomeAddIcon.classList.add('showAddIcon')
        }
       

      
}



