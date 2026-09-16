# 🌸 HerGlow

## Project Overview

HerGlow is a full-stack women's beauty, health, and wellness web application designed to provide users with a simple and interactive platform for everyday self-care and wellness awareness.

The application combines beauty and skincare guidance, menstrual cycle awareness, nutrition, fitness, mental wellness, and habit tracking in one platform.

HerGlow includes interactive frontend features such as the SkinSense skin-type quiz, HerVault educational articles, HerCycle cycle tracking, MyGlow habit tracking, and Self-Care activities.

The application uses HTML, CSS, JavaScript, and Bootstrap for the frontend, Node.js and Express.js for the backend, and MySQL for persistent data storage. REST APIs are used to connect the frontend with the backend and database.

## Main Features

### 1. SkinSense
- Interactive skin-type quiz
- Identifies a basic skin type based on user responses
- Provides a personalized simple skincare routine
- Quiz reset functionality

### 2. HerVault
- Educational wellness articles
- Categories for beauty, women's health, nutrition, fitness, self-care, and mental wellness
- Search functionality
- Read More functionality
- Articles are loaded from the MySQL database through REST APIs

### 3. HerCycle
- Menstrual cycle tracking
- Period start date
- Cycle length and period length
- Basic cycle phase estimation
- Cycle information stored in MySQL
- Saved information restored when the user returns

### 4. MyGlow
- Daily habit tracking
- Hydration
- Skincare
- Movement
- Nutrition
- Self-care
- Glow Score out of 100
- Habit data stored in MySQL

### 5. Self-Care
- Mood selection
- Breathing activity
- Simple wellness activities

### 6. Authentication
- User registration
- User login
- Profile page
- Logout
- Profile access protection
- User information stored in MySQL

### 7. Responsive Design
- Mobile-friendly layout
- Bootstrap-based responsive components
- Responsive navigation and cards


## Technology Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Google Fonts

### Backend
- Node.js
- Express.js
- REST API
- CORS
- dotenv

### Database
- MySQL
- mysql2

### Development Tools
- Visual Studio Code
- MySQL Workbench
- Git
- GitHub

## Project Structure

```text
herglow/
│
├── backend/
│   ├── db.js
│   ├── server.js
│   └── routes/
│       ├── authRoutes.js
│       ├── cycleRoutes.js
│       ├── habitRoutes.js
│       └── articleRoutes.js
│
├── frontend/
│   ├── css/
│   │   ├── style.css
│   │   └── responsive.css
│   │
│   ├── js/
│   │   ├── main.js
│   │   ├── skinsense.js
│   │   ├── hervault.js
│   │   ├── hercycle.js
│   │   ├── myglow.js
│   │   ├── selfcare.js
│   │   └── auth.js
│   │
│   ├── images/
│   ├── index.html
│   ├── skinsense.html
│   ├── hervault.html
│   ├── hercycle.html
│   ├── myglow.html
│   ├── selfcare.html
│   ├── login.html
│   ├── register.html
│   └── profile.html
│
├── docs/
├── .gitignore
├── README.md
└── herglow.sql


## Setup Instructions

### 1. Install Backend Dependencies

Open the terminal in VS Code and run:

```bash
cd backend
npm install
```

### 2. Configure MySQL

Make sure MySQL is installed and running.

Create the HerGlow database and tables using the SQL file:

```text
herglow.sql
```

The database is MySQL-based.

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=herglow
```

Replace `your_mysql_password` with your own MySQL password.

The `.env` file is not uploaded to GitHub because it is included in `.gitignore`.

### 4. Start the Backend

Open the VS Code terminal and run:

```bash
cd backend
node server.js
```

The backend will run at:

```text
http://localhost:5000
```

### 5. Open the Frontend

Open the following file in a web browser:

```text
frontend/index.html
```

The frontend communicates with the Node.js and Express.js backend using REST APIs.

### 6. Main API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login a user |
| GET | `/api/cycle/:user_id` | Get cycle information |
| POST | `/api/cycle` | Save cycle information |
| GET | `/api/habits/:user_id` | Get habit records |
| POST | `/api/habits` | Save daily habits |
| GET | `/api/articles` | Get all wellness articles |
| GET | `/api/articles/:id` | Get one article |

### 7. Important Note

HerGlow is an academic wellness project. The menstrual cycle information and estimates are for general educational and awareness purposes only and should not be used for contraception, diagnosis, or medical decisions.

## Limitations

- HerCycle provides basic cycle estimates and is not intended for medical diagnosis or contraception.
- The Glow Score is a simple project-based wellness score and is not a medical measurement.
- The current authentication system is designed for academic demonstration purposes.
- The application currently focuses on core wellness features rather than advanced medical functionality.
- Internet access is required for Bootstrap and Google Fonts loaded through CDNs.

## Testing

The main features of HerGlow were tested during development.

### Frontend Testing

- Home page navigation tested
- SkinSense quiz tested
- Personalized skincare routine tested
- HerVault article loading tested
- HerVault search tested
- HerVault Read More functionality tested
- HerCycle cycle calculation tested
- HerCycle data saving and restoring tested
- MyGlow habit tracking tested
- Glow Score calculation tested
- Self-Care mood selection tested
- Breathing activity tested
- Responsive mobile layout tested

### Backend Testing

- Backend server connection tested
- MySQL database connection tested
- User registration API tested
- User login API tested
- Invalid login handling tested
- Cycle API tested
- Habit API tested
- Article API tested
- Frontend-to-backend communication tested

### Authentication Testing

- Registration with empty fields tested
- Login with empty fields tested
- Invalid email/password tested
- Successful login tested
- Profile page tested
- Logout tested
- Profile access protection tested

## GitHub

The source code for this project is maintained using Git and GitHub.

The repository contains:

- Frontend source code
- Backend source code
- MySQL database script
- Project documentation
- Configuration files required for development

Repository:

`https://github.com/aditijha2804/herglow`