document.addEventListener("DOMContentLoaded", function() {
    const servicesLink = document.getElementById("services");
    servicesLink.classList.add("active-link");
});

document.getElementById('single-room').addEventListener('click', function () {
    const singleForm = document.getElementById('calculator-single');
    const houseForm = document.getElementById('calculator-house');
    const rating_circle = document.getElementById("rating-circle")

    // Hide the whole house form instantly
    if (houseForm.classList.contains('show')) {
        houseForm.classList.remove('show');
        houseForm.style.display = 'none'; // Set display to none immediately
        rating_circle.style.display = "none";
    }

    // Show the single room form
    singleForm.style.display = 'block'; // Set display to block first
    setTimeout(() => {
        singleForm.classList.add('show'); // Add show class to fade in
    }, 10); // Short delay to trigger the transition
});

document.getElementById('whole-house').addEventListener('click', function () {
    const singleForm = document.getElementById('calculator-single');
    const houseForm = document.getElementById('calculator-house');
    const rating_circle = document.getElementById("rating-circle")

    // Hide the single room form instantly
    if (singleForm.classList.contains('show')) {
        singleForm.classList.remove('show');
        singleForm.style.display = 'none'; // Set display to none immediately
        rating_circle.style.display = "none";
    }

    // Show the house form
    houseForm.style.display = 'block'; // Set display to block first
    setTimeout(() => {
        houseForm.classList.add('show'); // Add show class to fade in
    }, 10); // Short delay to trigger the transition
});

document.getElementById('single-room').addEventListener('click', function () {
    // ... existing code ...
    // Change button styles
    const error = document.getElementById('error');
    error.innerText = '';
    this.classList.add('button-selected');
    this.classList.remove('button-unselected');
    document.getElementById('whole-house').classList.add('button-unselected');
    document.getElementById('whole-house').classList.remove('button-selected');
});

document.getElementById('whole-house').addEventListener('click', function () {
    // ... existing code ...
    // Change button styles
    const error = document.getElementById('error');
    error.innerText = '';
    this.classList.add('button-selected');
    this.classList.remove('button-unselected');
    document.getElementById('single-room').classList.add('button-unselected');
    document.getElementById('single-room').classList.remove('button-selected');
});


async function submit_single(){
    const form = document.getElementById('calculator-single')
    const formData = new FormData(form);
    const error = document.getElementById('error');
    const submitButton = document.getElementById("submit-single")
    const rating_circle = document.getElementById("rating-circle")
    const rating_text = document.getElementById("rating-text")

    submitButton.innerText = "Calculating"
    submitButton.disabled = true;
    submitButton.classList.add('loading');


    try
    {
        const response = await fetch('/calculate',
            {
                method: 'POST',
                body: formData
            });

            if (response.ok)
            {
                const result = await response.json();
                error.classList.remove("error")
                error.classList.add("success")
                rating_circle.style.display = "flex";
                rating_text.innerText = "KW: " + result.kw
                error.innerText = "(Energy required to heat your room.)"
                form.reset();
            }
            else
            {
                const result = await response.json();
                error.classList.remove("success")
                error.classList.add("error")
                rating_circle.style.display = "none";
                error.innerText = result.message || 'Failed to send message.';
            }
    }

    catch (error)
    {
        console.error('Error submitting entry:', error);
        error.innerText = 'An error occurred, please try again.';
    }

    submitButton.innerText = "Calculate Heating"
    submitButton.disabled = false;
    submitButton.classList.remove('loading');
}

async function submit_house(){
    const form = document.getElementById('calculator-house')
    const formData = new FormData(form);
    const error = document.getElementById('error');
    const submitButton = document.getElementById("submit-house")
    const rating_circle = document.getElementById("rating-circle")
    const rating_text = document.getElementById("rating-text")

    submitButton.innerText = "Calculating"
    submitButton.disabled = true;
    submitButton.classList.add('loading');


    try
    {
        const response = await fetch('/calculate',
            {
                method: 'POST',
                body: formData
            });

            if (response.ok)
            {
                const result = await response.json();
                error.classList.remove("error")
                error.classList.add("success")
                rating_circle.style.display = "flex";
                rating_text.innerText = "KW: " + result.kw
                error.innerText = "(Energy required to heat your house.)"
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

    submitButton.innerText = "Calculate Heating"
    submitButton.disabled = false;
    submitButton.classList.remove('loading');
}


