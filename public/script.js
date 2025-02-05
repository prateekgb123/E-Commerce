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
        
        const productCategories = {
            electronics: 
                [
                    { name: "Smartphone", image: "https://via.placeholder.com/200?text=Smartphone", price: 20000 },
                    { name: "Laptop", image: "https://via.placeholder.com/200?text=Laptop", price: 50000 },
                    { name: "Tablet", image: "https://via.placeholder.com/200?text=Tablet", price: 25000 },
                    { name: "Smartwatch", image: "https://via.placeholder.com/200?text=Smartwatch", price: 15000 },
                    { name: "Bluetooth Speaker", image: "https://via.placeholder.com/200?text=Bluetooth+Speaker", price: 5000 },
                    { name: "Headphones", image: "https://via.placeholder.com/200?text=Headphones", price: 3000 },
                    { name: "Gaming Console", image: "https://via.placeholder.com/200?text=Gaming+Console", price: 40000 },
                    { name: "Action Camera", image: "https://via.placeholder.com/200?text=Action+Camera", price: 20000 },
                    { name: "Portable Charger", image: "https://via.placeholder.com/200?text=Portable+Charger", price: 1500 },
                    { name: "Smart Home Assistant", image: "https://via.placeholder.com/200?text=Smart+Home+Assistant", price: 7000 },
                    { name: "4K TV", image: "https://via.placeholder.com/200?text=4K+TV", price: 60000 },
                    { name: "Drone", image: "https://via.placeholder.com/200?text=Drone", price: 30000 },
                    { name: "E-Reader", image: "https://via.placeholder.com/200?text=E-Reader", price: 12000 },
                    { name: "Wireless Keyboard", image: "https://via.placeholder.com/200?text=Wireless+Keyboard", price: 2000 },
                    { name: "Wireless Mouse", image: "https://via.placeholder.com/200?text=Wireless+Mouse", price: 1000 },
                    { name: "Webcam", image: "https://via.placeholder.com/200?text=Webcam", price: 3000 },
                    { name: "Projector", image: "https://via.placeholder.com/200?text=Projector", price: 20000 },
                    { name: "VR Headset", image: "https://via.placeholder.com/200?text=VR+Headset", price: 35000 },
                    { name: "External Hard Drive", image: "https://via.placeholder.com/200?text=External+Hard+Drive", price: 6000 },
                    { name: "Fitness Tracker", image: "https://via.placeholder.com/200?text=Fitness+Tracker", price: 4000 },
                  
                ],
                
                
            
            toys: [
                
                    { name: "Action Figure", image: "https://via.placeholder.com/200?text=Action+Figure", price: 800 },
                    { name: "Building Blocks", image: "https://via.placeholder.com/200?text=Building+Blocks", price: 1500 },
                    { name: "Dollhouse", image: "https://via.placeholder.com/200?text=Dollhouse", price: 2500 },
                    { name: "Toy Train Set", image: "https://via.placeholder.com/200?text=Toy+Train+Set", price: 2000 },
                    { name: "Stuffed Animal", image: "https://via.placeholder.com/200?text=Stuffed+Animal", price: 500 },
                    { name: "Puzzle Set", image: "https://via.placeholder.com/200?text=Puzzle+Set", price: 700 },
                    { name: "Remote Control Helicopter", image: "https://via.placeholder.com/200?text=Remote+Control+Helicopter", price: 1500 },
                    { name: "Play Kitchen Set", image: "https://via.placeholder.com/200?text=Play+Kitchen+Set", price: 3000 },
                    { name: "Toy Robot", image: "https://via.placeholder.com/200?text=Toy+Robot", price: 1200 },
                    { name: "Musical Toy", image: "https://via.placeholder.com/200?text=Musical+Toy", price: 800 },
                    { name: "Toy Car Set", image: "https://via.placeholder.com/200?text=Toy+Car+Set", price: 1000 },
                    { name: "Board Game", image: "https://via.placeholder.com/200?text=Board+Game", price: 1500 },
                    { name: "Kite", image: "https://via.placeholder.com/200?text=Kite", price: 400 },
                    { name: "Water Gun", image: "https://via.placeholder.com/200?text=Water+Gun", price: 600 },
                    { name: "Educational Toy", image: "https://via.placeholder.com/200?text=Educational+Toy", price: 2000 },
                    { name: "Toy Microscope", image: "https://via.placeholder.com/200?text=Toy+Microscope", price: 2500 },
                    { name: "Magic Set", image: "https://via.placeholder.com/200?text=Magic+Set", price: 1000 },
                    { name: "Remote Control Boat", image: "https://via.placeholder.com/200?text=Remote+Control+Boat", price: 1800 },
                    { name: "Yo-Yo", image: "https://via.placeholder.com/200?text=Yo-Yo", price: 300 },
                    { name: "Slime Kit", image: "https://via.placeholder.com/200?text=Slime+Kit", price: 500 }
                  
                  
            ],
            books: [
                { name: "The Great Gatsby", image: "https://via.placeholder.com/200?text=The+Great+Gatsby", price: 300 },
                { name: "To Kill a Mockingbird", image: "https://via.placeholder.com/200?text=To+Kill+a+Mockingbird", price: 400 },
                { name: "1984", image: "https://via.placeholder.com/200?text=1984", price: 350 },
                { name: "Pride and Prejudice", image: "https://via.placeholder.com/200?text=Pride+and+Prejudice", price: 280 },
                { name: "The Catcher in the Rye", image: "https://via.placeholder.com/200?text=The+Catcher+in+the+Rye", price: 320 },
                { name: "Moby Dick", image: "https://via.placeholder.com/200?text=Moby+Dick", price: 500 },
                { name: "The Hobbit", image: "https://via.placeholder.com/200?text=The+Hobbit", price: 450 },
                { name: "Harry Potter and the Sorcerer's Stone", image: "https://via.placeholder.com/200?text=Harry+Potter", price: 600 },
                { name: "The Alchemist", image: "https://via.placeholder.com/200?text=The+Alchemist", price: 350 },
                { name: "The Lord of the Rings", image: "https://via.placeholder.com/200?text=The+Lord+of+the+Rings", price: 700 },
                { name: "Jane Eyre", image: "https://via.placeholder.com/200?text=Jane+Eyre", price: 400 },
                { name: "Wuthering Heights", image: "https://via.placeholder.com/200?text=Wuthering+Heights", price: 380 },
                { name: "The Book Thief", image: "https://via.placeholder.com/200?text=The+Book+Thief", price: 420 },
                { name: "Little Women", image: "https://via.placeholder.com/200?text=Little+Women", price: 300 },
                { name: "Animal Farm", image: "https://via.placeholder.com/200?text=Animal+Farm", price: 250 },
                { name: "War and Peace", image: "https://via.placeholder.com/200?text=War+and+Peace", price: 600 },
                { name: "Crime and Punishment", image: "https://via.placeholder.com/200?text=Crime+and+Punishment", price: 500 },
                { name: "Brave New World", image: "https://via.placeholder.com/200?text=Brave+New+World", price: 320 },
                { name: "The Chronicles of Narnia", image: "https://via.placeholder.com/200?text=The+Chronicles+of+Narnia", price: 550 },
                { name: "The Kite Runner", image: "https://via.placeholder.com/200?text=The+Kite+Runner", price: 370 }
              ],
            fashion: [
                
                    { name: "T-Shirt", image: "https://via.placeholder.com/200?text=T-Shirt", price: 500 },
                    { name: "Jeans", image: "https://via.placeholder.com/200?text=Jeans", price: 1200 },
                    { name: "Jacket", image: "https://via.placeholder.com/200?text=Jacket", price: 2500 },
                    { name: "Sneakers", image: "https://via.placeholder.com/200?text=Sneakers", price: 2000 },
                    { name: "Formal Shirt", image: "https://via.placeholder.com/200?text=Formal+Shirt", price: 800 },
                    { name: "Dress", image: "https://via.placeholder.com/200?text=Dress", price: 1500 },
                    { name: "Handbag", image: "https://via.placeholder.com/200?text=Handbag", price: 1800 },
                    { name: "Sunglasses", image: "https://via.placeholder.com/200?text=Sunglasses", price: 1000 },
                    { name: "Scarf", image: "https://via.placeholder.com/200?text=Scarf", price: 600 },
                    { name: "Watch", image: "https://via.placeholder.com/200?text=Watch", price: 3000 },
                    { name: "Belt", image: "https://via.placeholder.com/200?text=Belt", price: 700 },
                    { name: "Hoodie", image: "https://via.placeholder.com/200?text=Hoodie", price: 1200 },
                    { name: "Cap", image: "https://via.placeholder.com/200?text=Cap", price: 400 },
                    { name: "Skirt", image: "https://via.placeholder.com/200?text=Skirt", price: 1000 },
                    { name: "Blazer", image: "https://via.placeholder.com/200?text=Blazer", price: 3000 },
                    { name: "Sandals", image: "https://via.placeholder.com/200?text=Sandals", price: 1200 },
                    { name: "Sweater", image: "https://via.placeholder.com/200?text=Sweater", price: 1500 },
                    { name: "Earrings", image: "https://via.placeholder.com/200?text=Earrings", price: 800 },
                    { name: "Necklace", image: "https://via.placeholder.com/200?text=Necklace", price: 2000 },
                    { name: "Joggers", image: "https://via.placeholder.com/200?text=Joggers", price: 900 }
                  
                  
            ],
            fitness: 
                [
                    { name: "Yoga Mat", image: "https://via.placeholder.com/200?text=Yoga+Mat", price: 700 },
                    { name: "Dumbbells", image: "https://via.placeholder.com/200?text=Dumbbells", price: 1500 },
                    { name: "Treadmill", image: "https://via.placeholder.com/200?text=Treadmill", price: 25000 },
                    { name: "Resistance Bands", image: "https://via.placeholder.com/200?text=Resistance+Bands", price: 500 },
                    { name: "Kettlebell", image: "https://via.placeholder.com/200?text=Kettlebell", price: 1200 },
                    { name: "Exercise Bike", image: "https://via.placeholder.com/200?text=Exercise+Bike", price: 20000 },
                    { name: "Jump Rope", image: "https://via.placeholder.com/200?text=Jump+Rope", price: 400 },
                    { name: "Foam Roller", image: "https://via.placeholder.com/200?text=Foam+Roller", price: 800 },
                    { name: "Pull-Up Bar", image: "https://via.placeholder.com/200?text=Pull-Up+Bar", price: 1500 },
                    { name: "Fitness Tracker", image: "https://via.placeholder.com/200?text=Fitness+Tracker", price: 3000 },
                    { name: "Ab Wheel", image: "https://via.placeholder.com/200?text=Ab+Wheel", price: 600 },
                    { name: "Gym Gloves", image: "https://via.placeholder.com/200?text=Gym+Gloves", price: 500 },
                    { name: "Water Bottle", image: "https://via.placeholder.com/200?text=Water+Bottle", price: 300 },
                    { name: "Sports Shoes", image: "https://via.placeholder.com/200?text=Sports+Shoes", price: 2000 },
                    { name: "Weight Bench", image: "https://via.placeholder.com/200?text=Weight+Bench", price: 5000 },
                    { name: "Medicine Ball", image: "https://via.placeholder.com/200?text=Medicine+Ball", price: 900 },
                    { name: "Fitness Ball", image: "https://via.placeholder.com/200?text=Fitness+Ball", price: 800 },
                    { name: "Push-Up Bars", image: "https://via.placeholder.com/200?text=Push-Up+Bars", price: 700 },
                    { name: "Workout Shorts", image: "https://via.placeholder.com/200?text=Workout+Shorts", price: 600 },
                    { name: "Sweatband", image: "https://via.placeholder.com/200?text=Sweatband", price: 200 }
                  
                  
            ],
            homeappliances: [
                
                    { name: "Refrigerator", image: "https://via.placeholder.com/200?text=Refrigerator", price: 20000 },
                    { name: "Microwave Oven", image: "https://via.placeholder.com/200?text=Microwave+Oven", price: 8000 },
                    { name: "Washing Machine", image: "https://via.placeholder.com/200?text=Washing+Machine", price: 15000 },
                    { name: "Air Conditioner", image: "https://via.placeholder.com/200?text=Air+Conditioner", price: 30000 },
                    { name: "Vacuum Cleaner", image: "https://via.placeholder.com/200?text=Vacuum+Cleaner", price: 5000 },
                    { name: "Electric Kettle", image: "https://via.placeholder.com/200?text=Electric+Kettle", price: 2000 },
                    { name: "Mixer Grinder", image: "https://via.placeholder.com/200?text=Mixer+Grinder", price: 4000 },
                    { name: "Water Purifier", image: "https://via.placeholder.com/200?text=Water+Purifier", price: 10000 },
                    { name: "Dishwasher", image: "https://via.placeholder.com/200?text=Dishwasher", price: 25000 },
                    { name: "Ceiling Fan", image: "https://via.placeholder.com/200?text=Ceiling+Fan", price: 3000 },
                    { name: "Room Heater", image: "https://via.placeholder.com/200?text=Room+Heater", price: 4000 },
                    { name: "Iron", image: "https://via.placeholder.com/200?text=Iron", price: 1000 },
                    { name: "Toaster", image: "https://via.placeholder.com/200?text=Toaster", price: 1500 },
                    { name: "Coffee Maker", image: "https://via.placeholder.com/200?text=Coffee+Maker", price: 6000 },
                    { name: "Blender", image: "https://via.placeholder.com/200?text=Blender", price: 2500 },
                    { name: "Hair Dryer", image: "https://via.placeholder.com/200?text=Hair+Dryer", price: 2000 },
                    { name: "Air Purifier", image: "https://via.placeholder.com/200?text=Air+Purifier", price: 12000 },
                    { name: "Induction Cooktop", image: "https://via.placeholder.com/200?text=Induction+Cooktop", price: 3500 },
                    { name: "Rice Cooker", image: "https://via.placeholder.com/200?text=Rice+Cooker", price: 2500 },
                    { name: "Chimney", image: "https://via.placeholder.com/200?text=Chimney", price: 15000 },
                    { name: "Joggers", image: "https://via.placeholder.com/200?text=Joggers", price: 900 },
                    { name: "Fitness Tracker", image: "https://via.placeholder.com/200?text=Fitness+Tracker", price: 4000 },
                    { name: "Slime Kit", image: "https://via.placeholder.com/200?text=Slime+Kit", price: 500 },
                    { name: "The Kite Runner", image: "https://via.placeholder.com/200?text=The+Kite+Runner", price: 370 }
                  
                  
            ],
        };
        
        document.addEventListener('DOMContentLoaded', () => {
            const category = window.location.pathname.split('/').pop().split('.')[0];  // Get category name from the URL (e.g., 'electronics')
            if (productCategories[category]) {
                displayProducts(productCategories[category]);
            }
        });
        
        function displayProducts(productList) {
            const productListContainer = document.getElementById('product-list');
            productListContainer.innerHTML = '';
        
            productList.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
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
            const product = products.find(p => p.id === productId);
            cart.push(product);
            updateCartCount();
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
        
                
                    alert('payment completed and ordered succesfully')
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
            cart.push(...order.items);
            updateCartCount();
            alert('Items added to cart!');
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
    