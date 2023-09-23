document.addEventListener('DOMContentLoaded', () => {
    loadExpenses();

    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', saveExpense);
});

function saveExpense() {
    const type = document.getElementById('type').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const whom = document.getElementById('whom').value;
    // ...

    if (!type || isNaN(amount) || !whom) {
        alert('Please fill in all fields.');
        return;
    }

    fetch('/saveExpense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, amount, whom }),
    })
    .then((response) => {
        if (response.status === 200) {
            alert('Expense saved successfully');
            clearInputs();
            loadExpenses();
        } else {
            alert('Error saving expense');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while saving the expense');
    });
}

function loadExpenses() {
    fetch('/getExpenses')
    .then((response) => response.json())
    .then((data) => {
        const expenseList = document.getElementById('expenseList');
        expenseList.innerHTML = '';

        data.forEach((expense) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Type: ${expense.type}, Amount: $${expense.amount.toFixed(2)}, Whom: ${expense.whom}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteExpense(expense.id));

            listItem.appendChild(deleteButton);
            expenseList.appendChild(listItem);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while loading expenses');
    });
}

function deleteExpense(id) {
    fetch(`/deleteExpense/${id}`, {
        method: 'DELETE',
    })
    .then((response) => {
        if (response.status === 200) {
            alert('Expense deleted successfully');
            loadExpenses();
        } else {
            alert('Error deleting expense');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while deleting the expense');
    });
}

function clearInputs() {
    document.getElementById('type').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('whom').value = '';
}
