document.addEventListener('DOMContentLoaded', () => {
    // メインビジュアルのスライドショー (HOMEページ用)
    const slides = document.querySelectorAll('.visual-slideshow .slide');
    if (slides.length > 1) { // HOMEページにいる場合のみ実行
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
        setInterval(nextSlide, 5000);
        showSlide(currentSlide); // 最初のスライドを表示
    }

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
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // 外部ファイルへのリンクでないことを確認
            if (this.hostname === location.hostname || this.href.startsWith(location.origin)) {
                 const targetId = this.getAttribute('href');
                 const targetElement = document.querySelector(targetId);
                 if (targetElement) {
                     targetElement.scrollIntoView({
                         behavior: 'smooth'
                     });
                 }
            } else {
                // 外部ファイルへのリンクは通常通り遷移
                window.location.href = this.href;
            }
        });
    });

    // ========================================
    // ABOUTページ用スクロールアニメーション (新規追加)
    // ========================================
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // ビューポートをルートとする
        rootMargin: '0px',
        threshold: 0.1 // 10%要素が見えたら発火
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // 一度アニメーションしたら監視を停止
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });
});
