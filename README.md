# 2025-1-s1-g5-t2

## Requisitos Previos

- [Rust](https://www.rust-lang.org/tools/install)
- [Node.js](https://nodejs.org/) (incluye npm)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)

## Instalación

1. Instalar Rust siguiendo las instrucciones en [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

2. Instalar wasm-pack:
```bash
cargo install wasm-pack
```

3. Navegar al directorio del proyecto:
```bash
cd src
```

4. Instalar las dependencias de Node.js:
```bash
npm install
```

## Ejecutar el Proyecto

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

El servidor se iniciará y podrás acceder a la aplicación en tu navegador.

## Funcionamiento de las Funciones

El proyecto demuestra la integración entre Rust y TypeScript/React a través de WebAssembly. Aquí se explica cómo funciona, por ejemplo, la función `greet`:

1. **Declaración en Rust (`lib.rs`)**:
   - La función `greet` está definida en el archivo `server/t2-g5-iic3585/src/lib.rs`
   - Está decorada con `#[wasm_bindgen]` para hacerla accesible desde JavaScript/TypeScript
   - Recibe un parámetro `name` de tipo `&str` y retorna un `String`
   - La función formatea un mensaje de saludo usando el nombre proporcionado

2. **Compilación a WebAssembly**:
   - Cuando se compila el proyecto Rust (ejecutando `wasm-pack build` dentro de la carpeta server/t2-g5-iic3585), `wasm-pack` genera un paquete WebAssembly
   - Este paquete se encuentra en `server/t2-g5-iic3585/pkg/`
   - Contiene las definiciones de tipos TypeScript y el código WebAssembly compilado

3. **Uso en TypeScript/React (`App.tsx`)**:
   - La función se importa desde el paquete generado: `import { greet } from '../../server/t2-g5-iic3585/pkg/t2_g5_iic3585'`
   - Se puede usar directamente en el componente React como una función normal de TypeScript
   - En el ejemplo, se llama con el string "wena los chiquillossss" y el resultado se muestra en el DOM

Este flujo demuestra cómo Rust puede ser usado para implementar lógica que luego se puede consumir de manera segura y eficiente desde una aplicación web moderna.

## Uso de las Funciones de Procesamiento de Imágenes

El proyecto incluye varias funciones de procesamiento de imágenes implementadas en Rust y accesibles a través de WebAssembly. Aquí se explica cómo usar cada una de ellas:

### Importación del Módulo

Primero, importa las funciones necesarias en tu componente React:

```typescript
import { apply_blur, apply_grayscale, apply_invert } from '../../server/t2-g5-iic3585/pkg/t2_g5_iic3585';
```

### Funciones Disponibles

1. **Aplicar Blur (Desenfoque)**
   ```typescript
   // image_data: Uint8Array - Datos de la imagen en formato de bytes
   // sigma: number - Intensidad del desenfoque (mayor valor = más desenfoque)
   const blurredImage = apply_blur(imageData, 2.0);
   ```

2. **Convertir a Escala de Grises**
   ```typescript
   // image_data: Uint8Array - Datos de la imagen en formato de bytes
   const grayscaleImage = apply_grayscale(imageData);
   ```

3. **Invertir Colores**
   ```typescript
   // image_data: Uint8Array - Datos de la imagen en formato de bytes
   const invertedImage = apply_invert(imageData);
   ```

### Ejemplo de Uso Completo

```typescript
import { useState } from 'react';
import { apply_blur, apply_grayscale, apply_invert } from '../../server/t2-g5-iic3585/pkg/t2_g5_iic3585';

function ImageProcessor() {
  const [imageData, setImageData] = useState<Uint8Array | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    setImageData(uint8Array);
  };

  const processImage = (processor: (data: Uint8Array) => Uint8Array) => {
    if (!imageData) return;
    const processedData = processor(imageData);
    // Aquí puedes mostrar la imagen procesada
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={() => processImage(apply_blur)}>Aplicar Blur</button>
      <button onClick={() => processImage(apply_grayscale)}>Escala de Grises</button>
      <button onClick={() => processImage(apply_invert)}>Invertir Colores</button>
    </div>
  );
}
```

### Consideraciones Importantes

1. **Formato de Datos**: Las funciones esperan los datos de la imagen en formato `Uint8Array`. Asegúrate de convertir correctamente los datos de la imagen antes de pasarlos a las funciones.

2. **Rendimiento**: Las operaciones de procesamiento de imágenes pueden ser intensivas. Considera usar Web Workers para mantener la interfaz de usuario responsiva.

3. **Manejo de Errores**: Implementa el manejo de errores adecuado al procesar las imágenes.

4. **Visualización**: Después de procesar la imagen, necesitarás convertir los datos procesados de vuelta a un formato que pueda ser mostrado en el navegador (por ejemplo, usando `URL.createObjectURL` con un Blob).

