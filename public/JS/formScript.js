document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
      const requiredFields = form.querySelectorAll('[required]');
      let formIsValid = true;
      requiredFields.forEach(field => {
        const errorElement = document.getElementById(`${field.id}-error`);
        if (!field.value.trim()) {
          formIsValid = false;
          errorElement.classList.remove('hidden');
        } else {
          errorElement.classList.add('hidden');
        }
      });
      if (!formIsValid) {
        event.preventDefault();
      }
    });
  });