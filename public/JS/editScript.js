document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#edit-form');
  const successMessage = document.querySelector('#success-message');
  const errorMessage = document.querySelector('#error-message');

  if (!form || !successMessage || !errorMessage) {
    console.error('Required elements are missing in the DOM.');
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Clear previous messages
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');

    // Form data validation
    const title = form.querySelector('#title').value.trim();
    const description = form.querySelector('#description').value.trim();
    const price = form.querySelector('#price').value.trim();
    const country = form.querySelector('#country').value.trim();
    const location = form.querySelector('#location').value.trim();

    let hasError = false;

    // Validation checks
    if (!title) {
      form.querySelector('#title-error').classList.remove('hidden');
      hasError = true;
    } else {
      form.querySelector('#title-error').classList.add('hidden');
    }

    if (!description) {
      form.querySelector('#description-error').classList.remove('hidden');
      hasError = true;
    } else {
      form.querySelector('#description-error').classList.add('hidden');
    }

    if (!price || price <= 0) {
      form.querySelector('#price-error').classList.remove('hidden');
      hasError = true;
    } else {
      form.querySelector('#price-error').classList.add('hidden');
    }

    if (!country) {
      form.querySelector('#country-error').classList.remove('hidden');
      hasError = true;
    } else {
      form.querySelector('#country-error').classList.add('hidden');
    }

    if (!location) {
      form.querySelector('#location-error').classList.remove('hidden');
      hasError = true;
    } else {
      form.querySelector('#location-error').classList.add('hidden');
    }

    // If there are errors, stop submission
    if (hasError) {
      return;
    }

    // Proceed with form submission
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: {
          'Accept': 'application/json'
        },
        body: formData,
      });

      if (!response.ok) {
        // Handle non-JSON response
        const text = await response.text();
        throw new Error(text);
      }

      const result = await response.json();
      successMessage.textContent = result.message || 'Listing updated successfully!';
      successMessage.classList.remove('hidden');

      // Redirect after a short delay to show the success message
      setTimeout(() => {
        window.location.href = `/listings/${form.action.split('/').pop().split('?')[0]}`;
      }, 1500);
    } catch (error) {
      // Check if the error message is HTML (indicating an error page)
      if (error.message.startsWith('<')) {
        console.error('Unexpected HTML response:', error.message);
        errorMessage.textContent = 'An unexpected error occurred. Please try again.';
      } else {
        errorMessage.textContent = error.message || 'An error occurred. Please try again.';
      }
      errorMessage.classList.remove('hidden');
    }
  });
});
