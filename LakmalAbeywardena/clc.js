


function showValue()
{
    const val_a = document.getElementById('val_a');
    const b_elem = document.getElementById('val_b');
    var result = document.getElementById('result');
    const  btn = document.getElementById('btn');
    

    result.value = val_a.value + val_b.value;
   
    

    
}


btn.addEventListener('click', () => {   
    
    showValue();

    
})






