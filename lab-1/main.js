const wynikiContainer = document.querySelector('#result')
const inputsContainer = document.querySelector('#inputContainer')
const addInputButton = document.querySelector('#addInput')
let deleteInputButtons = document.querySelectorAll('.deleteInput')
let counter = 0


addInputButton.addEventListener('click', addInputField)
inputsContainer.addEventListener('input', updateResults)

deleteInputButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', (e) => {
        deleteInputField(e);
    });
})

function addInputField() {
    const newInputRow = document.createElement('div')
    newInputRow.classList.add('inputRow')

    const newInput = document.createElement('input')
    newInput.type = 'text'

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('deleteInput')
    deleteButton.textContent = 'Delete'
    deleteButton.addEventListener('click', (e) => {
        deleteInputField(e);
    });

    newInputRow.appendChild(newInput)
    newInputRow.appendChild(deleteButton)
    inputsContainer.appendChild(newInputRow)
}

function updateResults() {
    const inputElements = inputsContainer.querySelectorAll('input')
    let sum = 0
    let min = Number.MAX_VALUE
    let max = -Number.MAX_VALUE

    inputElements.forEach(input => {
        const num = Number(input.value)
        sum += num
        min = Math.min(min, num)
        max = Math.max(max, num)
        counter++
    })

    const avg = sum/counter

    document.querySelector('#sum').innerHTML = `Sum: ${sum}`
    document.querySelector('#avg').innerHTML = `Average: ${avg}`
    document.querySelector('#min').innerHTML = `Min: ${min}`
    document.querySelector('#max').innerHTML = `Max: ${max}`
}

function deleteInputField(e){
    const clickedDeleteButton = e.target;
    const inputRow = clickedDeleteButton.parentElement;
    inputsContainer.removeChild(inputRow);
    updateResults();
}
