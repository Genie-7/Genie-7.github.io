// script.js

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Event listener for form submission
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const formData = new FormData(this);

        // Send form data using Fetch API
        fetch('https://formspree.io/f/xdkoaqje', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            // Log the entire response for debugging
            console.log(response);

            if (response.ok) {
                // Show the confirmation popup using Bootstrap's modal function
                $('#confirmationPopup').modal('show');
                // Reset the form fields
                document.getElementById('contactForm').reset();
            } else {
                // If there was an issue, try to extract the error message
                return response.json().then(errorData => {
                    alert(`Error: ${errorData.error || 'There was a problem submitting your form. Please try again.'}`);
                });
            }
        }).catch(error => {
            // Display a more specific error message for network or server errors
            console.error('Error:', error);
            alert('There was an error submitting your form. Please check your connection and try again.');
        });
    });
});
