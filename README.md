# FocusFlow

## Deployed Website
Try the live application here: [FocusFlow](https://focusflow-three.vercel.app)

# Advanced React To-Do Application with API Integration

## Objective
The goal of this project is to develop an advanced To-Do application using ReactJS. The application will integrate with an external API, implement advanced state management using Redux, and ensure responsive design for optimal user experience across devices.

---

## Requirements

### **Frontend Development and API Integration**
- Utilize **HTML** for structuring the application's layout.
- Use **CSS** for styling the application. Optionally, leverage frameworks like **Bootstrap** or **Material-UI** for design components.
- Implement application logic using **JavaScript (ES6+)**.
- Integrate with a public API (e.g., a weather API) to display data relevant to tasks (e.g., current weather conditions for outdoor tasks).
- Handle API errors gracefully and display error messages in the UI.

### **React Components and Advanced State Management**
- Build the application using functional components with **React hooks** (e.g., `useState`, `useEffect`).
- Minimum required components:
  - **TaskInput:** A component for adding a new task.
  - **TaskList:** A component for displaying the list of tasks.
- Use **Redux** for state management.
  - Implement **Redux Thunk** or **Redux Saga** for handling asynchronous actions like API calls.

### **Responsive Design**
- Ensure the application is fully responsive and works seamlessly on mobile, tablet, and desktop devices.
- Use **CSS Grid** and **Flexbox** for responsive layouts.
- Follow a **mobile-first design approach**.

### **Functionality**
1. **Add Task:** Users can input tasks in a text field and add them to the list by clicking a button or pressing Enter.
2. **View Tasks:** Display all added tasks in a list format.
3. **Delete Task:** Each task should have a delete button to remove it from the list.
4. **Task Prioritization:** Allow users to set priorities (e.g., High, Medium, Low) and display tasks accordingly.
5. **Persistent Storage:**
   - Use **localStorage** or **sessionStorage** to save tasks and authentication status.
   - Ensure data persists across browser sessions.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pornima25s/To-Do-Application-with-API-Integration.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the application in your browser:
   ```
   http://localhost:3000
   ```

---

## How to Use

1. **Login:** Simulate login to access the To-Do list.
2. **Add Task:** Enter a task in the input field and submit it.
3. **View Tasks:** See all your tasks listed with their priorities.
4. **Delete Task:** Remove tasks by clicking the delete button.
5. **Weather Info:** View relevant weather details fetched from an external API.
6. **Persistent Data:** Close and reopen the browser to find your data intact.

---

## Tools and Technologies
- **ReactJS**
- **Redux**
- **Redux Thunk** or **Redux Saga**
- **CSS** (or CSS frameworks like Bootstrap/Material-UI)
- **HTML**
- **JavaScript (ES6+)**
- **localStorage/sessionStorage**

---
