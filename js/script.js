// Import Products JSON
function loadProducts() {
    fetch("./data/products.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            // isSale: true
            const saleProducts = products.filter(product => product.isSale).slice(0, 4);
            renderProducts(saleProducts, "#sale-items .products-json", "SALE");

            // WITHOUT isSale: true
            const newProducts = products.filter(product => !product.isSale).slice(0, 8);
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
                    <a href="ChiTietSanPham.html?id=${product.id}" class="product-image-link">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        <div class="product-quick-view">
                            <span class="btn-view-details">
                                <i class="bi bi-eye"></i> Xem chi tiết
                            </span>
                        </div>
                    </a>
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

function CountdownTimer() {
    const targetDate = new Date(Date.now() + (2 * 60 * 60 * 1000)); // 2 hours

    function updateTimer() {
        const now = new Date();
        let timeLeft = Math.floor((targetDate - now) / 1000); // in seconds

        if (timeLeft <= 0) {
            timeLeft = 0;
        }

        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft - hours * 3600) / 60);
        const seconds = timeLeft - hours * 3600 - minutes * 60;

        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}


// LOAD
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    CountdownTimer();

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
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    })
});