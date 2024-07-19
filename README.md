# Anime Showcase
A Simple Anime Listing Website  
**Shubham Singla**

## Objectives
- To create a web application using React that lists anime information fetched from an API.
- To implement a backend using Django and deploy both frontend and backend on AWS.

## Features
- List of animes with details
- Ability to add and delete animes
- Responsive design

## Tech Stack

### Frontend
- **React.js**
- **Vite** (for fast and efficient development/build process)
- **Tailwind CSS** (for styling)
- Deployed on **AWS S3** with **CloudFront**

### Backend
- **Django**
- Deployed on **AWS EC2**

### Database
- **SQLite**

### Others
- **Nginx**
- **Gunicorn**
- **Certbot** for SSL

## Frontend Details
- **Framework:** React.js
- **Key Components:**
  - Anime List Component
  - Add Anime Component
  - Delete Anime Component
  - Anime Details Component
- **Styling:**
  - Tailwind CSS for modern, responsive design
- **Features:**
  - Fetching data from an external API
  - Adding and deleting anime entries

## Backend Details
- **Framework:** Django
- **Key Endpoints:**
  - `/api/animes/` - Fetch list of animes
  - `/api/animes/add` - Add a new anime
  - `/api/animes/delete/<id>/` - Delete a specific anime
- **Deployment:**
  - **Gunicorn** as WSGI HTTP server
  - **Nginx** as a reverse proxy


## Deployment Process

### Frontend:
- **Built React App:**
  - Ran `npm run build` to create an optimized production build.
- **Created S3 Bucket:**
  - Created a new S3 bucket and uploaded the build files.
- **Configured CloudFront for CDN:**
  - Created a new CloudFront distribution.
  - Linked the S3 bucket as the origin domain.
  - Provided the necessary Origin Access Control (OAC) and updated the S3 bucket policy for CloudFront access.
- **Frontend Link:** [https://d1kk2yb7tz6imf.cloudfront.net/](https://d1kk2yb7tz6imf.cloudfront.net/)

### Backend:
- **Set Up EC2 Instance:**
  - Launched an EC2 instance and configured security groups.
  - Installed necessary packages (Django, Gunicorn, Nginx, etc.).
- **Configured Gunicorn:**
  - Created a systemd socket and service file for Gunicorn to manage the application as a service.
  - Gunicorn service file:
    ```ini
    [Unit]
    Description=gunicorn daemon
    After=network.target

    [Service]
    User=ubuntu
    Group=www-data
    WorkingDirectory=/home/ubuntu/aws-anime/anime_backend
    ExecStart=/home/ubuntu/aws-anime/anime_backend/venv/bin/gunicorn --workers 3 --bind unix:/run/gunicorn.sock anime_backend.wsgi:application

    [Install]
    WantedBy=multi-user.target
    ```
  - Enabled and started the Gunicorn service:
    ```bash
    sudo systemctl start gunicorn.socket
    sudo systemctl enable gunicorn.socket
    ```
- **Configured Nginx:**
  - Set up Nginx as a reverse proxy to forward requests to Gunicorn.
  - Nginx configuration:
    ```nginx
    server {
        server_name anime-backend.shubhamsingla.com;

        location = /favicon.ico { access_log off; log_not_found off; }
        location /static/ {
            root /home/ubuntu/aws-anime/anime_backend;
        }

        location / {
            include proxy_params;
            proxy_pass http://unix:/run/gunicorn.sock;
        }

        listen 443 ssl; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/anime-backend.shubhamsingla.com/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/anime-backend.shubhamsingla.com/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    }

    server {
        listen 80;
        server_name anime-backend.shubhamsingla.com;

        location / {
            return 301 https://$host$request_uri;
        }
    }
    ```
- **Secured with SSL:**
  - Used Certbot to obtain and configure SSL certificates.
  - Updated Nginx configuration to use SSL.

## Live Demo
- **Link:** [https://d1kk2yb7tz6imf.cloudfront.net/](https://d1kk2yb7tz6imf.cloudfront.net/)

## Challenges and Learnings

- **Challenges:**
  - Setting up the AWS environment
  - Configuring Nginx and Gunicorn
  - Ensuring seamless communication between frontend and backend

- **Learnings:**
  - AWS services and deployment
  - React and Django integration
  - SSL configuration with Certbot

## Conclusion

- **Summary:**
  - Successfully created and deployed a full-stack web application.
  - Gained hands-on experience with AWS, React, Django, and SSL/TLS.

- **Future Enhancements:**
  - **Create a Custom VPC:**
    - Set up a custom Virtual Private Cloud (VPC) with one private subnet.
    - Deploy the EC2 instance in the private subnet for added security.
  - Adding user authentication
  - Implementing more features like anime episode details, reviews.

Thank you!


