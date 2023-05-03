
const editProfileForm = document.getElementById('editProfileForm');

editProfileForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(editProfileForm);
  console.log("formData: ",formData)
  try {
    const response = await axios.put('/api/edit-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      window.location.href = '/student/profile';
    } else {
      alert('Error updating the profile');
    }
  } catch (error) {
    console.error(error);
    alert('Error updating the profile');
  }
});