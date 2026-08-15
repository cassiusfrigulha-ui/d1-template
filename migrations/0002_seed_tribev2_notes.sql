-- Migration number: 0002 	 2026-08-15T00:00:00.000Z
-- Replace the generic template seed data with notes relevant to the
-- TRIBE v2 showcase page.
DELETE FROM comments;

INSERT INTO comments (author, content)
VALUES
    ('TRIBE v2 team', 'Welcome! Leave a note about the project below.'),
    ('Community', 'Predicting fMRI responses from video, audio, and text in one model — check out the Colab demo.'),
    ('Community', 'Weights are available on HuggingFace: facebook/tribev2.')
;
