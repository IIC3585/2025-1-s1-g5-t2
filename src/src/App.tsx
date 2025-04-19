import { useState, useRef } from 'react'
import './App.css'
import { apply_blur, apply_grayscale, apply_invert } from '../../server/t2-g5-iic3585/pkg/t2_g5_iic3585'

function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<string>('none')
  const [sigma, setSigma] = useState<number>(5)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string)
      setProcessedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const applyFilter = () => {
    if (!originalImage) return

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      
      // Convert ImageData to Uint8Array
      const uint8Array = new Uint8Array(imageData.data)
      
      let processedData: Uint8Array
      try {
        switch (selectedFilter) {
          case 'blur':
            processedData = new Uint8Array(apply_blur(uint8Array, canvas.width, canvas.height, sigma))
            break
          case 'grayscale':
            processedData = new Uint8Array(apply_grayscale(uint8Array, canvas.width, canvas.height))
            break
          case 'invert':
            processedData = new Uint8Array(apply_invert(uint8Array, canvas.width, canvas.height))
            break
          default:
            processedData = uint8Array
        }

        // Create a new image from the processed data
        const processedImg = new Image()
        processedImg.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(processedImg, 0, 0)
          setProcessedImage(canvas.toDataURL())
        }
        processedImg.src = URL.createObjectURL(new Blob([processedData], { type: 'image/png' }))
      } catch (error) {
        console.error('Error applying filter:', error)
        alert('Error applying filter. Please try again with a different image or filter.')
      }
    }
    img.src = originalImage
  }

  return (
    <div className="app-container">
      <div className="header">
        <h1>Image Filter App</h1>
        <p>Upload an image and apply various filters using WebAssembly</p>
        <p>Made by: Group 5 - IIC3585 👨🏽‍💻🤪</p>
      </div>

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

      {originalImage && (
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
      )}

      {originalImage && (
        <div className="controls">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="none">No Filter</option>
            <option value="blur">Blur</option>
            <option value="grayscale">Grayscale</option>
            <option value="invert">Invert Colors</option>
          </select>

          {selectedFilter === 'blur' && (
            <div className="sigma-control">
              <label>Blur Intensity: {sigma}</label>
              <input
                type="range"
                min="1"
                max="20"
                value={sigma}
                onChange={(e) => setSigma(Number(e.target.value))}
              />
            </div>
          )}

          <button className="apply-button" onClick={applyFilter}>
            Apply Filter
          </button>
        </div>
      )}
    </div>
  )
}

export default App
