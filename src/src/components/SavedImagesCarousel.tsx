interface SavedImagesCarouselProps {
    savedImages: { id: number; data: string }[];
    currentIndex: number;
    onNext: () => void;
    onPrevious: () => void;
  }
  
  const SavedImagesCarousel = ({
    savedImages,
    currentIndex,
    onNext,
    onPrevious
  }: SavedImagesCarouselProps) => {
    const current = savedImages[currentIndex];
  
    return (
      <div className="saved-images" style={{ marginTop: '50px' }}>
        <h3>Saved Images</h3>
        <div className="carousel">
          <button className="carousel-arrow left" onClick={onPrevious}>
            <span className="arrow">←</span>
          </button>
          <div className="carousel-image">
            <img src={current.data} alt={`Saved ${current.id}`} />
            <button
              className="download-button"
              onClick={() => {
                const link = document.createElement('a');
                link.href = current.data;
                link.download = `saved-image-${current.id}.png`;
                link.click();
              }}
            >
              Download
            </button>
          </div>
          <button className="carousel-arrow right" onClick={onNext}>
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    );
  };
  
  export default SavedImagesCarousel;
  