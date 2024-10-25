document.addEventListener("DOMContentLoaded", function() {
    const servicesLink = document.getElementById("contact");
    servicesLink.classList.add("active-link");
});

async function submit_entry(){
    const form = document.getElementById('contact-form')
    const formData = new FormData(form);
    const error = document.getElementById('error');
    const submitButton = document.getElementById("submit-button")

    submitButton.innerText = "Sending"
    submitButton.disabled = true;
    submitButton.classList.add('loading');


    try
    {
        const response = await fetch('/contact',
            {
                method: 'POST',
                body: formData
            });

            if (response.ok)
            {
                const result = await response.json();
                error.classList.remove("error")
                error.classList.add("success")
                error.innerText = result.message;
                form.reset();
            }
            else
            {
                const result = await response.json();
                error.classList.remove("success")
                error.classList.add("error")
                error.innerText = result.message || 'Failed to send message.';
            }
    }

    catch (error)
    {
        console.error('Error submitting entry:', error);
        error.innerText = 'An error occurred, please try again.';
    }

    submitButton.innerText = "Send"
    submitButton.disabled = false;
    submitButton.classList.remove('loading');
}

