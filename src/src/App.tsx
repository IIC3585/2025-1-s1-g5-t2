import { useState, useEffect } from 'react';
import './App.css';
import { 
  apply_blur,
  apply_grayscale,
  apply_invert,
  apply_brighten,
  apply_flip_horizontal,
  apply_flip_vertical
 } from '../../server/t2-g5-iic3585/pkg/t2_g5_iic3585';
import { saveImage, getImages } from './indexeddb';

import Header from './components/Header'
import UploadSection from './components/UploadSection';
import ImagePreview from './components/ImagePreview';
import FilterControls from './components/FilterControls';
import SavedImagesCarousel from './components/SavedImagesCarousel';
import { usePWAInstall } from './hooks/usePWAInstall';


function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('none');
  const [savedImages, setSavedImages] = useState<{ id: number; data: string }[]>([]);
  const [sigma, setSigma] = useState<number>(5);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0); // For carousel navigation

  const { isInstallable, install } = usePWAInstall();

  useEffect(() => {
    // Automatically load saved images on app start
    const loadSavedImages = async () => {
      const images = await getImages();
      setSavedImages(images);
    };
    loadSavedImages();
  }, []);



  const applyFilter = () => {
    if (!originalImage) return;

    if (selectedFilter === 'none') {
      setProcessedImage(originalImage);
      return;
    }

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const uint8Array = new Uint8Array(imageData.data);

      let processedData: Uint8Array;
      try {
        switch (selectedFilter) {
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
          setProcessedImage(canvas.toDataURL());
        };
        processedImg.src = URL.createObjectURL(new Blob([processedData], { type: 'image/png' }));
      } catch (error) {
        console.error('Error applying filter:', error);
        alert('Error applying filter. Please try again with a different image or filter.');
      }
    };
    img.src = originalImage;
  };

  const handleSaveImage = async () => {
    if (processedImage) {
      // Save the image to IndexedDB
      await saveImage(processedImage);
  
      // Create a new image object with a unique ID
      const newImage = { id: Date.now(), data: processedImage };
  
      // Prepend the new image to the savedImages array and set it as the first image in the carousel
      setSavedImages((prevImages) => [newImage, ...prevImages]);
      setCurrentImageIndex(0); // Show the newly saved image first
  
      alert('Imagen guardada con éxito.');
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % savedImages.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? savedImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="app-container">
      <Header />

      <UploadSection onUpload={(img) => {
        setOriginalImage(img);
        setProcessedImage(img);
      }} />

      {originalImage && (
        <ImagePreview originalImage={originalImage} processedImage={processedImage} />
      )}

      {originalImage && (
        <FilterControls
          selectedFilter={selectedFilter}
          sigma={sigma}
          onFilterChange={setSelectedFilter}
          onSigmaChange={setSigma}
          onApply={applyFilter}
          onSave={handleSaveImage}
        />
      )}

      {savedImages.length > 0 && (
        <SavedImagesCarousel
          savedImages={savedImages}
          currentIndex={currentImageIndex}
          onNext={handleNextImage}
          onPrevious={handlePreviousImage}
        />
      )}

      {isInstallable && (
        <div className="install-section">
          <button className="install-button" onClick={install}>
            Install App
          </button>
        </div>
      )}

    </div>
  );
}

export default App;