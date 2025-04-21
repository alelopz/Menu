document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    const callWaiterBtn = document.getElementById('call-waiter');

    // Función para actualizar el carrito
    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price}</span>
            `;
            cartItems.appendChild(cartItem);
            total += item.price;
        });

        totalElement.textContent = total;
    }

    // Event listeners para los botones de agregar al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseInt(button.getAttribute('data-price'));

            cart.push({ name, price });
            updateCart();

            // Animación de feedback
            button.style.transform = 'scale(1.1)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Event listener para el botón de llamar al mesero
    callWaiterBtn.addEventListener('click', () => {
        // Crear y mostrar la notificación
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span>🛎️</span>
                <p>¡El mesero ha sido notificado!</p>
            </div>
        `;
        document.body.appendChild(notification);

        // Estilos para la notificación
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#ff6b6b';
        notification.style.color = 'white';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '10px';
        notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        notification.style.animation = 'slideIn 0.5s ease-out';

        // Animación de entrada
        const keyframes = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);

        // Remover la notificación después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-in';
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 500);
        }, 3000);
    });
}); 