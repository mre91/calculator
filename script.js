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
    while (operations.length > 0) {
        for (i=0; i<operations.length; i++) {
            if (operations[i] == 'x') {
                values[i] = multiply(values[i], values[i+1])
                values.splice(i+1, 1)
                operations.splice(i, 1)
            }
        }
        for (i=0; i<operations.length; i++) {
            if (operations[i] == '÷') {
                values[i] = divide(values[i], values[i+1])
                values.splice(i+1, 1)
                operations.splice(i, 1)
            }
        }
        for (i=0; i<operations.length; i++) {
            if (operations[i] == '+') {
                values[i] = add(values[i], values[i+1])
                values.splice(i+1, 1)
                operations.splice(i, 1)
            }
        }
        for (i=0; i<operations.length; i++) {
            if (operations[i] == '-') {
                values[i] = subtract(values[i], values[i+1])
                values.splice(i+1, 1)
                operations.splice(i, 1)
            }
        }
    }
    result = values[0]
    values.shift()
}

function backspace() {
    let newDisplay = document.getElementById('currentDisplay').innerText.toString().slice(0, -1)
    clearCurrentDisplay()
    setCurrentDisplay(newDisplay)
}

let values = []
let operations = []
let result = 0
let newEquation = false
let numbers = document.querySelectorAll('[data-number]')
let operators = document.querySelectorAll('[data-operation]')
let clear = document.querySelector('[data-clear]')
let decimalPresent = false

for (i=0; i<numbers.length; i++) {
    numbers[i].addEventListener('click', function (event) {
        if (newEquation === true) {
            newEquation = false;
            clearCurrentDisplay()
        }
        if (this.id == '.' && decimalPresent === true) {
            return
        } else if (this.id == '.') {
            setCurrentDisplay(this.id)
            decimalPresent = true
        } else {
            setCurrentDisplay(this.id)
        }
    })
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
                setCurrentDisplay(Math.round(result * 1000000000) / 1000000000);
            } else {
                setCurrentDisplay(result)
            }
            result = 0
            newEquation = true
        } else if (this.id == 'del') {
            backspace()
        } else {
            if (newEquation === true) {
                newEquation = false
                clearCurrentDisplay()
            }
            values.push(parseFloat(document.getElementById('currentDisplay').innerText))
            operations.push(this.id)
            setPreviousDisplay(document.getElementById('currentDisplay').innerText)
            setPreviousDisplay(this.id)
            clearCurrentDisplay()
        }
        decimalPresent = false
    })
}

clear.addEventListener('click', () => {
    clearCurrentDisplay()
    clearPreviousDisplay()
})