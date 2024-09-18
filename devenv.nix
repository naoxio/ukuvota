{ pkgs, ... }:

let
  # Create a custom WebKitGTK package that explicitly includes JavaScriptCoreGTK
  customWebKitGTK = pkgs.webkitgtk.overrideAttrs (oldAttrs: {
    buildInputs = oldAttrs.buildInputs ++ [ pkgs.glib.dev ];
    propagatedBuildInputs = oldAttrs.propagatedBuildInputs ++ [ pkgs.glib.dev ];
  });
in
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
    vulkan-loader
    vulkan-tools
    vulkan-headers
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
    customWebKitGTK
    customWebKitGTK.dev
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
    libsoup_3
    libsoup_3.dev
    harfbuzz
    libwebp
    enchant2
    libsecret
    libxslt
    nettle
    libtasn1
    p11-kit
    libidn
    sqlite
    appimage-run
    fuse
    gcc
  ];
  env = {
    LD_LIBRARY_PATH = with pkgs; lib.makeLibraryPath [
      wayland
      libxkbcommon
      vulkan-loader
      gtk3
      customWebKitGTK
      glib
      cairo
      pango
      atk
      gdk-pixbuf
      librsvg
      libsoup
      libsoup_3
      harfbuzz
      libwebp
      enchant2
      libsecret
      libxslt
      nettle
      libtasn1
      p11-kit
      libidn
      sqlite
      fuse
    ];
    RUST_BACKTRACE = "1";
    PKG_CONFIG_PATH = with pkgs; lib.makeSearchPathOutput "dev" "lib/pkgconfig" [
      glib
      gtk3
      customWebKitGTK
      cairo
      pango
      atk
      gdk-pixbuf
      librsvg
      libsoup
      libsoup_3
      harfbuzz
      libwebp
      enchant2
      libsecret
      libxslt
      wayland
      libxkbcommon
      libidn
      sqlite
      fuse
    ];
  };
  enterShell = ''
    echo "Tauri development environment ready!"
    export PATH="${pkgs.lld}/bin:$PATH"
    export GDK_PIXBUF_MODULE_FILE="${pkgs.librsvg.out}/lib/gdk-pixbuf-2.0/2.10.0/loaders.cache"
    export XDG_DATA_DIRS=$XDG_DATA_DIRS:${pkgs.gsettings-desktop-schemas}/share/gsettings-schemas/${pkgs.gsettings-desktop-schemas.name}:${pkgs.gtk3}/share/gsettings-schemas/${pkgs.gtk3.name}
  '';
}