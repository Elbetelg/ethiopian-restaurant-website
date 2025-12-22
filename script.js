  // Adding an event listener to the form with id "reservationForm" for the "submit" event
  document.getElementById("reservationForm").addEventListener("submit", function(event) {

    // Preventing the default form submission behavior (which would reload the page)
    event.preventDefault();

    // Getting the value of the input field with id "fname" (the user's first name)
    const fname = document.getElementById("fname").value;

    // Displaying a thank you message with the user's first name in an alert box
    alert("Thank you, " + fname + "! Your reservation has been received.");
      
    // Resetting the form fields after submission
      document.getElementById("reservationForm").reset();
  });
