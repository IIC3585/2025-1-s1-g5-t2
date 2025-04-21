import { useEffect, useState } from 'react';

interface SavedImagesCarouselProps {
  savedImages: { id: number; data: string }[];
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onUseImage: (data: string) => void;
  onDeleteImage: (id: number) => void;
}

const SavedImagesCarousel = ({
  savedImages,
  currentIndex,
  onNext,
  onPrevious,
  onUseImage,
  onDeleteImage
}: SavedImagesCarouselProps) => {
  const [animationClass, setAnimationClass] = useState('slide-in');
  const [displayIndex, setDisplayIndex] = useState(currentIndex);

  useEffect(() => {
    setAnimationClass('slide-out');
    const timeout = setTimeout(() => {
      setDisplayIndex(currentIndex);
      setAnimationClass('slide-in');
    }, 300);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const displayed = savedImages[displayIndex];

  return (
    <div className="saved-images">
      <h3>Saved Images</h3>
      <div className="carousel">
        <button className="carousel-arrow left" onClick={onPrevious}>
          <span className="arrow">←</span>
        </button>

        <div className="carousel-image-wrapper">
          <img
            key={displayed.id}
            src={displayed.data}
            alt={`Saved ${displayed.id}`}
            className={`carousel-image ${animationClass}`}
          />

          <div className="carousel-buttons">
            <button
              className="use-image-button"
              onClick={() => {
                const confirmed = window.confirm(
                  '¿Estás seguro que deseas usar esta imagen? Se perderá el progreso actual.'
                );
                if (confirmed) onUseImage(displayed.data);
              }}
            >
              Utilizar esta imagen
            </button>

            <a
              className="download-button"
              href={displayed.data}
              download={`saved-image-${displayed.id}.png`}
            >
              Descargar
            </a>

            <button
              className="download-button"
              onClick={() => {
                const confirmed = window.confirm('¿Eliminar esta imagen guardada?');
                if (confirmed) onDeleteImage(displayed.id);
              }}
            >
              Eliminar
            </button>
          </div>
        </div>

        <button className="carousel-arrow right" onClick={onNext}>
          <span className="arrow">→</span>
        </button>
      </div>

      <p style={{ marginTop: '0.5rem', color: '#555' }}>
        Imagen {displayIndex + 1} de {savedImages.length}
      </p>
    </div>
  );
};

export default SavedImagesCarousel;
