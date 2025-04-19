mod utils;

use wasm_bindgen::prelude::*;
use image::{DynamicImage, ImageFormat};

/// Función auxiliar para codificar la imagen como PNG y devolverla como Vec<u8>
fn encode_image_to_vec(img: DynamicImage) -> Vec<u8> {
    let mut buffer = Vec::new();
    img.write_to(&mut std::io::Cursor::new(&mut buffer), ImageFormat::Png)
        .expect("Failed to encode image");
    buffer
}

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello from Rust + WebAssembly, {}!", name)
}

/// Recibe una imagen como bytes (JS ArrayBuffer), aplica blur y devuelve los nuevos bytes.
#[wasm_bindgen]
pub fn apply_blur(image_data: &[u8], sigma: f32) -> Vec<u8> {
    let img = image::load_from_memory(image_data).expect("Failed to load image");
    let blurred = img.blur(sigma);
    encode_image_to_vec(blurred)
}

/// Convierte a blanco y negro (luma).
#[wasm_bindgen]
pub fn apply_grayscale(image_data: &[u8]) -> Vec<u8> {
    let img = image::load_from_memory(image_data).expect("Failed to load image");
    let gray = img.grayscale();
    encode_image_to_vec(gray)
}

/// Filtro personalizado: invertir colores
#[wasm_bindgen]
pub fn apply_invert(image_data: &[u8]) -> Vec<u8> {
    let mut img = image::load_from_memory(image_data).expect("Failed to load image");
    img.invert();
    encode_image_to_vec(img)
}