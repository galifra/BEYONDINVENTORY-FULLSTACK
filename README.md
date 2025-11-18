# BEYONDINVENTORY-FULLSTACK
BeyondInventory is a full-stack inventory management platform designed to help users track items across custom locations with a clean interface, fast search, real-time CRUD interactions, and user authentication.
The app allows you to create and manage items, organize them by location, visualize where everything is stored, and edit or remove data seamlessly on a responsive React frontend powered by a Spring Boot backend.
This project demonstrates complete REST API integration, user flow design, modal-driven CRUD interfaces, and strong UI/UX considerations. It fulfills the full requirements for a production-quality Java + React full-stack project.
🛠 Technologies Used Frontend
(React + Vite)
React 18
Vite
React Router
react-hot-toast (optional notifications)
CSS modules & custom design
Component-driven architecture
Modals for editing items & locations
Backend (Java + Spring Boot) 
Spring Boot 3 
Spring Web 
Spring Data 
JPA MySQL database 
Hibernate ORM 
REST API architecture 
CORS configuration enabled 
Database 
MySQL 8
Schema includes Items and Locations with relationships
⚙️ Installation Instructions 
These steps allow anyone to build and run your app locally exactly as intended.
⭐ Backend Setup (Spring Boot)
1. Clone the project
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO/backend
2.  Create MySQL database
   log into MySQL and run:
CREATE DATABASE beyondinventory;
3. Update application.properties Located at: src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/beyondinventory spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
# If using authentication later: 
# app.jwt.secret=YOUR_JWT_SECRET No .env is required unless you add JWT later. 
4. Install dependencies & run backend ./mvnw spring-boot:run
Your backend will start on:
http://localhost:8080
⭐ Frontend Setup (React)
1. Navigate to frontend folder cd ../react-frontend
2. Install dependencies npm install
3. Start the development server npm run dev Your frontend will run on: http://localhost:5173
4. Required additional config
None — the frontend communicates with the backend via hardcoded http://localhost:8080/api/.... No API keys or .env required.
🧱 Wireframes
(Replace these links with your images or upload them directly)
Home Page Wireframe: https://link-to-your-wireframe.com/home
Items List Wireframe: https://link-to-your-wireframe.com/list
Add Item Wireframe: https://link-to-your-wireframe.com/add-item
Locations Wireframe: https://link-to-your-wireframe.com/locations
🗺 ER Diagram (Replace link or embed image here)
ERD Link: https://link-to-your-erd.com/erd
Tables:
Locations
id
name
Items
| id | name | description | location_id |
Relationship:
One Location → Many Items
✅ Current Features (Fully Working) Frontend
🚀 Clean UI with galaxy theme and modern styling
🔍 Search items by name 🏷 Add new items
📦 Edit items via modal
❌ Delete items
📍 View all locations
🔄 Edit location names (modal)
🗑 Delete locations
🧭 Routing for all pages
🔐 Login modal if user tries to modify without being logged in
🎉 Validation + error messages
Backend
Full REST CRUD for:
/api/items
/api/locations
DTO → Entity mapping
Item ↔ Location relationship
Automatic ID generation
MySQL persistence
CORS enabled for frontend
// 🚧 Unsolved Problems / Future Features These are optional but great to discuss in your presentation: Future Enhancements Add JWT authentication Add user accounts + roles Add pagination for large inventories Add file/image upload for items Add global notifications using react-hot-toast Add dark/light theme toggle Deploy to Render/Netlify Add dashboard + analytics (items per location, trends) Known Limitations Login/Signup is UI-only (no real auth yet) No persistent session management Location name collisions allowed No confirmation dialog before deletion
🎤 Elevator Pitch (You Can Say This in Your Presentation) BeyondInventory is a full-stack application designed to make organization frictionless. Users can add items, assign them to locations, update and search through everything, and visualize where their belongings are stored. The app is powered by a responsive React frontend and a robust Spring Boot backend that manages all persistent data through a MySQL database. The system is fast, intuitive, and built with clean architecture, providing a great foundation for future expansion into authentication, cloud hosting, and real-world usage.
