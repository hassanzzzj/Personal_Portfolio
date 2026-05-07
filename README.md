# Hassan Abid - AI Engineer Portfolio

A modern responsive portfolio for Hassan Abid, focused on LLM engineering, RAG systems, multi-agent applications, and production AI services.

## Quick Start

Open `index.html` directly in a browser. There is no build step.

```bash
# Windows
start index.html
```

The site loads fonts, icons, AOS, Typed.js, and EmailJS from CDNs. If AOS or Typed.js are blocked, the page still runs without JavaScript exceptions.

## Project Structure

```text
portfolio_project/
|-- index.html
|-- assets/
|   |-- Gemini_Generated_Image_79ehy679ehy679eh.png
|   |-- css/
|   |   `-- style.css
|   `-- js/
|       |-- animations.js
|       `-- main.js
|-- Dockerfile
|-- .dockerignore
`-- README.md
```

## Features

- Responsive hero with profile image
- Particle canvas background
- Project filtering by category
- Smooth anchor navigation
- Mobile menu with escape-key close
- Skill bar animation
- Contact form validation
- EmailJS guard so missing credentials do not crash the page
- Docker-ready static deployment

## EmailJS Setup

The contact form validates locally, but real email sending requires EmailJS credentials.

Open `assets/js/main.js` and replace:

```javascript
var EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
var EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
var EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
```

Until those values are configured, the form shows a helpful setup message instead of throwing an error.

## Docker

```bash
docker build -t hassan-portfolio .
docker run -d -p 8080:80 --name portfolio hassan-portfolio
```

Then visit `http://localhost:8080`.

## Links

- GitHub: https://github.com/hassanzzzj
- LinkedIn: https://www.linkedin.com/in/hassan-abid-854827285/
