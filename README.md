# SoulDeep Landing Page

This folder contains the landing page for SoulDeep app, hosted on GitHub Pages.

## Setup Instructions

1. Push this repository to GitHub.
2. Go to your GitHub repository settings.
3. Scroll down to the "GitHub Pages" section.
4. Under "Source", select "main branch" and "/docs" folder.
5. Click "Save".
6. GitHub Pages will build and deploy your site.

## Custom Domain Setup

1. In your domain registrar (where you purchased souldeep.app):
   - Create an A record pointing to GitHub Pages IP addresses:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Create a CNAME record for www subdomain pointing to your GitHub Pages URL (yourusername.github.io)

2. The CNAME file in this directory will tell GitHub Pages to use your custom domain.

3. Wait for DNS propagation (can take up to 48 hours).

4. Verify in your repository settings that the custom domain is properly configured.

## Updating the Landing Page

To update the landing page:
1. Make changes to the HTML, CSS, or add images in this directory.
2. Commit and push the changes to GitHub.
3. GitHub Pages will automatically rebuild and deploy your site.

## Files

- `index.html` - Main landing page
- `styles.css` - CSS styles
- `CNAME` - Custom domain configuration 