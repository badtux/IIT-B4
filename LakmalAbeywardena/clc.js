


function showValue()
{
    const val_a = document.getElementById('val_a');
    const b_elem = document.getElementById('val_b');
    const result = document.getElementById('result');
    const  btn = document.getElementById('btn');
    

    result.innerText = val_a;
   
    console.log(result);

    btn.addEventListener('click', () => {
        showValue(val_a.value);
    
        
    })

}





showValue();


