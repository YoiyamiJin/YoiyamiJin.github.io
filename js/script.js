document.addEventListener('DOMContentLoaded', () => {
    // ページ全体が読み込まれた後に実行される処理

    // ローディングアニメーションの制御
    const loadingScreen = document.getElementById('loading'); // ローディング画面の要素を取得
    if (loadingScreen) {
        // DOMContentLoadedイベントでローディング画面をフェードアウトさせ、非表示にする
        loadingScreen.style.opacity = '0'; // 透明度を0にしてフェードアウト開始
        setTimeout(() => {
            loadingScreen.style.display = 'none'; // フェードアウト後に非表示にする
        }, 500); // CSSのtransition時間（0.5s）と合わせる
    }

    // ページ読み込み時のフェードインアニメーション (例: トップページのメインビジュアル)
    const fadeInElements = document.querySelectorAll('.fade-in'); // 'fade-in'クラスを持つ要素をすべて取得
    fadeInElements.forEach(element => {
        element.classList.add('active'); // 'active'クラスを追加してアニメーションをトリガー
    });

    // スクロール時のフェードインアニメーション (例: 自己紹介セクション、フォーム)
    const fadeInSections = document.querySelectorAll('.fade-in-section'); // 'fade-in-section'クラスを持つ要素を取得
    const fadeInForms = document.querySelectorAll('.fade-in-form');       // 'fade-in-form'クラスを持つ要素を取得

    // Intersection Observer の設定
    const observerOptions = {
        root: null, // ビューポートをルート要素とする
        rootMargin: '0px', // ルート要素のマージン
        threshold: 0.1 // 要素の10%が見えたらコールバックを実行
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 要素がビューポートに入ったら
                entry.target.classList.add('active'); // 'active'クラスを追加してアニメーションをトリガー
                observer.unobserve(entry.target); // 一度表示されたら監視を終了 (何度もアニメーションしないように)
            }
        });
    }, observerOptions);

    // 各セクションとフォームにIntersection Observerを適用
    fadeInSections.forEach(section => {
        sectionObserver.observe(section);
    });

    fadeInForms.forEach(form => {
        sectionObserver.observe(form);
    });

    // お問い合わせフォームの送信処理 (簡易的な例)
    // 実際にはサーバーサイドの処理が必要です
    const contactForm = document.querySelector('#contact-form form');
    if (contactForm) { // フォームが存在する場合のみ処理を実行
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // デフォルトのフォーム送信（ページの再読み込み）を防ぐ

            // ここにフォームデータをサーバーに送信する実際の処理を追加します
            // 例: fetch API を使用して非同期でデータを送信
            /*
            fetch('/submit-contact', {
                method: 'POST',
                body: new FormData(contactForm)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('お問い合わせありがとうございます！');
                contactForm.reset(); // フォームをリセット
            })
            .catch(error => {
                console.error('Error:', error);
                alert('送信中にエラーが発生しました。もう一度お試しください。');
            });
            */

            alert('お問い合わせありがとうございます！'); // 仮の成功メッセージ
            contactForm.reset(); // フォームをリセット
        });
    }
});
