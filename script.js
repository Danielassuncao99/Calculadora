// Variáveis para armazenar os valores e operações
let displayValue = '0';
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;

// Função para atualizar o display
function updateDisplay() {
    const display = document.getElementById('display');
    display.value = displayValue;
}

// Função para inserir dígitos
function inputDigit(digit) {
    if (waitingForSecondOperand === true) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        // Substitui o '0' inicial ou adiciona o dígito
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

// Função para inserir ponto decimal
function inputDecimal(dot) {
    // Se estiver esperando o segundo operando, reinicia com '0.'
    if (waitingForSecondOperand === true) {
        displayValue = '0.';
        waitingForSecondOperand = false;
        return;
    }
    
    // Adiciona o ponto decimal apenas se não existir um no display
    if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
}

// Função para lidar com operadores
function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);
    
    // Se já temos um operador e estamos esperando o segundo operando,
    // apenas atualize o operador
    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }
    
    // Se não temos o primeiro operando, armazene o valor atual
    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        // Se já temos o primeiro operando e um operador, realize o cálculo
        const result = calculate(firstOperand, inputValue, operator);
        
        // Atualiza o display com o resultado e armazena como primeiro operando
        displayValue = String(result);
        firstOperand = result;
    }
    
    // Prepara para o próximo operando
    waitingForSecondOperand = true;
    operator = nextOperator;
}

// Função para realizar o cálculo
function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            // Verifica divisão por zero
            return secondOperand !== 0 ? firstOperand / secondOperand : 'Erro';
        default:
            return secondOperand;
    }
}

// Função para limpar a calculadora
function resetCalculator() {
    displayValue = '0';
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null;
}

// Função para apagar o último dígito
function backspace() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
}

// Adiciona event listeners aos botões
document.addEventListener('DOMContentLoaded', function() {
    // Botões numéricos
    document.getElementById('zero').addEventListener('click', () => {
        inputDigit('0');
        updateDisplay();
    });
    
    document.getElementById('one').addEventListener('click', () => {
        inputDigit('1');
        updateDisplay();
    });
    
    document.getElementById('two').addEventListener('click', () => {
        inputDigit('2');
        updateDisplay();
    });
    
    document.getElementById('three').addEventListener('click', () => {
        inputDigit('3');
        updateDisplay();
    });
    
    document.getElementById('four').addEventListener('click', () => {
        inputDigit('4');
        updateDisplay();
    });
    
    document.getElementById('five').addEventListener('click', () => {
        inputDigit('5');
        updateDisplay();
    });
    
    document.getElementById('six').addEventListener('click', () => {
        inputDigit('6');
        updateDisplay();
    });
    
    document.getElementById('seven').addEventListener('click', () => {
        inputDigit('7');
        updateDisplay();
    });
    
    document.getElementById('eight').addEventListener('click', () => {
        inputDigit('8');
        updateDisplay();
    });
    
    document.getElementById('nine').addEventListener('click', () => {
        inputDigit('9');
        updateDisplay();
    });
    
    // Botão decimal
    document.getElementById('decimal').addEventListener('click', () => {
        inputDecimal('.');
        updateDisplay();
    });
    
    // Botões de operação
    document.getElementById('add').addEventListener('click', () => {
        handleOperator('+');
        updateDisplay();
    });
    
    document.getElementById('subtract').addEventListener('click', () => {
        handleOperator('-');
        updateDisplay();
    });
    
    document.getElementById('multiply').addEventListener('click', () => {
        handleOperator('*');
        updateDisplay();
    });
    
    document.getElementById('divide').addEventListener('click', () => {
        handleOperator('/');
        updateDisplay();
    });
    
    // Botão de igual
    document.getElementById('equals').addEventListener('click', () => {
        if (!operator) return;
        
        handleOperator('=');
        updateDisplay();
    });
    
    // Botão de limpar
    document.getElementById('clear').addEventListener('click', () => {
        resetCalculator();
        updateDisplay();
    });
    
    // Botão de backspace
    document.getElementById('backspace').addEventListener('click', () => {
        backspace();
        updateDisplay();
    });
    
    // Inicializa o display
    updateDisplay();
});