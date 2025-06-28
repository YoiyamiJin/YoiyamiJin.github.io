document.addEventListener('DOMContentLoaded', () => {
    // メインビジュアルのスライドショー
    const slides = document.querySelectorAll('.visual-slideshow .slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // 5秒ごとにスライドを切り替え
    if (slides.length > 1) { // 画像が複数ある場合のみスライドショーを実行
        setInterval(nextSlide, 5000);
    }
    showSlide(currentSlide); // 最初のスライドを表示

    // ハンバーガーメニューの切り替え
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // ナビゲーションリンククリックでメニューを閉じる (モバイル時)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) { // スマートフォンサイズの場合
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
