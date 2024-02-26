module.exports = {
  apps: [
    {
      name: process.env.APP_NAME,
      script: 'bun',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT,
        NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
        NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        APPWRITE_KEY_SECRET: process.env.APPWRITE_KEY_SECRET,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL
      }
    }
  ],
  deploy: {
    production: {
      user: process.env.SSH_USER,
      host: process.env.SSH_HOST,
      ref: 'origin/main',
      repo: 'https://github.com/SrJuggernaut/srjuggernaut_dev',
      path: process.env.DEPLOY_PATH,
      'post-deploy': 'pm2 --silent startOrRestart ecosystem.config.js && pm2 save',
      env: {
        APP_NAME: process.env.APP_NAME,
        PORT: process.env.PORT,
        NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
        NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        APPWRITE_KEY_SECRET: process.env.APPWRITE_KEY_SECRET,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL
      }
    },
    preview: {
      user: process.env.SSH_USER,
      host: process.env.SSH_HOST,
      ref: 'origin/develop',
      repo: 'https://github.com/SrJuggernaut/srjuggernaut_dev',
      path: process.env.DEPLOY_PATH,
      'post-deploy': 'pm2 --silent startOrRestart ecosystem.config.js && pm2 save',
      env: {
        APP_NAME: process.env.APP_NAME,
        PORT: process.env.PORT,
        NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
        NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        APPWRITE_KEY_SECRET: process.env.APPWRITE_KEY_SECRET,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL
      }
    }
  }
}
