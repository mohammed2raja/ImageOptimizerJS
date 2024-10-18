import { optimizeImage } from '../../src/image-optimizer.js';

// Elements
const optimizeButton = document.querySelector("#optimize-images-btn");
const imageGallery = document.querySelector("#image-gallery");

// Function to load images from Lorem Picsum
async function loadImages() {
    const imageUrls = [
        'https://picsum.photos/800/600?random=1',
        'https://picsum.photos/800/600?random=2',
        'https://picsum.photos/800/600?random=3'
    ];

    imageUrls.forEach(url => {
        const imgContainer = document.createElement("div");
        imgContainer.className = "container";

        const imgElement = document.createElement("img");
        imgElement.src = url;
        imgElement.alt = "Random Image";
        imgElement.className = "resizable-image";

        imgContainer.appendChild(imgElement);
        imageGallery.appendChild(imgContainer);
    });
}

// Function to optimize all images
async function optimizeAllImages() {
    const images = document.querySelectorAll(".resizable-image");

    for (const img of images) {
        try {
            const response = await fetch(img.src);
            const blob = await response.blob();
            const file = new File([blob], "image.jpg", { type: blob.type });

            // Optimize the image to fit within the container dimensions (400px width in this case)
            const optimizedImage = await optimizeImage(file, 400, 400, 0.7);

            // Update the image source with the optimized version
            img.src = optimizedImage;
            console.log("Optimized Image Data URL:", optimizedImage);
        } catch (error) {
            console.error("Error optimizing image:", error);
        }
    }

    alert("All images have been optimized to fit the container!");
}

// Event listeners
optimizeButton.addEventListener("click", optimizeAllImages);
window.addEventListener("load", loadImages);