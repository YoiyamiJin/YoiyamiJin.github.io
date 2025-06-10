/**
 * スクロール時のアニメーション処理
 */
$(window).on('scroll', function() {
    $('.fade-in-up').each(function() {
        var elemPos = $(this).offset().top;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll > elemPos - windowHeight + 100) {
            $(this).addClass('appear');
        }
    });
});

// ページロード時にもアニメーションを適用
$(window).on('load', function() {
    $('.fade-in-up').each(function() {
        var elemPos = $(this).offset().top;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll > elemPos - windowHeight + 100) {
            $(this).addClass('appear');
        }
    });
});

/**
 * お問い合わせフォームの送信処理を管理する関数
 * (Googleフォームへ直接データを送信)
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    const submitButton = contactForm ? contactForm.querySelector('.submit-btn') : null;

    if (contactForm && formMessage) { // フォーム要素とメッセージ表示要素が存在する場合のみ処理を実行
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // フォームのデフォルト送信動作をキャンセル

            // 送信ボタンを無効化し、ユーザーに処理中であることを示す
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = '送信中...';
            }

            // メッセージ表示をリセット
            formMessage.style.display = 'none';
            formMessage.classList.remove('success-message', 'error-message');
            formMessage.textContent = ''; // メッセージ内容もクリア

            // 各入力フィールドから値を取得
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            const privacyConsentCheckbox = document.getElementById('privacyConsent');
            const privacyConsent = privacyConsentCheckbox.checked ? '同意済み' : '未同意';

            // バリデーション (必須項目が空でないか、プライバシーポリシーに同意しているか確認)
            if (!name || !email || !message || !privacyConsentCheckbox.checked) {
                formMessage.style.display = 'block';
                formMessage.textContent = '必須項目がすべて入力されているか、プライバシーポリシーに同意しているかご確認ください。';
                formMessage.classList.add('error-message');
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = '送信する';
                }
                return; // ここで処理を中断
            }

            // ★★★ ここをあなたのGoogleフォームのベースURLに置き換えてください ★★★
            // 例: 'https://docs.google.com/forms/d/e/1FAIpQLSfSqyvC_PWfJUPIWDGp8nNMB9lRnrYwvI4AxfIMTt_kxo2EwA'
            const googleFormBaseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSftBWnVToY7CVzjgsRtAjd2XBBLZPZ2WbSSRMW7X5zMn_3Rtg/formResponse';

            // FormDataオブジェクトを作成し、各データを追加
            const formData = new FormData();
            // ★★★ ここをあなたのGoogleフォームのエントリーIDに置き換えてください ★★★
            // エントリーIDは文字列なので、引用符で囲む必要があります。
            formData.append('entry.702435569', name);          // お名前のエントリーIDと値
            formData.append('entry.1645834279', email);         // メールアドレスのエントリーIDと値
            formData.append('entry.565703469', subject);        // 件名のエントリーIDと値
            formData.append('entry.939436923', message);        // お問い合わせ内容のエントリーIDと値
            formData.append('entry.140261202', privacyConsent); // プライバシー同意のエントリーIDと値

            // Fetch APIを使ってGoogleフォームにデータを送信
            fetch(googleFormBaseUrl + '/formResponse', {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // クロスオリジン制約を回避するため
            })
            .then(() => {
                // `no-cors`モードではレスポンス内容を読み取れないため、
                // 送信成功したと仮定して常に成功メッセージを表示します。
                // 実際の送信失敗はconsole.errorでしか捕捉できません。
                formMessage.style.display = 'block';
                formMessage.textContent = 'お問い合わせありがとうございます。';
                formMessage.classList.add('success-message'); // 成功メッセージ用のクラスを追加
                contactForm.reset(); // フォームをクリア
            })
            .catch((error) => {
                formMessage.style.display = 'block';
                formMessage.textContent = '送信に失敗しました。時間をおいて再度お試しください。';
                formMessage.classList.add('error-message');
                console.error('フォーム送信エラー:', error);
            })
            .finally(() => {
                // 送信ボタンを再度有効化
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = '送信する';
                }
            });
        });
    } else {
        // console.warn('ID "contactForm" または "form-message" を持つ要素が見つかりませんでした。お問い合わせフォームのリスナーは設定されません。');
    }
}

// DOMContentLoaded イベントでフォーム初期化関数を呼び出す
document.addEventListener('DOMContentLoaded', initializeContactForm);
