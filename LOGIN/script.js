const containerlogin = document.querySelector('.containerlogin');
const registbtn = document.querySelector('.regbtn');
const loginbtn = document.querySelector('.logbtn');

registbtn.addEventListener('click', () => {
    containerlogin.classList.add('active');
});

loginbtn.addEventListener('click', () => {
    containerlogin.classList.remove('active');
});

// Password visibility toggle
function setupPasswordToggle() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('regPassword');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            if (type === 'password') {
                icon.className = 'bxr bx-hide';
            } else {
                icon.className = 'bxr bx-show';
            }
        });
    }
}

// Initialize social icons visibility
function initializeSocialIcons() {
    const socialIcons = document.getElementById('socialIcons');
    const socialText = document.querySelector('.social-text');
    
    // Ensure social icons are visible on page load
    if (socialIcons) socialIcons.style.display = 'inline-flex';
    if (socialText) socialText.style.display = 'block';
}

// Error messages object
const errorMessages = {
    login: {
        usernameEmpty: 'Please enter your username',
        usernameInvalid: 'Username must be 3-20 letters and underscores only',
        passwordEmpty: 'Please enter your password'
    },
    register: {
        usernameEmpty: 'Username is required',
        usernameInvalid: 'Username must be 3-20 letters and underscores only',
        emailEmpty: 'Email is required',
        emailInvalid: 'Please enter a valid email address',
        passwordEmpty: 'Password is required',
        passwordInvalid: 'Password must be 8+ chars with uppercase, lowercase, number & special character',
        confirmEmpty: 'Please confirm your password',
        confirmMismatch: 'Passwords do not match'
    },
    success: {
        login: 'Login successful!',
        register: 'Registration successful!'
    }
};

// Validation functions
function showError(inputId) {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
        inputElement.parentElement.classList.add('error');
        inputElement.parentElement.classList.remove('success');
    }
}

function showSuccess(inputId) {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
        inputElement.parentElement.classList.remove('error');
        inputElement.parentElement.classList.add('success');
    }
}

function showDynamicMessage(messageId, type, text) {
    const messageElement = document.getElementById(messageId);
    const socialIcons = document.getElementById('socialIcons');
    const socialText = document.querySelector('.social-text');
    
    if (messageElement) {
        messageElement.textContent = text;
        messageElement.className = `form-message ${type}`;
        messageElement.style.display = 'block';
        
        // Hide social media when showing error/success message
        if (socialIcons) socialIcons.style.display = 'none';
        if (socialText) socialText.style.display = 'none';
        
        setTimeout(() => {
            messageElement.style.display = 'none';
            // Show social media again when message hides
            if (socialIcons) socialIcons.style.display = 'inline-flex';
            if (socialText) socialText.style.display = 'block';
        }, 3000);
    }
}

// Regular expressions
function isValidUsername(username) {
    // Only letters and underscores, 3-20 characters
    const usernameRegex = /^[a-zA-Z_]{3,20}$/;
    return usernameRegex.test(username);
}

function isValidEmail(email) {
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// Real-time validation for registration form
document.getElementById('regUsername')?.addEventListener('input', function() {
    const username = this.value.trim();
    if (username === '') {
        showError('regUsername');
    } else if (!isValidUsername(username)) {
        showError('regUsername');
    } else {
        showSuccess('regUsername');
    }
});

document.getElementById('regEmail')?.addEventListener('input', function() {
    const email = this.value.trim();
    if (email === '') {
        showError('regEmail');
    } else if (!isValidEmail(email)) {
        showError('regEmail');
    } else {
        showSuccess('regEmail');
    }
});

document.getElementById('regPassword')?.addEventListener('input', function() {
    const password = this.value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    // Validate main password
    if (password === '' || !isValidPassword(password)) {
        showError('regPassword');
    } else {
        showSuccess('regPassword');
    }
    
    // Also update confirm password validation if it has content
    if (confirmPassword !== '') {
        if (confirmPassword !== password) {
            showError('regConfirmPassword');
        } else {
            showSuccess('regConfirmPassword');
        }
    }
});

document.getElementById('regConfirmPassword')?.addEventListener('input', function() {
    const confirmPassword = this.value;
    const password = document.getElementById('regPassword').value;
    
    if (confirmPassword === '') {
        showError('regConfirmPassword');
    } else if (confirmPassword !== password) {
        showError('regConfirmPassword');
    } else {
        showSuccess('regConfirmPassword');
    }
});

// Real-time validation for login form - FIXED: Username validation same as register
document.getElementById('loginUsername')?.addEventListener('input', function() {
    const username = this.value.trim();
    if (username === '') {
        showError('loginUsername');
    } else if (!isValidUsername(username)) {
        showError('loginUsername');
    } else {
        showSuccess('loginUsername');
    }
});

document.getElementById('loginPassword')?.addEventListener('input', function() {
    const password = this.value;
    // FIXED: Login password accepts numbers (no validation for login password)
    if (password === '') {
        showError('loginPassword');
    } else {
        showSuccess('loginPassword');
    }
});

// Form submission - Shows most important error
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    let message = '';

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Check in order of importance - FIXED: Username validation same as register
    if (username === '') {
        showError('loginUsername');
        isValid = false;
        message = errorMessages.login.usernameEmpty;
    } else if (!isValidUsername(username)) {
        showError('loginUsername');
        isValid = false;
        message = errorMessages.login.usernameInvalid;
    } else if (password === '') {
        showError('loginPassword');
        isValid = false;
        message = errorMessages.login.passwordEmpty;
    }

    if (isValid) {
        showDynamicMessage('loginMessage', 'success', errorMessages.success.login);
        setTimeout(() => {
            this.reset();
            document.querySelectorAll('#loginForm .inputform').forEach(el => {
                el.classList.remove('success');
            });
        }, 1000);
    } else {
        showDynamicMessage('loginMessage', 'error', message);
    }
});

document.getElementById('registrationForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    let message = '';

    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    // Check in order of importance (most important first)
    if (username === '') {
        showError('regUsername');
        isValid = false;
        message = errorMessages.register.usernameEmpty;
    } else if (!isValidUsername(username)) {
        showError('regUsername');
        isValid = false;
        message = errorMessages.register.usernameInvalid;
    } else if (email === '') {
        showError('regEmail');
        isValid = false;
        message = errorMessages.register.emailEmpty;
    } else if (!isValidEmail(email)) {
        showError('regEmail');
        isValid = false;
        message = errorMessages.register.emailInvalid;
    } else if (password === '') {
        showError('regPassword');
        isValid = false;
        message = errorMessages.register.passwordEmpty;
    } else if (!isValidPassword(password)) {
        showError('regPassword');
        isValid = false;
        message = errorMessages.register.passwordInvalid;
    } else if (confirmPassword === '') {
        showError('regConfirmPassword');
        isValid = false;
        message = errorMessages.register.confirmEmpty;
    } else if (confirmPassword !== password) {
        showError('regConfirmPassword');
        isValid = false;
        message = errorMessages.register.confirmMismatch;
    }

    if (isValid) {
        showDynamicMessage('regMessage', 'success', errorMessages.success.register);
        setTimeout(() => {
            this.reset();
            document.querySelectorAll('#registrationForm .inputform').forEach(el => {
                el.classList.remove('success');
            });
            containerlogin.classList.remove('active');
        }, 1000);
    } else {
        showDynamicMessage('regMessage', 'error', message);
    }
});

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupPasswordToggle();
    initializeSocialIcons();
});