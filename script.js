// script.js

// スムーズスクロール
document.querySelectorAll('nav ul li a, .button').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - (document.querySelector('header').offsetHeight), // ヘッダーの高さ分調整
                behavior: 'smooth'
            });
            // モバイルメニューが開いている場合は閉じる
            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                menuToggle.classList.remove('open');
            }
        }
    });
});

// ハンバーガーメニュー
const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');

if (menuToggle && navUl) {
    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('active');
        menuToggle.classList.toggle('open');
    });
}

// スクロール時の要素アニメーション (Intersection Observer APIを使用)
const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

const observerOptions = {
    root: null, // ビューポートをルートとする
    rootMargin: '0px',
    threshold: 0.1 // 要素が10%見えたら発火
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


// ローディング画面の非表示処理
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        // ローディング画面が完全に消えてからヒーローセクションのアニメーションを開始
        loadingScreen.addEventListener('transitionend', () => {
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.style.opacity = 1; // ここでアニメーションのトリガー
            }
        }, { once: true }); // 一度だけ実行
    }
});
