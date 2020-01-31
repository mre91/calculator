function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}

function setCurrentDisplay(currentValue) {
    document.getElementById('currentDisplay').innerText += currentValue
}

function setPreviousDisplay(previousValue) {
    document.getElementById('previousDisplay').innerText += previousValue
}

function clearCurrentDisplay() {
    document.getElementById('currentDisplay').innerText = ''
}

function clearPreviousDisplay() {
    document.getElementById('previousDisplay').innerText = ''
}

function evaluate(values, operations) {
    result = values[0]
    values.shift()
    while (values.length > 0) {
        if (operations[0] == '+') {
            result = add(result, values[0])
            values.shift()
            operations.shift()
        } else if (operations[0] == '-') {
            result = subtract(result, values[0])
            values.shift()
            operations.shift()
        } else if (operations[0] == 'x') {
            result = multiply(result, values[0])
            values.shift()
            operations.shift()
        } else if (operations[0] == '/') {
            result = divide(result, values[0])
            values.shift()
            operations.shift()
        }
    }
}

let values = []
let operations = []
let result = 0
let newEquation = false
let numbers = document.querySelectorAll('[data-number]')
let operators = document.querySelectorAll('[data-operation]')

for (i=0; i<numbers.length; i++) {
    numbers[i].addEventListener('click', function (event) {
        if (newEquation === true) {
            newEquation = false;
            clearCurrentDisplay()
        }
        setCurrentDisplay(this.id)
    }); 
}

for (i=0; i<operators.length; i++) {
    operators[i].addEventListener('click', function (event) {
        if (document.getElementById('currentDisplay').innerText === '') return
        if (this.id == '=') {
            values.push(parseFloat(document.getElementById('currentDisplay').innerText))
            evaluate(values, operations)
            clearCurrentDisplay()
            clearPreviousDisplay()
            if (result % 1 != 0) {
                setCurrentDisplay(Math.round(result * 1000) / 1000);
            } else {
                setCurrentDisplay(result)
            }
            result = 0;
            newEquation = true;
        } else if (this.id == 'c') {
            clearCurrentDisplay()
            clearPreviousDisplay()
        } else {
            if (newEquation === true) {
                newEquation = false;
                clearCurrentDisplay()
            }
            values.push(parseFloat(document.getElementById('currentDisplay').innerText))
            operations.push(this.id)
            setPreviousDisplay(document.getElementById('currentDisplay').innerText)
            setPreviousDisplay(this.id)
            clearCurrentDisplay()
        }
    }); 
}