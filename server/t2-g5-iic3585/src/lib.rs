mod utils;

use wasm_bindgen::prelude::*;
use image::{DynamicImage, ImageFormat, ImageBuffer, Rgba};
use std::io::Cursor;

fn encode_image_to_vec(img: DynamicImage) -> Vec<u8> {
    let mut buffer = Vec::new();
    img.write_to(&mut Cursor::new(&mut buffer), ImageFormat::Png)
        .expect("Failed to encode image");
    buffer
}

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

#[wasm_bindgen]
pub fn apply_blur(image_data: &[u8], width: u32, height: u32, sigma: f32) -> Vec<u8> {
    let img = rgba_to_image(width, height, image_data);
    let blurred = img.blur(sigma);
    encode_image_to_vec(blurred)
}

#[wasm_bindgen]
pub fn apply_grayscale(image_data: &[u8], width: u32, height: u32) -> Vec<u8> {
    let img = rgba_to_image(width, height, image_data);
    let gray = img.grayscale();
    encode_image_to_vec(gray)
}

#[wasm_bindgen]
pub fn apply_invert(image_data: &[u8], width: u32, height: u32) -> Vec<u8> {
    let mut img = rgba_to_image(width, height, image_data);
    img.invert();
    encode_image_to_vec(img)
}

#[wasm_bindgen]
pub fn apply_brighten(image_data: &[u8], width: u32, height: u32, value: i32) -> Vec<u8> {
    let img = rgba_to_image(width, height, image_data);
    let bright = img.brighten(value);
    encode_image_to_vec(bright)
}

#[wasm_bindgen]
pub fn apply_flip_horizontal(image_data: &[u8], width: u32, height: u32) -> Vec<u8> {
    let img = rgba_to_image(width, height, image_data);
    let flipped = img.fliph();
    encode_image_to_vec(flipped)
}

#[wasm_bindgen]
pub fn apply_flip_vertical(image_data: &[u8], width: u32, height: u32) -> Vec<u8> {
    let img = rgba_to_image(width, height, image_data);
    let flipped = img.flipv();
    encode_image_to_vec(flipped)
}