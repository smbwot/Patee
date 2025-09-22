console.log("Script loaded ✅");

// Import Products JSON
function loadProducts() {
    // Load all products once, then split by isSale
    fetch("./data/products.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (allProducts) {
            const saleProducts = allProducts.filter(function (p) { return !!p.isSale; });
            const newProducts = allProducts.filter(function (p) { return !p.isSale; });

            renderProducts(saleProducts, "#sale-items .products-json", "SALE", "bg-danger");
            renderProducts(newProducts, "#new-items .products-json", "HÀNG ĐÃ VỀ", "bg-success");
        });
}

function renderProducts(products, containerSelector, badgeText, badgeClass) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = "";

    products.forEach(function (product) {
        const card = createProductCard(product, badgeText, badgeClass);
        container.insertAdjacentHTML("beforeend", card);
    });

    addColorClickEvents(container);
    addCartClickEvents(container);
}
function getCartItems() {
    try {
        return JSON.parse(localStorage.getItem('cart_items') || '[]')
    } catch {
        return [];
    }
}
function setCartItems(items) {
    localStorage.setItem('cart_items', JSON.stringify(items))
}

function addItemToCart(newItem) {
    const currItems = getCartItems();

    // Tìm sản phẩm đã có trong giỏ hàng dựa trên id
    const foundIndex = currItems.findIndex(item => Number(item.id) === Number(newItem.id));
    if (foundIndex !== -1) {
        // Nếu đã có, cộng thêm số lượng
        const existingProduct = currItems[foundIndex];
        const currQty = Number(existingProduct.qty || 1);
        const addQty = Number(newItem.qty || 1);
        existingProduct.qty = currQty + addQty;
    } else {
        // Nếu chưa có, thêm mới vào giỏ hàng
        currItems.push({
            id: newItem.id,
            name: newItem.name,
            price: Number(newItem.price || 0),
            image: newItem.image || '',
            qty: Number(newItem.qty || 1)
        });
    }
    console.log(currItems);
    setCartItems(currItems);
}

function createProductCard(product, badgeText, badgeClass) {
    // color swatches
    let colors = "";
    let productColors = product.colors ? product.colors : [];

    productColors.forEach(function (color, index) {
        let activeClass = index === 0 ? "active" : "";
        colors += `<span class="color-swatch ${activeClass}" style="background-color:${color};"></span>`;
    });

    let card = `
        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
            <div class="product-card">
                <div class="product-badge">
                    <span class="badge ${badgeClass}">${badgeText}</span>
                </div>
                <div class="product-image-container">
                    <img src="${product.img || product.image || ''}" alt="${product.name || ''}" class="product-image">

                    <div class="product-overlay">
                        <div class="overlay-content">
                            <a href="#" class="btn btn-outline-light btn-sm mb-2"><i class="bi bi-eye"></i> Xem nhanh</a>
                            <a href="#" class="btn btn-light btn-sm btn-add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.img || product.image || ''}"><i class="bi bi-cart"></i> Mua ngay</a>
                        </div>
                    </div>
                </div>
                <div class="product-info">
                    <h6 class="product-title">${product.name }</h6>
                    <div class="product-price">

                        <span class="price sale-price">${product.price != null ? new Intl.NumberFormat('vi-VN').format(product.price) : ""}</span>
                    </div>
                    <div class="color-options">${colors}</div>
                </div>
            </div>
        </div>
    `;

    return card;
}

// click events for changing color swatches
function addColorClickEvents(container) {
    const swatches = container.querySelectorAll(".color-swatch");

    swatches.forEach(function (swatch) {
        swatch.addEventListener("click", function () {
            const parent = swatch.parentNode;
            const allSwatches = parent.querySelectorAll(".color-swatch");

            allSwatches.forEach(function (s) {
                s.classList.remove("active");
            });

            swatch.classList.add("active");
        });
    });
}

function addCartClickEvents(container) {
    const buttons = container.querySelectorAll(".btn-add-to-cart")
    buttons.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const id = btn.getAttribute("data-id");
            const name = btn.getAttribute("data-name");
            const price = Number(btn.getAttribute("data-price") || 0);
            const image = btn.getAttribute("data-image");
            addItemToCart({id: id, name: name, price: price, image: image, qty: 1}); // thêm xong
            window.location.href = "./cart.html"; // direction qua cart.html
        })
    })

}
// Counter
class CountdownTimer {
    constructor() {
        this.targetDate = new Date(Date.now() + (120 * 60 * 1000)); // 2 giờ

        this.elements = {
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };

        this.init();
    }

    init() {
        this.updateTimer();
        setInterval(() => this.updateTimer(), 1000); // Update mỗi giây
    }

    updateTimer() {
        const now = new Date();
        const timeLeft = this.targetDate - now;

        if (timeLeft <= 0) {
            this.elements.hours.textContent = '0';
            this.elements.minutes.textContent = '0';
            this.elements.seconds.textContent = '0';
            return;
        }

        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        this.elements.hours.textContent = hours.toString().padStart(2, '0');
        this.elements.minutes.textContent = minutes.toString().padStart(2, '0');
        this.elements.seconds.textContent = seconds.toString().padStart(2, '0');
    }
}

// LOAD
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    new CountdownTimer();

    // Back to top button
    let backToTop = document.querySelector(".back-to-top");
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('show');
        }
        else {
            backToTop.classList.remove('show');
        }
    });
    backToTop.addEventListener('click', function (e) {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    })
});