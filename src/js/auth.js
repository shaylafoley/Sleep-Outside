document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:3001/api/login', { // Ensure the URL matches your backend
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Invalid credentials'); // Customize error message
    }
  })
 .then(data => {
    console.log('Success:', data);
    // Handle successful login
    alert('Login successful!'); // Show success message
    localStorage.setItem('token', data.token); // Store the token in local storage
    // Redirect or perform additional actions here
    // Example: window.location.href = '/dashboard.html'; // Redirect to another page
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('login-error').textContent = error.message; // Display specific error message
  });
});

