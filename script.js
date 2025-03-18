// Store the pricing data for different seasons
const pricingDataBySeasons = {
  "spring2025": {
    "venue": "Helsingin Mailapelikeskus",
    "season": "Spring 2025",
    "sport": "Tennis",
    "prices_per_hour": {
      "monday_to_thursday": [
        {"time_range": "5:30-15:30", "regular_price": 21, "discount_price": 20},
        {"time_range": "15:30-16:30", "regular_price": 25},
        {"time_range": "16:30-21:30", "regular_price": 35.5},
        {"time_range": "21:30-23:00", "regular_price": 29.5}
      ],
      "friday": [
        {"time_range": "5:30-15:30", "regular_price": 21, "discount_price": 20},
        {"time_range": "15:30-16:30", "regular_price": 25},
        {"time_range": "16:30-19:30", "regular_price": 35.5},
        {"time_range": "19:30-20:30", "regular_price": 27},
        {"time_range": "20:30-23:00", "regular_price": 21}
      ],
      "saturday": [
        {"time_range": "5:30-18:30", "regular_price": 29.5},
        {"time_range": "18:30-23:00", "regular_price": 21}
      ],
      "sunday": [
        {"time_range": "5:30-16:30", "regular_price": 29.5},
        {"time_range": "16:30-20:30", "regular_price": 35.5},
        {"time_range": "20:30-23:00", "regular_price": 21}
      ]
    },
    "discount_eligibility": ["Students", "Pensioners", "PuiU/PTC"]
  },
  "fall2024": {
    "venue": "Helsingin Mailapelikeskus",
    "season": "Fall 2024",
    "sport": "Tennis",
    "prices_per_hour": {
      "monday_to_thursday": [
        {"time_range": "5:30-15:30", "regular_price": 20, "discount_price": 19},
        {"time_range": "15:30-16:30", "regular_price": 24},
        {"time_range": "16:30-21:30", "regular_price": 34},
        {"time_range": "21:30-23:00", "regular_price": 28}
      ],
      "friday": [
        {"time_range": "5:30-15:30", "regular_price": 20, "discount_price": 19},
        {"time_range": "15:30-16:30", "regular_price": 24},
        {"time_range": "16:30-19:30", "regular_price": 34},
        {"time_range": "19:30-20:30", "regular_price": 26},
        {"time_range": "20:30-23:00", "regular_price": 20}
      ],
      "saturday": [
        {"time_range": "5:30-18:30", "regular_price": 28},
        {"time_range": "18:30-23:00", "regular_price": 20}
      ],
      "sunday": [
        {"time_range": "5:30-16:30", "regular_price": 28},
        {"time_range": "16:30-20:30", "regular_price": 34},
        {"time_range": "20:30-23:00", "regular_price": 20}
      ]
    },
    "discount_eligibility": ["Students", "Pensioners", "PuiU/PTC"]
  }
};

// Current selected pricing data
let pricingData = pricingDataBySeasons.spring2025; // Default to Spring 2025 pricing
let currentSeason = "spring2025";

// View settings
let isCompactView = false;

// Additional information
const additionalInfo = {
  "ball_machine": {
    "regular_price": 10,
    "discount_price": 8,
    "discount_eligibility": ["PuiU/PTC"],
    "booking_note": "Can be booked during customer service opening hours"
  },
  "additional_fees": {
    "late_billing_fee": 5
  },
  "contact_information": {
    "address": "Tapulikaupungintie 4, 00750 Helsinki",
    "phone": "(09) 346 2511",
    "email": "info@mailapelikeskus.fi"
  },
  "source": "https://mailapelikeskus.fi/tennis/"
};

// Store the sessions added by the user
let sessions = [];

// Initialize the application
function init() {
    // No need to load data asynchronously anymore
    
    // Add event listeners
    document.getElementById('coaching-form').addEventListener('submit', addSession);
    document.getElementById('clear-sessions').addEventListener('click', clearSessions);
    
    // Set up time input validation
    const timeInput = document.getElementById('session-time');
    timeInput.addEventListener('change', validateTimeInput);
    
    // Add season toggle to the page
    addSeasonToggle();
    
    // Add view toggle to the summary container
    addViewToggle();
    
    // Load any saved sessions from localStorage
    loadSessions();
    
    // Load view preference from localStorage
    loadViewPreference();
}

// Add view toggle to the page
function addViewToggle() {
    // Create toggle container
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'view-toggle-container';
    
    // Create label
    const label = document.createElement('label');
    label.className = 'switch';
    
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'view-toggle';
    checkbox.checked = isCompactView;
    
    // Create slider
    const slider = document.createElement('span');
    slider.className = 'slider round';
    
    // Create text
    const text = document.createElement('span');
    text.className = 'view-toggle-text';
    text.textContent = 'Compact View';
    
    // Add event listener
    checkbox.addEventListener('change', function() {
        isCompactView = this.checked;
        // Save preference to localStorage
        localStorage.setItem('tennisViewPreference', isCompactView ? 'compact' : 'detailed');
        // Re-render sessions with the new view
        renderSessions();
    });
    
    // Assemble toggle
    label.appendChild(checkbox);
    label.appendChild(slider);
    toggleContainer.appendChild(label);
    toggleContainer.appendChild(text);
    
    // Add to the page
    const summaryContainer = document.querySelector('.summary-container');
    const sessionsList = document.getElementById('sessions-list');
    summaryContainer.insertBefore(toggleContainer, sessionsList);
}

// Load view preference from localStorage
function loadViewPreference() {
    const savedPreference = localStorage.getItem('tennisViewPreference');
    if (savedPreference) {
        isCompactView = savedPreference === 'compact';
        // Update toggle if it exists
        const viewToggle = document.getElementById('view-toggle');
        if (viewToggle) {
            viewToggle.checked = isCompactView;
        }
        renderSessions();
    }
}

// Add season toggle to the page
function addSeasonToggle() {
    // Create toggle container
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'season-toggle';
    
    // Create label
    const label = document.createElement('label');
    label.textContent = 'Pricing Season: ';
    label.className = 'season-label';
    
    // Create select dropdown
    const select = document.createElement('select');
    select.id = 'season-select';
    
    // Add options
    const fall2024Option = document.createElement('option');
    fall2024Option.value = 'fall2024';
    fall2024Option.textContent = 'Fall 2024';
    
    const spring2025Option = document.createElement('option');
    spring2025Option.value = 'spring2025';
    spring2025Option.textContent = 'Spring 2025';
    
    // Set default selection
    spring2025Option.selected = true;
    
    // Add options to select
    select.appendChild(fall2024Option);
    select.appendChild(spring2025Option);
    
    // Add event listener
    select.addEventListener('change', function() {
        currentSeason = this.value;
        pricingData = pricingDataBySeasons[currentSeason];
        
        // Update season info in pricing info section
        document.getElementById('current-season').textContent = pricingData.season;
        
        // Recalculate prices for existing sessions
        if (sessions.length > 0) {
            if (confirm('Do you want to update all existing sessions with the new pricing?')) {
                updateSessionPrices();
            }
        }
    });
    
    // Assemble toggle
    toggleContainer.appendChild(label);
    toggleContainer.appendChild(select);
    
    // Add to the page before the form
    const formContainer = document.querySelector('.form-container');
    formContainer.insertBefore(toggleContainer, document.getElementById('coaching-form'));
    
    // Update the pricing info section
    const pricingInfo = document.querySelector('.pricing-info');
    const seasonInfo = document.createElement('p');
    seasonInfo.innerHTML = 'Current pricing: <span id="current-season">' + pricingData.season + '</span>';
    pricingInfo.insertBefore(seasonInfo, pricingInfo.firstChild);
}

// Update prices for all sessions based on the current pricing data
function updateSessionPrices() {
    sessions.forEach(session => {
        const newPrice = calculateSessionPrice(
            session.date,
            session.time,
            session.duration,
            session.playersCount,
            session.isDiscountEligible
        );
        session.price = newPrice;
    });
    
    // Save updated sessions and refresh the UI
    saveSessions();
    renderSessions();
}

// Validate time input to ensure it's either :00 or :30
function validateTimeInput() {
    const timeInput = document.getElementById('session-time');
    const timeValue = timeInput.value;
    
    if (timeValue) {
        const [hours, minutes] = timeValue.split(':').map(Number);
        
        // If minutes are not 00 or 30, adjust to the nearest valid time
        if (minutes !== 0 && minutes !== 30) {
            // Round to the nearest 30 minutes
            const roundedMinutes = minutes < 15 ? 0 : minutes < 45 ? 30 : 0;
            const adjustedHours = minutes >= 45 ? (hours + 1) % 24 : hours;
            
            // Format the time with padded zeros
            const formattedTime = `${adjustedHours.toString().padStart(2, '0')}:${roundedMinutes.toString().padStart(2, '0')}`;
            timeInput.value = formattedTime;
        }
    }
}

// Get the court price based on day and time
function getCourtPrice(date, time, isDiscountEligible) {
    const dayOfWeek = new Date(date).getDay(); // 0 = Sunday, 1 = Monday, ...
    const hours = parseInt(time.split(':')[0]);
    const minutes = parseInt(time.split(':')[1]);
    
    // Convert time to decimal for comparison
    const timeDecimal = hours + (minutes / 60);
    
    // Determine which day category to use
    let dayCategory;
    if (dayOfWeek === 0) {
        dayCategory = 'sunday';
    } else if (dayOfWeek === 6) {
        dayCategory = 'saturday';
    } else if (dayOfWeek === 5) {
        dayCategory = 'friday';
    } else {
        dayCategory = 'monday_to_thursday';
    }
    
    // Find the matching time slot
    const timeSlots = pricingData.prices_per_hour[dayCategory];
    for (const slot of timeSlots) {
        const [startTime, endTime] = slot.time_range.split('-');
        
        // Convert time ranges to decimal for comparison
        const startDecimal = convertTimeToDecimal(startTime);
        const endDecimal = convertTimeToDecimal(endTime);
        
        if (timeDecimal >= startDecimal && timeDecimal < endDecimal) {
            // Return discounted price if eligible and available, otherwise regular price
            return isDiscountEligible && slot.discount_price ? slot.discount_price : slot.regular_price;
        }
    }
    
    // Default price if no match found (shouldn't happen with proper data)
    return 25;
}

// Helper function to convert time string (HH:MM) to decimal
function convertTimeToDecimal(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours + (minutes / 60);
}

// Format a date string (YYYY-MM-DD) to a more readable format
function formatDate(dateStr) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
}

// Format time string (HH:MM) to a more readable format
function formatTime(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    return `${hours}:${minutes}`;
}

// Calculate the price for a single session
function calculateSessionPrice(date, time, duration, playersCount, isDiscountEligible) {
    // Coach fee: €50 divided by the number of players
    const coachFeePerPlayer = 50 / playersCount;
    
    // Court fee: Based on time and day, divided by the number of players
    let totalCourtFee = 0;
    
    // For each hour of the session, calculate the court fee
    for (let i = 0; i < duration; i++) {
        const [hours, minutes] = time.split(':').map(Number);
        const sessionTime = `${(hours + i).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        const hourCourtFee = getCourtPrice(date, sessionTime, isDiscountEligible);
        totalCourtFee += hourCourtFee;
    }
    
    const courtFeePerPlayer = totalCourtFee / playersCount;
    
    return {
        coachFeePerPlayer,
        courtFeePerPlayer,
        totalPerPlayer: coachFeePerPlayer + courtFeePerPlayer
    };
}

// Add a new coaching session
function addSession(event) {
    event.preventDefault();
    
    // Get form values
    const date = document.getElementById('session-date').value;
    const time = document.getElementById('session-time').value;
    const duration = parseInt(document.getElementById('session-duration').value);
    const playersCount = parseInt(document.getElementById('players-count').value);
    const isDiscountEligible = document.getElementById('discount-eligible').checked;
    
    // Validate time format (ensure it's :00 or :30)
    const [hours, minutes] = time.split(':').map(Number);
    if (minutes !== 0 && minutes !== 30) {
        alert('Court reservations can only start at full hour (:00) or half hour (:30).');
        return;
    }
    
    // Calculate price
    const price = calculateSessionPrice(date, time, duration, playersCount, isDiscountEligible);
    
    // Create session object
    const session = {
        id: Date.now(), // Use timestamp as unique ID
        date,
        time,
        duration,
        playersCount,
        isDiscountEligible,
        price,
        pricingSeason: currentSeason // Store which pricing season was used
    };
    
    // Add to sessions array
    sessions.push(session);
    
    // Save to localStorage
    saveSessions();
    
    // Update UI
    renderSessions();
    
    // Reset form
    document.getElementById('coaching-form').reset();
}

// Render all sessions to the UI
function renderSessions() {
    const sessionsList = document.getElementById('sessions-list');
    
    // Clear the list
    sessionsList.innerHTML = '';
    
    if (sessions.length === 0) {
        sessionsList.innerHTML = '<p class="empty-list-message">No sessions added yet.</p>';
        document.getElementById('total-amount').textContent = '€0.00';
        return;
    }
    
    // Calculate total price
    let totalPrice = 0;
    
    // Add each session to the list
    sessions.forEach(session => {
        const sessionItem = document.createElement('div');
        sessionItem.className = 'session-item';
        
        const removeButton = document.createElement('button');
        removeButton.className = 'remove-btn';
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeSession(session.id);
        
        // Get pricing season text
        const seasonText = session.pricingSeason ? 
            (session.pricingSeason === 'fall2024' ? 'Fall 2024' : 'Spring 2025') : 
            'Current';
        
        // Display session differently based on view mode
        if (isCompactView) {
            // Compact view - just date and total price
            sessionItem.innerHTML = `
                <p><strong>Date:</strong> ${formatDate(session.date)}</p>
                <p><strong>Total:</strong> €${session.price.totalPerPlayer.toFixed(2)} per player</p>
            `;
        } else {
            // Detailed view - all session details
            sessionItem.innerHTML = `
                <p><strong>Date:</strong> ${formatDate(session.date)}</p>
                <p><strong>Time:</strong> ${formatTime(session.time)} (${session.duration} hour${session.duration > 1 ? 's' : ''})</p>
                <p><strong>Players:</strong> ${session.playersCount}</p>
                <p><strong>Discount Applied:</strong> ${session.isDiscountEligible ? 'Yes' : 'No'}</p>
                <p><strong>Pricing:</strong> ${seasonText}</p>
                <p><strong>Coach Fee:</strong> €${session.price.coachFeePerPlayer.toFixed(2)} per player</p>
                <p><strong>Court Fee:</strong> €${session.price.courtFeePerPlayer.toFixed(2)} per player</p>
                <p><strong>Total:</strong> €${session.price.totalPerPlayer.toFixed(2)} per player</p>
            `;
        }
        
        sessionItem.appendChild(removeButton);
        sessionsList.appendChild(sessionItem);
        
        totalPrice += session.price.totalPerPlayer;
    });
    
    // Update total amount
    document.getElementById('total-amount').textContent = `€${totalPrice.toFixed(2)}`;
}

// Remove a session by ID
function removeSession(id) {
    sessions = sessions.filter(session => session.id !== id);
    saveSessions();
    renderSessions();
}

// Clear all sessions
function clearSessions() {
    if (confirm('Are you sure you want to clear all sessions?')) {
        sessions = [];
        saveSessions();
        renderSessions();
    }
}

// Save sessions to localStorage
function saveSessions() {
    localStorage.setItem('tennisCoachingSessions', JSON.stringify(sessions));
}

// Load sessions from localStorage
function loadSessions() {
    const savedSessions = localStorage.getItem('tennisCoachingSessions');
    if (savedSessions) {
        sessions = JSON.parse(savedSessions);
        renderSessions();
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', init);