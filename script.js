// script.js

document.addEventListener('DOMContentLoaded', function() {
    // === ハンバーガーメニューのトグル ===
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // === スクロールアニメーション ===
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        observer.observe(el);
    });

    // === HOMEページのヒーローセクションのスライドショー (HOMEページのみで動作) ===
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

        setInterval(nextSlide, 5000);
        showSlide(currentSlide);
    }

    // === MUSICページ専用のロジック ===
    if (document.body.classList.contains('music-page')) { // MUSICページにのみ適用するようbodyにクラスを追加しても良い
        initializeMusicPage();
    } else if (document.querySelector('.page-hero h1') && document.querySelector('.page-hero h1').textContent === 'MUSIC') {
        // bodyにクラスをつけない場合、ページのタイトルで判定
        initializeMusicPage();
    }

    function initializeMusicPage() {
        // 仮の楽曲データ（実際はAPIなどから取得することを推奨）
        const originalSongsData = [
            { id: 1, title: "夜明けのメロディ", artist: "宵闇仁", date: "2025.06.15", likes: 12000, img: "path/to/your/song_original1.jpg", url: "#" },
            { id: 2, title: "星降る夜に", artist: "宵闇仁", date: "2024.11.20", likes: 8500, img: "path/to/your/song_original2.jpg", url: "#" },
            { id: 3, title: "君と見た空", artist: "宵闇仁", date: "2024.08.01", likes: 15000, img: "path/to/your/song_original3.jpg", url: "#" },
            { id: 4, title: "夢の続き", artist: "宵闇仁", date: "2024.03.10", likes: 6000, img: "path/to/your/song_original4.jpg", url: "#" },
            // 必要に応じてさらにオリジナル楽曲を追加
        ];

        const coverSongsData = [
            { id: 101, title: "Lemon (cover)", artist: "米津玄師", date: "2025.05.01", likes: 25000, img: "path/to/your/song_cover1.jpg", url: "#" },
            { id: 102, title: "廻廻奇譚 (cover)", artist: "Eve", date: "2025.03.10", likes: 18000, img: "path/to/your/song_cover2.jpg", url: "#" },
            { id: 103, title: "アイドル (cover)", artist: "YOASOBI", date: "2024.12.25", likes: 30000, img: "path/to/your/song_cover3.jpg", url: "#" },
            { id: 104, title: "残響散歌 (cover)", artist: "Aimer", date: "2024.09.15", likes: 10000, img: "path/to/your/song_cover4.jpg", url: "#" },
            // 必要に応じてさらに歌ってみた楽曲を追加
        ];

        // 各要素の参照を取得
        const originalSongGrid = document.getElementById('original-song-grid');
        const originalSortSelect = document.getElementById('original-sort-order');
        const originalSearchInput = document.getElementById('original-search-input');
        const noOriginalSongsMessage = document.getElementById('no-original-songs-message');

        const coverSongGrid = document.getElementById('cover-song-grid');
        const coverSortSelect = document.getElementById('cover-sort-order');
        const coverSearchInput = document.getElementById('cover-search-input');
        const noCoverSongsMessage = document.getElementById('no-cover-songs-message');

        // 楽曲アイテムを生成する関数
        function createSongItem(song) {
            const songItem = document.createElement('div');
            songItem.classList.add('song-item');
            songItem.innerHTML = `
                <img src="${song.img}" alt="${song.title}アルバムアート">
                <h4>${song.title} ${song.artist ? ' - ' + song.artist : ''}</h4>
                <p>リリース日: ${song.date}</p>
                <p class="likes-count"><i class="fas fa-heart"></i> ${song.likes.toLocaleString()} likes</p>
                <a href="${song.url}" target="_blank" class="button-small">聴く</a>
            `;
            return songItem;
        }

        // 楽曲を表示する関数
        function displaySongs(songs, targetGrid, noSongsMessage) {
            targetGrid.innerHTML = ''; // 既存のアイテムをクリア
            if (songs.length === 0) {
                noSongsMessage.style.display = 'block';
            } else {
                noSongsMessage.style.display = 'none';
                songs.forEach(song => {
                    targetGrid.appendChild(createSongItem(song));
                });
            }
        }

        // フィルタリングとソートを実行する関数
        function filterAndSortSongs(songsData, sortOrder, searchText) {
            let filteredSongs = songsData.filter(song =>
                song.title.toLowerCase().includes(searchText.toLowerCase()) ||
                (song.artist && song.artist.toLowerCase().includes(searchText.toLowerCase()))
            );

            if (sortOrder === 'likes_desc') {
                filteredSongs.sort((a, b) => b.likes - a.likes);
            } else { // default (日付順、またはID順など)
                filteredSongs.sort((a, b) => new Date(b.date) - new Date(a.date)); // 新しい順
            }
            return filteredSongs;
        }

        // イベントリスナーの設定
        // オリジナル楽曲
        let currentOriginalSort = originalSortSelect.value;
        let currentOriginalSearch = originalSearchInput.value;

        originalSortSelect.addEventListener('change', () => {
            currentOriginalSort = originalSortSelect.value;
            const filteredAndSorted = filterAndSortSongs(originalSongsData, currentOriginalSort, currentOriginalSearch);
            displaySongs(filteredAndSorted, originalSongGrid, noOriginalSongsMessage);
        });

        originalSearchInput.addEventListener('input', () => {
            currentOriginalSearch = originalSearchInput.value;
            const filteredAndSorted = filterAndSortSongs(originalSongsData, currentOriginalSort, currentOriginalSearch);
            displaySongs(filteredAndSorted, originalSongGrid, noOriginalSongsMessage);
        });

        // 歌ってみた
        let currentCoverSort = coverSortSelect.value;
        let currentCoverSearch = coverSearchInput.value;

        coverSortSelect.addEventListener('change', () => {
            currentCoverSort = coverSortSelect.value;
            const filteredAndSorted = filterAndSortSongs(coverSongsData, currentCoverSort, currentCoverSearch);
            displaySongs(filteredAndSorted, coverSongGrid, noCoverSongsMessage);
        });

        coverSearchInput.addEventListener('input', () => {
            currentCoverSearch = coverSearchInput.value;
            const filteredAndSorted = filterAndSortSongs(coverSongsData, currentCoverSort, currentCoverSearch);
            displaySongs(filteredAndSorted, coverSongGrid, noCoverSongsMessage);
        });

        // 初期表示
        const initialOriginalSongs = filterAndSortSongs(originalSongsData, currentOriginalSort, currentOriginalSearch);
        displaySongs(initialOriginalSongs, originalSongGrid, noOriginalSongsMessage);

        const initialCoverSongs = filterAndSortSongs(coverSongsData, currentCoverSort, currentCoverSearch);
        displaySongs(initialCoverSongs, coverSongGrid, noCoverSongsMessage);
    }
});
