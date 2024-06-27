import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client@0.0.15/dist/index.min.js";

document.getElementById('inputForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const inputImage = document.getElementById('inputImage').files[0];
    const outputDiv = document.getElementById('output');

    if (!inputImage) {
        outputDiv.textContent = 'Please upload an image.';
        return;
    }

    // Convert the image file to a Blob
    const reader = new FileReader();
    reader.onloadend = async function() {
        const exampleImage = new Blob([new Uint8Array(reader.result)], { type: inputImage.type });

        const client = await Client.connect("ianhmh/laicc-model-app");
        const result = await client.predict("/predict", { 
            img: exampleImage, 
        });

        console.log(result.data);

        // Display the result in the HTML
        outputDiv.textContent = JSON.stringify(result.data);
    };
    reader.readAsArrayBuffer(inputImage);
});
