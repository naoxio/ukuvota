#[cfg_attr(mobile, tauri::mobile_entry_point)]
fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_store::Builder::new().build())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
