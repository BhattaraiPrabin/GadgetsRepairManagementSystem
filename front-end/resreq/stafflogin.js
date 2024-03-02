function submitLoginForm() {
    // Get form data
    const contact = document.querySelector('input[name="contact"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Send POST request to the backend
    fetch('http://localhost:4000/api/stafflogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contact: contact,
                password: password
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.token) {
                // Store user data in local storage
                localStorage.setItem('token', data.token);
                localStorage.setItem('staffName', data.staffName);
                localStorage.setItem('userId', data.id);

                window.location.href = 'index.html';
            } else {
                alert(data.error || 'Invalid credentials. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
}