export interface Comment {
	id: number;
	author: string;
	content: string;
}

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

function renderComments(comments: Comment[]): string {
	if (comments.length === 0) {
		return `<p class="empty">No notes yet — be the first to leave one below.</p>`;
	}

	return `<ul class="comments">
		${comments
			.map(
				(comment) => `<li>
					<strong>${escapeHtml(comment.author)}</strong>
					<p>${escapeHtml(comment.content)}</p>
				</li>`,
			)
			.join("\n")}
	</ul>`;
}

export function renderHtml(comments: Comment[], error?: string) {
	return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TRIBE v2</title>
        <link rel="stylesheet" type="text/css" href="https://static.integrations.cloudflare.com/styles.css">
        <style>
          .badges { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0; }
          .badges a { text-decoration: none; }
          .badges img { display: block; }
          .comments { list-style: none; padding: 0; }
          .comments li { border-left: 3px solid #0E838F; padding: 0.25rem 0 0.25rem 0.75rem; margin-bottom: 0.75rem; }
          .comments p { margin: 0.15rem 0 0; }
          form.note-form { display: grid; gap: 0.5rem; max-width: 28rem; margin-top: 1rem; }
          form.note-form input, form.note-form textarea { font: inherit; padding: 0.4rem 0.5rem; }
          .error { color: #b00020; }
          .empty { opacity: 0.7; }
          code.small { font-size: 0.85em; }
        </style>
      </head>

      <body>
        <header>
          <h1>🧠 TRIBE v2</h1>
          <p><strong>A Foundation Model of Vision, Audition, and Language for In-Silico Neuroscience</strong></p>
        </header>
        <main>
          <p>
            TRIBE v2 is a deep multimodal brain encoding model that predicts fMRI brain responses to
            naturalistic stimuli (video, audio, text). It combines state-of-the-art text, audio, and
            video models into a unified Transformer architecture that maps multimodal representations
            onto the cortical surface.
          </p>

          <div class="badges">
            <a target="_blank" href="https://arxiv.org/abs/2605.04326">📄 Paper</a>
            <a target="_blank" href="https://aidemos.atmeta.com/tribev2/">▶️ Demo</a>
            <a target="_blank" href="https://huggingface.co/facebook/tribev2">🤗 Weights</a>
            <a target="_blank" href="https://colab.research.google.com/github/facebookresearch/tribev2/blob/main/tribe_demo.ipynb">Open in Colab</a>
            <a target="_blank" href="https://github.com/facebookresearch/tribev2">GitHub</a>
          </div>

          <h2>Quick start</h2>
          <pre><code>pip install -e .

from tribev2 import TribeModel

model = TribeModel.from_pretrained("facebook/tribev2", cache_folder="./cache")
df = model.get_events_dataframe(video_path="path/to/video.mp4")
preds, segments = model.predict(events=df)
print(preds.shape)  # (n_timesteps, n_vertices)</code></pre>
          <p>Predictions are for the "average" subject and live on the <strong>fsaverage5</strong> cortical mesh (~20k vertices).</p>

          <h2>Citation</h2>
          <pre><code class="small">@article{dascoli2026foundation,
  title={A foundation model of vision, audition, and language for in-silico neuroscience},
  author={d'Ascoli, St{\\'e}phane and Rapin, J{\\'e}r{\\'e}my and Benchetrit, Yohann and Brooks, Teon and Begany, Katelyn and Raugel, Jos{\\'e}phine and Banville, Hubert and King, Jean-R{\\'e}mi},
  journal={arXiv preprint arXiv:2605.04326},
  year={2026}
}</code></pre>

          <h2>Community notes</h2>
          <p>Leave a note for other visitors. Stored in D1.</p>
          ${error ? `<p class="error">${escapeHtml(error)}</p>` : ""}
          ${renderComments(comments)}

          <form class="note-form" method="POST" action="/">
            <label>
              Name
              <input type="text" name="author" maxlength="80" required />
            </label>
            <label>
              Note
              <textarea name="content" maxlength="500" rows="3" required></textarea>
            </label>
            <button type="submit">Add note</button>
          </form>

          <small class="blue">
            <a target="_blank" href="https://developers.cloudflare.com/d1/tutorials/build-a-comments-api/">Build a comments API with Workers and D1</a>
          </small>
        </main>
      </body>
    </html>
`;
}
