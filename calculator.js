const calculation = document.getElementById("calculation");
const subtotal = document.getElementById("subtotal");

const numbers = Array(10).fill();
numbers.forEach((number, index) => {
  number = document.getElementById(`key-${index}`);
  number.onclick = function (e) {
    calculation.textContent += index;

    const isValidOperation = calculation.textContent.length > 2;
    if (isValidOperation) {
      subtotal.textContent = calculateOperation(calculation.textContent);
    }
  };
});

const dot = document.getElementById("key-dot");
dot.onclick = function (e) {
  const isLastOneADot = calculation.textContent.slice(-1) === ".";
  if (!isLastOneADot) {
    calculation.textContent += ".";
  }
};

const fullCleaner = document.getElementById(`full-cleaner`);
fullCleaner.onclick = function (e) {
  calculation.textContent = "";
  subtotal.textContent = "";
};
const simpleCleaner = document.getElementById(`simple-cleaner`);
simpleCleaner.onclick = function (e) {
  calculation.textContent = calculation.textContent.slice(0, -1);

  const isValidOperation = calculation.textContent.length > 2;
  if (isValidOperation) {
    subtotal.textContent = calculateOperation(calculation.textContent);
  } else {
    subtotal.textContent = "";
  }
};

const operations = Array(4).fill();

operations.forEach((operation, index) => {
  operation = document.getElementById(`operation-${index}`);
  const typeOperation = operation.textContent;

  operation.onclick = function (e) {
    const calculationIsEmpty = !calculation.textContent.length;
    const lastOneIsNumber = Number.isInteger(
      Number(calculation.textContent.slice(-1))
    );
    const firstIsNegative =
      calculation.textContent.length === 1 && calculation.textContent === "-";
    const lastOneIsMultiplyDivide =
      calculation.textContent.slice(-1) === "*" ||
      calculation.textContent.slice(-1) === "/";
    const operationIsSubtract = typeOperation === "-";
    const lastTwoAreOperands =
      !lastOneIsNumber &&
      !Number.isInteger(Number(calculation.textContent.slice(-2, -1)));

    if (!calculationIsEmpty) {
      if (lastOneIsNumber) {
        calculation.textContent += typeOperation;
      } else if (!firstIsNegative) {
        if (lastOneIsMultiplyDivide && operationIsSubtract) {
          calculation.textContent += "−";
        } else if (lastTwoAreOperands) {
          calculation.textContent =
            calculation.textContent.slice(0, -2) + typeOperation;
        } else {
          calculation.textContent =
            calculation.textContent.slice(0, -1) + typeOperation;
        }
      }
    } else if (typeOperation === "−") {
      calculation.textContent = "−";
    }
  };
});

const equal = document.getElementById(`equal`);
equal.onclick = function (e) {
  calculation.textContent = subtotal.textContent;
  subtotal.textContent = "";
};

function calculateOperation(equation) {
  const equationFormated = equation
    .split("")
    .map((elem) => {
      const isNumber = Number.isInteger(Number(elem));
      if (!isNumber) {
        return mapOperator(elem);
      }
      return elem;
    })
    .join("");
  return new Function("return " + equationFormated)();
}

function mapOperator(parameter) {
  switch (parameter) {
    case "+":
      return "+";
    case "−":
      return "-";
    case "×":
      return "*";
    case "÷":
      return "/";
    default:
      return ".";
  }
}