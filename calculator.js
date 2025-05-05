class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = parseFloat(computation.toFixed(10))
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        if (number == null || number === '') return ''
        const [integer, decimal] = number.toString().split('.')
        const integerDisplay = Number(integer).toLocaleString('en')
        if (decimal != null) {
            return `${integerDisplay}.${decimal}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        const currentDisplay = this.getDisplayNumber(this.currentOperand)
        if (this.currentOperandTextElement.innerText !== currentDisplay) {
            this.currentOperandTextElement.innerText = currentDisplay
        }

        if (this.operation != null) {
            const previousDisplay = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
            if (this.previousOperandTextElement.innerText !== previousDisplay) {
                this.previousOperandTextElement.innerText = previousDisplay
            }
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

    roundCurrent() {
        if (this.currentOperand === '') return
        this.currentOperand = Math.round(parseFloat(this.currentOperand)).toString()
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-allClear]');
const previousOperandTextElement = document.querySelector('[data-previousOperand]');
const currentOperandTextElement = document.querySelector('[data-currentOperand]');
const roundButton = document.querySelector('[data-round]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

roundButton.addEventListener('click', () =>{
    calculator.roundCurrent()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

window.addEventListener('keydown', (e) => {

    const key = e.key

        if (!isNaN(parseFloat(key))) {
            calculator.appendNumber(key)
            calculator.updateDisplay()
        } else if (key === '.' || key === ',') {
            calculator.appendNumber('.')
            calculator.updateDisplay()
        } else if (key === '+' || key === '-') {
            calculator.chooseOperation(key)
            calculator.updateDisplay()
        } else if (key === '*' || key === 'x' || key === 'X') {
            calculator.chooseOperation('×')
            calculator.updateDisplay()
        } else if (key === '/') {
            e.preventDefault()
            calculator.chooseOperation('÷')
            calculator.updateDisplay()
        } else if (key === 'Enter' || key === '=') {
            calculator.compute()
            calculator.updateDisplay()
        } else if (key === 'Backspace') {
            calculator.delete()
            calculator.updateDisplay()
        } else if (key.toLowerCase() === 'c' || key === 'Escape') {
            calculator.clear()
            calculator.updateDisplay()
        }

})
