# ImageOptimizerJS

JavaScript Function for Image Optimization

## Overview

`ImageOptimizerJS` is a lightweight JavaScript function designed to optimize images by resizing them and reducing their quality, helping to decrease overall page size. The tool is especially useful when large images are loaded at smaller dimensions, saving bandwidth and improving page load times.

## `optimizeImage` Function

The `optimizeImage` function takes an image file, maximum width, maximum height, and quality as inputs. It resizes the image while maintaining its aspect ratio and reduces its quality using the HTML5 Canvas API. The function returns a promise that resolves to a base64 data URL of the optimized image.

### Function Signature

```javascript
optimizeImage(file, maxWidth, maxHeight, quality) => Promise<string>
```


## Examples

-[Example 1 - Upload and Optimize](https://mohammed2raja.github.io/ImageOptimizerJS/) - Try uploading and optimizing an image in real-time.
