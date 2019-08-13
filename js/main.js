let budget = {
    totalAmount: 0,
    totalInc: 0,
    totalExp: 0,
    income: [],
    expenses: []
};

//set Elements

let budVal = document.querySelector('.budget__value');
let IncVal = document.querySelector('.budget__income--value');
let ExpVal = document.querySelector('.budget__expenses--value');

let btn = document.querySelector('.add__btn');

let newDesc = document.querySelector('.add__description');
let newVal = document.querySelector('.add__value');
let IncList = document.querySelector('.income__list');
let ExpList = document.querySelector('.expenses__list');
let select = document.querySelector('.add__type');
let cont = document.querySelector('.add__container');

//setEvents

select.addEventListener('change', (e) => {
    select.classList.toggle('red-focus');
    newDesc.classList.toggle('red-focus');
    newVal.classList.toggle('red-focus');
});


btn.addEventListener('click', function (e) {
    let descValue = newDesc.value;
    let amountValue = newVal.value;

    if (!descValue || !amountValue || Number(amountValue) < 0) return alert('Проверьте вводимые данные');

    if (select.value === 'income') {
        let idNum = budget.income.length;
        const id = `inc-${idNum}`;

        budget.income.push({
            description: descValue,
            amount: amountValue,
            id: id
        })

        const template = addTemplate(id, descValue, newVal);
        IncList.insertAdjacentHTML('beforeend', template);
        
        let btnDelete = document.getElementById(id);
        let closeBtn = btnDelete.querySelector('.ion-ios-close-outline');

        closeBtn.addEventListener('click', function (e) {
            budget.income.splice(idNum, 1);
            budget.totalInc -= Number(amountValue);
            deleteFromView(id,amountValue);
        });
        
        budget.totalInc += Number(amountValue);

    } else {
        let idNum = budget.expenses.length;
        const id = `exp-${idNum}`;

        budget.expenses.push({
            description: descValue,
            amount: amountValue,
            id: id
        })

        const template = addTemplate(id, descValue, newVal);
        ExpList.insertAdjacentHTML('beforeend', template);

        let btnDelete = document.getElementById(id);
        let closeBtn = btnDelete.querySelector('.ion-ios-close-outline');

        closeBtn.addEventListener('click', function (e) {
            budget.expenses.splice(idNum, 1);
            budget.totalExp -= Number(amountValue);
            deleteFromView(id,amountValue);
        });
        
        budget.totalExp += Number(amountValue);
    }


    budget.totalAmount = budget.totalInc - budget.totalExp;

    updateTotal();
    newDesc.value = '';
    newVal.value = '';

});

function deleteFromView(id,amountValue) {
    let itemToDelete = document.getElementById(id);
    let parEl = itemToDelete.parentNode;
    parEl.removeChild(itemToDelete);
    budget.totalAmount = budget.totalInc - budget.totalExp;
    updateTotal();
    

}

function updateTotal() {
    budVal.textContent = budget.totalAmount;
    IncVal.textContent = budget.totalInc;
    ExpVal.textContent = budget.totalExp;
};

function addTemplate(id, incDesc, newVal) {
    return `
    <div class="item clearfix" id="${id}">
    <div class="item__description">${incDesc}</div>
    <div class="right clearfix">
        <div class="item__value">${newVal.value}</div>
        <div class="item__delete">
            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
        </div>
    </div>
</div>`
}


// import { exmpl1 as ex, date } from './exportExmpl';

// const foo = () => console.log('hello world');
// const foo2 = () => 2 + 2;

// ex();
// console.log(date);
// foo();