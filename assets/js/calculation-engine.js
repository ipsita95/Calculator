// Global variables
var currentResult;
var currentStack = [];

// Listen to digit clicks
$('.digitKey').click((event) => {
	var digit = event.currentTarget.innerHTML;
	updateStack(digit, 'operand');
})

// Listen to operator clicks
$('.operatorKey').click((event) => {
	var operator = event.currentTarget.innerHTML;
	updateStack(operator, 'operator');
})

function updateStack(value, type) {
	var lastIndex = currentStack.length - 1;
	if (type == 'operand') {
		// First check if last element is digit
		if (!isNaN(currentStack[lastIndex])) {
			// It's a number
			currentStack[lastIndex] = currentStack[lastIndex] + '' + value;
		} else {
			// Not a number
			currentStack.push(value);
		}
	} else if (type == 'operator') {
		if (currentStack.length > 0) {
			// Array is not empty
			var lastElement = currentStack[lastIndex];
			if (lastElement == '+' || lastElement == '-' ||lastElement == '*' ||lastElement == '/') {
				// Last element is an operator, so overwrite
				currentStack[lastIndex] = value;
			} else {
				// Last element is not an operator, so push
				currentStack.push(value);
			}
		}
	}
	updateDisplay();
}

function updateDisplay() {
	var displayString = '';
	currentStack.forEach(value => {
		displayString = displayString + '' + value;
	})
	$('.display').html(displayString);
}

function calculate() {
	var sum = 0 + parseInt(currentStack[0]);
	for (let i = 1; i < currentStack.length; i = i+2) {
		var operator = currentStack[i];
		var operand = currentStack[i+1];
		switch(operator) {
			case '+':
						sum = sum + parseInt(operand);
						break;
			case '-':
						sum = sum - operand;
						break;
			case '*':
						sum = sum * operand;
						break;
			case '/':
						sum = sum / operand;
						break;
		}
	}
	currentStack = [];
	currentStack.push(sum);
	$('.display').html('Result = ' + sum);
}
