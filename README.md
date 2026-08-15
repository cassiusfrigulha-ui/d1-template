# TRIBE v2 Showcase

A Cloudflare Worker + D1 project page for [TRIBE v2](https://github.com/facebookresearch/tribev2) — *A Foundation Model of Vision, Audition, and Language for In-Silico Neuroscience*. It links out to the paper, live demo, HuggingFace weights, and Colab notebook, and offers a lightweight community notes/guestbook backed by D1.

TRIBE v2 is a deep multimodal brain encoding model that predicts fMRI brain responses to naturalistic stimuli (video, audio, text), combining state-of-the-art text, audio, and video models into a unified Transformer that maps multimodal representations onto the cortical surface. See the [TRIBE v2 repo](https://github.com/facebookresearch/tribev2) for the model itself, training code, and the Colab demo.

This project (the showcase site) is built on Cloudflare's [D1](https://developers.cloudflare.com/d1/) — Cloudflare's native serverless SQL database — via a Worker with a D1 binding.

## What it does

- Renders a landing page describing TRIBE v2 with links to the paper, demo, HuggingFace weights, Colab notebook, and citation.
- Reads the latest community notes from a `comments` table in D1 and displays them.
- Accepts a `POST /` form submission (name + note) and inserts a new row into the `comments` table.

## Setup Steps

1. Install the project dependencies with a package manager of your choice:
   ```bash
   npm install
   ```
2. Create a [D1 database](https://developers.cloudflare.com/d1/get-started/):
   ```bash
   npx wrangler d1 create d1-template-database
   ```
   ...and update the `database_id` field in `wrangler.json` with the new database ID.
3. Run the db migrations to initialize the database and seed the community notes (notice the `migrations` directory in this project):
   ```bash
   npx wrangler d1 migrations apply --remote d1-template-database
   ```
4. Deploy the project!
   ```bash
   npx wrangler deploy
   ```

## Local development

```bash
npm run dev
```

This applies migrations to a local D1 instance and starts `wrangler dev`.

## Attribution

TRIBE v2 is developed by Meta FAIR and collaborators, licensed under CC-BY-NC-4.0.

```bibtex
@article{dascoli2026foundation,
  title={A foundation model of vision, audition, and language for in-silico neuroscience},
  author={d'Ascoli, St{\'e}phane and Rapin, J{\'e}r{\'e}my and Benchetrit, Yohann and Brooks, Teon and Begany, Katelyn and Raugel, Jos{\'e}phine and Banville, Hubert and King, Jean-R{\'e}mi},
  journal={arXiv preprint arXiv:2605.04326},
  year={2026}
}
```
