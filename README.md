# Richard Fun English Lab AI

Learn • Speak • Sing • Play

A free, browser-based English learning app for Classes 1–10. Plain HTML, CSS and JavaScript. No paid APIs, no subscriptions, no AI credits.

## Project layout

```
richard-fun-english-lab/
├── index.html      Home page and layout
├── css/style.css   Blue, purple and white design, mobile and print styles
├── js/data.js      All sample lessons, sentences, grammar, vocabulary, role-plays
├── js/app.js       Navigation, role switch, all features, progress storage
└── README.md       This file
```

## Step 1: Run it on your computer (free)

1. Download or copy the `richard-fun-english-lab` folder to your computer.
2. Double-click `index.html`. It opens in your web browser.
3. To test on a phone, put the folder on the same Wi-Fi and use Step 3.

No installation is needed. Use Chrome, Edge, Firefox or Safari.

## Step 2: Make changes

Open the folder in any free editor, such as VS Code or Notepad. Edit `js/data.js` to change sample content:

- `daily`: speaking activities
- `vocab`: word cards
- `grammar`: rules and quiz questions
- `roles`: role-play scripts
- `phonics`: letters and key words

Save the file and refresh the browser to see the change.

## Step 3: Put it online for free (GitHub Pages)

1. Create a free account at https://github.com.
2. Click **New repository**, name it `richard-fun-english-lab`, set it to **Public**, and create it.
3. Click **uploading an existing file**, drag in all files and folders (keep the `css` and `js` folders), and click **Commit changes**.
4. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then click **Save**.
5. After about a minute, your app is live at `https://YOUR-USERNAME.github.io/richard-fun-english-lab/`.

Alternative: go to https://app.netlify.com/drop and drag the whole folder onto the page. You receive a free link immediately.

## What works without any service

- Lesson plan generator (template based)
- Worksheets with answer keys and printing
- Speaking activities, conversation practice and role-play scripts
- 500 classroom games (10 game types × 10 topics × 5 levels)
- 1,000 daily-use sentences (10 openers × 10 subjects × 10 verb phrases)
- Phonics A–Z with spoken sounds
- Grammar quizzes with instant scoring
- Vocabulary flashcards, and printable flashcards
- Weekly speaking challenges
- Monthly assessments and a student progress tracker with CSV-ready records
- Teacher dashboard with a support list for students averaging below 3

Voice features use your browser's built-in voices, which are free. Some devices may have limited English voices.

## Limits to know about

- **Data is stored on each device** (in the browser's local storage). Progress is not shared between teachers' computers. A shared database needs a free service such as Firebase or Supabase, with setup.
- **Logins are not secure.** The Student and Teacher switch is for convenience only. Do not store private student records on a public link without adding a login.
- **Lesson plans and worksheets are template based.** Real AI-written content needs an AI API key, which is a paid service, and a small server so the key stays private. The app is built so this can be added later.
- **Speech recognition** is not included in this version. It works best in Chrome or Edge and needs internet access.
- **Games and sentences are generated combinations.** Levels 1–5 change the label, not the difficulty, so teachers should adjust them for their class.

## Next steps

Tell me which feature to expand first, for example:
- Full 365 daily activities or a larger games bank
- Speech scoring for pronunciation
- Printable worksheet PDF export
- Student login with a free database
