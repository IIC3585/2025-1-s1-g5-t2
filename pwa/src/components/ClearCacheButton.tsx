interface ClearCacheButtonProps {
    onClearImages: () => Promise<void>;
  }
  
  export const ClearCacheButton = ({ onClearImages }: ClearCacheButtonProps) => {
    const handleClear = async () => {
      const confirmed = window.confirm(
        '¿Estás seguro de eliminar todas las imágenes guardadas? Esto también puede borrar el caché.'
      );
  
      if (!confirmed) return;
  
      await onClearImages();
  
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((name) => caches.delete(name)));
        console.log('[App] Caché eliminado');
      }
  
      alert('Imágenes y caché eliminados correctamente.');
    };
  
    return (
      <button className="apply-button" style={{ marginTop: '1rem' }} onClick={handleClear}>
        🧹 Reiniciar caché
      </button>
    );
  };