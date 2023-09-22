$(document).ready(function() {
    // Define an array to store expense records
    var expenses = [];
  
    // Get references to HTML elements
    var expenseForm = $('#expenseForm');
    var expenseList = $('#expenseList');
    var saveButton = $('#saveButton');
  
    // Function to add an expense to the list
    function addExpense(type, amount, whom) {
      var listItem = $('<li>').text('Type: ' + type + ', Amount: ' + amount + ', Whom: ' + whom);
      expenseList.append(listItem);
    }
  
    // Event handler for form submission
    expenseForm.on('submit', function(event) {
      event.preventDefault();
  
      // Get form input values
      var type = $('#type').val();
      var amount = $('#amount').val();
      var whom = $('#whom').val();
  
      // Validate input (you can add more validation here)
      if (type && amount && whom) {
        // Add the expense to the list
        addExpense(type, amount, whom);
  
        // Clear the form
        expenseForm[0].reset();
  
        // Store the expense in the array (you can save it to a database here)
        expenses.push({ type: type, amount: amount, whom: whom });
      } else {
        alert('Please fill in all fields.');
      }
    });
  
    // Initialize the expense list with any existing data (e.g., loaded from a database)
    // for (var i = 0; i < expenses.length; i++) {
    //   addExpense(expenses[i].type, expenses[i].amount, expenses[i].whom);
    // }
  });
  