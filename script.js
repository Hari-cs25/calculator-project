let num1;
let num2;
let operator;
let array=[];
let wishList = '+-×/';
let numericList = '0123456789.';
let trigger;
let operatorPushCount=0;
let temp;
let trashArr=[];

const memoryClearBut=document.querySelector('.memoryClearBut');
const displayRef=document.querySelector('.calculatorDisplay');
const buttons = document.querySelectorAll('.dig');

document.addEventListener('keydown' , show);
function show(event){
 if(wishList.includes(event.key)||numericList.includes(event.key)){
    appendNumber(event.key);
 }
 else if(event.key === 'Enter'){
    equal();
 }
}

function add(num1,num2){
  return num1+num2;
}
function subract(num1,num2){
  return num1-num2;
}
function multiply(num1,num2){
  return num1*num2;
}
function divaide(num1,num2){
  return num1/num2;
}

function operate(num1,operator,num2){
  displayRef.textContent='';
  array =[];
  console.log('operate() array length:',array.length);
  switch(operator){
    case '+':
        return add(num1,num2);
    case '-':
       return subract(num1,num2);
    case '×':
       return multiply(num1,num2);
    case '/':
       return divaide(num1,num2);
  }
}

for (let prop of buttons) {
    prop.addEventListener('click' , ()=>{
      appendNumber(prop.textContent)});
}

function appendNumber(num){
  if(trigger==1){
    
    if(displayRef.textContent ==="error !")
      displayRef.textContent='';
      
    if (!wishList.includes(num)) {
        displayRef.textContent = '';
        array = [];
        operatorPushCount=0;
        array.push(num);
        console.log(array);
        displayRef.textContent += num;
    }
     else{
       displayRef.textContent+=num;
       // PUTTING NUMMBER INTO THE STACK
       array.push(num);
     }
     trigger=0;
}
else{  
    if(wishList.includes(num)){
      if(operatorPushCount == 0){
          operatorPushCount=1;
          array.push(num);
          displayRef.textContent+=num;
      }
      else{
        temp=doComputation();
        if(typeof(temp)=='string'){
          displayRef.textContent=temp;
          array=[];
          operatorPushCount=0;
          trigger=1;
        }
        else{
        array.push(temp);
        array.push(num);
        console.log('after frist pair of strings: ',array)
       displayRef.textContent+=temp;
       displayRef.textContent+=num;
        }
     
      }
    }
    else{
       array.push(num);
      // console.log(array);
       displayRef.textContent+=num;
    }
   }
}

const clearBut=document.querySelector('.clearButton');

clearBut.addEventListener('click' , ()=>{displayRef.textContent=''
       array=[];
       trigger=0;
       console.log('array is cleared!');
       //if(operatorPushCount>0)
       operatorPushCount=0;
});

const equalButton =document.querySelector('.equels');
equalButton.addEventListener('click' , equal);
function equal(){
  trigger=1;
  temp=doComputation();
  if (typeof(temp) == 'string') {
      displayRef.textContent = temp;
      array = [];
      operatorPushCount = 0;
      trigger = 1;
}
  else{
      array.push(temp);
      displayRef.textContent=temp;
      console.log('array aftre equal(): ',array);
}
}

function doComputation(){
  let secondHalf='';
  let popSymbol='';
  let fristHalf='';
  
  for(let i=0 ; i<=array.length-1 ;++i){
    if(!wishList.includes(array[i])){
      secondHalf+=array[i];
    }
    else{
      popSymbol = array[i];
      fristHalf=secondHalf;
      secondHalf='';
    }
  }
  console.log('fristHalf ',fristHalf);
  console.log('secontHalf ',secondHalf);
  console.log('symbol ',popSymbol);
  
  if(popSymbol=='/' && secondHalf=='0'){
    return "error !";
  }
  
 let carrier= operate(parseFloat(fristHalf),popSymbol,parseFloat(secondHalf));

 return Math.round(carrier * 1000)/1000;
}

const deleteButRef=document.querySelector('.deleteBut');

deleteButRef.addEventListener('click' , deleteOneChar);

function deleteOneChar(){
  let temp;
  if(!wishList.includes(array[array.length-1])){
    array.pop();
    temp =array.join('');
    displayRef.textContent=temp;
  }
  else{
    array.pop();
    temp =array.join('');
    if (operatorPushCount == 1)
        operatorPushCount = 0;
    displayRef.textContent=temp;
  }
}

const backBut=document.querySelector('.memoryAddBut');
//backBut.addEventListener('click' , )