document.addEventListener('DOMContentLoaded', () => {
  const addForm = document.getElementById('addForm');
  const type = document.getElementById('type');
  const amount = document.getElementById('amount');
  const name = document.getElementById('name');
  const contactList = document.getElementById('contactList');

  function refreshContactList() {
    fetch('/contacts')
      .then(response => response.json())
      .then(data => {
        contactList.innerHTML = '';
        data.forEach(contact => {
          const item = document.createElement('div');
          item.innerHTML = `
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <button onclick="deleteContact(${contact.id})">Delete</button>
          `;
          contactList.appendChild(item);
        });
      });
  }

  function deleteContact(id) {
    fetch(`/contacts/${id}`, { method: 'DELETE' })
      .then(() => refreshContactList());
  }

  addForm.addEventListener('submit', event => {
    event.preventDefault();
    const type = type.value;
    const amount = amount.value;
    const name = name.value;
    fetch('/add-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`
    }).then(() => {
      type.value = '';
      amount.value = '';
      name.value = '';
      refreshContactList();
    });
  });

  refreshContactList();
});

