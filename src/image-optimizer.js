/**
 * Optimizes an image by resizing it to specified dimensions and reducing its quality.
 * @param {File} file - The image file to be optimized.
 * @param {number} maxWidth - The maximum width for the resized image.
 * @param {number} maxHeight - The maximum height for the resized image.
 * @param {number} quality - The quality level (0 to 1) for compression.
 * @returns {Promise<string>} - A Promise that resolves to a data URL of the optimized image.
 */
export function optimizeImage(file, maxWidth, maxHeight, quality) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            
            img.onload = () => {
                // Calculate new dimensions
                let width = img.width;
                let height = img.height;
                
                if (width > maxWidth || height > maxHeight) {
                    const aspectRatio = width / height;
                    if (width > height) {
                        width = maxWidth;
                        height = width / aspectRatio;
                    } else {
                        height = maxHeight;
                        width = height * aspectRatio;
                    }
                }

                // Create a canvas element
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                const dataUrl = canvas.toDataURL("image/jpeg", quality);
                resolve(dataUrl);
            };

            img.onerror = () => reject(new Error("Image loading failed."));
        };

        reader.onerror = () => reject(new Error("File reading failed."));
        reader.readAsDataURL(file);
    });
}