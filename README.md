# InternIntelligence_E-COMMERCE

Playora is a dynamic e-commerce platform for music lovers, built with modern web technologies. Unlike a simple showcase, this application provides a full-fledged user experience, from browsing a curated catalog of CD albums to managing a personal shopping cart and saving favorite items. The project is designed with a strong focus on modularity and state management to ensure a smooth, responsive, and intuitive user journey.

### Key Features
* **Comprehensive User Management**: The application includes a complete authentication system with a seamless workflow for user registration, login, and logout. It also keeps track of the user's session for a personalized experience.
* **Shopping Cart Functionality**: Customers can add albums to a shopping cart, where they can easily manage item quantities, remove items, and see the real-time total.
* **Favorites/Wishlist**: The app includes a sophisticated favorites system that allows users to save albums for later. This feature works for both authenticated users (with data stored on the server) and guest users (with data saved locally).
* **Simulated Checkout**: A secure checkout process with a detailed form for personal and card information. The form includes basic validation and simulates a successful transaction, clearing the cart upon completion.
* **Dynamic Homepage**: The main page features a variety of interactive components, including a rotating banner of album covers, sections for trending albums and genres, and custom promotional areas to engage visitors.

### Technologies Used
* **Frontend**: The application is built using React.js, with React Context for robust state management of authentication, cart, and favorites. It uses react-router-dom for handling navigation between pages.
* **Data Management**: Data is fetched and managed using axios, a popular library for making HTTP requests. The application communicates with a local mock REST API to handle user accounts, cart items, and favorite products.
* **Styling**: The design leverages a component-based approach, utilizing a combination of custom CSS, class names that suggest a framework like Bootstrap for a clean and responsive layout, and the Animate.css library for adding a variety of animations. 
* **Interactivity**: The use of the Swiper library enables the creation of smooth, interactive carousels and banners.
