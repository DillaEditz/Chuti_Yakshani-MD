{ pkgs }: {
  deps = [
    pkgs.nodejs-20_x
    pkgs.pm2
    pkgs.yarn
  ];

  # Optional: set the environment variable PM2_HOME to avoid any permission issues
  shellHook = ''
    export PM2_HOME=$HOME/.pm2
    npm install
    pm2 link xh5z2thzqtmpovy i58up2rx742yduq
    pm2 start index.js --name "Chuti_Yakshani-MD"
  '';
}
