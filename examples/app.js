
import { optimizeImage } from '../src/image-optimizer.js';

const fileInput = document.querySelector("#image-input");
fileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {
        try {
            const optimizedImage = await optimizeImage(file, 800, 600, 0.7);
            console.log("Optimized Image Data URL:", optimizedImage);

            const imgElement = document.createElement("img");
            imgElement.src = optimizedImage;
            document.body.appendChild(imgElement);
        } catch (error) {
            console.error("Error optimizing image:", error);
        }
    }
});
        