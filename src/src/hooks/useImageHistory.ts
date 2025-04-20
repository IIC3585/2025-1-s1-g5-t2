import { useState } from 'react';

export function useImageHistory(initialImage: string | null = null) {
  const [history, setHistory] = useState<string[]>(initialImage ? [initialImage] : []);

  const currentImage = history[history.length - 1] || null;

  const pushImage = (newImage: string) => {
    setHistory((prev) => [...prev, newImage]);
  };

  const undo = () => {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1));
    } else {
      alert('No hay más imágenes para deshacer.');
    }
  };

  const reset = (newBase: string) => {
    setHistory([newBase]);
  };

  const canUndo = history.length > 1;

  return {
    currentImage,
    pushImage,
    undo,
    reset,
    canUndo
  };
}
