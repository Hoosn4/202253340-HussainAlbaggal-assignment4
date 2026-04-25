
# Hussain Albaggal - Software Engineering Portfolio

A responsive single-page portfolio for SWE363 Assignment 4. The site presents my profile, education, experience, projects, certifications, technical skills, and a validated contact form using HTML, CSS, and vanilla JavaScript.

## Project Description

This assignment extends my previous portfolio work with more advanced front-end functionality and cleaner user interactions.

Main implemented features:

- Dynamic greeting based on current time
- Visit timer that updates every second
- Weather API integration for Dhahran (temperature + last update)
- Project filtering by category and visitor level
- Project sorting by date and title
- Persistent theme mode (light/dark) with localStorage
- Show/hide section state controls
- Contact form validation with inline feedback

## Setup Instructions (Run Locally)

### Option 1: Direct open

Open `index.html` in any modern browser.

### Option 2: Local server

Open the project with the VS Code Live Server extension, then launch `index.html` using `Open with Live Server`.

The site will open automatically in your browser on a local Live Server URL.

Note: the weather card needs an internet connection because it fetches live data from the Open-Meteo API. If the request fails, the page shows a friendly fallback message instead of breaking.

## Project Structure

```text
202253340-HussainAlbaggal-assignment4/
├── .gitignore
├── assets/
│   └── images/
│       └── .gitkeep
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── README.md
```

## Short AI Use Summary

I used AI tools for code generation support, debugging ideas, UI/UX refinement, and documentation improvements. I manually reviewed and modified all generated suggestions before keeping them.

Detailed report: [docs/ai-usage-report.md](docs/ai-usage-report.md)

## Code Quality Notes

- Code is organized by responsibility: structure in index.html, styling in css/styles.css, and behavior in js/script.js
- JavaScript is grouped into logical feature blocks (theme, greeting, timer, weather, filtering, form, animation)
- Important behaviors include inline comments for readability
- Interactive status areas use accessible live regions for weather, project updates, and form feedback
- Links in README/docs are reviewed to avoid broken references

## Documentation Files

- Main overview and run instructions: README.md
- AI usage details: docs/ai-usage-report.md
- Technical implementation details: docs/technical-documentation.md

## Optional Live Deployment

Live link: Not added yet (optional for this assignment).

## Submission Process Checklist

1. Create a new GitHub repository for this assignment.
2. Push the final project files to the repository.
3. Re-test core features (theme, weather, filters, form validation).
4. Confirm README.md, docs/ai-usage-report.md, and technical documentation are updated.
5. Submit the repository link through Blackboard.

## Contact

- Email: [s202253340@kfupm.edu.sa](mailto:s202253340@kfupm.edu.sa)
- LinkedIn: [Hussain Albaggal](https://www.linkedin.com/in/hussain-albaggal)
- GitHub: [Hoosn4](https://github.com/Hoosn4)
