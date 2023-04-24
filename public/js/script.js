const signupForm = document.getElementById('signup-form');
const passwordInput = document.getElementById('password');
<<<<<<< HEAD
=======
<<<<<<< HEAD
const repeatPasswordInput = document.getElementById('repeat-password');

signupForm.addEventListener('submit', (e) => {
  if (passwordInput.value !== repeatPasswordInput.value) {
    e.preventDefault();
    alert('Passwords do not match');
  }
});
=======
>>>>>>> 8f995e978f7b05ed45248c50ef4e6779354630b1
const repeatPasswordInput = document.getElementById('repetirPassword');
signupForm.addEventListener('submit', (e) => {
    if (passwordInput.value !== repeatPasswordInput.value) {
        e.preventDefault();
        alert('Passwords do not match');
    }
});
<<<<<<< HEAD
=======
>>>>>>> 6d03607ab66eb65d585aec35137d9753cbaf1eb7
>>>>>>> 8f995e978f7b05ed45248c50ef4e6779354630b1
