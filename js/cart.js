function getCartItems() {
  try {
    return JSON.parse(localStorage.getItem('cart_items') || '[]');
  } catch {
    return [];
  }
}

function setCartItems(items) {
  localStorage.setItem('cart_items', JSON.stringify(items));
  updateCartCount();
}

function addItemToCart(newItem) {
  const currItems = getCartItems();

  // Tìm sản phẩm đã có trong giỏ hàng dựa trên id và size
  const foundIndex = currItems.findIndex(item =>
    Number(item.id) === Number(newItem.id) && (item.size || '') === (newItem.size || '')
  );

  if (foundIndex !== -1) {
    // Nếu đã có, cộng thêm số lượng
    const existingProduct = currItems[foundIndex];
    const currQty = Number(existingProduct.qty);
    const addQty = Number(newItem.qty);
    existingProduct.qty = currQty + addQty;
  } else {
    // Nếu chưa có, thêm mới vào giỏ hàng
    currItems.push({
      id: newItem.id,
      name: newItem.name,
      price: Number(newItem.price),
      image: newItem.image || '',
      size: newItem.size || '',
      qty: Number(newItem.qty)
    });
  }
  setCartItems(currItems);
}

function formatPrice(price) {
  try {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  } catch (e) {
    return price + '₫';
  }
}

function updateCartCount() {
  const cartItems = getCartItems();
  const cartCountElements = document.querySelectorAll('.cart-count');
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  cartCountElements.forEach(element => {
    element.textContent = totalItems;
  });
}

// Cart UI
function renderCartItems() {
  const cartItems = getCartItems();
  const cartItemsContainer = document.getElementById('cart-items');
  const cartEmpty = document.getElementById('empty-cart');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = '';

  if (!cartItems.length) {
    if (cartEmpty) cartEmpty.classList.remove('d-none');
    if (cartItemsContainer) cartItemsContainer.classList.add('d-none');
    if (subtotalElement) subtotalElement.textContent = '0₫';
    if (totalElement) totalElement.textContent = '0₫';
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  if (cartEmpty) cartEmpty.classList.add('d-none');
  if (cartItemsContainer) cartItemsContainer.classList.remove('d-none');
  if (checkoutBtn) checkoutBtn.disabled = false;

  let total = 0;

  cartItems.forEach((item) => {
    const price = Number(item.price) * Number(item.qty);
    total += price;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.image || ''}" alt="${item.name || ''}" ${!item.image ? 'style="display:none"' : ''}>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name || 'Sản phẩm'}</div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
        ${item.size ? `<div class="cart-item-size">Size: ${item.size}</div>` : ''}
        <div class="cart-item-qty">
          <span>Số lượng:</span>
          <div class="qty-controls">
            <button class="qty-btn qty-minus" onclick="changeQty('${item.id}', -1, '${item.size || ''}')">-</button>
            <span class="cart-qty-display" data-id="${item.id}" data-size="${item.size || ''}">${item.qty}</span>
            <button class="qty-btn qty-plus" onclick="changeQty('${item.id}', 1, '${item.size || ''}')">+</button>
          </div>
        </div>
      </div>
      <div class="cart-item-actions">
        <div class="cart-item-total">${formatPrice(price)}</div>
        <button class="cart-item-remove" onclick="removeItem('${item.id}', '${item.size || ''}')">
          <i class="bi bi-trash"></i> Xóa
        </button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  if (subtotalElement) subtotalElement.textContent = formatPrice(total);
  if (totalElement) totalElement.textContent = formatPrice(total);
}

function removeItem(productId, size = '') {
  removeCartItem(productId, size);
}

function changeQty(productId, change, size = '') {
  adjustCartItemQty(productId, change, size);
}

function removeCartItem(productId, size = '') {
  const items = getCartItems();
  const newItems = items.filter(item =>
    item.id != productId || (size && item.size !== size)
  );
  setCartItems(newItems);
  renderCartItems();
}

function adjustCartItemQty(productId, adjustment, size = '') {
  const items = getCartItems();
  const item = items.find(item =>
    item.id == productId && (!size || item.size === size)
  );
  if (item) {
    const newQty = Math.max(1, item.qty + adjustment);
    item.qty = newQty;
    setCartItems(items);
    renderCartItems();
  }
}

// Cart event handling
function addCartClickEvents(container) {
  const buttons = container.querySelectorAll(".btn-add-to-cart")
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const id = btn.getAttribute("data-id");
      const name = btn.getAttribute("data-name");
      const price = Number(btn.getAttribute("data-price"));
      const image = btn.getAttribute("data-image");

      addItemToCart({ id: id, name: name, price: price, image: image, qty: 1 });

      showAddToCartMessage(name);
    })
  })
}


window.cartFunctions = {
  getCartItems,
  setCartItems,
  addItemToCart,
  removeCartItem,
  adjustCartItemQty,
  renderCartItems,
  updateCartCount,
  formatPrice,
  addCartClickEvents
};

// DOM
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  if (document.querySelector('.cart-page')) {
    renderCartItems();
  }

  // Auto-attach cart events to any "Add to Cart" buttons found
  if (window.cartFunctions && window.cartFunctions.addCartClickEvents) {
    if (document.querySelector('.btn-add-to-cart')) {
      window.cartFunctions.addCartClickEvents(document.body);
    }
  }
});