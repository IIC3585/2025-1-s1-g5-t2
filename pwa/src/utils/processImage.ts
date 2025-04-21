import {
    apply_blur,
    apply_grayscale,
    apply_invert,
    apply_brighten,
    apply_flip_horizontal,
    apply_flip_vertical
  } from '../../../server/t2-g5-iic3585/pkg/t2_g5_iic3585';

  export async function processImage(
    base64Image: string,
    filter: string,
    sigma: number
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('No context');
  
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const uint8Array = new Uint8Array(imageData.data);
  
        let processedData: Uint8Array;
  
        try {
          switch (filter) {
            case 'blur':
              processedData = new Uint8Array(apply_blur(uint8Array, canvas.width, canvas.height, sigma));
              break;
            case 'grayscale':
              processedData = new Uint8Array(apply_grayscale(uint8Array, canvas.width, canvas.height));
              break;
            case 'invert':
              processedData = new Uint8Array(apply_invert(uint8Array, canvas.width, canvas.height));
              break;
            case 'brighten':
              processedData = new Uint8Array(apply_brighten(uint8Array, canvas.width, canvas.height, sigma));
              break;
            case 'flip_horizontal':
              processedData = new Uint8Array(apply_flip_horizontal(uint8Array, canvas.width, canvas.height));
              break;
            case 'flip_vertical':
              processedData = new Uint8Array(apply_flip_vertical(uint8Array, canvas.width, canvas.height));
              break;
            default:
              processedData = uint8Array;
          }
  
          const processedImg = new Image();
          processedImg.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(processedImg, 0, 0);
            const newImage = canvas.toDataURL();
            resolve(newImage);
          };
          processedImg.onerror = () => reject('Error loading processed image');
          processedImg.src = URL.createObjectURL(new Blob([processedData], { type: 'image/png' }));
        } catch (err) {
          reject(err);
        }
      };
  
      img.onerror = () => reject('Error loading input image');
      img.src = base64Image;
    });
  }
  