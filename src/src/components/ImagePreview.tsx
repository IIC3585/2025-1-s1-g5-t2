interface ImagePreviewProps {
    originalImage: string;
    processedImage: string | null;
  }
  
  const ImagePreview = ({ originalImage, processedImage }: ImagePreviewProps) => {
    return (
      <div className="image-container">
        <div className="image-preview">
          <h3>Original Image</h3>
          <img src={originalImage} alt="Original" />
        </div>
        <div className="image-preview">
          <h3>Processed Image</h3>
          <img src={processedImage || ''} alt="Processed" />
        </div>
      </div>
    );
  };
  
  export default ImagePreview;
  