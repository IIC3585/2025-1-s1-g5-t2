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

