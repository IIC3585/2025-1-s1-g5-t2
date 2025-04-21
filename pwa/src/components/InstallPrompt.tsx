import { useEffect, useState } from 'react';

function isIOS() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isInStandaloneMode() {
  return 'standalone' in window.navigator && (window.navigator as any).standalone;
}

export const InstallPrompt = ({ install, isInstallable }: {
  install: () => void,
  isInstallable: boolean
}) => {
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);

  useEffect(() => {
    if (isIOS() && !isInStandaloneMode()) {
      setShowIOSPrompt(true);
    }
  }, []);

  return (
    <div style={{ marginTop: '1rem' }}>
      {isInstallable && (
        <button className="install-button" onClick={install}>
          Instalar App
        </button>
      )}

      {showIOSPrompt && (
        <div className="ios-install-banner">
          <p>Para instalar la app en iOS:</p>
          <p>
            Pulsa el botón de compartir <span role="img" aria-label="share">🔗
            </span> y selecciona <strong>“Agregar a pantalla de inicio”</strong>.
          </p>
        </div>
      )}
    </div>
  );
};