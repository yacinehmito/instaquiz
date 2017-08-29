{
  instaquiz-server =
    { config, pkgs, ... }:
    {
      deployment = {
        targetEnv = "container";
        container.host = "localhost";
      };
    };
}
