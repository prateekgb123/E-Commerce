const products = [];
const cart = [];
const orders = [];

// Category data with unique IDs
const categoryData = {
    electronics: [
        { name: "Smartphone", image: "Electronics/smartphone.webp", price: 20000 },
        { name: "Laptop", image: "Electronics/laptop.webp", price: 50000 },
        // ...other products
    ],
    toys: [
        { name: "Action Figure", image: "toys/actionfigure.webp", price: 800 },
        // ...other products
    ],
    books: [
        { name: "The Great Gatsby", image: "books/thegreatgatsby.webp", price: 300 },
        // ...other products
    ],
    fashion: [
        { name: "T-Shirt", image: "fashion/tshirt.webp", price: 500 },
        // ...other products
    ],
    fitness: [
        { name: "Yoga Mat", image: "fitness/yogamat.webp", price: 700 },
        // ...other products
    ],
    homeappliances: [
        { name: "Refrigerator", image: "homeappliances/refrigerator1.webp", price: 20000 },
        // ...other products
    ],
};

// Add unique IDs to all products
let productIdCounter = 1;
Object.keys(categoryData).forEach(category => {
    categoryData[category] = categoryData[category].map(product => ({
        ...product,
        id: productIdCounter++,
    }));
});

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartCount();
    setupEventListeners();
});

// Load and display all products initially
function loadProducts() {
    displayProducts(Object.values(categoryData).flat());
}

// Generic function to display products
function displayProducts(productList) {
    const productListContainer = document.getElementById('product-list');
    productListContainer.innerHTML = productList.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Setup event listeners for navigation and search
function setupEventListeners() {
    document.getElementById('home-tab').addEventListener('click', () => showSection('home'));
    document.getElementById('cart-tab').addEventListener('click', () => {
        showSection('cart');
        displayCart();
    });
    document.getElementById('account-tab').addEventListener('click', () => {
        showSection('account');
        displayOrders();
    });
    document.getElementById('login-tab').addEventListener('click', () => {
        window.location.href = 'sign.html';
    });
    document.getElementById('checkout-btn').addEventListener('click', checkout);

    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('input', handleSearch);
    }

    // Category grid click handling
    const categoriesGrid = document.querySelector(".categories-grid");
    if (categoriesGrid) {
        categoriesGrid.addEventListener("click", event => {
            const categoryElement = event.target.closest(".category");
            if (categoryElement) {
                const category = categoryElement.getAttribute("data-category");
                showCategoryDetails(category);
            }
        });
    }

    // Back button handling
    const backButton = document.getElementById("back-button");
    if (backButton) {
        backButton.addEventListener("click", () => {
            document.getElementById('category-details').style.display = "none";
            document.querySelector(".categories-grid").style.display = "grid";
            document.getElementById('product-list').style.display = "block";
        });
    }
}

// Handle search functionality
function handleSearch(event) {
    const query = event.target.value.trim().toLowerCase();
    if (!query) {
        loadProducts();
        return;
    }

    const filteredProducts = Object.values(categoryData)
        .flat()
        .filter(product => product.name.toLowerCase().includes(query));
    displayProducts(filteredProducts);
}

// Show category-specific products
function showCategoryDetails(category) {
    if (!categoryData[category]) return;

    document.querySelector(".categories-grid").style.display = "none";
    document.getElementById('product-list').style.display = 'none';

    const categoryDetails = document.getElementById("category-details");
    categoryDetails.style.display = "block";
    categoryDetails.innerHTML = `
        <h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
        <div class="category-products">
            ${categoryData[category].map(product => `
                <div class="product">
                    <h2>${product.name}</h2>
                    <img src="${product.image}" alt="${product.name}">
                    <p>₹${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `).join('')}
        </div>
    `;
}

// Add product to the cart
function addToCart(productId) {
    const product = Object.values(categoryData).flat().find(item => item.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        displayCart(); // Update the cart display after adding an item
        alert(`${product.name} added to cart!`);
    }
}

// Update cart count display
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Display cart items
function calculateCartTotal() {
    return cart.reduce((sum, item) => sum + item.price, 0);
}

// Display cart items and total price
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    if (cartContainer) {
        cartContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
            </div>
        `).join('');

        // Calculate and display the total price
        const cartTotal = calculateCartTotal();
        cartContainer.innerHTML += `
            <div class="cart-total">
                <h3>Total: ₹${cartTotal}</h3>
            </div>
        `;
    }
}
// Display user orders (placeholder)
function displayOrders() {
    const ordersContainer = document.getElementById('orders');
    if (ordersContainer) {
        ordersContainer.innerHTML = orders.map(order => `
            <div class="order-item">
                <h3>Order #${order.id}</h3>
                <p>Total: ₹${order.total}</p>
            </div>
        `).join('');
    }
}

// Show the specified section
// Show the specified section 
function showSection(sectionId) {
    // Show the correct section and hide others
    document.getElementById('home').style.display = sectionId === 'home' ? 'block' : 'none';
    document.getElementById('cart').style.display = sectionId === 'cart' ? 'block' : 'none';
    document.getElementById('account').style.display = sectionId === 'account' ? 'block' : 'none';

    // Toggle the active class for tabs
    document.getElementById('home-tab').classList.toggle('active', sectionId === 'home');
    document.getElementById('cart-tab').classList.toggle('active', sectionId === 'cart');
    document.getElementById('account-tab').classList.toggle('active', sectionId === 'account');

    // Control visibility of product categories based on section
    const categoriesContainer = document.getElementById('categories'); // Ensure you have a container with this ID for categories
    if (categoriesContainer) {
        categoriesContainer.style.display = sectionId === 'home' ? 'block' : 'none';
    }

    // Only display products in the home section
    if (sectionId === 'home') {
        displayProducts(products);
    }
}


// Checkout logic
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Calculate the total and clear the cart
    const total = calculateCartTotal();
    alert(`Checkout successful! Total: ₹${total}`);
    orders.push({ id: orders.length + 1, items: [...cart], total });
    cart.length = 0; // Clear the cart
    updateCartCount();
    displayCart(); // Clear the cart display after checkout
}