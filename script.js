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
    if (document.querySelector('.page-hero h1') && document.querySelector('.page-hero h1').textContent === 'MUSIC') {
        initializeMusicPage();
    }

    function initializeMusicPage() {
        // 仮の楽曲データ（実際はAPIなどから取得することを推奨）
        const originalSongsData = [
            { id: 1, title: "夜明けのメロディ", artist: "宵闇仁", date: "2025.06.15", likes: 12000, img: "path/to/your/song_original1.jpg", url: "https://www.youtube.com/watch?v=xxxxxxxx" },
            { id: 2, title: "星降る夜に", artist: "宵闇仁", date: "2024.11.20", likes: 8500, img: "path/to/your/song_original2.jpg", url: "https://www.youtube.com/watch?v=yyyyyyyy" },
            { id: 3, title: "君と見た空", artist: "宵闇仁", date: "2024.08.01", likes: 15000, img: "path/to/your/song_original3.jpg", url: "https://www.youtube.com/watch?v=zzzzzzzz" },
            { id: 4, title: "夢の続き", artist: "宵闇仁", date: "2024.03.10", likes: 6000, img: "path/to/your/song_original4.jpg", url: "https://www.youtube.com/watch?v=wwwwwwww" },
            // 必要に応じてさらにオリジナル楽曲を追加
        ];

        const coverSongsData = [
            { id: 101, title: "Lemon (cover)", artist: "米津玄師", date: "2025.05.01", likes: 25000, img: "path/to/your/song_cover1.jpg", url: "https://www.youtube.com/watch?v=11111111" },
            { id: 102, title: "廻廻奇譚 (cover)", artist: "Eve", date: "2025.03.10", likes: 18000, img: "path/to/your/song_cover2.jpg", url: "https://www.youtube.com/watch?v=22222222" },
            { id: 103, title: "アイドル (cover)", artist: "YOASOBI", date: "2024.12.25", likes: 30000, img: "path/to/your/song_cover3.jpg", url: "https://www.youtube.com/watch?v=33333333" },
            { id: 104, title: "残響散歌 (cover)", artist: "Aimer", date: "2024.09.15", likes: 10000, img: "path/to/your/song_cover4.jpg", url: "https://www.youtube.com/watch?v=44444444" },
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

        // 楽曲アイテムを生成する関数 (MUSICページ用)
        function createSongItem(song) {
            const songItem = document.createElement('div');
            songItem.classList.add('song-item');
            songItem.innerHTML = `
                <img src="${song.img}" alt="${song.title}アルバムアート">
                <h4>${song.title}${song.artist && song.artist !== '宵闇仁' ? ' - ' + song.artist : ''}</h4>
                <p>リリース日: ${song.date}</p>
                <p class="likes-count"><i class="fas fa-heart"></i> ${song.likes.toLocaleString()} likes</p>
                <a href="${song.url}" target="_blank" class="button-small">聴く</a>
            `;
            return songItem;
        }

        // 楽曲を表示する関数 (MUSICページ用)
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

        // フィルタリングとソートを実行する関数 (MUSICページ用)
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
        let currentOriginalSort = originalSortSelect ? originalSortSelect.value : 'default';
        let currentOriginalSearch = originalSearchInput ? originalSearchInput.value : '';

        if (originalSortSelect && originalSearchInput) {
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
        }


        // 歌ってみた
        let currentCoverSort = coverSortSelect ? coverSortSelect.value : 'default';
        let currentCoverSearch = coverSearchInput ? coverSearchInput.value : '';

        if (coverSortSelect && coverSearchInput) {
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
        }

        // 初期表示 (Musicページ)
        if (originalSongGrid && noOriginalSongsMessage) { // 要素が存在するか確認
            const initialOriginalSongs = filterAndSortSongs(originalSongsData, currentOriginalSort, currentOriginalSearch);
            displaySongs(initialOriginalSongs, originalSongGrid, noOriginalSongsMessage);
        }

        if (coverSongGrid && noCoverSongsMessage) { // 要素が存在するか確認
            const initialCoverSongs = filterAndSortSongs(coverSongsData, currentCoverSort, currentCoverSearch);
            displaySongs(initialCoverSongs, coverSongGrid, noCoverSongsMessage);
        }
    }


    // === GAMEページ専用のロジック ===
    if (document.querySelector('.page-hero h1') && document.querySelector('.page-hero h1').textContent === 'GAME') {
        initializeGamePage();
    }

    function initializeGamePage() {
        // 仮の動画データ（実際はAPIなどから取得することを推奨）
        const seriesVideosData = [
            { id: 201, title: "ホラーゲーム「怨霊の館」実況プレイ #1", series: "怨霊の館", date: "2025.06.20", thumbnail: "path/to/your/game_series1.jpg", url: "https://www.youtube.com/watch?v=game_series_1" },
            { id: 202, title: "ホラーゲーム「怨霊の館」実況プレイ #2", series: "怨霊の館", date: "2025.06.25", thumbnail: "path/to/your/game_series1_2.jpg", url: "https://www.youtube.com/watch?v=game_series_2" },
            { id: 203, title: "アクションRPG「伝説の剣士」 Part.1", series: "伝説の剣士", date: "2025.05.10", thumbnail: "path/to/your/game_series2.jpg", url: "https://www.youtube.com/watch?v=game_series_3" },
            { id: 204, title: "アクションRPG「伝説の剣士」 Part.2", series: "伝説の剣士", date: "2025.05.15", thumbnail: "path/to/your/game_series2_2.jpg", url: "https://www.youtube.com/watch?v=game_series_4" },
            { id: 205, title: "RPG「古の物語」実況 #1", series: "古の物語", date: "2025.04.01", thumbnail: "path/to/your/game_series3.jpg", url: "https://www.youtube.com/watch?v=game_series_5" },
            // 必要に応じてさらにシリーズ実況動画を追加
        ];

        const projectVideosData = [
            { id: 301, title: "【罰ゲーム】激辛ペヤング完食チャレンジ！", date: "2025.06.01", thumbnail: "path/to/your/game_project1.jpg", url: "https://www.youtube.com/watch?v=game_project_1" },
            { id: 302, title: "視聴者参加型！みんなでマインクラフト街づくり", date: "2025.04.15", thumbnail: "path/to/your/game_project2.jpg", url: "https://www.youtube.com/watch?v=game_project_2" },
            { id: 303, title: "【検証】APEXでまさかの奇跡が起きた件", date: "2025.03.20", thumbnail: "path/to/your/game_project3.jpg", url: "https://www.youtube.com/watch?v=game_project_3" },
            // 必要に応じてさらに企画動画を追加
        ];

        // 各要素の参照を取得
        const seriesVideoGrid = document.getElementById('series-video-grid');
        const seriesSortSelect = document.getElementById('series-sort-order');
        const seriesSearchInput = document.getElementById('series-search-input');
        const noSeriesVideosMessage = document.getElementById('no-series-videos-message');

        const projectVideoGrid = document.getElementById('project-video-grid');
        const projectSortSelect = document.getElementById('project-sort-order');
        const projectSearchInput = document.getElementById('project-search-input');
        const noProjectVideosMessage = document.getElementById('no-project-videos-message');

        // 動画アイテムを生成する関数
        function createVideoItem(video) {
            const videoItem = document.createElement('div');
            videoItem.classList.add('video-item');
            videoItem.innerHTML = `
                <a href="${video.url}" target="_blank">
                    <img src="${video.thumbnail}" alt="${video.title} サムネイル" class="video-thumbnail">
                </a>
                <div class="video-info">
                    <h4>${video.title}</h4>
                    <p class="video-date">投稿日: ${video.date}</p>
                    <a href="${video.url}" target="_blank" class="button-watch">動画を見る</a>
                </div>
            `;
            return videoItem;
        }

        // 動画を表示する関数
        function displayVideos(videos, targetGrid, noVideosMessage) {
            targetGrid.innerHTML = ''; // 既存のアイテムをクリア
            if (videos.length === 0) {
                noVideosMessage.style.display = 'block';
            } else {
                noVideosMessage.style.display = 'none';
                videos.forEach(video => {
                    targetGrid.appendChild(createVideoItem(video));
                });
            }
        }

        // フィルタリングとソートを実行する関数 (GAMEページ用)
        function filterAndSortVideos(videosData, sortOrder, searchText) {
            let filteredVideos = videosData.filter(video =>
                video.title.toLowerCase().includes(searchText.toLowerCase()) ||
                (video.series && video.series.toLowerCase().includes(searchText.toLowerCase())) // シリーズ名でも検索
            );

            if (sortOrder === 'default') { // 最新順（日付の新しい順）
                filteredVideos.sort((a, b) => new Date(b.date) - new Date(a.date));
            }
            return filteredVideos;
        }

        // イベントリスナーの設定
        // シリーズ別実況
        let currentSeriesSort = seriesSortSelect ? seriesSortSelect.value : 'default';
        let currentSeriesSearch = seriesSearchInput ? seriesSearchInput.value : '';

        if (seriesSortSelect && seriesSearchInput) {
            seriesSortSelect.addEventListener('change', () => {
                currentSeriesSort = seriesSortSelect.value;
                const filteredAndSorted = filterAndSortVideos(seriesVideosData, currentSeriesSort, currentSeriesSearch);
                displayVideos(filteredAndSorted, seriesVideoGrid, noSeriesVideosMessage);
            });

            seriesSearchInput.addEventListener('input', () => {
                currentSeriesSearch = seriesSearchInput.value;
                const filteredAndSorted = filterAndSortVideos(seriesVideosData, currentSeriesSort, currentSeriesSearch);
                displayVideos(filteredAndSorted, seriesVideoGrid, noSeriesVideosMessage);
            });
        }

        // 企画動画
        let currentProjectSort = projectSortSelect ? projectSortSelect.value : 'default';
        let currentProjectSearch = projectSearchInput ? projectSearchInput.value : '';

        if (projectSortSelect && projectSearchInput) {
            projectSortSelect.addEventListener('change', () => {
                currentProjectSort = projectSortSelect.value;
                const filteredAndSorted = filterAndSortVideos(projectVideosData, currentProjectSort, currentProjectSearch);
                displayVideos(filteredAndSorted, projectVideoGrid, noProjectVideosMessage);
            });

            projectSearchInput.addEventListener('input', () => {
                currentProjectSearch = projectSearchInput.value;
                const filteredAndSorted = filterAndSortVideos(projectVideosData, currentProjectSort, currentProjectSearch);
                displayVideos(filteredAndSorted, projectVideoGrid, noProjectVideosMessage);
            });
        }


        // 初期表示 (Gameページ)
        if (seriesVideoGrid && noSeriesVideosMessage) {
            const initialSeriesVideos = filterAndSortVideos(seriesVideosData, currentSeriesSort, currentSeriesSearch);
            displayVideos(initialSeriesVideos, seriesVideoGrid, noSeriesVideosMessage);
        }

        if (projectVideoGrid && noProjectVideosMessage) {
            const initialProjectVideos = filterAndSortVideos(projectVideosData, currentProjectSort, currentProjectSearch);
            displayVideos(initialProjectVideos, projectVideoGrid, noProjectVideosMessage);
        }
    }
});
