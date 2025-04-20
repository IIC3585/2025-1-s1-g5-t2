#!/bin/bash

# Compilar WASM
echo "🔧 Compilando código Rust con wasm-pack..."
cd server/t2-g5-iic3585 || exit
wasm-pack build || exit

# Volver al frontend y ejecutar Vite
cd ../../src || exit
echo "🚀 Iniciando Vite Dev Server..."
npm run dev
