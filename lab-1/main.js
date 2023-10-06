const btn = document.querySelector('#btn')
const wynikiPojemnik = document.querySelector('#wynik')

btn.addEventListener('click', () => {
    let num1 = parseInt(document.querySelector('#liczba1').value)
    let num2 = parseInt(document.querySelector('#liczba2').value)
    let num3 = parseInt(document.querySelector('#liczba3').value)
    let num4 = parseInt(document.querySelector('#liczba4').value)

    const suma = num1+num2+num3+num4

    document.querySelector('#suma').innerHTML+=suma
    document.querySelector('#srednia').innerHTML+=suma/4
    document.querySelector('#min').innerHTML+=Math.min(num1,num2,num3,num4)
    document.querySelector('#max').innerHTML+=Math.max(num1,num2,num3,num4)
})