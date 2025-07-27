# Docker for Node.js Deployment Guide

## Steps to Deploy on AWS EC2

**Step 1:**  
Run an EC2 instance based on your configuration.

**Step 2:**  
While generating your EC2 instance, generate a `.pem` key for future SSH access.

**Step 3:**  
Connect to your EC2 instance using SSH or your preferred method.

**Step 4:**  
Update your Ubuntu system:
```sh
sudo apt-get update
```

**Step 5:**  
Clone your Git repository:
```sh
git clone <your-repo-url>
```

**Step 6:**  
Install Node.js on your EC2 machine.

**Step 7:**  
Install `curl`:
```sh
sudo apt install curl
```

**Step 8:**  
Add Node.js 18.x repository:
```sh
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
```

**Step 9:**  
Install Node.js:
```sh
sudo apt install -y nodejs
```

**Step 10:**  
Create a `.env` file with your environment variables.

**Step 11:**  
Install dependencies:
```sh
npm install
```

**Step 12:**  
Install PM2 globally:
```sh
sudo npm install pm2 -g
```

**Step 13:**  
Start your application with PM2:
```sh
pm2 start src/index.js
```
If you update your code, push to your Git repo, pull on EC2, and run:
```sh
pm2 restart all
```

**Step 14:**  
Check PM2 status:
```sh
pm2 status
```

**Step 15:**  
In your EC2 instance's security group, add your Node server port (e.g., 4000) to allow access from IPv4 and IPv6 anywhere.

**Step 16:**  
Access your app using your public IPv4 address and port:
```
http://<your-ipv4-address>:4000
```

---

## Securing Your Backend API

**Step 17:**  
Create a target group in AWS.

**Step 18:**  
Create an Application Load Balancer using HTTP (port 80).

**Step 19:**  
Create a CloudFront distribution, add your load balancer URL, and allow all headers to support authorization.

---

**Note:**  
Adjust environment variables and security settings as needed for