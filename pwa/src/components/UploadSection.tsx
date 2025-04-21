import { useRef } from 'react';

interface UploadSectionProps {
  onUpload: (imageDataUrl: string) => void;
}

const UploadSection = ({ onUpload }: UploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onUpload(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="upload-section">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <button
        className="upload-button"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload Image
      </button>
    </div>
  );
};

export default UploadSection;
