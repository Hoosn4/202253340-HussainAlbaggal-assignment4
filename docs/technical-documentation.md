# Technical Documentation - Assignment 3

**Author**: Hussain Albaggal  
**Student ID**: s202253340  
**Assignment**: SWE363 - Assignment 3 (Advanced Functionality)  
**Date**: April 18, 2026

---

## Architecture Overview

The portfolio is built as a responsive single-page application using semantic HTML, modular CSS, and vanilla JavaScript.

- **Sidebar**: profile summary, theme toggle, timer, social links, weather card, contact details, and section navigation
- **Main Content**: profile, education, experience, projects, certifications, skills, and contact

### Implementation Approach

- **Semantic HTML5**: sections, labels, navigation links, and accessible form structure
- **CSS Variables**: centralized theme colors for light and dark mode
- **Vanilla JavaScript**: state updates, API fetching, filtering, sorting, validation, and timed UI updates

---

## Assignment 3 Features

### 1. API Integration

#### Weather API Section

- **Purpose**: display current temperature data related to the portfolio location
- **API Used**: Open-Meteo
- **Endpoint Type**: client-side fetch request for current temperature in Dhahran, Saudi Arabia.
- **UI Elements**:
  - `#weatherStatus`
  - `#weatherTemperature`
  - `#weatherUpdated`
- **Behavior**:
  - Shows a loading message while fetching
  - Displays the current temperature in `°C`
  - Shows the last update timestamp
  - Uses cached weather data for a short period to reduce unnecessary API requests
  - Displays a friendly fallback message if the request fails or data is missing

---

### 2. Complex Logic

#### Project Filtering and Sorting

- **Filter Controls**:
  - Category buttons: `All`, `Web Development`, `Machine Learning`
  - Visitor level selector: `Beginner` or `Advanced`
- **Sort Controls**:
  - `Newest First`
  - `Oldest First`
  - `Title A-Z`
- **Data Model**:
  - Each project card stores:
    - `data-category`
    - `data-date`
    - `data-title`
    - `data-level`
- **Logic Flow**:
  1. Read the current visitor level
  2. Apply category filtering
  3. Sort the remaining items
  4. Re-render the visible project cards
  5. Update the summary text and empty-state message

#### Visitor-Level Display Logic

- **Selector**: `#experienceLevel`
- **Summary Target**: `#projectResultsSummary`
- **Behavior**:
  - `Beginner` shows beginner-friendly projects
  - `Advanced` shows advanced projects
  - Results summary text updates after each level/filter/sort change

#### Visit Timer

- **Element**: `#visitTimer`
- **Logic**:
  - Starts when the page loads
  - Updates every second using `setInterval`
  - Displays elapsed time in `HH:MM:SS`

#### Contact Form Validation

- **Fields Checked**:
  - Name
  - Email
  - Subject
  - Message
- **Validation Rules**:
  - Name must not be empty
  - Name must be at least 3 characters
  - Email must not be empty
  - Email must match a regex pattern
  - Subject must not be empty
  - Subject must be at least 5 characters
  - Message must not be empty
  - Message must be at least 20 characters
- **Feedback Strategy**:
  - Invalid inputs receive visible styling
  - All validation errors are shown together
  - Success message appears only when all checks pass
  - Feedback clears when the user starts editing again

---

### 3. State Management

#### Theme Persistence

- **Control**: `#themeToggle`
- **Storage**: `localStorage`
- **Stored Key**: `portfolioTheme`
- **Values**: `light` or `dark`
- **Behavior**:
  - Reads saved theme on page load
  - Applies the saved mode to `body`
  - Updates the button text
  - Uses try/catch to avoid failure if storage is blocked

#### Show/Hide Section Buttons

- **Buttons**:
  - Profile, Education, Experience, Projects, Certifications, Skills, and Contact toggles
- **State Logic**:
  - Each button controls a matching content container
  - Visibility is tracked through `aria-expanded`
  - Hidden sections use `.is-hidden`
  - Button text changes between `Hide ... Section` and `Show ... Section`

---

### 4. Performance Improvements

#### Code Cleanup

- Removed unused duplicate root files that were no longer part of the live page
- Reduced repeated DOM queries by caching frequently used form inputs

#### Rendering Efficiency

- Moved section reveal styling from inline JavaScript to reusable CSS classes
- Used `IntersectionObserver` so section reveal work only happens when needed
- Stops observing a section after it becomes visible to reduce repeated work

#### CSS Efficiency

- Added `content-visibility: auto`
- Added `contain-intrinsic-size`
- Kept transitions and animations CSS-driven where possible

---

## Error Handling and User Feedback

### Weather Errors

- Displays: `Weather unavailable`
- Clears temperature output if the API response fails
- Avoids breaking the rest of the page if localStorage is unavailable or cached weather cannot be parsed

### Project Empty State

- Displays: `No projects found for this category.`
- Triggered when the active level and category combination returns no visible projects

### Contact Form Errors

- Uses inline feedback area under the form
- Marks invalid inputs with an error style
- Clears old feedback when users continue typing

---

## Accessibility and Usability

- Semantic section structure
- Accessible labels for form fields
- `aria-live="polite"` used in weather updates, project messaging, and form feedback
- `aria-expanded` used for section visibility controls
- Responsive layout supports desktop and mobile screens

---

## Browser Compatibility

- Chrome / Edge
- Firefox
- Safari
- Mobile browsers on iOS and Android

---

## File Responsibilities

- `index.html`: page structure and interactive control elements
- `css/styles.css`: themes, responsive layout, animations, and component styling
- `js/script.js`: all client-side behavior including state updates, API calls, filtering, sorting, validation, and timers
- `docs/ai-usage-report.md`: AI usage explanation
- `docs/technical-documentation.md`: implementation summary

---

## Code Quality Checklist

- Code is organized into logical files by concern (HTML structure, CSS styling, JS behavior).
- Naming and indentation are kept consistent across files.
- Comments are added for important blocks such as weather logic, project logic, and form handling.
- Unused or noisy UI text was reduced to improve clarity.
- Basic checks were performed to avoid broken internal documentation links.

---

## Documentation and Submission Readiness

- `README.md` includes project description and setup instructions.
- `README.md` includes a short AI use summary and points to the detailed AI report.
- `docs/ai-usage-report.md` documents tools used, benefits/challenges, learning outcomes, and responsible use.
- Technical implementation details are documented in this file.
- A `.gitignore` file is included for common local/editor artifacts.
