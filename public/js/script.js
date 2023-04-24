const signupForm = document.getElementById('signup-form');
const passwordInput = document.getElementById('password');
<<<<<<< HEAD
const repeatPasswordInput = document.getElementById('repeat-password');

signupForm.addEventListener('submit', (e) => {
  if (passwordInput.value !== repeatPasswordInput.value) {
    e.preventDefault();
    alert('Passwords do not match');
  }
});
=======
const repeatPasswordInput = document.getElementById('repetirPassword');
signupForm.addEventListener('submit', (e) => {
    if (passwordInput.value !== repeatPasswordInput.value) {
        e.preventDefault();
        alert('Passwords do not match');
    }
});
>>>>>>> 6d03607ab66eb65d585aec35137d9753cbaf1eb7
