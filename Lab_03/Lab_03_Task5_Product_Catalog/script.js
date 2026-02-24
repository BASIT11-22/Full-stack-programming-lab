// Create a Map to store products
const productCatalog = new Map();

// Add minimum 5 products (Key = Product ID, Value = Product object)
productCatalog.set("P001", { name: "Laptop", price: 1200, category: "Electronics" });
productCatalog.set("P002", { name: "Smartphone", price: 800, category: "Electronics" });
productCatalog.set("P003", { name: "Desk Chair", price: 150, category: "Furniture" });
productCatalog.set("P004", { name: "Coffee Maker", price: 85, category: "Appliances" });
productCatalog.set("P005", { name: "Notebook", price: 5, category: "Stationery" });

const searchInput = document.getElementById("search-id");
const searchBtn = document.getElementById("search-btn");
const deleteBtn = document.getElementById("delete-btn");
const searchResultEl = document.getElementById("search-result");
const productListEl = document.getElementById("product-list");
const totalProductsEl = document.getElementById("total-products");

// Function to update the full catalog display
function updateCatalogDisplay() {
    // Show total products using .size
    totalProductsEl.textContent = `Total Products: ${productCatalog.size}`;

    let listHtml = "";

    // Display results dynamically
    productCatalog.forEach((product, id) => {
        listHtml += `
            <div class="product-card">
                <p><strong>ID:</strong> ${id}</p>
                <p><strong>Name:</strong> ${product.name}</p>
                <p><strong>Price:</strong> $${product.price}</p>
                <p><strong>Category:</strong> ${product.category}</p>
            </div>
        `;
    });

    productListEl.innerHTML = listHtml;
}

// Implement search by ID
searchBtn.addEventListener("click", () => {
    const id = searchInput.value.trim().toUpperCase(); // Assuming IDs are uppercase

    if (productCatalog.has(id)) {
        const product = productCatalog.get(id);
        searchResultEl.innerHTML = `
            <div class="search-card">
                <h4>Search Result:</h4>
                <p><strong>Name:</strong> ${product.name} | <strong>Price:</strong> $${product.price}</p>
            </div>
        `;
    } else {
        searchResultEl.innerHTML = `<p style="color: red;">Product with ID ${id} not found.</p>`;
    }
});

// Implement delete by ID
deleteBtn.addEventListener("click", () => {
    const id = searchInput.value.trim().toUpperCase();

    if (productCatalog.has(id)) {
        productCatalog.delete(id);
        searchResultEl.innerHTML = `<p style="color: green;">Product ${id} deleted successfully.</p>`;
        updateCatalogDisplay(); // Refresh UI
        searchInput.value = '';
    } else {
        searchResultEl.innerHTML = `<p style="color: red;">Cannot delete. Product ID ${id} not found.</p>`;
    }
});

// Initial display
updateCatalogDisplay();
