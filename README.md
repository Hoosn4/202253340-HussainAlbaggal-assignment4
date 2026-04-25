# Hussain Albaggal - Software Engineering Portfolio

A responsive single-page portfolio for SWE363 Assignment 4. The site presents my profile, education, experience, projects, certifications, technical skills, and a validated contact form using HTML, CSS, and vanilla JavaScript.

## Project Description

This assignment extends my previous portfolio work with more advanced front-end functionality and cleaner user interactions.

Main implemented features:

* Dynamic greeting based on current time
* Visit timer that updates every second
* Weather API integration for Dhahran temperature and last update
* Project filtering by category and visitor level
* Project sorting by date and title
* Persistent theme mode with light and dark mode using localStorage
* Show and hide section state controls
* Contact form validation with inline feedback

## Demo Video and Deployed Website

* Demo video: [Google Drive Demo Folder](https://drive.google.com/drive/folders/1e3zgzoRXxp-ikTGTY0s5Dm33qyLpgQKF?usp=sharing)
* Deployed website: [Portfolio Website](https://hoosn4.github.io/202253340-HussainAlbaggal-assignment4/)

## Setup Instructions

### Option 1: Direct Open

Open `index.html` in any modern browser.

### Option 2: Local Server

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

* Code is organized by responsibility: structure in `index.html`, styling in `css/styles.css`, and behavior in `js/script.js`
* JavaScript is grouped into logical feature blocks including theme, greeting, timer, weather, filtering, form validation, and animation
* Important behaviors include inline comments for readability
* Interactive status areas use accessible live regions for weather, project updates, and form feedback
* Links in README and documentation files are reviewed to avoid broken references

## Documentation Files

* Main overview and run instructions: `README.md`
* AI usage details: `docs/ai-usage-report.md`
* Technical implementation details: `docs/technical-documentation.md`

## Submission Process Checklist

1. Create a new GitHub repository for this assignment.
2. Push the final project files to the repository.
3. Re-test core features including theme, weather, filters, and form validation.
4. Confirm `README.md`, `docs/ai-usage-report.md`, and `docs/technical-documentation.md` are updated.
5. Confirm the demo video link is accessible.
6. Confirm the deployed website link works.
7. Submit the repository link through Blackboard.

## Contact

* Email: [s202253340@kfupm.edu.sa](mailto:s202253340@kfupm.edu.sa)
* LinkedIn: [Hussain Albaggal](https://www.linkedin.com/in/hussain-albaggal)
* GitHub: [Hoosn4](https://github.com/Hoosn4)
