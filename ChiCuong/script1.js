const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

let cart = [
    {
        id: 'B43.5069.B',
        name: 'Váy trắng hoa nhí dễ thương cho mẹ và bé gái',
        price: 156000,
        quantity: 1,
        image:'file:///C:/Users/hoang/Downloads/trang%20s%E1%BA%A3n%20ph%E1%BA%A9m/New%20folder/%E1%BA%A3nh/mg%201.jpg'
    },
];

function formatPrice(price) {
    return price.toLocaleString('vi-VN') + ' đ';
}

function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #888;">Giỏ hàng của bạn đang trống.</p>';
        totalPriceElement.textContent = formatPrice(0);
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <h4>${item.name}</h4>
                <div class="item-price">${formatPrice(item.price)}</div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity('${item.id}', -1)">-</button>
                    <input type="text" value="${item.quantity}" readonly>
                    <button onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);

        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = formatPrice(total);
}

function updateQuantity(itemId, change) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        const newQuantity = cart[itemIndex].quantity + change;
        if (newQuantity > 0) {
            cart[itemIndex].quantity = newQuantity;
        } else {
            // Xóa sản phẩm nếu số lượng về 0
            cart = cart.filter(item => item.id !== itemId);
        }
        renderCart();
    }
}

function closeCart() {
    console.log("Đóng giỏ hàng");
}

document.addEventListener('DOMContentLoaded', renderCart);