// Adding an event listener to the form with id "reservationForm" for the "submit" event
/*
document.getElementById("reservationForm").addEventListener("submit", function (event) {

  // Preventing the default form submission behavior (which would reload the page)
  event.preventDefault();

  // Getting the value of the input field with id "fname" (the user's first name)
  const fname = document.getElementById("fname").value;

  // Displaying a thank you message with the user's first name in an alert box
  alert("Thank you, " + fname + "! Your reservation has been received.");

  // Resetting the form fields after submission
  document.getElementById("reservationForm").reset();
});

<h1>Book an Appointment</h1>

<form id="booking-form">
  <input type="text" name="user_name" placeholder="Your Name" required/>
  <input type="email" name="user_email" placeholder="Your Email" required/>
  <input type="date" name="booking_date" required/>
  <button type="submit" id="button">Book Now</button>
</form>

<script>
  const btn = document.getElementById('booking-form');

  btn.addEventListener('submit', function(event) {
  event.preventDefault();

  // Change the button text so the user knows it's sending
  const submitBtn = document.getElementById('button');
  submitBtn.textContent = 'Sending...';

  const serviceID = 'service_lk1m7jr'; // Use your actual service ID
  const templateID = 'template_rpvekuz'; // Get this from EmailJS "Email Templates" tab

  emailjs.sendForm(serviceID, templateID, this)
  .then(() => {
  submitBtn.textContent = 'Book Now';
  alert('Booking Sent Successfully!');
}, (err) => {
  submitBtn.textContent = 'Book Now';
  alert('Failed: ' + JSON.stringify(err));
});
});
</script>*/

// Set the minimum date for the reservation picker to "today"
window.onload = function() {
  const datePicker = document.getElementById('date');
  if (datePicker) {
    const today = new Date().toISOString().split('T')[0];
    datePicker.setAttribute('min', today);
  }
};
// Function to handle form submissions via EmailJS
function handleFormSubmit(formId, serviceID, templateID, customAlert) {
  const form = document.getElementById(formId);

  // Only proceed if the form actually exists on the current page
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get the submit button to show loading state
      const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('input[type="submit"]');
      const originalText = submitBtn.value || submitBtn.textContent;

      if (submitBtn.tagName === "INPUT") {
        submitBtn.value = "Sending...";
      } else {
        submitBtn.textContent = "Sending...";
      }

      // Send via EmailJS
      // 'this' refers to the form being submitted
// ... inside your handleFormSubmit function ...
      emailjs.sendForm(serviceID, templateID, this)
          .then(() => {
            alert(customAlert);
       /*     const userName = form.querySelector('#fname').value;

            // Custom formatted message
            alert(
                " Message Sent!\n\n" +
                "Selam, " + userName + "!\n" +
                "Thank you for reaching out to Habesha Restaurant. " +
                "We have received your message and will get back to you as soon as possible."
            );*/

            form.reset();
          })
          .catch((err) => {
            alert("Ops! Something went wrong: " + JSON.stringify(err));
          })
          .finally(() => {
            // Restore button text regardless of success or failure
            if (submitBtn.tagName === "INPUT") {
              submitBtn.value = originalText;
            } else {
              submitBtn.textContent = originalText;
            }
          });
    });
  }
}

// 2. Initialize with DIFFERENT messages for each page
// Reservation Page
handleFormSubmit(
    "reservationForm",
    "service_lk1m7jr",
    "template_6otlx8w", // Use your repurposed ID here
    "📅 Reservation Request Sent!\n\nThank you! We've received your booking request for Habesha Restaurant. We will confirm your table shortly via email or phone."
);

// Contact Page
handleFormSubmit(
    "contactForm",
    "service_lk1m7jr",
    "template_rpvekuz",
    "✉️ Message Sent!\n\nThank you for reaching out. We've received your inquiry and our team will get back to you as soon as possible!"
);

