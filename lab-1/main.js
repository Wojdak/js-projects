const wynikiPojemnik = document.querySelector('#wynik')

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('input', updateResults);
});

function updateResults() {
    const num1 = Number(document.querySelector('#liczba1').value)
    const num2 = Number(document.querySelector('#liczba2').value)
    const num3 = Number(document.querySelector('#liczba3').value)
    const num4 = Number(document.querySelector('#liczba4').value)
    
    const suma = num1+num2+num3+num4

    document.querySelector('#suma').innerHTML= `Suma: ${suma}`
    document.querySelector('#srednia').innerHTML=`Srednia: ${suma/4}`
    document.querySelector('#min').innerHTML=`Mina: ${Math.min(num1,num2,num3,num4)}`
    document.querySelector('#max').innerHTML=`Max: ${Math.max(num1,num2,num3,num4)}` 
}

    