// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: "strapi-prod",
        script: "npm",
        args: "start",
        env: {
          NODE_ENV: "production",
          PORT: 3000,
        },
      },
    ],
  };
  