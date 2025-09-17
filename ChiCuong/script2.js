document.addEventListener('DOMContentLoaded', () => {
    const sizeBoxes = document.querySelectorAll('.size-box');
    const buyNowBtn = document.querySelector('.buy-now-btn');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');

    // Chức năng chọn size
    sizeBoxes.forEach(box => {
        box.addEventListener('click', () => {
            sizeBoxes.forEach(b => b.classList.remove('selected'));
            box.classList.add('selected');
        });
    });

    // Xử lý khi nhấn nút "MUA NGAY"
    buyNowBtn.addEventListener('click', () => {
        const selectedSize = document.querySelector('.size-box.selected').dataset.size;
        const height = document.getElementById('height').value;
        const weight = document.getElementById('weight').value;

        alert(`Mua ngay sản phẩm size ${selectedSize}\nChiều cao: ${height}cm\nCân nặng: ${weight}kg`);
    });

    // Xử lý khi nhấn nút "THÊM VÀO GIỎ"
    addToCartBtn.addEventListener('click', () => {
        const selectedSize = document.querySelector('.size-box.selected').dataset.size;
        const height = document.getElementById('height').value;
        const weight = document.getElementById('weight').value;
        
        alert(`Đã thêm sản phẩm size ${selectedSize} vào giỏ hàng\nChiều cao: ${height}cm\nCân nặng: ${weight}kg`);
    });
});