# Full-stack-programming-lab - Lab 10

## Project: Frontend JavaScript framework Next.JS 
*(Note: As per lab requirements, implemented strictly using Node.js & Express.js)*

## Objectives
This project demonstrates the core fundamentals of building a backend application using Node.js and Express.js. Key concepts covered include:
* Express server creation
* Setting up basic routes (`/home`, `/about`, `/contact`)
* Implementing dynamic routes with parameters (`/user/:name`)
* Rendering styled HTML directly from the server
* Handling data with Arrays (`/students`)
* Understanding CRUD concepts (GET requests)

## Technologies Used
* **Node.js**: JavaScript runtime environment.
* **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
* **HTML & CSS**: For structuring and styling the browser responses.

## Installation Steps
1. Clone the repository or navigate to your project folder.
2. Ensure you have Node.js installed on your system.
3. Open the terminal and initialize the project:
   ```bash
   npm init -y
   ```
4. Install the Express framework:
   ```bash
   npm install express
   ```

## How to Run
1. Open your terminal in the project directory (`Lab_10full_Stack_Node_Express_lab`).
2. Run the server using Node:
   ```bash
   node server.js
   ```
3. You will see a message in the terminal: `Running on http://localhost:3000`
4. Open your web browser and navigate to the URLs listed below.

## Routes List
| Route Path | Description | Task |
| :--- | :--- | :--- |
| `/` | Main landing page rendering complete HTML | Task 4 |
| `/students` | Displays a list of students from an array | Task 1 |
| `/home` | Simple route returning a Welcome Home message | Task 2 |
| `/about` | Simple route returning an About Us message | Task 2 |
| `/contact` | Simple route returning a Contact Us message | Task 2 |
| `/user/:name` | Dynamic route greeting the specified user | Task 3 |

## Example Browser URLs
* **Main Page**: [http://localhost:3000/](http://localhost:3000/)
* **Student List**: [http://localhost:3000/students](http://localhost:3000/students)
* **Home Page**: [http://localhost:3000/home](http://localhost:3000/home)
* **About Page**: [http://localhost:3000/about](http://localhost:3000/about)
* **Contact Page**: [http://localhost:3000/contact](http://localhost:3000/contact)
* **Dynamic User (Ali)**: [http://localhost:3000/user/Ali](http://localhost:3000/user/Ali)
