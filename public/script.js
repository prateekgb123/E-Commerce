const products = [];
const cart = [];
const orders = [];
const categoryData = {
    electronics: 
        [
            { name: "Smartphone", image: "Electronics/smartphone.webp", price: 20000 },
            { name: "Laptop", image: "Electronics/laptop.webp", price: 50000 },
            { name: "Tablet", image: "Electronics/tablet.webp", price: 25000 },
            { name: "Smartwatch", image: "Electronics/smartwatch.webp", price: 15000 },
            { name: "Bluetooth Speaker", image: "Electronics/bluespeaker.webp", price: 5000 },
            { name: "Headphones", image: "Electronics/headphone.webp", price: 3000 },
            { name: "Gaming Console", image: "Electronics/gamingconsole.webp", price: 40000 },
            { name: "Action Camera", image: "Electronics/actioncamera.webp", price: 20000 },
            { name: "Portable Charger", image: "Electronics/portablecharger.webp", price: 1500 },
            { name: "Smart Home Assistant", image: "Electronics/smarthomeassistant.webp", price: 7000 },
            { name: "4K TV", image: "Electronics/4ktv.webp", price: 60000 },
            { name: "Drone", image: "Electronics/drone.webp", price: 30000 },
            { name: "E-Reader", image: "Electronics/ereader.webp", price: 12000 },
            { name: "Wireless Keyboard", image: "Electronics/wirelesskeyboard.webp", price: 2000 },
            { name: "Wireless Mouse", image: "Electronics/mouse.webp", price: 1000 },
            { name: "Webcam", image: "Electronics/webcam.webp", price: 3000 },
            { name: "Projector", image: "Electronics/projector.webp", price: 20000 },
            { name: "VR Headset", image: "Electronics/vr.webp", price: 35000 },
            { name: "External Hard Drive", image: "Electronics/harddrive.webp", price: 6000 },
            { name: "Fitness Tracker", image: "Electronics/fitnesstracker.webp", price: 4000 },
          
        ],
    toys: [
        
            { name: "Action Figure", image: "toys/actionfigure.webp", price: 800 },
            { name: "Building Blocks", image: "toys/buildingblocks.webp", price: 1500 },
            { name: "Dollhouse", image: "toys/dollhouse.webp", price: 2500 },
            { name: "Toy Train Set", image: "toys/toytrainset.webp", price: 2000 },
            { name: "Stuffed Animal", image: "toys/stuffedanimal.webp", price: 500 },
            { name: "Puzzle Set", image: "toys/puzzleset.webp", price: 700 },
            { name: "Remote Control Helicopter", image: "toys/remotecontrolset.webp", price: 1500 },
            { name: "Play Kitchen Set", image: "toys/playkitchenset.webp", price: 3000 },
            { name: "Toy Robot", image: "toys/toyrobot.webp", price: 1200 },
            { name: "Musical Toy", image: "toys/musicaltoy.webp", price: 800 },
            { name: "Toy Car Set", image: "toys/toycarset.webp", price: 1000 },
            { name: "Board Game", image: "toys/boardgame.webp", price: 1500 },
            { name: "Kite", image: "toys/kite.webp", price: 400 },
            { name: "Water Gun", image: "toys/watergun.webp", price: 600 },
            { name: "Educational Toy", image: "toys/educationaltoys.webp", price: 2000 },
            { name: "Toy Microscope", image: "toys/toymicroscope.webp", price: 2500 },
            { name: "Magic Set", image: "toys/magicset.webp", price: 1000 },
            { name: "Remote Control Boat", image: "toys/remotecontrolboat.webp", price: 1800 },
            { name: "Yo-Yo", image: "toys/yoyo.webp", price: 300 },
            { name: "Slime Kit", image: "toys/slimekit.webp", price: 500 }
    ],
    books: [
        { name: "The Great Gatsby", image: "books/thegreatgatsby.webp", price: 300 },
        { name: "To Kill a Mockingbird", image: "books/tokillamockingbird.webp", price: 400 },
        { name: "1984", image: "books/1984.webp", price: 350 },
        { name: "Pride and Prejudice", image: "books/prideandprejudice.webp", price: 280 },
        { name: "The Catcher in the Rye", image: "books/thecatcherintherye.webp", price: 320 },
        { name: "Moby Dick", image: "books/mobydick.webp", price: 500 },
        { name: "The Hobbit", image: "books/thehobbit.webp", price: 450 },
        { name: "Harry Potter and the Sorcerer's Stone", image: "books/harry1.jpeg", price: 600 },
        { name: "The Alchemist", image: "books/thealchemist.webp", price: 350 },
        { name: "The Lord of the Rings", image: "books/thelordoftherings.webp", price: 700 },
        { name: "Jane Eyre", image: "books/janeeyre.webp", price: 400 },
        { name: "Wuthering Heights", image: "books/wutheringheights.webp", price: 380 },
        { name: "The Book Thief", image: "books/thebookthief.webp", price: 420 },
        { name: "Little Women", image: "books/littlewomen.webp", price: 300 },
        { name: "Animal Farm", image: "books/animalfarm.webp", price: 250 },
        { name: "War and Peace", image: "books/warandpeace.webp", price: 600 },
        { name: "Crime and Punishment", image: " books/crimeandpunishment.webp", price: 500 },
        { name: "Brave New World", image: "books/bravenewworld.webp", price: 320 },
        { name: "The Chronicles of Narnia", image: "books/thechronicles.webp", price: 550 },
        { name: "The Kite Runner", image: "books/thekiterunner.webp", price: 370 }
      ],
    fashion: [
        
            { name: "T-Shirt", image: "fashion/tshirt.webp", price: 500 },
            { name: "Jeans", image: "fashion/jeans.webp", price: 1200 },
            { name: "Jacket", image: "fashion/jacket.webp", price: 2500 },
            { name: "Sneakers", image: "fashion/sneakers.webp", price: 2000 },
            { name: "Formal Shirt", image: "fashion/formalshirt.webp", price: 800 },
            { name: "Dress", image: "fashion/dress.webp", price: 1500 },
            { name: "Handbag", image: "fashion/handbag.webp", price: 1800 },
            { name: "Sunglasses", image: "fashion/sunglasses.webp", price: 1000 },
            { name: "Scarf", image: "fashion/scarf.webp", price: 600 },
            { name: "Watch", image: "fashion/watch.webp", price: 3000 },
            { name: "Belt", image: "fashion/belt.webp", price: 700 },
            { name: "Hoodie", image: "fashion/hoodie.webp", price: 1200 },
            { name: "Cap", image: "fashion/cap.webp", price: 400 },
            { name: "Blazer", image: "fashion/blazzer.webp", price: 3000 },
            { name: "Sandals", image: "fashion/sandal.webp", price: 1200 },
            { name: "Sweater", image: "fashion/sweater.webp", price: 1500 },
            { name: "Earrings", image: "fashion/earrings.webp", price: 800 },
            { name: "Necklace", image: "fashion/necklace.webp", price: 2000 },
            { name: "Joggers", image: "fashion/joggers.webp", price: 900 }
    ],
    fitness: 
        [
            { name: "Yoga Mat", image: "fitness/yogamat.webp", price: 700 },
            { name: "Dumbbells", image: "fitness/dumbbell.webp", price: 1500 },
            { name: "Treadmill", image: "fitness/treadmill.webp", price: 25000 },
            { name: "Resistance Bands", image: "fitness/resistanceband.webp", price: 500 },
            { name: "Kettlebell", image: "fitness/kettlebell.webp", price: 1200 },
            { name: "Exercise Bike", image: "fitness/exercisebike.webp", price: 20000 },
            { name: "Jump Rope", image: "fitness/jumprope.webp", price: 400 },
            { name: "Foam Roller", image: "fitness/foamroller.webp", price: 800 },
            { name: "Pull-Up Bar", image: "fitness/pullupbar.webp", price: 1500 },
            { name: "Fitness Tracker", image: "fitness/fitnesstracker.webp", price: 3000 },
            { name: "Ab Wheel", image: "fitness/abwheel.webp", price: 600 },
            { name: "Gym Gloves", image: "fitness/gymgloves.webp", price: 500 },
            { name: "Water Bottle", image: "fitness/waterbottle.webp", price: 300 },
            { name: "Sports Shoes", image: "fitness/sportsshoes.webp", price: 2000 },
            { name: "Weight Bench", image: "fitness/weightbench.webp", price: 5000 },
            { name: "Medicine Ball", image: "fitness/medicineball.webp", price: 900 },
            { name: "Fitness Ball", image: "fitness/fitnessball.webp", price: 800 },
            { name: "Push-Up Bars", image: "fitness/pushupbars.webp", price: 700 },
            { name: "Workout Shorts", image: "fitness/workoutshorts.webp", price: 600 },
            { name: "Sweatband", image: "fitness/sweatband.webp", price: 200 }
    ],
    homeappliances: [
        
            { name: "Refrigerator", image: "homeappliances/refrigerator1.webp", price: 20000 },
            { name: "Microwave Oven", image: "homeappliances/microwaveoven.webp", price: 8000 },
            { name: "Washing Machine", image: "homeappliances/washingmachine.webp", price: 15000 },
            { name: "Air Conditioner", image: "homeappliances/airconditioner.webp", price: 30000 },
            { name: "Vacuum Cleaner", image: "homeappliances/vaccumcleaner.webp", price: 5000 },
            { name: "Electric Kettle", image: "homeappliances/electrickettle.webp", price: 2000 },
            { name: "Mixer Grinder", image: "homeappliances/mixergrinder.webp", price: 4000 },
            { name: "Water Purifier", image: "homeappliances/waterpurifier.webp", price: 10000 },
            { name: "Dishwasher", image: "homeappliances/dishwasher.webp", price: 25000 },
            { name: "Ceiling Fan", image: "homeappliances/ceilingfan.webp", price: 3000 },
            { name: "Room Heater", image: "homeappliances/roomheater.webp", price: 4000 },
            { name: "Iron", image: "homeappliances/iron.webp", price: 1000 },
            { name: "Toaster", image: "homeappliances/toaster.webp", price: 1500 },
            { name: "Coffee Maker", image: "homeappliances/coffeemaker.webp", price: 6000 },
            { name: "Blender", image: "homeappliances/blender.webp", price: 2500 },
            { name: "Hair Dryer", image: "homeappliances/hairdryer.webp", price: 2000 },
            { name: "Air Purifier", image: "homeappliances/airpurifier.webp", price: 12000 },
            { name: "Induction Cooktop", image: "homeappliances/inductioncooktop.webp", price: 3500 },
            { name: "Rice Cooker", image: "homeappliances/ricecooker.webp", price: 2500 },
            { name: "Chimney", image: "homeappliances/chimney.webp", price: 15000 }
    ],
    
};
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
function loadProducts() {
    displayProducts(Object.values(categoryData).flat());
}
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
    const backButton = document.getElementById("back-button");
    if (backButton) {
        backButton.addEventListener("click", () => {
            document.getElementById('category-details').style.display = "none";
            document.querySelector(".categories-grid").style.display = "grid";
            document.getElementById('product-list').style.display = "block";
        });
    }
}
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
function showCategoryDetails(category) {
    if (!categoryData[category]) return;

    document.querySelector(".categories-grid").style.display = "none";
    document.getElementById('product-list').style.display = 'none';
    document.getElementById('shop').style.display = 'none';
    document.getElementById('pro').style.display = 'none';
    const categoryDetails = document.getElementById("category-details");
    categoryDetails.style.display = "block";
    categoryDetails.innerHTML = `
        <button id="back-to-home" class="back-to-home-button">Back to Home</button>
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
    const backButton = document.getElementById("back-to-home");
    if (backButton) {
        backButton.addEventListener("click", () => {
            categoryDetails.style.display = "none";
            document.querySelector(".categories-grid").style.display = "grid";
            document.getElementById('product-list').style.display = "block";
        });
    }
}
function addToCart(productId) {
    const product = Object.values(categoryData).flat().find(item => item.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        displayCart(); 
        alert(`${product.name} added to cart!`);
    }
}
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}
function calculateCartTotal() {
    return cart.reduce((sum, item) => sum + item.price, 0);
}
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    if (cartContainer) {
        cartContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
                <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
            </div>
        `).join('');
        const cartTotal = calculateCartTotal();
        cartContainer.innerHTML += `
            <div class="cart-total">
                <h3>Total: ₹${cartTotal}</h3>
            </div>
        `;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1); 
    updateCartCount(); 
    displayCart(); 
}

function displayOrders() {
    const ordersContainer = document.getElementById('orders');
    if (!ordersContainer) return;

    if (orders.length === 0) {
        ordersContainer.innerHTML = "<p>No orders have been placed yet.</p>";
        return;
    }

    ordersContainer.innerHTML = orders.map(order => `
        <div class="order">
            <h3>Order ID: ${order.id}</h3>
            <p><strong>Date:</strong> ${order.date}</p>
            <p><strong>Status:</strong> ${order.status}</p>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <img src="${item.image}" alt="${item.name}" class="order-item-image">
                        <div class="order-item-details">
                            <h4>${item.name}</h4>
                            <p>Quantity: ${item.quantity}</p>
                            <p>Price: ₹${item.price * item.quantity}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <p><strong>Total:</strong> ₹${order.total}</p>
        </div>
    `).join('');
}


function showSection(sectionId) {
    document.getElementById('home').style.display = sectionId === 'home' ? 'block' : 'none';
    document.getElementById('cart').style.display = sectionId === 'cart' ? 'block' : 'none';
    document.getElementById('account').style.display = sectionId === 'account' ? 'block' : 'none';
    document.getElementById('home-tab').classList.toggle('active', sectionId === 'home');
    document.getElementById('cart-tab').classList.toggle('active', sectionId === 'cart');
    document.getElementById('account-tab').classList.toggle('active', sectionId === 'account');
    const categoriesContainer = document.getElementById('categories'); 
    if (categoriesContainer) {
        categoriesContainer.style.display = sectionId === 'home' ? 'block' : 'none';
    }
    if (sectionId === 'home') {
        displayProducts(products);
    }
}
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const order = {
        id: `ORD${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString(),
        status: "Pending",
        items: cart.map(item => ({
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: 1 // You can update this logic to allow multiple quantities
        })),
        total: calculateCartTotal(),
    };

    orders.push(order);
    cart.length = 0; // Clear the cart
    updateCartCount();
    displayCart();
    alert("Order placed successfully!");

    // Refresh order history
    if (document.getElementById('account-tab').classList.contains('active')) {
        displayOrders();
    }
}
