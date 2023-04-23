const signupForm = document.getElementById('signup-form');
const passwordInput = document.getElementById('password');
const repeatPasswordInput = document.getElementById('repeat-password');

signupForm.addEventListener('submit', (e) => {
  if (passwordInput.value !== repeatPasswordInput.value) {
    e.preventDefault();
    alert('Passwords do not match');
  }
});