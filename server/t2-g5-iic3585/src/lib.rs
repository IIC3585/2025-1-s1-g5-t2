mod utils;

use wasm_bindgen::prelude::*;
use image::{DynamicImage, ImageFormat, ImageBuffer, Rgba};
use std::io::Cursor;

/// Función auxiliar para codificar la imagen como PNG y devolverla como Vec<u8>
fn encode_image_to_vec(img: DynamicImage) -> Vec<u8> {
    let mut buffer = Vec::new();
    img.write_to(&mut Cursor::new(&mut buffer), ImageFormat::Png)
        .expect("Failed to encode image");
    buffer
}

/// Convierte datos de píxeles RGBA en un buffer de imagen
fn rgba_to_image(width: u32, height: u32, data: &[u8]) -> DynamicImage {
    let img_buffer = ImageBuffer::<Rgba<u8>, _>::from_raw(width, height, data.to_vec())
        .expect("Failed to create image buffer");
    DynamicImage::ImageRgba8(img_buffer)
}

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello from Rust + WebAssembly, {}!", name)
}

/// Recibe una imagen como bytes RGBA, aplica blur y devuelve los nuevos bytes.
#[wasm_bindgen]
pub fn apply_blur(image_data: &[u8], width: u32, height: u32, sigma: f32) -> Vec<u8> {
    let img = rgba_to_image(width, height, image_data);
    let blurred = img.blur(sigma);
    encode_image_to_vec(blurred)
}

/// Convierte a blanco y negro (luma).
#[wasm_bindgen]
pub fn apply_grayscale(image_data: &[u8], width: u32, height: u32) -> Vec<u8> {
    let img = rgba_to_image(width, height, image_data);
    let gray = img.grayscale();
    encode_image_to_vec(gray)
}

/// Filtro personalizado: invertir colores
#[wasm_bindgen]
pub fn apply_invert(image_data: &[u8], width: u32, height: u32) -> Vec<u8> {
    let mut img = rgba_to_image(width, height, image_data);
    img.invert();
    encode_image_to_vec(img)
}