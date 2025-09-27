let cartInit = false;

// Cart core functions
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

  // Tìm sản phẩm đã có trong giỏ hàng dựa trên id
  const foundIndex = currItems.findIndex(item => Number(item.id) === Number(newItem.id));
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

// Cart UI functions
function renderCartItems() {
  const cartItems = getCartItems();
  const cartItemsContainer = document.getElementById('cart-items');
  const cartEmpty = document.getElementById('cart-empty');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = '';

  if (!cartItems.length) {
    cartEmpty.classList.remove('d-none');
    checkoutBtn.disabled = true;
    cartTotal.textContent = '0₫';
    return;
  }

  cartEmpty.classList.add('d-none');
  checkoutBtn.disabled = false;

  let total = 0;

  cartItems.forEach((item, index) => {
    const price = Number(item.price) * Number(item.qty);
    total += price;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.image || ''}" alt="${item.name || ''}" ${!item.image ? 'style="display:none"' : ''}>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name || 'Sản phẩm'}</div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
        <div class="cart-item-qty">
          <span>Số lượng:</span>
          <div class="qty-controls">
            <button class="qty-btn qty-minus" onclick="changeQty('${item.id}', -1)">-</button>
            <span class="cart-qty-display" data-id="${item.id}">${item.qty}</span>
            <button class="qty-btn qty-plus" onclick="changeQty('${item.id}', 1)">+</button>
          </div>
        </div>
      </div>
      <div class="cart-item-actions">
        <div class="cart-item-total">${formatPrice(price)}</div>
        <button class="cart-item-remove" onclick="removeItem('${item.id}')">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  cartTotal.textContent = formatPrice(total);
}

// Cart event
function setupCartEventListeners() {
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.onclick = function() {
      window.location.href = './thanhtoan.html';
    };
  }
}

function removeItem(productId) {
  removeCartItem(productId);
}

function changeQty(productId, change) {
  adjustCartItemQty(productId, change);
}

function removeCartItem(productId) {
  const items = getCartItems();
  const newItems = items.filter(item => item.id != productId);
  setCartItems(newItems);
  renderCartItems();
}

function adjustCartItemQty(productId, adjustment) {
  const items = getCartItems();
  const item = items.find(item => item.id == productId);
  if (item) {
    const newQty = Math.max(1, item.qty + adjustment);
    item.qty = newQty;
    setCartItems(items);
    renderCartItems(); // Re-render to update the display
  }
}

// Cart
function initCart() {
  if (cartInit) return;

  const cartPanel = document.getElementById('cart');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartClose = document.getElementById('cartClose');
  const cartToggle = document.querySelector('.cart-toggle');
  const continueShopping = document.getElementById('continueShopping');

  // Toggle cart panel
  function openCart() {
    cartPanel.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderCartItems();
  }

  function closeCart() {
    cartPanel.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (cartToggle) cartToggle.addEventListener('click', openCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (continueShopping) continueShopping.addEventListener('click', closeCart);

  setupCartEventListeners();

  cartInit = true;
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

      // Add to cart using the addItemToCart function
      addItemToCart({ id: id, name: name, price: price, image: image, qty: 1 });

      // Open cart panel
      const cartToggle = document.querySelector('.cart-toggle');
      if (cartToggle) {
        cartToggle.click();
      }
    })
  })
}

// Load cart
async function loadCartPanel() {
  let response = await fetch("./partials/cart.html");
  let html = await response.text();
  document.body.insertAdjacentHTML("beforeend", html);

  initCart();
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
  initCart,
  loadCartPanel,
  addCartClickEvents
};

// DOM 
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});