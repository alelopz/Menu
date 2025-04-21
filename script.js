// Datos de ejemplo del menú
const menuData = {
    entradas: [
        { id: 1, name: "Ensalada César", price: 8.99, image: "https://via.placeholder.com/300x200" },
        { id: 2, name: "Bruschetta", price: 6.99, image: "https://via.placeholder.com/300x200" }
    ],
    principales: [
        { id: 3, name: "Pasta Carbonara", price: 12.99, image: "https://via.placeholder.com/300x200" },
        { id: 4, name: "Pizza Margarita", price: 10.99, image: "https://via.placeholder.com/300x200" }
    ],
    postres: [
        { id: 5, name: "Tiramisú", price: 5.99, image: "https://via.placeholder.com/300x200" },
        { id: 6, name: "Cheesecake", price: 6.99, image: "https://via.placeholder.com/300x200" }
    ],
    bebidas: [
        { id: 7, name: "Coca Cola", price: 2.99, image: "https://via.placeholder.com/300x200" },
        { id: 8, name: "Agua Mineral", price: 1.99, image: "https://via.placeholder.com/300x200" }
    ]
};

// Estado del carrito
let cart = [];

// Elementos del DOM
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const menuItems = document.getElementById('menuItems');
const categoryButtons = document.querySelectorAll('.category-btn');

// Funciones del carrito
function openCart() {
    cartSidebar.classList.add('open');
}

function closeCartSidebar() {
    cartSidebar.classList.remove('open');
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    updateCartCount();
    updateCartTotal();
    renderCartItems();
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    updateCartTotal();
    renderCartItems();
}

function updateQuantity(itemId, newQuantity) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        updateCartCount();
        updateCartTotal();
        renderCartItems();
    }
}

function renderCartItems() {
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItemElement);
    });
}

// Renderizar items del menú
function renderMenuItems(category) {
    menuItems.innerHTML = '';

    menuData[category].forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'menu-item';
        menuItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-info">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${JSON.stringify(item)})">
                    Agregar al Carrito
                </button>
            </div>
        `;
        menuItems.appendChild(menuItemElement);
    });
}

// Event Listeners
cartIcon.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartSidebar);

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderMenuItems(button.dataset.category);
    });
});

// Inicializar
renderMenuItems('entradas'); 