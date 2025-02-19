function emailSend() {
    // Get input values
    var name = document.getElementById('name-field').value.trim();
    var email = document.getElementById('email-field').value.trim();
    var subject = document.getElementById('subject-field').value.trim();
    var message = document.getElementById('message-field').value.trim();
    var sendButton = document.querySelector("input[type='button']");

    // Validate inputs
    if (!name || !email || !subject || !message) {
        swal("Error", "All fields are required!", "error");
        return;
    }

    if (!validateEmail(email)) {
        swal("Error", "Please enter a valid email address!", "error");
        return;
    }

    // Change button to loading state
    sendButton.value = "Sending...";
    sendButton.disabled = true;

    // EmailJS parameters
    var params = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    const serviceId = "service_0qok8qm";
    const templateId = "template_on3jkij";

    // Send email
    emailjs.send(serviceId, templateId, params)
        .then(res => {
            // Reset form fields
            document.getElementById("name-field").value = "";
            document.getElementById("email-field").value = "";
            document.getElementById("subject-field").value = "";
            document.getElementById("message-field").value = "";

            // Reset button
            sendButton.value = "Send";
            sendButton.disabled = false;

            console.log(res);
            swal("Thank you!", "Your message has been sent successfully. I will get back to you soon.", "success");
        })
        .catch(err => {
            // Reset button
            sendButton.value = "Send";
            sendButton.disabled = false;

            console.error("EmailJS error:", err);
            swal("Error", "Something went wrong. Please try again later.", "error");
        });
}

// Helper function to validate email format
function validateEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
