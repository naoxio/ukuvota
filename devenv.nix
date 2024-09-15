{ pkgs, ... }:

{
  # Enable JavaScript language support
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_20;
    pnpm.enable = true;
  };

  # Additional packages
  packages = with pkgs; [
    git
    pkg-config
    openssl
    cmake
    wayland
    wayland-protocols
    libxkbcommon
    libGL
    vulkan-loader
    vulkan-tools
    vulkan-headers
    libglvnd
    llvmPackages.bintools
    rustc
    cargo
    rustfmt
    clippy
    rust-analyzer
    trunk
    wasm-bindgen-cli
    lld
    curl
    wget
    file
    xdotool
    libayatana-appindicator
    librsvg
    gtk3
    gtk3.dev
    webkitgtk
    glib
    glib.dev
    cairo
    cairo.dev
    pango
    pango.dev
    atk
    atk.dev
    gdk-pixbuf
    gdk-pixbuf.dev
    libsoup
    libsoup.dev
    appimage-run
    fuse
    gcc
  ];

  env = {
    LD_LIBRARY_PATH = with pkgs; lib.makeLibraryPath [
      wayland
      libxkbcommon
      vulkan-loader
      libGL
      libglvnd
      gtk3
      webkitgtk
      glib
      cairo
      pango
      atk
      gdk-pixbuf
      librsvg
      libsoup
      fuse
    ];
    RUST_BACKTRACE = "1";
    PKG_CONFIG_PATH = with pkgs; lib.makeSearchPathOutput "dev" "lib/pkgconfig" [
      glib
      gtk3
      webkitgtk
      cairo
      pango
      atk
      gdk-pixbuf
      librsvg
      libsoup
    ];
  };

  enterShell = ''
    echo "Tauri development environment ready!"
    echo "You can now use 'cargo' to build your project."
    export PATH="${pkgs.lld}/bin:$PATH"
    export GDK_PIXBUF_MODULE_FILE="${pkgs.librsvg.out}/lib/gdk-pixbuf-2.0/2.10.0/loaders.cache"
    export XDG_DATA_DIRS=$XDG_DATA_DIRS:${pkgs.gsettings-desktop-schemas}/share/gsettings-schemas/${pkgs.gsettings-desktop-schemas.name}:${pkgs.gtk3}/share/gsettings-schemas/${pkgs.gtk3.name}
  '';
}