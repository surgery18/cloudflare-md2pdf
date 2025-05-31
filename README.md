# cloudflare-md2pdf

**cloudflare-md2pdf** is a Cloudflare Worker that converts Markdown text to a PDF file using Playwright and Marked. It exposes a simple HTTP API: send a POST request with Markdown in the body, and receive a PDF in response.

## Features

- **Markdown to PDF**: Converts Markdown content to a styled PDF.
- **Serverless**: Runs on Cloudflare Workers, no server management required.
- **Headless Browser Rendering**: Uses Playwright for accurate PDF rendering.
- **Easy API**: Just send a POST request with Markdown.

## Usage

### Deploy

1. Ensure you have a Cloudflare account and Workers set up.
2. Deploy this Worker using your preferred method (e.g., Wrangler).

Or use this button

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https%3A%2F%2Fgithub.com%2Fsurgery18%2Fcloudflare-md2pdf)

### API

**Endpoint:**  
`POST /`

**Request Body:**  
Raw Markdown text (as `text/plain`).

**Response:**

- `200 OK` with a PDF file (`application/pdf`) as an attachment.
- `400 Bad Request` if no Markdown is provided.
- `405 Method Not Allowed` for non-POST requests.

#### Example Request

```bash
curl -X POST https://<your-worker-url> \
  -H "Content-Type: text/plain" \
  --data-binary $'## Hello World\n\nThis is a sample markdown.\n' \
  --output output.pdf
```

### Environment Variables

- `BROWSER`: Provided by Cloudflare's browser rendering service (see [Cloudflare Browser Rendering](https://developers.cloudflare.com/browser-rendering/)).

## How it Works

1. Receives a POST request with Markdown in the body.
2. Converts Markdown to HTML using [Marked](https://github.com/markedjs/marked).
3. Launches a headless browser with Playwright.
4. Renders the HTML and generates a PDF.
5. Returns the PDF as a downloadable file.

## Dependencies

- [@cloudflare/playwright](https://github.com/cloudflare/playwright)
- [marked](https://github.com/markedjs/marked)
