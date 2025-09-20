# Deployment Guide
## Pink Blueberry Salon Web Application

**Document Version:** 1.0  
**Date:** December 2024  
**Project:** Pink Blueberry Salon Digital Platform  
**Status:** Production Deployment Guide  

---

## 1. Deployment Overview

This guide provides comprehensive instructions for deploying the Pink Blueberry Salon web application to various hosting platforms. The application is a static site that can be deployed to any web server or CDN.

### 1.1 Prerequisites
- Git repository access
- Web hosting account or cloud platform access
- Domain name (optional)
- SSL certificate (recommended)

---

## 2. Quick Deployment Options

### 2.1 GitHub Pages (Free)
```bash
# 1. Push code to GitHub repository
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main

# 2. Enable GitHub Pages in repository settings
# Settings → Pages → Source: Deploy from branch → main
```

### 2.2 Netlify (Recommended)
```bash
# 1. Connect GitHub repository to Netlify
# 2. Configure build settings:
Build command: (leave empty)
Publish directory: /
```

### 2.3 Vercel
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel --prod
```

---

## 3. Production Deployment

### 3.1 Pre-Deployment Checklist
- [ ] All tests passing
- [ ] Performance benchmarks met
- [ ] Cross-browser testing completed
- [ ] Accessibility compliance verified
- [ ] Security review completed
- [ ] Content review approved
- [ ] Backup procedures in place

### 3.2 Build Process
```bash
#!/bin/bash
# build.sh - Production build script

echo "Starting production build..."

# 1. Validate all files exist
if [ ! -f "index.html" ]; then
    echo "Error: index.html not found"
    exit 1
fi

# 2. Optimize images
echo "Optimizing images..."
find images/ -name "*.png" -exec optipng {} \;
find images/ -name "*.jpg" -exec jpegoptim --max=85 {} \;

# 3. Minify CSS
echo "Minifying CSS..."
npx clean-css-cli styles/main.css -o styles/main.min.css

# 4. Minify JavaScript
echo "Minifying JavaScript..."
npx terser js/*.js --compress --mangle -o js/bundle.min.js

# 5. Generate sitemap
echo "Generating sitemap..."
cat > sitemap.xml << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://pinkblueberry.com/</loc><priority>1.0</priority></url>
  <url><loc>https://pinkblueberry.com/booking.html</loc><priority>0.8</priority></url>
  <url><loc>https://pinkblueberry.com/shop.html</loc><priority>0.8</priority></url>
</urlset>
EOF

echo "Build complete!"
```

---

## 4. Server Configuration

### 4.1 Apache (.htaccess)
```apache
# .htaccess configuration
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Security headers
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Cache control
<filesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 month"
</filesMatch>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

### 4.2 Nginx Configuration
```nginx
server {
    listen 80;
    server_name pinkblueberry.com www.pinkblueberry.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name pinkblueberry.com www.pinkblueberry.com;
    
    root /var/www/pinkblueberry;
    index index.html;
    
    # SSL configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    
    # Cache control
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1M;
        add_header Cache-Control "public, immutable";
    }
    
    # Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Error pages
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
}
```

---

## 5. Environment Configuration

### 5.1 Environment Variables
```bash
# .env.production
NODE_ENV=production
BASE_URL=https://pinkblueberry.com
API_URL=https://api.pinkblueberry.com
ANALYTICS_ID=GA_MEASUREMENT_ID
```

### 5.2 Feature Flags
```javascript
// config/production.js
const productionConfig = {
    features: {
        debugMode: false,
        performanceLogging: false,
        testMode: false,
        analytics: true
    },
    
    api: {
        baseUrl: 'https://api.pinkblueberry.com',
        timeout: 10000,
        retries: 3
    },
    
    performance: {
        imageOptimization: true,
        lazyLoading: true,
        preloading: true
    }
};
```

---

## 6. Monitoring & Analytics

### 6.1 Google Analytics Setup
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 6.2 Performance Monitoring
```javascript
// Performance monitoring
function initPerformanceMonitoring() {
    // Core Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
    });
}
```

---

## 7. Security Configuration

### 7.1 Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    img-src 'self' data: https:;
    style-src 'self' 'unsafe-inline';
    script-src 'self' https://www.googletagmanager.com;
    connect-src 'self' https://www.google-analytics.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
">
```

### 7.2 Security Headers
```javascript
// Security headers configuration
const securityHeaders = {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
};
```

---

## 8. Troubleshooting

### 8.1 Common Issues

#### Issue: Images Not Loading
```bash
# Check file permissions
chmod 644 images/*

# Verify image paths in HTML/CSS
grep -r "images/" . --include="*.html" --include="*.css" --include="*.js"

# Test image accessibility
curl -I https://yourdomain.com/images/logo.png
```

#### Issue: CSS/JS Not Loading
```bash
# Check MIME types
# Add to .htaccess:
AddType text/css .css
AddType application/javascript .js

# Verify file paths
ls -la styles/main.css
ls -la js/*.js
```

#### Issue: Form Submissions Failing
```javascript
// Debug form validation
function debugFormSubmission() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        console.log('Form data:', new FormData(form));
        console.log('Validation state:', form.checkValidity());
    });
}
```

### 8.2 Performance Issues

#### Slow Loading Times
```bash
# Check image sizes
du -sh images/*

# Optimize images
optipng images/*.png
jpegoptim --max=85 images/*.jpg

# Enable compression
# Add to server configuration
```

#### JavaScript Errors
```javascript
// Error tracking
window.addEventListener('error', (e) => {
    console.error('Script error:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
    });
});
```

---

## 9. Backup & Recovery

### 9.1 Backup Procedures
```bash
#!/bin/bash
# backup.sh - Automated backup script

BACKUP_DIR="/backups/pinkblueberry"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="pinkblueberry_backup_$DATE.tar.gz"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create backup
tar -czf "$BACKUP_DIR/$BACKUP_FILE" \
    --exclude='node_modules' \
    --exclude='.git' \
    /var/www/pinkblueberry/

# Keep only last 30 backups
find $BACKUP_DIR -name "pinkblueberry_backup_*.tar.gz" -mtime +30 -delete

echo "Backup created: $BACKUP_FILE"
```

### 9.2 Recovery Procedures
```bash
#!/bin/bash
# restore.sh - Recovery script

BACKUP_FILE=$1
RESTORE_DIR="/var/www/pinkblueberry"

if [ -z "$BACKUP_FILE" ]; then
    echo "Usage: ./restore.sh <backup_file>"
    exit 1
fi

# Stop web server
systemctl stop nginx

# Backup current state
mv $RESTORE_DIR "${RESTORE_DIR}_backup_$(date +%Y%m%d_%H%M%S)"

# Restore from backup
tar -xzf $BACKUP_FILE -C /var/www/

# Set permissions
chown -R www-data:www-data $RESTORE_DIR
chmod -R 644 $RESTORE_DIR
find $RESTORE_DIR -type d -exec chmod 755 {} \;

# Start web server
systemctl start nginx

echo "Recovery complete"
```

---

## 10. Maintenance Procedures

### 10.1 Regular Maintenance
```bash
#!/bin/bash
# maintenance.sh - Weekly maintenance script

echo "Starting maintenance..."

# Update dependencies
npm audit fix

# Clean temporary files
rm -rf /tmp/pinkblueberry_*

# Optimize database (if applicable)
# mysql -u root -p pinkblueberry < optimize.sql

# Check disk space
df -h

# Check SSL certificate expiry
openssl x509 -in /path/to/certificate.crt -noout -dates

# Generate maintenance report
echo "Maintenance completed on $(date)" >> /var/log/maintenance.log
```

### 10.2 Update Procedures
```bash
#!/bin/bash
# update.sh - Application update script

# 1. Backup current version
./backup.sh

# 2. Pull latest changes
git pull origin main

# 3. Run tests
npm test

# 4. Build production assets
./build.sh

# 5. Deploy updates
rsync -av --delete ./ /var/www/pinkblueberry/

# 6. Restart services
systemctl reload nginx

# 7. Verify deployment
curl -f https://pinkblueberry.com || echo "Deployment verification failed"
```

---

## 11. Rollback Procedures

### 11.1 Emergency Rollback
```bash
#!/bin/bash
# rollback.sh - Emergency rollback script

PREVIOUS_VERSION=$1

if [ -z "$PREVIOUS_VERSION" ]; then
    echo "Usage: ./rollback.sh <previous_version_backup>"
    exit 1
fi

echo "Rolling back to $PREVIOUS_VERSION..."

# Stop services
systemctl stop nginx

# Restore previous version
./restore.sh $PREVIOUS_VERSION

# Start services
systemctl start nginx

# Verify rollback
curl -f https://pinkblueberry.com && echo "Rollback successful" || echo "Rollback failed"
```

### 11.2 Gradual Rollback
```bash
# Blue-green deployment rollback
# Switch traffic back to previous version
# Update load balancer configuration
# Monitor for issues
# Complete rollback if stable
```

---

*This deployment guide ensures reliable, secure, and maintainable deployment of the Pink Blueberry Salon web application across various hosting environments.*
