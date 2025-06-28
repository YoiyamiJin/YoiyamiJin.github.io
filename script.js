document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // 1. ハンバーガーメニューのトグル
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // ナビメニューのリンクをクリックしたらメニューを閉じる (モバイル用)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }

    // ========================================
    // 2. HOMEページのスライドショー (Hero Section)
    // ========================================
    const slides = document.querySelectorAll('.visual-slideshow .slide');
    if (slides.length > 0) {
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
        setInterval(nextSlide, 5000);

        // 初期表示
        showSlide(currentSlide);
    }

    // ========================================
    // 3. スクロール時のアニメーション (Intersection Observer)
    // ========================================
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // ビューポートをルートとする
        rootMargin: '0px',
        threshold: 0.1 // 要素が10%見えたらアニメーション開始
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // 一度アニメーションしたら監視を停止
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // ========================================
    // 4. ナビゲーションのアクティブ状態の自動設定 (全ページ共通)
    // ========================================
    const currentPath = window.location.pathname.split('/').pop(); // 例: "index.html"
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else if (currentPath === '' && linkPath === 'index.html') {
            // index.htmlがルートURLの場合に対応
            link.classList.add('active');
        }
    });

    // ========================================
    // 5. MUSIC/GAME/GOODSページのフィルタリング・検索機能 (ダミー)
    //    現状ではHTML上の表示変更は行いませんが、イベントリスナーを設定
    // ========================================
    const sortSelectMusic = document.getElementById('sort-music');
    const searchInputMusic = document.getElementById('search-music');

    if (sortSelectMusic) {
        sortSelectMusic.addEventListener('change', (event) => {
            console.log('Music Sort by:', event.target.value);
            // ここに実際のソート処理を実装
        });
    }

    if (searchInputMusic) {
        searchInputMusic.addEventListener('input', (event) => {
            console.log('Music Search:', event.target.value);
            // ここに実際の検索処理を実装
        });
    }

    const sortSelectGame = document.getElementById('sort-game');
    const searchInputGame = document.getElementById('search-game');

    if (sortSelectGame) {
        sortSelectGame.addEventListener('change', (event) => {
            console.log('Game Sort by:', event.target.value);
            // ここに実際のソート処理を実装
        });
    }

    if (searchInputGame) {
        searchInputGame.addEventListener('input', (event) => {
            console.log('Game Search:', event.target.value);
            // ここに実際の検索処理を実装
        });
    }

    // GOODSページは「最新のみ」に絞られたため、フィルタリング/検索は不要になりましたが、
    // もし今後、複数グッズをリスト表示する際に必要になればコメントアウトを解除
    // const sortSelectGoods = document.getElementById('sort-goods');
    // const searchInputGoods = document.getElementById('search-goods');

    // if (sortSelectGoods) {
    //     sortSelectGoods.addEventListener('change', (event) => {
    //         console.log('Goods Sort by:', event.target.value);
    //         // ここに実際のソート処理を実装
    //     });
    // }

    // if (searchInputGoods) {
    //     searchInputGoods.addEventListener('input', (event) => {
    //         console.log('Goods Search:', event.target.value);
    //         // ここに実際の検索処理を実装
    //     });
    // }
});
