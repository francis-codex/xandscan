# Deployment Guide

This guide covers different deployment options for the Xandeum pNode Analytics platform.

## Table of Contents

1. [Vercel Deployment](#vercel-deployment)
2. [Docker Deployment](#docker-deployment)
3. [Self-Hosted Deployment](#self-hosted-deployment)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment Steps](#post-deployment-steps)

## Vercel Deployment

Vercel is the recommended platform for deploying Next.js applications.

### Prerequisites

- GitHub/GitLab/Bitbucket account
- Vercel account (free tier available)

### Steps

1. **Push your code to Git**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository
   - Vercel will auto-detect Next.js

3. **Configure environment variables**

Add these in Vercel dashboard under Settings > Environment Variables:

```
NEXT_PUBLIC_XANDEUM_RPC_URL=https://api.xandeum.network
NEXT_PUBLIC_XANDEUM_DEVNET_RPC_URL=https://devnet.xandeum.network
NEXT_PUBLIC_APP_VERSION=1.0.0
```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `<project-name>.vercel.app`

### Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Custom Domain

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

## Docker Deployment

### Prerequisites

- Docker installed (20.10+)
- Docker Compose (optional, for easier management)

### Build and Run

#### Option 1: Docker

```bash
# Build the image
docker build -t xandeum-analytics .

# Run the container
docker run -d \
  --name xandeum-analytics \
  -p 3000:3000 \
  -e NEXT_PUBLIC_XANDEUM_RPC_URL=https://api.xandeum.network \
  -e NEXT_PUBLIC_XANDEUM_DEVNET_RPC_URL=https://devnet.xandeum.network \
  -e NEXT_PUBLIC_APP_VERSION=1.0.0 \
  xandeum-analytics

# Check logs
docker logs xandeum-analytics

# Stop container
docker stop xandeum-analytics

# Remove container
docker rm xandeum-analytics
```

#### Option 2: Docker Compose

1. **Create .env file**
```bash
cp .env.example .env
# Edit .env with your values
```

2. **Start services**
```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

### Docker Registry

Push to Docker Hub or private registry:

```bash
# Tag image
docker tag xandeum-analytics your-registry/xandeum-analytics:1.0.0

# Push to registry
docker push your-registry/xandeum-analytics:1.0.0

# Pull and run on server
docker pull your-registry/xandeum-analytics:1.0.0
docker run -d -p 3000:3000 your-registry/xandeum-analytics:1.0.0
```

## Self-Hosted Deployment

### Prerequisites

- Node.js 20.x or higher
- PM2 or similar process manager
- Nginx (recommended for reverse proxy)

### Steps

1. **Clone and build**
```bash
git clone <your-repo-url>
cd xandeum-analytics
npm install
npm run build
```

2. **Install PM2**
```bash
npm install -g pm2
```

3. **Create PM2 ecosystem file**

Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'xandeum-analytics',
    script: 'npm',
    args: 'start',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NEXT_PUBLIC_XANDEUM_RPC_URL: 'https://api.xandeum.network',
      NEXT_PUBLIC_XANDEUM_DEVNET_RPC_URL: 'https://devnet.xandeum.network',
      NEXT_PUBLIC_APP_VERSION: '1.0.0',
    }
  }]
};
```

4. **Start with PM2**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

5. **Configure Nginx**

Create `/etc/nginx/sites-available/xandeum-analytics`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/xandeum-analytics /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

6. **SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_XANDEUM_RPC_URL` | Mainnet API URL | `https://api.xandeum.network` |
| `NEXT_PUBLIC_XANDEUM_DEVNET_RPC_URL` | Devnet API URL | `https://devnet.xandeum.network` |
| `NEXT_PUBLIC_APP_VERSION` | Application version | `1.0.0` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry error tracking | `https://xxx@xxx.ingest.sentry.io/xxx` |

## Post-Deployment Steps

### 1. Health Check

Verify your deployment is working:

```bash
curl https://your-domain.com
```

### 2. Monitor Performance

- Check application logs
- Monitor response times
- Track error rates
- Set up uptime monitoring (e.g., UptimeRobot)

### 3. Security

- Enable HTTPS
- Set up rate limiting
- Configure CORS if needed
- Use environment variables for secrets

### 4. Backups

If using a database (future feature):
- Set up automated backups
- Test restore procedures
- Keep backups in multiple locations

### 5. Monitoring & Alerts

Set up monitoring for:
- Application uptime
- Response times
- Error rates
- Resource usage (CPU, memory)

Recommended tools:
- Vercel Analytics (if using Vercel)
- Google Analytics
- Sentry (error tracking)
- Prometheus + Grafana (self-hosted)

## Scaling Considerations

### Horizontal Scaling

For high traffic:

1. **Load Balancer**: Use Nginx or cloud load balancer
2. **Multiple Instances**: Run multiple app instances
3. **CDN**: Use CloudFlare or similar for static assets
4. **Caching**: Implement Redis for API caching

### Vertical Scaling

- Upgrade server resources (CPU, RAM)
- Optimize Next.js build
- Enable compression
- Implement image optimization

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Environment Variables Not Working

- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Restart application after changing variables
- Check .env file is in root directory

### Docker Container Won't Start

```bash
# Check logs
docker logs xandeum-analytics

# Inspect container
docker inspect xandeum-analytics

# Remove and recreate
docker rm -f xandeum-analytics
docker-compose up -d --build
```

## Rollback Procedures

### Vercel

1. Go to Deployments tab
2. Find previous working deployment
3. Click "Promote to Production"

### Docker

```bash
# Tag current version
docker tag xandeum-analytics:latest xandeum-analytics:backup

# Pull previous version
docker pull your-registry/xandeum-analytics:previous-version

# Run previous version
docker run -d -p 3000:3000 your-registry/xandeum-analytics:previous-version
```

### Self-Hosted

```bash
# With PM2
pm2 stop xandeum-analytics
git checkout <previous-commit>
npm install
npm run build
pm2 restart xandeum-analytics
```

## Support

For deployment issues:
- Check [GitHub Issues](https://github.com/your-org/xandeum-analytics/issues)
- Join [Discord Community](https://discord.gg/xandeum)
- Email: support@xandeum.network

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [PM2 Documentation](https://pm2.keymetrics.io/)
