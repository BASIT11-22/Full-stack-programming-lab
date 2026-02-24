// Function returning a Promise to simulate fetching users
function fetchUsers() {
    return new Promise((resolve, reject) => {
        // Boolean flag to simulate failure (change to true to test error handling)
        const simulateFailure = false;

        // Use setTimeout with 3 seconds delay
        setTimeout(() => {
            if (simulateFailure) {
                reject("Error: Failed to fetch users from server.");
            } else {
                // Resolve with an array of user objects
                const users = [
                    { id: 1, name: "Alice", email: "alice@example.com" },
                    { id: 2, name: "Bob", email: "bob@example.com" },
                    { id: 3, name: "Charlie", email: "charlie@example.com" }
                ];
                resolve(users);
            }
        }, 3000);
    });
}

const dataContainer = document.getElementById("data-container");

// Call the function and handle Promise
fetchUsers()
    .then((users) => {
        // Generate HTML for each user
        let usersHtml = "";
        users.forEach(user => {
            usersHtml += `
                <div class="user-card">
                    <h3>${user.name}</h3>
                    <p>Email: ${user.email}</p>
                </div>
            `;
        });

        // Display users in HTML
        dataContainer.innerHTML = usersHtml;
    })
    .catch((error) => {
        // Display error message if rejected
        dataContainer.innerHTML = `<p class="error">${error}</p>`;
    });
