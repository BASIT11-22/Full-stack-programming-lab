// Function using Rest operator to gather all products into an array
function addToCart(...items) {
    // Store products in an array
    const cartProducts = items;

    // Use Spread operator to clone the cart
    const clonedCart = [...cartProducts];

    // Use array destructuring to extract first product and remaining products
    const [firstProduct, ...remainingProducts] = clonedCart;

    // Display total items, first product, and remaining products
    const cartDetailsContainer = document.getElementById("cart-details");

    const htmlContent = `
        <p><strong>Total Items in Cart:</strong> ${clonedCart.length}</p>
        <p><strong>First Product:</strong> ${firstProduct}</p>
        <p><strong>Remaining Products:</strong> ${remainingProducts.length > 0 ? remainingProducts.join(", ") : "None"}</p>
    `;

    // Show everything in HTML using innerHTML
    cartDetailsContainer.innerHTML = htmlContent;
}

// Call the function with sample products
addToCart("Laptop", "Wireless Mouse", "Keyboard", "Headphones");
