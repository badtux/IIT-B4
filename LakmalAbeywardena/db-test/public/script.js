const expForm = $('#exp-add-frm');

const expCat = $('#exp-category');
const expAmt = $('#exp-amount');
const expAcc = $('#exp-account');

expForm.on('submit', function(e){
    console.log('some one submited the form');
    console.log(expCat.val() + ' - '+ expAmt.val() + ' - ' + expAcc.val());
    e.preventDefault();

    // $.ajax({
    //     url: '/add-exp', 
    //     method: 'post',
    //     dataType: 'json',
    //     success: function(resp){
    //         console.log(resp);
    //     }
    // });

});