let pages = [];
let currentIndex = 0;

// بارگذاری فایل متن
fetch('m.txt')
    .then(response => response.text())
    .then(data => {
        // تقسیم متن بر اساس خطوط به عنوان "صفحه" (هر خط یک صفحه)
        pages = data.split('\n');
        if (pages.length > 0) {
            showPage(0);
        }
        document.getElementById('full-text').value = data;
    });

// نمایش صفحه
function showPage(index) {
    if(index < 0 || index >= pages.length) return;
    currentIndex = index;
    document.getElementById('current-text').innerText = pages[index];
    document.getElementById('page-number').value = index + 1;
    document.getElementById('page-text').value = pages[index];
}

// کپی متن
document.getElementById('copy-btn').addEventListener('click', () => {
    const text = document.getElementById('current-text').innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('متن کپی شد!');
    });
});

// متن قبلی
document.getElementById('prev-btn').addEventListener('click', () => {
    showPage(currentIndex - 1);
});

// تغییر شماره صفحه
document.getElementById('page-number').addEventListener('input', (e) => {
    const index = parseInt(e.target.value) - 1;
    showPage(index);
});

// ویرایش متن صفحه
document.getElementById('page-text').addEventListener('input', (e) => {
    pages[currentIndex] = e.target.value;
    document.getElementById('current-text').innerText = e.target.value;
    document.getElementById('full-text').value = pages.join('\n');
});

// ویرایش متن کامل
document.getElementById('full-text').addEventListener('input', (e) => {
    pages = e.target.value.split('\n');
    showPage(currentIndex);
});
