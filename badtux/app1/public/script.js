document.addEventListener('DOMContentLoaded', () => {
  const addForm = document.getElementById('addForm');
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const contactList = document.getElementById('contactList');

  function deleteContact(id) {
    fetch(`/contacts/${id}`, { method: 'DELETE' })
      .then(() => refreshContactList());
  }
  
  function refreshContactList() {
    fetch('/contacts')
      .then(response => response.json())
      .then(data => {
        contactList.innerHTML = '';
        data.forEach(contact => {
          const item = document.createElement('div');
          item.innerHTML = `
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Phone:</strong> ${contact.phone}</p>
            <button onclick="deleteContact(${contact.id})">Delete</button>
          `;
          contactList.appendChild(item);
        });
      });
  }

  addForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = nameInput.value;
    const phone = phoneInput.value;
    fetch('/add-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`
    }).then(() => {
      nameInput.value = '';
      phoneInput.value = '';
      refreshContactList();
    });
  });

  refreshContactList();
});

