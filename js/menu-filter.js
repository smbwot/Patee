/* 
   =============================================================================
   Trang Sản Phẩm - Mỹ Linh
   ============================================================================= 
*/
function setupProductFilter() {
    // Lấy các phần tử cần thiết từ trang
    const productGrid = document.getElementById('product-grid'); // class chứa tất cả sản phẩm
    const menuItems = document.querySelectorAll('.menu-item'); // class của các nút menu lọc

    // Gán sự kiện click cho từng menu
    menuItems.forEach(menuItem => {
        menuItem.addEventListener('click', function() {
            // Lấy danh mục từ data-attribute của menu được click
            const category = this.dataset.category;

            // Bỏ class 'active' khỏi tất cả các menu - Để không còn menu nào đang được chọn
            menuItems.forEach(item => item.classList.remove('active'));

            // Thêm class 'active' vào menu vừa được click - Để highlight menu đang được chọn
            this.classList.add('active');

            // Bắt đầu lọc sản phẩm theo danh mục
            const products = productGrid.querySelectorAll('.category-product-card');
            let count = 0; // Đếm số sản phẩm hiển thị

            // Duyệt qua từng sản phẩm để kiểm tra
            products.forEach(product => {
                // Kiểm tra xem sản phẩm có thuộc danh mục được chọn không
                // Hoặc nếu chọn 'all' thì hiển thị tất cả
                if (category === 'all' || product.dataset.category === category) {
                    product.style.display = 'block'; // Hiện sản phẩm
                    count++; // Tăng đếm số sản phẩm hiển thị
                } else {
                    product.style.display = 'none'; // Ẩn sản phẩm
                }
            });

            // Cập nhật tiêu đề trang theo danh mục được chọn
            const header = document.querySelector('.category-header h1');
            const categoryNames = {
                'all': 'Tất cả sản phẩm',
                'sale': 'SALE',
                'new': 'Hàng mới về',
                'couple': 'Đồ Đôi',
                'family': 'Set Gia Đình',
                'mom-baby': 'Mẹ và Bé',
                'girl': 'Bé Gái',
                'boy': 'Bé Trai'
            };

            // Nếu có tiêu đề và tên danh mục thì cập nhật. VD: Hàng mới về (... sản phẩm)
            if (header && categoryNames[category]) {
                header.textContent = categoryNames[category] + ' (' + count + ' sản phẩm)'; 
            }
        });
    });
}

// Khởi chạy bộ lọc khi trang đã tải xong
document.addEventListener('DOMContentLoaded', setupProductFilter);