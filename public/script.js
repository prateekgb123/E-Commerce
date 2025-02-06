const products = [];
const cart = [];
const orders = [];

document.addEventListener('DOMContentLoaded', () => {
    loadProducts(); // Only load products once during page load
    updateCartCount();

    document.getElementById('home-tab').addEventListener('click', () => {
        showSection('home');
    });

    document.getElementById('cart-tab').addEventListener('click', () => {
        showSection('cart');
        displayCart(); // Display cart items only
    });

    document.getElementById('account-tab').addEventListener('click', () => {
        showSection('account');
        displayOrders(); // Display orders only
    });

    document.getElementById('login-tab').addEventListener('click', () => {
        window.location.href = 'sign.html';
    });

    document.getElementById('checkout-btn').addEventListener('click', checkout);

    document.getElementById('search-bar').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredProducts = products.filter(p => p.name.toLowerCase().includes(query));
        displayProducts(filteredProducts);
    });
});

// Define the content for each category
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

document.addEventListener('DOMContentLoaded', () => {
    const category = window.location.pathname.split('/').pop().split('.')[0];  // Get category name from the URL (e.g., 'electronics')
    if (categoryData[category]) {
        displayProducts(categoryData[category]);
    }
});

// Select DOM elements
const categoriesGrid = document.querySelector(".categories-grid");
const categoryDetails = document.getElementById("category-details");
const detailsContent = document.getElementById("details-content");
const backButton = document.getElementById("back-button");
const categoriesSection = document.getElementById("categories");
const shopdetatils = document.getElementById("shop");
const prodetatils = document.getElementById("pro");
let productIdCounter = 1;
for (const category in categoryData) {
    categoryData[category] = categoryData[category].map(product => ({
        ...product,
        id: productIdCounter++
    }));
}

// Function to show category details
function showCategoryDetails(category) {
    if (!categoryData[category]) return;

    // Get the data for the selected category
    const data = categoryData[category];

    // Hide the categories grid and home products
    shopdetatils.style.display = "none";
    categoriesGrid.style.display = "none";
    prodetatils.style.display = "none";
    document.getElementById('product-list').style.display = 'none'; // Hide the products in the home section

    // Show the category details section
    categoryDetails.style.display = "block";

    // Populate the details content with products from the category
    detailsContent.innerHTML = `
  <h2 style="text-align: center; font-size: 45px !important; font-weight: 600 !important; color: black;">
    ${category.charAt(0).toUpperCase() + category.slice(1)}
</h2>

    <div class="category-products">
            ${data.map(product => `
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
categoriesGrid.addEventListener("click", (event) => {
    event.preventDefault();
    const categoryElement = event.target.closest(".category");
    if (categoryElement) {
        const category = categoryElement.getAttribute("data-category");
        showCategoryDetails(category);
    }
});

// Event listener for back button
backButton.addEventListener("click", () => {
    // Hide the category details section
    categoryDetails.style.display = "none";

    // Show the categories grid
    categoriesGrid.style.display = "grid"; // Restore the grid layout

    // Show the product list again
    document.getElementById('product-list').style.display = 'block'; // Show the products in the home section
});

function displayProducts(productList) {
    const productListContainer = document.getElementById('product-list');
    productListContainer.innerHTML = '';

    productList.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        const productId = product.id || index + 1;  // Use existing ID or generate one
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${productId})">Add to Cart</button>
        `;
        productListContainer.appendChild(productDiv);
    });
}

function loadProducts() {
    const productDetails = [
        { name: "Wireless Earbuds", image: "https://via.placeholder.com/200?text=Wireless+Earbuds" },
        { name: "Smartphone Case", image: "https://via.placeholder.com/200?text=Smartphone+Case" },
        { name: "Laptop Stand", image: "https://via.placeholder.com/200?text=Laptop+Stand" },
        { name: "Bluetooth Speaker", image: "https://via.placeholder.com/200?text=Bluetooth+Speaker" },
        { name: "Gaming Mouse", image: "https://via.placeholder.com/200?text=Gaming+Mouse" },
        { name: "USB-C Hub", image: "https://via.placeholder.com/200?text=USB-C+Hub" },
        { name: "Fitness Tracker", image: "https://via.placeholder.com/200?text=Fitness+Tracker" },
        { name: "Mechanical Keyboard", image: "https://via.placeholder.com/200?text=Mechanical+Keyboard" },
        { name: "Smartwatch", image: "https://via.placeholder.com/200?text=Smartwatch" },
        { name: "Noise Cancelling Headphones", image: "https://via.placeholder.com/200?text=Noise+Cancelling+Headphones" },
        { name: "Portable Power Bank", image: "https://via.placeholder.com/200?text=Power+Bank" },
        { name: "4K Action Camera", image: "https://via.placeholder.com/200?text=4K+Action+Camera" },
        { name: "Wireless Charger", image: "https://via.placeholder.com/200?text=Wireless+Charger" },
        { name: "LED Desk Lamp", image: "https://via.placeholder.com/200?text=LED+Desk+Lamp" },
        { name: "Mini Drone", image: "https://via.placeholder.com/200?text=Mini+Drone" },
        { name: "External Hard Drive", image: "https://via.placeholder.com/200?text=External+Hard+Drive" },
        { name: "VR Headset", image: "https://via.placeholder.com/200?text=VR+Headset" },
        { name: "Streaming Webcam", image: "https://via.placeholder.com/200?text=Streaming+Webcam" },
        { name: "Desk Organizer", image: "https://via.placeholder.com/200?text=Desk+Organizer" },
        { name: "Portable Monitor", image: "https://via.placeholder.com/200?text=Portable+Monitor" },
        { name: "Digital Notebook", image: "https://via.placeholder.com/200?text=Digital+Notebook" },
        { name: "Robot Vacuum Cleaner", image: "https://via.placeholder.com/200?text=Robot+Vacuum+Cleaner" },
        { name: "Streaming Microphone", image: "https://via.placeholder.com/200?text=Streaming+Microphone" },
        { name: "Adjustable Phone Stand", image: "https://via.placeholder.com/200?text=Phone+Stand" },
        { name: "Electric Scooter", image: "https://via.placeholder.com/200?text=Electric+Scooter" }
    ];

    productDetails.forEach((product, index) => {
        products.push({
            id: index + 1,
            name: product.name,
            price: (Math.random() * 100).toFixed(2),
            image: product.image
        });
    });

    displayProducts(products);
}

function addToCart(productId) {
    let product = products.find(p => p.id === productId);
    if (!product) {
        // If not found in products, search in categoryData
        for (const category in categoryData) {
            product = categoryData[category].find(p => p.id === productId);
            if (product) break;
        }
    }

    if (product) {
        cart.push({...product}); // Add a copy of the product to cart
        updateCartCount();
        alert('Product added to cart!');
    } else {
        console.error('Product not found:', productId);
    }
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        total += parseFloat(item.price);
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.textContent = `${item.name} - ₹${item.price}`;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    document.getElementById('cart-total').textContent = total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.getElementById('checkout-btn');

    checkoutButton.addEventListener('click', () => {
        const cartItems = document.getElementById('cart-items').children;
        const totalElement = document.getElementById('cart-total');
        const cartCountElement = document.getElementById('cart-count');

        if (cartItems.length === 0) {
            alert('Your cart is empty. Please add items before checking out.');
            return;
        }

        // Perform checkout logic here
        alert('Payment completed and order successfully placed.');

        cart.length = 0;
        document.getElementById('cart-items').innerHTML = '';

        totalElement.textContent = '0.00';
        cartCountElement.textContent = '0';
    });
});

function displayOrders() {
    const orderHistoryContainer = document.getElementById('order-history');
    orderHistoryContainer.innerHTML = '';

    if (orders.length === 0) {
        orderHistoryContainer.textContent = 'No orders found.';
        return;
    }

    orders.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order-item';
        orderDiv.innerHTML = `
            <h4>Order #${order.id}</h4>
            <p>Total: ₹${order.total.toFixed(2)}</p>
            <button onclick="buyAgain(${order.id})">Buy Again</button>
        `;
        orderHistoryContainer.appendChild(orderDiv);
    });
}

function buyAgain(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        cart.push(...order.items);
        updateCartCount();
        alert('Items added to cart!');
    } else {
        console.error('Order not found:', orderId);
    }
}

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