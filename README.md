# Tennis Coaching Calculator

A web application for calculating the costs of tennis coaching sessions at Helsingin Mailapelikeskus. This application helps players calculate how much they owe for multiple coaching sessions by dividing the coach fee and court rental costs among the players.

## Features

- Add multiple coaching sessions with details:
  - Date
  - Time
  - Duration (in hours)
  - Number of players in the group
  - Discount eligibility
- Automatic calculation of:
  - Coach fee per player (€50 total per session, divided equally)
  - Court fee per player (based on current Mailapelikeskus rates, divided equally)
  - Total cost per player
- Multiple season pricing support:
  - Spring 2025 prices (default)
  - Fall 2024 prices
  - Toggle between seasons with automatic price recalculation
- Two view modes for session summary:
  - Detailed view: Shows all session information
  - Compact view: Shows only date and total amount per player
- Session management:
  - View all added sessions
  - Remove individual sessions
  - Clear all sessions
- Local storage functionality to save sessions in the browser

## How to Use

1. Open `index.html` in a web browser.
2. The application defaults to Spring 2025 pricing; you can change to Fall 2024 pricing using the dropdown menu at the top if needed.
3. Fill in the session details:
   - Select the date of the coaching session
   - Enter the start time (only :00 or :30 minute times are allowed)
   - Set the duration (1-3 hours)
   - Enter the number of players in the group
   - Check the discount eligibility box if applicable (for students, pensioners, or PuiU/PTC members)
4. Click "Add Session" to add it to your list
5. Continue adding all your sessions as needed
6. Toggle between detailed and compact views using the switch above the sessions list
7. View the total amount you owe at the bottom of the sessions list

## Court Pricing

The court pricing is based on the rates from Helsingin Mailapelikeskus for different seasons:

### Spring 2025 Prices (Default)
- Monday-Thursday:
  - 5:30-15:30: 21€ (regular) / 20€ (discount)
  - 15:30-16:30: 25€
  - 16:30-21:30: 35.5€
  - 21:30-23:00: 29.5€

- Friday:
  - 5:30-15:30: 21€ (regular) / 20€ (discount)
  - 15:30-16:30: 25€
  - 16:30-19:30: 35.5€
  - 19:30-20:30: 27€
  - 20:30-23:00: 21€

- Saturday:
  - 5:30-18:30: 29.5€
  - 18:30-23:00: 21€

- Sunday:
  - 5:30-16:30: 29.5€
  - 16:30-20:30: 35.5€
  - 20:30-23:00: 21€

### Fall 2024 Prices
- Monday-Thursday:
  - 5:30-15:30: 20€ (regular) / 19€ (discount)
  - 15:30-16:30: 24€
  - 16:30-21:30: 34€
  - 21:30-23:00: 28€

- Friday:
  - 5:30-15:30: 20€ (regular) / 19€ (discount)
  - 15:30-16:30: 24€
  - 16:30-19:30: 34€
  - 19:30-20:30: 26€
  - 20:30-23:00: 20€

- Saturday:
  - 5:30-18:30: 28€
  - 18:30-23:00: 20€

- Sunday:
  - 5:30-16:30: 28€
  - 16:30-20:30: 34€
  - 20:30-23:00: 20€

The pricing data is embedded directly in the JavaScript code.

## Setup

1. Clone or download this repository
2. Make sure all files are in the same directory:
   - `index.html`
   - `styles.css`
   - `script.js`
3. Open `index.html` in a web browser

## Technical Details

- Built with HTML, CSS, and JavaScript
- Uses ES6+ features
- Stores data in the browser's localStorage
- Responsive design works on both desktop and mobile devices

## Source

Pricing information sourced from [Mailapelikeskus Tennis](https://mailapelikeskus.fi/tennis/) 