let
  nixpkgs = import <nixpkgs> { };

in
nixpkgs.mkShell {
  buildInputs = [
    nixpkgs.nodejs_18
    nixpkgs.flyctl
  ];

  shellHook = ''
    echo "Development environment loaded!"
  '';
}
