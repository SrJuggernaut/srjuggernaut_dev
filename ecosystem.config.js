module.exports = {
  apps: [
    {
      name: 'srjuggernaut_dev',
      script: 'bun',
      args: 'run start',
      env: {
        NODE_ENV: 'development',
        PORT: process.env.PORT,
        NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
        NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        APPWRITE_KEY_SECRET: process.env.APPWRITE_KEY_SECRET,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL
      },
      env_production: {
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
      'post-deploy': 'pm2 --silent startOrRestart ecosystem.config.js',
      env: {
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
      'post-deploy': 'pm2 --silent startOrRestart ecosystem.config.js',
      env: {
        PORT: process.env.PORT,
        NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
        NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        APPWRITE_KEY_SECRET: process.env.APPWRITE_KEY_SECRET,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL
      }
    }
  }
}
