let
  nixpkgs = import <nixpkgs> { };

in
nixpkgs.mkShell {
  buildInputs = [
    nixpkgs.nodejs_18
  ];

  shellHook = ''
    echo "Development environment loaded!"
  '';
}
