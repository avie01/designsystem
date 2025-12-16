module.exports = {
  apps: [
    {
      name: 'odl-table-demo',
      script: 'npm',
      args: 'run dev',
      watch: false,
      autorestart: true,
      restart_delay: 2000,
      max_restarts: 10,
      min_uptime: '10s',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      error_file: './logs/error.log',
      out_file: './logs/output.log',
      log_file: './logs/combined.log',
      time: true,
    },
  ],
};