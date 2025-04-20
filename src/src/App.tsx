import { useState } from 'react';
import './App.css';

import Header from './components/Header'
import UploadSection from './components/UploadSection';
import ImagePreview from './components/ImagePreview';
import FilterControls from './components/FilterControls';
import SavedImagesCarousel from './components/SavedImagesCarousel';

import { usePWAInstall } from './hooks/usePWAInstall';
import { useImageHistory } from './hooks/useImageHistory';
import { useSavedImages } from './hooks/useSavedImages';

import { processImage } from './utils/processImage';


function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('none');
  const [sigma, setSigma] = useState<number>(5);

  const { isInstallable, install } = usePWAInstall();

  const {
    currentImage: processedImage,
    pushImage,
    undo: undoLast,
    reset: resetHistory,
    canUndo
  } = useImageHistory(originalImage);

  const {
    savedImages,
    currentIndex: currentImageIndex,
    saveImageToDB,
    next: handleNextImage,
    previous: handlePreviousImage
  } = useSavedImages();
  

  const applyFilter = async () => {
    if (!processedImage || selectedFilter === 'none') return;
  
    try {
      const result = await processImage(processedImage, selectedFilter, sigma);
      pushImage(result);
    } catch (error) {
      console.error('Error applying filter:', error);
      alert('Error applying filter. Please try again with a different image or filter.');
    }
  };

  const handleSaveImage = async () => {
    if (processedImage) {
      await saveImageToDB(processedImage);
      alert('Imagen guardada con éxito.');
    }
  };

  return (
    <div className="app-container">
      <Header />

      <UploadSection onUpload={(img) => {
        setOriginalImage(img);
        resetHistory(img);
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
          onUndo={undoLast}
          canUndo={canUndo}
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