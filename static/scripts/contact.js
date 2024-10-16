document.addEventListener("DOMContentLoaded", function() {
    const servicesLink = document.getElementById("contact");
    servicesLink.classList.add("active-link");
});

async function submit_entry(){
    const form = document.getElementById('contact-form')
    const formData = new FormData(form);
    const error = document.getElementById('error');

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
                error.innerText = result.message;
            }
            else
            {
                const result = await response.json();

                error.innerText = result.message || 'Failed to send message.';
            }
    }

    catch (error)
    {
        console.error('Error submitting entry:', error);
        error.innerText = 'An error occurred, please try again.';
    }
}

