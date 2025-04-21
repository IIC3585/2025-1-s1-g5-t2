import { useEffect, useState } from 'react';
import { getImages, saveImage } from '../indexeddb';

export function useSavedImages() {
  const [savedImages, setSavedImages] = useState<{ id: number; data: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    const images = await getImages();
    setSavedImages(images);
  };

  const saveImageToDB = async (img: string) => {
    await saveImage(img);
    const newImage = { id: Date.now(), data: img };
    setSavedImages((prev) => [newImage, ...prev]);
    setCurrentIndex(0);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % savedImages.length);
  };

  const previous = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? savedImages.length - 1 : prev - 1
    );
  };

  return {
    savedImages,
    currentIndex,
    saveImageToDB,
    next,
    previous
  };
}
