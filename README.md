# Student Finance Tracker

## About This Project

This is a school assignment project where I chose to build a **Finance Tracker App**. The app helps students track their daily expenses and manage their finances easily.

## What the App Does

The Student Finance Tracker allows you to:

- **Add Transactions** - Record your daily expenses with description, amount, category, and date
- **View Dashboard** - See total transactions, total money spent, and your leading spending category
- **View All Transactions** - Display all your recorded transactions in a table
- **Edit Transactions** - Update existing transaction details
- **Delete Transactions** - Remove transactions you no longer need
- **Search Transactions** - Search for transactions by category or description (text only)
- **Sort Transactions** - Sort transactions by amount
- **Export Data** - Download your transactions as a JSON file
- **Import Data** - Upload transactions from a JSON file

## How to Use

1. **Download or clone this repository**
2. **Open `index.html` in your web browser**
3. **Start tracking your expenses!**

### Adding a Transaction

- Click on "Add Transaction" in the navigation
- Fill in the description, amount, category, and date
- Click "Add Transaction" button

### Viewing Transactions

- Click on "All Transactions" to see all your records
- Use the search box to find specific transactions
- Check the "Sort (By amount)" checkbox to sort by amount

### Exporting/Importing Data

- Click "Export" button to download your data as JSON
- Click "Import" button to upload data from a JSON file
- When importing, you can choose to replace or merge with existing data

## File Organization

```
project/
│
├── assets/
│   └── icon.png              # App icon/logo
│
├── scripts/
│   ├── search.js             # Search functionality
│   ├── state.js              # Display records and update dashboard
│   ├── storage.js            # Save, export, and import data
│   ├── UI.js                 # Handle user interactions
│   └── validation.js         # Validate form inputs and search
│
├── styles/
│   └── styles.css            # All styling for the app
│
├── index.html                # Main HTML page
├── seed.json                 # Sample test data
└── README.md                 # This file
```

### File Descriptions

- **index.html** - The main page with all sections (About, Dashboard, Records, Add Transaction)
- **storage.js** - Handles saving records to localStorage, exporting to JSON, and importing from JSON
- **state.js** - Manages displaying records in the table and updating dashboard statistics
- **UI.js** - Connects buttons and form to their functions
- **validation.js** - Contains validation rules for form inputs and search
- **search.js** - Implements search functionality with validation
- **styles.css** - All the CSS styling for the app
- **seed.json** - Sample data with 5 test transactions

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6 Modules)
- LocalStorage for data persistence

## Features

✅ Add, edit, and delete transactions  
✅ Real-time form validation  
✅ Search with text-only validation  
✅ Sort transactions by amount  
✅ Dashboard with spending analytics  
✅ Export/Import data as JSON  
✅ Smooth scrolling navigation  
✅ Responsive design

## Contact

GitHub: [@samuel-kabera](https://github.com/samuel-kabera)  
Email: s.kabera@alustudent.com

---

© 2025 Student Finance Tracker
