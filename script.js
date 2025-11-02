// script.js

// Lấy tham chiếu đến các phần tử HTML chính
const previewImage = document.querySelector('#preview'); 
const captionText = document.querySelector('#caption'); 

// URL và mô tả mặc định của ảnh placeholder
const defaultSrc = previewImage.src;
const defaultAlt = previewImage.alt;
const defaultCaption = captionText.textContent;

// --- 1. Hàm Xử lý Sự kiện Focus/MouseOver ---
function upDate(event) {
    // Lấy phần tử hình ảnh nhỏ (figure) hiện đang được tương tác (hover/focus)
    // Dùng event.currentTarget để đảm bảo lấy đúng thẻ figure đã gắn listener
    const figureElement = event.currentTarget;
    const imageElement = figureElement.querySelector('img');

    // Lấy alt text và URL từ thẻ <img> bên trong figure
    const altText = imageElement.alt;
    const imageUrl = imageElement.src;

    // Cập nhật hình ảnh xem trước
    previewImage.src = imageUrl;
    previewImage.alt = altText;

    // Cập nhật mô tả (caption)
    captionText.textContent = altText;
}

// --- 2. Hàm Xử lý Sự kiện Blur/MouseLeave ---
function unDo() {
    // Đặt hình ảnh xem trước về trạng thái ban đầu
    previewImage.src = defaultSrc; 
    previewImage.alt = defaultAlt; 
    captionText.textContent = defaultCaption;
}


// --- 3. Hàm Chính để Thiết lập Thư viện và Khả năng Tiếp cận ---
function setupGallery() {
    // Lấy tất cả các phần tử <figure> trong thư viện ảnh
    const figures = document.querySelectorAll('.gallery figure'); 

    figures.forEach((figure) => {
        
        // ************** YÊU CẦU 1: Tự động thêm tabindex **************
        // Thêm tabindex="0" để làm cho các phần tử này có thể được focus qua phím Tab
        figure.setAttribute('tabindex', '0');

        // ************** YÊU CẦU 2: Thêm Listeners **************
        
        // Sự kiện Chuột (Mouse Movement)
        figure.addEventListener('mouseover', upDate);
        figure.addEventListener('mouseleave', unDo);

        // Sự kiện Bàn phím (Keyboard Access)
        // Sử dụng lại logic upDate và unDo
        figure.addEventListener('focus', upDate); 
        figure.addEventListener('blur', unDo);   
    });
}

// Chạy hàm thiết lập sau khi toàn bộ nội dung HTML đã được tải
document.addEventListener('DOMContentLoaded', setupGallery);
