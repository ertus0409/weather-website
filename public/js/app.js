
const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1'); // location
const messageTwo = document.querySelector('#message-2'); // weather data


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevents page from loading after form submission

    // Loading message
    messageTwo.textContent = 'Loading...';
    messageOne.textContent = '';
    
    // Fetching data
    fetch('http://localhost:3000/weather?address=' + encodeURI(searchElement.value)).then((response) => {
        response.json().then((data) => {

            // Rendering response data to the UI
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
            
            
        });
    });

});