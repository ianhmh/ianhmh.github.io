document.getElementById('inputForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const inputImage = document.getElementById('inputImage').files[0];
    const outputDiv = document.getElementById('output');

    if (!inputImage) {
        outputDiv.textContent = 'Please upload an image.';
        return;
    }

    // Convert the image file to a base64 string
    const reader = new FileReader();
    reader.onloadend = async function() {
        const base64Image = reader.result.split(',')[1];

        // The endpoint URL for your Gradio app on Hugging Face
        const endpointUrl = 'YOUR_GRADIO_APP_ENDPOINT_URL';

        // Create the request payload
        const payload = {
            input: base64Image
        };

        // Make the POST request to the endpoint
        try {
            const response = await fetch(endpointUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                // Display the result in the output div
                outputDiv.textContent = `Output: ${data.output}`;
            } else {
                outputDiv.textContent = `Error: ${response.statusText}`;
            }
        } catch (error) {
            outputDiv.textContent = `Error: ${error.message}`;
        }
    };
    reader.readAsDataURL(inputImage);
});
