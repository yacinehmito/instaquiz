{ pkgs, zshHook ? "" }:

with pkgs;
stdenv.mkDerivation rec {
  src = ./.;
  name = "instaquiz";
  buildInputs = [
    nodejs-8_x
    python2 # for node-gyp
  ];
  inherit zshHook;
}

