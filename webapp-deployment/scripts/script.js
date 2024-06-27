import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client@0.0.15/dist/index.min.js";

async function runGradioApp() {
    const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
    const exampleImage = await response_0.blob();
    
    const client = await Client.connect("ianhmh/laicc-model-app");
    const result = await client.predict("/predict", { 
        img: exampleImage, 
    });

    console.log(result.data);

    // Display the result in the HTML
    document.getElementById('output').textContent = JSON.stringify(result.data);
}

runGradioApp();
