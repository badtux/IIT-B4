$( document ).ready(function() {
  const addForm = $('#addForm');
  const nameInput = $('#name');
  const phoneInput = $('#phone');
   contactList = $('#contactList');
  
  function deleteContact(id) {
    fetch(`/contacts/${id}`, { method: 'DELETE' })
      .then(() => refreshContactList());
  }
  
  function refreshContactList() {
    deleteContact(3);
    fetch('/contacts')
      .then(response => response.json())
      .then(data => {
        contactList.innerHTML = '';
        data.forEach(contact => {
          const item = document.createElement('div');
          item.innerHTML = `
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Phone:</strong> ${contact.phone}</p>
            <button class="del-button" data-id="${contact.id}">Delete</button>
          `;
          item.appendTo(contactList);
        });
      });
  }

  addForm.on('submit', function(e){
    e.preventDefault();
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

  const delButtons = $('.del-button');
  delButtons.on('click', function(e){
    console.log('clicked');
  });

});

