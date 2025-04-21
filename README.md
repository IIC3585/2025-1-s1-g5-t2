# 2025-1-s1-g5-t2

# 🚀 Go to: [Image Filter App](https://iic3585.github.io/2025-1-s1-g5-t2/)

## Deploy automático activo en GitHub Pages

[![Deploy status](https://github.com/IIC3585/2025-1-s1-g5-t2/actions/workflows/deploy-gh-pages.yml/badge.svg)](https://github.com/IIC3585/2025-1-s1-g5-t2/actions/workflows/deploy-gh-pages.yml)



## Requisitos Previos Prueba Local

- [Rust](https://www.rust-lang.org/tools/install)
- [Node.js](https://nodejs.org/) (incluye npm)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)

## Instalación Local

1. Instalar Rust siguiendo las instrucciones en [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

2. Instalar wasm-pack:
```bash
cargo install wasm-pack
```

3. Navegar al directorio del proyecto (frontend):
```bash
cd pwa
```

4. Instalar las dependencias de Node.js:
```bash
npm install
```

## Ejecutar el Proyecto en Local

1. Desde la carpeta principal, habilitar el comando de ejecución:
```bash
chmod +x build.sh
```

2. Construir/compilar el paquete de exportación para las funciones wasm y correr el servidor local:
```bash
./build.sh
```

3. Si ya lo compilaste alguna vez y no hay cambios en `lib.rs`, puedes hacer lo siguiente:
```bash
chmod +x dev.sh
./dev.sh
```

El servidor se iniciará y podrás acceder a la aplicación en tu navegador, en el puerto que se indica en la terminal.

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
