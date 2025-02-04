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
        
            document.getElementById('checkout-btn').addEventListener('click', checkout);
        
            document.getElementById('search-bar').addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const filteredProducts = products.filter(p => p.name.toLowerCase().includes(query));
                displayProducts(filteredProducts);
            });
        });
        
        const productCategories = {
            electronics: [
                { name: "Wireless Earbuds", image: "https://via.placeholder.com/200?text=Wireless+Earbuds", price: (Math.random() * 100).toFixed(2) },
                { name: "Smartphone Case", image: "https://via.placeholder.com/200?text=Smartphone+Case", price: (Math.random() * 100).toFixed(2) },
                { name: "Bluetooth Speaker", image: "https://via.placeholder.com/200?text=Bluetooth+Speaker", price: (Math.random() * 100).toFixed(2) },
                { name: "Gaming Mouse", image: "https://via.placeholder.com/200?text=Gaming+Mouse", price: (Math.random() * 100).toFixed(2) },
                { name: "Laptop Stand", image: "https://via.placeholder.com/200?text=Laptop+Stand", price: (Math.random() * 100).toFixed(2) },
                // Add more products to make 20
            ],
            // Add other categories (fashion, home-appliances, etc.)
            toys: [
                { name: "Wireless Earbuds", image: "https://via.placeholder.com/200?text=Wireless+Earbuds", price: (Math.random() * 100).toFixed(2) },
                { name: "Smartphone Case", image: "https://via.placeholder.com/200?text=Smartphone+Case", price: (Math.random() * 100).toFixed(2) },
                { name: "Bluetooth Speaker", image: "https://via.placeholder.com/200?text=Bluetooth+Speaker", price: (Math.random() * 100).toFixed(2) },
                { name: "Gaming Mouse", image: "https://via.placeholder.com/200?text=Gaming+Mouse", price: (Math.random() * 100).toFixed(2) },
                { name: "Laptop Stand", image: "https://via.placeholder.com/200?text=Laptop+Stand", price: (Math.random() * 100).toFixed(2) },
                // Add more products to make 20
            ],
            books: [
                { name: "Wireless Earbuds", image: "https://via.placeholder.com/200?text=Wireless+Earbuds", price: (Math.random() * 100).toFixed(2) },
                { name: "Smartphone Case", image: "https://via.placeholder.com/200?text=Smartphone+Case", price: (Math.random() * 100).toFixed(2) },
                { name: "Bluetooth Speaker", image: "https://via.placeholder.com/200?text=Bluetooth+Speaker", price: (Math.random() * 100).toFixed(2) },
                { name: "Gaming Mouse", image: "https://via.placeholder.com/200?text=Gaming+Mouse", price: (Math.random() * 100).toFixed(2) },
                { name: "Laptop Stand", image: "https://via.placeholder.com/200?text=Laptop+Stand", price: (Math.random() * 100).toFixed(2) },
                // Add more products to make 20
            ],
            fashion: [
                { name: "Wireless Earbuds", image: "https://via.placeholder.com/200?text=Wireless+Earbuds", price: (Math.random() * 100).toFixed(2) },
                { name: "Smartphone Case", image: "https://via.placeholder.com/200?text=Smartphone+Case", price: (Math.random() * 100).toFixed(2) },
                { name: "Bluetooth Speaker", image: "https://via.placeholder.com/200?text=Bluetooth+Speaker", price: (Math.random() * 100).toFixed(2) },
                { name: "Gaming Mouse", image: "https://via.placeholder.com/200?text=Gaming+Mouse", price: (Math.random() * 100).toFixed(2) },
                { name: "Laptop Stand", image: "https://via.placeholder.com/200?text=Laptop+Stand", price: (Math.random() * 100).toFixed(2) },
                // Add more products to make 20
            ],
            fitness: [
                { name: "Wireless Earbuds", image: "https://via.placeholder.com/200?text=Wireless+Earbuds", price: (Math.random() * 100).toFixed(2) },
                { name: "Smartphone Case", image: "https://via.placeholder.com/200?text=Smartphone+Case", price: (Math.random() * 100).toFixed(2) },
                { name: "Bluetooth Speaker", image: "https://via.placeholder.com/200?text=Bluetooth+Speaker", price: (Math.random() * 100).toFixed(2) },
                { name: "Gaming Mouse", image: "https://via.placeholder.com/200?text=Gaming+Mouse", price: (Math.random() * 100).toFixed(2) },
                { name: "Laptop Stand", image: "https://via.placeholder.com/200?text=Laptop+Stand", price: (Math.random() * 100).toFixed(2) },
                // Add more products to make 20
            ],
            homeappliances: [
                { name: "Wireless Earbuds", image: "https://via.placeholder.com/200?text=Wireless+Earbuds", price: (Math.random() * 100).toFixed(2) },
                { name: "Smartphone Case", image: "https://via.placeholder.com/200?text=Smartphone+Case", price: (Math.random() * 100).toFixed(2) },
                { name: "Bluetooth Speaker", image: "https://via.placeholder.com/200?text=Bluetooth+Speaker", price: (Math.random() * 100).toFixed(2) },
                { name: "Gaming Mouse", image: "https://via.placeholder.com/200?text=Gaming+Mouse", price: (Math.random() * 100).toFixed(2) },
                { name: "Laptop Stand", image: "https://via.placeholder.com/200?text=Laptop+Stand", price: (Math.random() * 100).toFixed(2) },
                // Add more products to make 20
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
                cartItemDiv.textContent = `${item.name} - $${item.price}`;
                cartItemsContainer.appendChild(cartItemDiv);
            });
        
            document.getElementById('cart-total').textContent = total.toFixed(2);
        }

        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            const order = {
                id: orders.length + 1,
                items: [...cart],
                total: cart.reduce((sum, item) => sum + parseFloat(item.price), 0)
            };

            orders.push(order);
            cart.length = 0;
            updateCartCount();
            alert('Order placed successfully!');
        }

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
                    <p>Total: $${order.total.toFixed(2)}</p>
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
    