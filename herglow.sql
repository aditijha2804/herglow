-- =========================================
-- HERGLOW DATABASE
-- =========================================

CREATE DATABASE IF NOT EXISTS herglow;

USE herglow;


-- =========================================
-- USERS TABLE
-- =========================================

CREATE TABLE users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


-- =========================================
-- CYCLES TABLE
-- =========================================

CREATE TABLE cycles (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    start_date DATE NOT NULL,

    cycle_length INT DEFAULT 28,

    period_length INT DEFAULT 5,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)

);


-- =========================================
-- HABITS TABLE
-- =========================================

CREATE TABLE habits (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    date DATE NOT NULL,

    water BOOLEAN DEFAULT FALSE,

    skincare BOOLEAN DEFAULT FALSE,

    exercise BOOLEAN DEFAULT FALSE,

    nutrition BOOLEAN DEFAULT FALSE,

    self_care BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (user_id)
        REFERENCES users(id),

    UNIQUE KEY unique_user_date (user_id, date)

);


-- =========================================
-- ARTICLES TABLE
-- =========================================

CREATE TABLE articles (

    id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(200) NOT NULL,

    category VARCHAR(100) NOT NULL,

    description VARCHAR(500),

    content TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


-- =========================================
-- SAMPLE HERVAULT ARTICLES
-- =========================================

INSERT INTO articles
(title, category, description, content)
VALUES

(
    'Simple Skincare for Beginners',
    'Beauty',
    'Learn the basics of building a simple and consistent skincare routine.',
    'A simple skincare routine can include cleansing, moisturizing, and daytime sun protection. Choose products according to your skin type and introduce new products gradually.'
),

(
    'Understanding Your Menstrual Cycle',
    'Women''s Health',
    'Learn about the common phases of the menstrual cycle.',
    'The menstrual cycle is commonly described using four phases: menstruation, the follicular phase, ovulation, and the luteal phase. Cycle length and symptoms can vary between individuals.'
),

(
    'Everyday Nutrition',
    'Nutrition',
    'Small nutrition habits can support everyday wellness.',
    'Aim for a varied diet that includes vegetables, fruits, whole grains, protein sources, and adequate fluids. Individual nutritional needs can vary.'
),

(
    'Movement for Everyday Wellness',
    'Fitness',
    'Discover simple ways to include movement in your daily routine.',
    'Walking, stretching, yoga, dancing, and other enjoyable activities can help you stay active. Choose activities that suit your abilities and lifestyle.'
),

(
    'Creating a Self-Care Routine',
    'Self-Care',
    'Simple self-care ideas for a calmer daily routine.',
    'Self-care can include rest, breathing exercises, journaling, spending time with supportive people, or taking a short break from screens.'
),

(
    'Mental Wellness Matters',
    'Mental Wellness',
    'Learn simple habits that can support emotional wellbeing.',
    'Making time for rest, connection, enjoyable activities, and healthy routines can support wellbeing. If you are struggling, consider speaking with a qualified professional.'
);