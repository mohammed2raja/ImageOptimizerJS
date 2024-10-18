import { optimizeImage } from '../../src/image-optimizer.js';

const fileInput = document.querySelector("#image-input");
const widthInput = document.querySelector("#width-input");
const heightInput = document.querySelector("#height-input");
const qualityInput = document.querySelector("#quality-input");
const downloadButton = document.querySelector("#download-btn");
const imageContainer = document.querySelector("#image-container");
const optimizationInfo = document.querySelector("#optimization-info");

let originalFile = null;
let optimizedImageSrc = null; // Store the data URL of the optimized image


// Function to display optimization info
function displayOptimizationInfo(original, optimized) {
    optimizationInfo.innerHTML = `
        <strong>Optimization Info</strong>
        <p>Original Size: ${(original.size / 1024).toFixed(2)} KB</p>
        <p>Optimized Size: ${(optimized.size / 1024).toFixed(2)} KB</p>
    `;
}

// Function to get image dimensions
function getImageDimensions(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}

// Function to display the image
function displayImage(imgSrc) {
    imageContainer.innerHTML = ''; // Clear previous image
    const imgElement = document.createElement("img");
    imgElement.src = imgSrc;
    imageContainer.appendChild(imgElement);
}

// Function to optimize and display the image details
async function optimizeAndDisplay() {
    if (!originalFile) {
        alert("Please select an image file.");
        return;
    }

    const width = parseInt(widthInput.value, 10);
    const height = parseInt(heightInput.value, 10);
    const quality = parseFloat(qualityInput.value);

    try {
        optimizedImageSrc = await optimizeImage(originalFile, width, height, quality);
        const optimizedBlob = await fetch(optimizedImageSrc).then(res => res.blob());
        const optimizedFile = new File([optimizedBlob], "optimized-image.jpg", { type: optimizedBlob.type });

        const optimizedDimensions = await getImageDimensions(optimizedFile);

        // Update the image and its details with the optimized version
        displayImage(optimizedImageSrc);
        displayOptimizationInfo(originalFile, optimizedFile);

        // Enable the download button
        downloadButton.disabled = false;
    } catch (error) {
        console.error("Error optimizing image:", error);
    }
}

// Event listener for file input
fileInput.addEventListener("change", async (event) => {
    originalFile = event.target.files[0];
    if (originalFile) {
        const originalDimensions = await getImageDimensions(originalFile);

        // Set default width and height based on the original image dimensions
        widthInput.value = originalDimensions.width;
        heightInput.value = originalDimensions.height;

        // Display the original image and its details
        displayImage(URL.createObjectURL(originalFile));

        // Reset the download button
        downloadButton.disabled = true;
        optimizedImageSrc = null;
    }
});

// Event listener for the download button
downloadButton.addEventListener("click", () => {
    if (optimizedImageSrc) {
        const link = document.createElement('a');
        link.href = optimizedImageSrc;
        link.download = 'optimized-image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("Please optimize an image before downloading.");
    }
});

// Real-time updates when the user changes any parameter
[widthInput, heightInput, qualityInput].forEach(input => {
    input.addEventListener("input", optimizeAndDisplay);
});