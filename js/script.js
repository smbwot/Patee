console.log("Script loaded ✅");

// Import Products JSON
function loadProducts() {
    fetch("./data/products.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            // Filter products for sale section (limit to 4)
            const saleProducts = products.filter(product => product.isSale).slice(0, 4);
            renderProducts(saleProducts, "#sale-items .products-json", "SALE");

            // Filter products for new section (first 4 products)
            const newProducts = products.slice(0, 4);
            renderProducts(newProducts, "#new-items .products-json", "HÀNG ĐÃ VỀ");
        });
}

function renderProducts(products, containerSelector, badgeType) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = "";

    products.forEach(function (product) {
        const card = createProductCard(product, badgeType);
        container.insertAdjacentHTML("beforeend", card);
    });
}

function createProductCard(product, badgeType) {
    // Determine badge text and class based on badgeType parameter
    let badgeText = "";
    let badgeClass = "";

    if (badgeType === "SALE") {
        badgeText = "SALE";
        badgeClass = "bg-danger";
    } else if (badgeType === "HÀNG ĐÃ VỀ") {
        badgeText = "HÀNG ĐÃ VỀ";
        badgeClass = "bg-success";
    }

    let card = `
        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
            <div class="product-card">
                ${badgeText ? `
                <div class="product-badge">
                    <span class="badge ${badgeClass}">${badgeText}</span>
                </div>` : ""}
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-overlay">
                        <div class="overlay-content">
                            <a href="#" class="btn btn-outline-light btn-sm mb-2"><i class="bi bi-eye"></i> Xem nhanh</a>
                            <a href="#" class="btn btn-light btn-sm"><i class="bi bi-cart"></i> Mua ngay</a>
                        </div>
                    </div>
                </div>
                <div class="product-info">
                    <h6 class="product-title">${product.name}</h6>
                    <div class="product-price">
                        ${badgeType === "SALE" && product.isSale ? `<span class="price old-price">${(product.price * 1.2).toLocaleString('vi-VN')}₫</span>` : ""}
                        <span class="price sale-price">${product.currentPrice ? product.currentPrice : product.price.toLocaleString('vi-VN')}₫</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    return card;
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