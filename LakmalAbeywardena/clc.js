


function showValue(inputValue01)
{
    const val_a = document.getElementById('val_a');
    const b_elem = document.getElementById('val_b');
    const result = document.getElementById('result');
    const  btn = document.getElementById('btn');
    

    result.innerText = inputValue01;
   
    console.log(inputValue01);

   

}



btn.addEventListener('click', () => {
    showValue(val_a.value);

    
})

showValue();


