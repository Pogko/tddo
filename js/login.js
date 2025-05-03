import { registerUser, loginUser } from './auth.js';

export function setupLogin() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    loginBtn.addEventListener('click', () => {
        loginForm.classList.add('visible');
        registerForm.classList.remove('visible');
    });

    registerBtn.addEventListener('click', () => {
        registerForm.classList.add('visible');
        loginForm.classList.remove('visible');
    });

    document.getElementById('login-submit').addEventListener('click', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            await loginUser(username, password);
            alert('Login berhasil!');
            window.location.href = 'app.html';
        } catch (err) {
            alert(err.message);
        }
    });

    document.getElementById('register-submit').addEventListener('click', async (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        try {
            await registerUser(name, username, password);
            alert('Registrasi berhasil! Silakan login.');
            registerForm.classList.remove('visible');
            loginForm.classList.add('visible');
        } catch (err) {
            alert(err.message);
        }
    });
}