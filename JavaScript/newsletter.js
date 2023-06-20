document.addEventListener('DOMContentLoaded', function () {
    var submitButton = document.getElementById('submitbutton');
    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        submitButton.style.display = 'none';

        var successDiv = document.createElement('div');
        successDiv.classList.add('success-message');

        var successMessage = document.createElement('p');
        successMessage.textContent = 'Thank you for subscribing!';
        successMessage.style.color = 'green';
        successMessage.style.fontWeight = 'bold';

        successDiv.appendChild(successMessage);

        var formContainer = document.querySelector('.containeer');
        formContainer.appendChild(successDiv);
    });
});
