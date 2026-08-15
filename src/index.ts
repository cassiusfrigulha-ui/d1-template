import { renderHtml, type Comment } from "./renderHtml";

async function getComments(db: D1Database): Promise<Comment[]> {
	const stmt = db.prepare("SELECT id, author, content FROM comments ORDER BY id DESC LIMIT 20");
	const { results } = await stmt.all<Comment>();
	return results;
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (request.method === "POST" && url.pathname === "/") {
			const form = await request.formData();
			const author = (form.get("author") ?? "").toString().trim();
			const content = (form.get("content") ?? "").toString().trim();

			if (!author || !content) {
				const comments = await getComments(env.DB);
				return new Response(renderHtml(comments, "Please fill in both your name and a note."), {
					status: 400,
					headers: { "content-type": "text/html" },
				});
			}

			await env.DB.prepare("INSERT INTO comments (author, content) VALUES (?, ?)")
				.bind(author.slice(0, 80), content.slice(0, 500))
				.run();

			return Response.redirect(url.origin + "/", 303);
		}

		const comments = await getComments(env.DB);
		return new Response(renderHtml(comments), {
			headers: {
				"content-type": "text/html",
			},
		});
	},
} satisfies ExportedHandler<Env>;
