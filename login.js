document.addEventListener('DOMContentLoaded', () => {

    const showLoginBtn = document.getElementById('show-login-btn');
    const showRegisterBtn = document.getElementById('show-register-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    showLoginBtn.addEventListener('click', () => {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        showLoginBtn.classList.add('active');
        showRegisterBtn.classList.remove('active');
    });

    showRegisterBtn.addEventListener('click', () => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        showLoginBtn.classList.remove('active');
        showRegisterBtn.classList.add('active');
    });
    
    const registerEmail = document.getElementById('register-email');
    const registerPassword = document.getElementById('register-password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const registerMessage = document.getElementById('register-message');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        let isValid = true;
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(registerEmail.value)) {
            emailError.textContent = 'Adresa de email nu este validă.';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordRegex.test(registerPassword.value)) {
            passwordError.textContent = 'Parola trebuie să aibă minim 8 caractere, o literă mare, o cifră și un caracter special (!@#$%^&*).';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }

        if (isValid) {
            const newUser = {
                email: registerEmail.value.trim(), 
                password: registerPassword.value 
            };

            saveUser(newUser);
            
            registerMessage.textContent = 'Cont creat cu succes! Vă puteți autentifica.';
            registerForm.reset();
            
            setTimeout(() => {
                showLoginBtn.click();
                registerMessage.textContent = '';
            }, 2000); 
        }
    });

    function saveUser(user) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(user); 
        localStorage.setItem('users', JSON.stringify(users)); 
    }


    const loginMessage = document.getElementById('login-message');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        const foundUser = users.find(user => user.email === email && user.password === password);
        
        if (foundUser) {
            loginMessage.textContent = 'Autentificare reușită! Se încarcă...';
            loginMessage.className = 'success-message';
            
            localStorage.setItem('loggedInUser', email);
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            loginMessage.textContent = 'Email sau parolă incorecte.';
            loginMessage.className = 'error-message';
        }
    });
});