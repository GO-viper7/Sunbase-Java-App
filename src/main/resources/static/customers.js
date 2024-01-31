
// Function to fetch and display customer data
function fetchCustomers() {
  fetch('/api/customers')
      .then(response => response.json())
      .then(customers => {
          console.log(customers)
          const customerTableBody = document.getElementById('customerTableBody');
          customerTableBody.innerHTML = ''; // Clear existing rows

          customers.forEach((customer, index) => {
              const row = `
                  <tr>
                      <td>${index + 1}</td>
                      <td data-field="firstName">${customer.firstName}</td>
                      <td data-field="lastName">${customer.lastName}</td>
                      <td data-field="address">${customer.address}</td>
                      <td data-field="city">${customer.city}</td>
                      <td data-field="state">${customer.state}</td>
                      <td data-field="street">${customer.street}</td>
                      <td data-field="email">${customer.email}</td>
                      <td data-field="phone">${customer.phone}</td>
                      <td>
                          <button class="btn btn-primary btn-sm" onclick="editCustomer('${customer.id}')" data-toggle="modal" data-target="#editCustomerModal">Edit</button>
                          <button class="btn btn-danger btn-sm" onclick="deleteCustomer('${customer.id}')">Delete</button>
                      </td>
                  </tr>
              `;
              customerTableBody.innerHTML += row;
          });
      })
      .catch(error => console.error('Error fetching customers:', error));
}

// Function to filter customer rows based on selected field and search value
function filterCustomers() {
    const searchField = document.getElementById('searchField').value;
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    
    const rows = document.querySelectorAll('#customerTableBody tr');
    rows.forEach(row => {
        const dataCell = row.querySelector(`td[data-field="${searchField}"]`);
        console.log(searchField)

      if (dataCell) {
          const cellValue = dataCell.textContent.toLowerCase();
          console.log(cellValue)
        if (cellValue.includes(searchValue)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      }
    });
  }
  

document.getElementById('searchButton').addEventListener('click', filterCustomers);

document.getElementById('syncButton').addEventListener('click', () => {

    fetch("https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list", {
        method: 'GET',
        headers: {
            "Authorization": "Bearer dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM=",
            "Content-Type": "application/json"
        },
    })
    .then(response => response.json())
    .then(result => {
        result.forEach(obj => {
            if (obj.hasOwnProperty("uuid")) {
                delete obj["uuid"]; 
            }
            if (obj.hasOwnProperty("first_name")) {
                obj["firstName"] = obj["first_name"]
                delete obj["first_name"]; 
            }
            if (obj.hasOwnProperty("last_name")) {
                obj["lastName"] = obj["last_name"]
                delete obj["last_name"]; 
            }
        });

        result.forEach((customerData) => {
            console.log(customerData)
            fetch('/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customerData)
            })
            .then(response => {
                if (response.ok) {
                    $('#addCustomerModal').modal('hide'); // Hide modal on success
                } else {
                    throw new Error('Failed to add customer');
                }
            })
            .catch(error => console.error('Error adding customer:', error));
        })
        fetchCustomers(); // Refresh customer listing
    })
    .catch(error => {
        alert('Access Control-Allow-Origin is blocked, Please unblock to access https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list')
    });

});
  
  // Event listener for search query input
  

// Function to add a new customer
function addCustomer(event) {
  event.preventDefault();
  
  const formData = new FormData(document.getElementById('addCustomerForm'));
  const customerData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      street: formData.get('street'),
      address: formData.get('address'),
      city: formData.get('city'),
      state: formData.get('state'),
      email: formData.get('email'),
      phone: formData.get('phone'),
  };
  console.log(customerData)
  fetch('/api/customers', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerData)
  })
  .then(response => {
      if (response.ok) {
          $('#addCustomerModal').modal('hide'); // Hide modal on success
          fetchCustomers(); // Refresh customer listing
      } else {
          throw new Error('Failed to add customer');
      }
  })
  .catch(error => console.error('Error adding customer:', error));
}

let editId = "";

// Function to edit a customer
function editCustomer(customerId) {
    fetch(`/api/customers/${customerId}`)
        .then(response => response.json())
        .then(customer => {
            // Populate the edit form with customer details
            editId = customer.id;
            document.getElementById('editFirstName').value = customer.firstName;
            document.getElementById('editLastName').value = customer.lastName;
            document.getElementById('editAddress').value = customer.address;
            document.getElementById('editCity').value = customer.city;
            document.getElementById('editStreet').value = customer.street;
            document.getElementById('editState').value = customer.state;
            document.getElementById('editEmail').value = customer.email;
            document.getElementById('editPhone').value = customer.phone;
            // Populate other fields as needed

            // Show the edit customer modal
            $('#editCustomerModal').modal('show');
        })
        .catch(error => console.error('Error fetching customer:', error));
}

// Function to delete a customer
function deleteCustomer(customerId) {
  if (confirm('Are you sure you want to delete this customer?')) {
      fetch(`/api/customers/${customerId}`, {
          method: 'DELETE'
      })
      .then(response => {
          if (response.ok) {
              fetchCustomers(); // Refresh customer listing
          } else {
              throw new Error('Failed to delete customer');
          }
      })
      .catch(error => console.error('Error deleting customer:', error));
  }
}


// Function to handle form submission for updating customer details
document.getElementById('editCustomerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const updatedCustomerData = {
        firstName: formData.get('editFirstName'),
        lastName: formData.get('editLastName'),
        street: formData.get('editStreet'),
        address: formData.get('editAddress'),
        city: formData.get('editCity'),
        state: formData.get('editState'),
        email: formData.get('editEmail'),
        phone: formData.get('editPhone'),
    };
    console.log(updatedCustomerData)
    fetch(`/api/customers/${editId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCustomerData)
    })
    .then(response => {
        if (response.ok) {
            $('#editCustomerModal').modal('hide'); // Hide modal on success
            fetchCustomers(); // Refresh customer listing
        } else {
            throw new Error('Failed to update customer');
        }
    })
    .catch(error => console.error('Error updating customer:', error));
});


// Event listener for form submission
document.getElementById('addCustomerForm').addEventListener('submit', addCustomer);

// Fetch and display customer data when the page loads
document.addEventListener('DOMContentLoaded', fetchCustomers);
