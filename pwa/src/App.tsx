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
    previous: handlePreviousImage,
    clearAllImages,
    deleteImageFromDB
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
          processedImage={processedImage}
        />
      )}

      {savedImages.length > 0 && (
        <SavedImagesCarousel
          savedImages={savedImages}
          currentIndex={currentImageIndex}
          onNext={handleNextImage}
          onPrevious={handlePreviousImage}
          onUseImage={(img) => {
            setOriginalImage(img);
            resetHistory(img);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onDeleteImage={(id) => {
            deleteImageFromDB(id);
          }}
        />
      )}

      <button
        className="apply-button"
        style={{ marginTop: '1rem' }}
        onClick={async () => {
          const confirmed = window.confirm('¿Estás seguro de eliminar todas las imágenes guardadas? Esto también puede borrar el caché.');
          if (confirmed) {
            await clearAllImages();

            // Opcional: eliminar caché de service worker
            if ('caches' in window) {
              const cacheNames = await caches.keys();
              await Promise.all(cacheNames.map(name => caches.delete(name)));
              console.log('[App] Caché eliminado');
            }

            alert('Imágenes y caché eliminados correctamente.');
          }
        }}
      >
        🧹 Reiniciar caché
      </button>

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