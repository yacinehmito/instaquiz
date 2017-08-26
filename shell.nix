let config = {
  zshHook = ''
    # Set NODE_ENV
    export NODE_ENV=development

    # Add dependencies' executables to PATH
    dir=$(pwd)
    export PATH=$dir/node_modules/.bin:$PATH
  '';
  pkgs = (import <nixpkgs> {});
};
in (import ./. config)
