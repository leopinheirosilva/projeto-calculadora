const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearAllButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(".previous-operand");
const currentOperandTextElement = document.querySelector(".current-operand");

// Calculator class, handles all calculator operations
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  // Method to append a number to the current operand
  appendNumber(number) {
    // Prevent multiple decimal points
    if (number === "." && this.currentOperand.includes(".")) return;

    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // Method to format the number for display
  formatDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  // Method to perform calculation based on the selected operation
  calculate() {
    let result;

    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    // Operation switch
    switch (this.operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "÷":
        result = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  // Method to choose an operation
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.currentOperand !== "") {
      this.calculate();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  // Method to delete the last character from the current operand
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // Method to clear all operands and operation
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  // Method to show the number on the display
  displayNumber() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(this.previousOperand)}${
      this.operation || ""
    }`;
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand);
  }
}

// Instantiate the Calculator
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// Add event listeners to number buttons
for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.displayNumber();
  });
}

// Add event listeners to operation buttons
for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.displayNumber();
  });
}

// Add event listener to clear button
clearAllButton.addEventListener("click", () => {
  calculator.clear();
  calculator.displayNumber();
});

// Add event listener to equal button
equalButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.displayNumber();
});

// Add event listener to delete button
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.displayNumber();
});
