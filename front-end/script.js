// script.js

document.addEventListener('DOMContentLoaded', () => {
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // Handle task creation (Admin)
    document.getElementById('taskForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const assignedTo = document.getElementById('assignedTo').value;

        const token = localStorage.getItem('token');

        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, assignedTo })
        });

        const result = await response.json();
        alert(result.message);
    });

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
    
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem('token', data.token); // Save the JWT token
                if (data.role === 'admin') {
                    window.location.href = '/admin.html'; // Redirect to admin panel
                } else {
                    window.location.href = '/user.html'; // Redirect to user dashboard
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
    
    // Function to handle registration
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const role = document.querySelector('input[name="role"]:checked').value;
    
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role })
            });
            const data = await response.json();
    
            if (response.ok) {
                alert('Registration successful');
                window.location.href = '/login.html'; // Redirect to login page after registration
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });


});
