import { marked } from 'marked'
import { launch } from '@cloudflare/playwright'

export default {
	async fetch(request, env) {
		//this must be a post
		if (request.method !== 'POST') {
			return new Response('Only POST requests are allowed', { status: 405 })
		}

		//now get the body of the request
		const body = (await request.text()).trim()

		if (!body) {
			return new Response('No markdown provided', { status: 400 })
		}

		//now convert the markdown to html
		const html = await marked(body)

		//now start a browser instance
		const browser = await launch(env.BROWSER)
		//start a new page on the browser
		const page = await browser.newPage()
		//set the content of the page
		await page.setContent(html, { waitUntil: 'networkidle' })
		//now return the data as pdf
		const pdfBuffer = await page.pdf({
			format: 'letter',
		})
		//close the browser
		await browser.close()

		//WE ARE DONE! Send the buffer as the response
		return new Response(pdfBuffer, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'attachment; filename="output.pdf"',
			},
		})
	},
}
