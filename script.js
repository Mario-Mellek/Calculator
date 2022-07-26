//Global variables
const SCREEN= document.getElementById('screen');
const BUTTONS = document.getElementById('buttons');
const EQUALS =document.querySelector('.equals');
const OPERATORS= document.querySelectorAll('#operators')[0];
const CURRENT= document.getElementsByClassName('current')[0];
const PAST = document.getElementsByClassName('past')[0];
const DELETE= document.querySelector('#delete');
const CLEAR= document.querySelector('#clear');
const save= document.getElementsByClassName('save')[0];
const RESULTS= document.querySelector('.results');
const SAVED_OUTPUT= document.querySelector('.output');
let OPERANT=0;
let FIRST=0;
let SECOND=0;
let INPUT='';
let INPUT2= '';
let OUTPUT;

//First Input value
function input1(){
BUTTONS.addEventListener('click',firstValue=(e)=>{
    const buttonValue = e.target.value;
    if(!buttonValue) return;
    if(buttonValue === '.' && FIRST.toString().includes('.')){
        const warning= document.createElement('span');
        warning.innerText= 'Only One Decimal point is allowed';
        SCREEN.appendChild(warning);
        setTimeout(() => {
            warning.style.display='none';
        }, 2500);
    }else{
        INPUT= buttonValue;
        update();
    };
});
};

//Updating the screen with first Input.
function update(InputedNumber){
    InputedNumber=parseFloat(CURRENT.innerText+= INPUT);
    INPUT=InputedNumber;
    return FIRST=INPUT;
};

//Selecting an Operator
OPERATORS.addEventListener('click',(e)=>{
    if(SECOND){
        equal();
    };
    OPERANT= e.target.classList.value;
    CURRENT.innerText='';
    switch (OPERANT) {
        case 'multiply':
            OPERANT= ' x ';
            break;
        case 'divide':
            OPERANT= ' ÷ ';
            break;
        case 'subtract':
            OPERANT= ' - ';
            break;
        case 'add':
            OPERANT= ' + ';
            break;
    };
    PAST.innerText= FIRST+OPERANT;
    input2();
});

//Second Input value
function input2(){
    BUTTONS.removeEventListener('click', firstValue);
    BUTTONS.addEventListener('click',secondValue=(e)=>{
        const buttonValue = e.target.value;
        if(!buttonValue) return;
        if(buttonValue === '.' && SECOND.toString().includes('.')){
            const warning= document.createElement('span');
            warning.innerText= 'Only One Decimal point is allowed';
            SCREEN.appendChild(warning);
            setTimeout(() => {
            warning.style.display='none';
            }, 2500);
        }else{
            INPUT2= buttonValue;
            update2();
        };
    });
};

//Updating the screen with second Input.
function update2(InputedNumber){
    InputedNumber=parseFloat(CURRENT.innerText+= INPUT2);
    INPUT2=InputedNumber;
    return SECOND=INPUT2;
};

//Equal button function.
EQUALS.addEventListener('click', equal);

function equal(){
    if(!FIRST && !SECOND){
        const equalWarning = document.createElement('span');
        equalWarning.innerText=`Unable to Operate`;
        SCREEN.appendChild(equalWarning);
        setTimeout(() => {
            equalWarning.style.display='none';
        }, 2500);
        return;
    };
    BUTTONS.removeEventListener('click', secondValue);
    CURRENT.innerText = calculator();
    if (OUTPUT == 'Infinity'){
        PAST.innerText='';
        CURRENT.innerText='';
        FIRST=0;
        SECOND=0;
        OPERANT='';
        OUTPUT='';   
        const infinityWarning = document.createElement('span');
        infinityWarning.innerText=`Zero has no multiplicative inverse`;
        SCREEN.appendChild(infinityWarning);
        setTimeout(() => {
            infinityWarning.style.display='none';
        }, 2500);
        input1();
    }else{
        PAST.innerText = FIRST + OPERANT + SECOND;
        FIRST = OUTPUT;
        SECOND = 0;
        save.classList.add('saved');
        setTimeout(() => {
            save.classList.remove('saved');
            save.classList.remove('selected');
        }, 5000);
        input1();
    };
};

//Calculating function.
function calculator() {
    switch (OPERANT) {
        case ' + ':
            OUTPUT= FIRST+SECOND;
            break;
        case ' - ':
            OUTPUT= FIRST-SECOND;
            break;
        case ' x ':
            OUTPUT= FIRST*SECOND;
            break;
        case ' ÷ ':
            OUTPUT= FIRST/SECOND;
            break;
    };
    return OUTPUT.toLocaleString('en-US');
};

//Delete the last number
DELETE.addEventListener('click',()=>{
    if(!OPERANT && CURRENT.innerText){
        const deleted= FIRST.toString().slice(0,-1);
        FIRST= parseFloat(deleted);
        CURRENT.innerText = deleted;
        return FIRST;
    }else if(OPERANT && CURRENT.innerText){
        const deleted= SECOND.toString().slice(0,-1);
        SECOND= parseFloat(deleted);
        CURRENT.innerText = deleted;
        return SECOND;
    }else{
        const deleteWarning = document.createElement('span');
        deleteWarning.innerText='Nothing to Delete';
        SCREEN.appendChild(deleteWarning);
        setTimeout(() => {
            deleteWarning.style.display='none';
        }, 2500);
    };
});

//clear the screen
CLEAR.addEventListener('click',()=>{
    if(!CURRENT.innerText && !PAST.innerText){
        const clearWarning = document.createElement('span');
        clearWarning.innerText='Nothing to Clear';
        SCREEN.appendChild(clearWarning);
        setTimeout(() => {
            clearWarning.style.display='none';
        }, 2500);
    }else if(OUTPUT || OUTPUT === 0){
        PAST.innerText='';
        CURRENT.innerText='';
        FIRST=0;
        SECOND=0;
        OPERANT='';
        OUTPUT='';
    }else if(!OUTPUT){
        equal();
        PAST.innerText='';
        CURRENT.innerText='';
        FIRST=0;
        SECOND=0;
        OPERANT='';
        OUTPUT='';
    };
});

//Save button functionality and visibility.
save.addEventListener('click', ()=>{
    if (OUTPUT){
        save.classList.add('selected');
        let savedOUTPUT= document.createElement('li');
        savedOUTPUT.innerText= OUTPUT.toLocaleString('en-US');
        RESULTS.appendChild(savedOUTPUT);
    }else{
        const saveWarning= document.createElement('span');
        saveWarning.innerText= 'Unable to Save. (No value)';
        SCREEN.appendChild(saveWarning);
        setTimeout(() => {
            saveWarning.style.display='none';
        }, 2500);
    };
});

//Expanding and shrinking the results board.
SAVED_OUTPUT.addEventListener('click', ()=>{
    RESULTS.classList.toggle('results');
});

//Highlighting selected buttons.
BUTTONS.addEventListener('click',highligh=(e)=>{
    let pressed= e.target;
    pressed.classList.add('highlight');
    setTimeout(() => {
        pressed.classList.remove('highlight');
    }, 250);
});
OPERATORS.addEventListener('click',highligh);

input1();