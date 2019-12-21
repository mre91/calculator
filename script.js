function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    if (operator == '+') {
        return add(num1, num2);
    } else if (operator == '-') {
        return subtract(num1, num2);
    } else if (operator == '*') {
        return multiply(num1, num2);
    } else if (operator == '/') {
        return divide(num1, num2);
    } else {
        return 'unrecognized operator';
    }
}

function populateDisplay(num) {
    if (num == 'c') {
        document.getElementById('display').innerText = '';
    } else if (num == '=') {
        
    } else {
        document.getElementById('display').innerText += num;
    }
}

let numbers = document.getElementsByClassName('number');
let operators = document.getElementsByClassName('operator');
for (i=0; i<numbers.length; i++) {
    numbers[i].addEventListener('click', function (event) {
        let num = this.id;
        populateDisplay(num);
      }); 
}
for (i=0; i<operators.length; i++) {
    operators[i].addEventListener('click', function (event) {
        let oper = this.id;
        populateDisplay(oper);
      }); 
}