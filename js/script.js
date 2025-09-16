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
}
function SaveCart(product) {
    try {
        const cart = [];
        cart = JSON.parse(localStorage.getItem("cart"));
        return true;
    } catch {
        console.log("loi me r");
        return false;
    }
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
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <div class="product-overlay">
                        <div class="overlay-content">
                            <a href="#" class="btn btn-outline-light btn-sm mb-2"><i class="bi bi-eye"></i> Xem nhanh</a>
                            <a href="#" class="btn btn-light btn-sm"><i class="bi bi-cart"></i> Mua ngay</a>
                            
                        </div>
                    </div>
                </div>
                <div class="product-info">
                    <h6 class="product-title">${product.title}</h6>
                    <div class="product-price">
                        ${product.originalPrice ? `<span class="price old-price">${product.originalPrice}</span>` : ""}
                        <span class="price sale-price">${product.currentPrice ? product.currentPrice : ""}</span>
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