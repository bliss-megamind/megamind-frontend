# MegaMind Frontend

Modern React authentication frontend for MegaMind platform.

## Features

- ✅ Beautiful gradient UI with smooth animations
- ✅ Tab switching between Login and Register
- ✅ Real-time form validation
- ✅ Error and success notifications
- ✅ Axios API integration
- ✅ Token storage in localStorage
- ✅ Responsive design for all devices
- ✅ Welcome page after successful login

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── AuthForm.jsx          # Login/Register form
│   └── AuthForm.css
├── pages/
│   ├── Login.jsx             # Main login page
│   └── Login.css
├── services/
│   └── authService.js        # API communication
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Features

### Login Page
- Clean, modern UI with gradient background
- Tab switching between Login and Register
- Form validation with error messages
- Success notifications
- Responsive design

### Auth Service
- Axios interceptor to attach JWT token to requests
- Register endpoint
- Login endpoint
- Get profile endpoint
- Logout functionality

## Usage

1. Make sure the backend is running on `http://localhost:5000`
2. Run `npm run dev` to start the frontend
3. Register a new account or login with existing credentials
4. Your token will be saved to localStorage automatically
