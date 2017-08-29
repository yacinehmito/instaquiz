{
  instaquiz-server =
    { config, pkgs, ... }:
    let
      nodejs = pkgs.nodejs-8_x;
    in
    {
      environment.systemPackages = [
        nodejs
      ];

      services = {
        apache-kafka = {
          enable = true;
          package = apache-kafka_0_10;
        };
      };

    };
}
