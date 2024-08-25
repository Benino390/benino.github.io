document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('input[name="angka"]');
    let currentOperation = null;
    let currentValue = '';
    let storedValue = '';
  
    function updateDisplay() {
      input.value = currentValue;
    }
  
    function handleNumberClick(number) {
      currentValue += number;
      updateDisplay();
    }
  
    function handleOperation(operation) {
      if (currentValue === '' && operation !== 'clear') {
        return;
      }
  
      if (currentOperation && storedValue) {
        performCalculation();
      }
  
      storedValue = currentValue;
      currentValue = '';
      currentOperation = operation;
    }
  
    function performCalculation() {
      let result;
  
      const previous = parseFloat(storedValue);
      const current = parseFloat(currentValue);
  
      if (isNaN(previous) || isNaN(current)) {
        return;
      }
  
      switch (currentOperation) {
        case 'add':
          result = previous + current;
          break;
        case 'subtract':
          result = previous - current;
          break;
        case 'multiply':
          result = previous * current;
          break;
        case 'divide':
          result = previous / current;
          break;
        default:
          return;
      }
  
      currentValue = result;
      storedValue = '';
      currentOperation = null;
      updateDisplay();
    }
  
    function handleEquals() {
      if (currentOperation) {
        performCalculation();
      }
    }
  
    function handleClear() {
      currentValue = '';
      storedValue = '';
      currentOperation = null;
      updateDisplay();
    }
  
    document.querySelectorAll('.container button').forEach(button => {
      button.addEventListener('click', () => {
        const value = button.textContent;
  
        if (value === 'C') {
          handleClear();
        } else if (value === '=') {
          handleEquals();
        } else if (['+', '-', 'x', '/'].includes(value)) {
          const operation = value === '+' ? 'add' :
                            value === '-' ? 'subtract' :
                            value === 'x' ? 'multiply' :
                            'divide';
          handleOperation(operation);
        } else {
          handleNumberClick(value);
        }
      });
    });
  });
  