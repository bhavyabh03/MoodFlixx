// MoodFlixx - Vanilla JS
// Includes data, Binary Search, UI rendering, favorites
// 1. MOODS + ALBUM ART
// ============================================================
const MOODS = [
    { key: "Funny", emoji: "🤠" },
    { key: "Romantic", emoji: "🍷" },
    { key: "Thriller", emoji: "👻" },
    { key: "Action", emoji: "💣" },
    { key: "Sad", emoji: "💔" },
    { key: "Calm", emoji: "🌙" },
    { key: "Energetic", emoji: "⚡" },
    { key: "Dreamy", emoji: "💭" },
    { key: "Party", emoji: "🎉" },
    { key: "Relaxed", emoji: "🧘" },
];
const MOOD_EMOJI = Object.fromEntries(MOODS.map(m => [m.key, m.emoji]));

const ALBUM_ART = {
    Action: "https://images.unsplash.com/photo-1728319198756-00ae86703420?w=400&q=80",
    Energetic: "https://images.unsplash.com/photo-1728319198756-00ae86703420?w=400&q=80",
    Party: "https://images.unsplash.com/photo-1576860270049-e37cd0370424?w=400&q=80",
    Dreamy: "https://images.unsplash.com/photo-1576860270049-e37cd0370424?w=400&q=80",
    Thriller: "https://images.unsplash.com/photo-1689443111070-2c1a1110fe82?w=400&q=80",
    Sad: "https://images.unsplash.com/photo-1689443111070-2c1a1110fe82?w=400&q=80",
    Calm: "https://images.pexels.com/photos/28494632/pexels-photo-28494632.jpeg?auto=compress&cs=tinysrgb&w=400",
    Relaxed: "https://images.pexels.com/photos/28494632/pexels-photo-28494632.jpeg?auto=compress&cs=tinysrgb&w=400",
    Funny: "https://images.pexels.com/photos/30920101/pexels-photo-30920101.jpeg?auto=compress&cs=tinysrgb&w=400",
    Romantic: "https://images.pexels.com/photos/30920101/pexels-photo-30920101.jpeg?auto=compress&cs=tinysrgb&w=400",
};

// ============================================================
// 2. SONG DATASET (50 songs, 5 per mood)
//    Will be SORTED by (mood asc, bpm asc) for binary search.
// ============================================================
const RAW_SONGS = [
    // Funny
  { name:"What Does The Fox Say", artist:"Ylvis", mood:"Funny", bpm:128, youtube:"jofNR_WkoCE" },
{ name:"Gangnam Style", artist:"PSY", mood:"Funny", bpm:132, youtube:"9bZkp7q19f0" },
{ name:"Baby Shark", artist:"Pinkfong", mood:"Funny", bpm:115, youtube:"XqZsoesa55w" },
{ name:"The Gummy Bear Song", artist:"Gummibär", mood:"Funny", bpm:120, youtube:"astISOttCQ0" },
{ name:"Pen-Pineapple-Apple-Pen", artist:"Piko-Taro", mood:"Funny", bpm:120, youtube:"C_t0eICe1nM" },
    // Romantic
    { name:"Perfect", artist:"Ed Sheeran", mood:"Romantic", bpm:95, youtube:"2Vv-BfVoq4g" },
{ name:"All of Me", artist:"John Legend", mood:"Romantic", bpm:63, youtube:"450p7goxZqg" },
{ name:"Until I Found You", artist:"Stephen Sanchez", mood:"Romantic", bpm:102, youtube:"GxLdQ9eX2wo" },
{ name:"Love Me Like You Do", artist:"Ellie Goulding", mood:"Romantic", bpm:95, youtube:"AJtDXIazrMo" },
{ name:"Thinking Out Loud", artist:"Ed Sheeran", mood:"Romantic", bpm:79, youtube:"lp-EO5I60KA" },
    // Thriller
   { name:"Thriller", artist:"Michael Jackson", mood:"Thriller", bpm:118, youtube:"sOnqjkJTMaA" },
{ name:"Somebody's Watching Me", artist:"Rockwell", mood:"Thriller", bpm:124, youtube:"7YvAYIJSSZY" },
{ name:"Disturbia", artist:"Rihanna", mood:"Thriller", bpm:125, youtube:"E1mU6h4Xdxc" },
{ name:"Monster", artist:"Skillet", mood:"Thriller", bpm:135, youtube:"1mjlM_RnsVE" },
{ name:"Bad Guy", artist:"Billie Eilish", mood:"Thriller", bpm:135, youtube:"DyDfgMOUjCI" },
    // Action
{ name:"Believer", artist:"Imagine Dragons", mood:"Action", bpm:125, youtube:"7wtfhZwyrcc" },
{ name:"Thunder", artist:"Imagine Dragons", mood:"Action", bpm:168, youtube:"fKopy74weus" },
{ name:"Centuries", artist:"Fall Out Boy", mood:"Action", bpm:110, youtube:"LBr7kECsjcQ" },
{ name:"Warriors", artist:"Imagine Dragons", mood:"Action", bpm:150, youtube:"fM8vK1m3VnE" },
{ name:"Power", artist:"Kanye West", mood:"Action", bpm:154, youtube:"L53gjP-TtGE" },
    // Sad
{ name:"Someone Like You", artist:"Adele", mood:"Sad", bpm:67, youtube:"hLQl3WQQoQ0" },
{ name:"Let Her Go", artist:"Passenger", mood:"Sad", bpm:75, youtube:"RBumgq5yVrA" },
{ name:"Stay", artist:"Rihanna", mood:"Sad", bpm:112, youtube:"JF8BRvqGCNs" },
{ name:"Fix You", artist:"Coldplay", mood:"Sad", bpm:69, youtube:"k4V3Mo61fJM" },
{ name:"When I Was Your Man", artist:"Bruno Mars", mood:"Sad", bpm:73, youtube:"ekzHIouo8Q4" },
    // Calm
{ name:"Weightless", artist:"Marconi Union", mood:"Calm", bpm:60, youtube:"UfcAVejslrU" },
{ name:"River Flows in You", artist:"Yiruma", mood:"Calm", bpm:95, youtube:"7maJOI3QMu0" },
{ name:"Clair de Lune", artist:"Debussy", mood:"Calm", bpm:65, youtube:"C_vvMYI4j2o" },
{ name:"Sunset Lover", artist:"Petit Biscuit", mood:"Calm", bpm:90, youtube:"4qK1dC2u3so" },
{ name:"Cold Little Heart", artist:"Michael Kiwanuka", mood:"Calm", bpm:80, youtube:"nOubjLM9Cbc" },
    // Energetic
{ name:"Titanium", artist:"David Guetta ft. Sia", mood:"Energetic", bpm:126, youtube:"JRfuAukYTKg" },
{ name:"Can't Hold Us", artist:"Macklemore & Ryan Lewis", mood:"Energetic", bpm:146, youtube:"2zNSgSzhBfM" },
{ name:"Stronger", artist:"Kanye West", mood:"Energetic", bpm:104, youtube:"PsO6ZnUZI0g" },
{ name:"On Top of the World", artist:"Imagine Dragons", mood:"Energetic", bpm:100, youtube:"w5tWYmIOWGk" },
{ name:"Levels", artist:"Avicii", mood:"Energetic", bpm:126, youtube:"_ovdm2yX4MA" },
    // Dreamy
{ name:"Space Song", artist:"Beach House", mood:"Dreamy", bpm:85, youtube:"RBtlPT23PTM" },
{ name:"Sweater Weather", artist:"The Neighbourhood", mood:"Dreamy", bpm:124, youtube:"GCdwKhTtNNw" },
{ name:"Night Changes", artist:"One Direction", mood:"Dreamy", bpm:120, youtube:"syFZfO_wfMQ" },
{ name:"Golden Hour", artist:"JVKE", mood:"Dreamy", bpm:94, youtube:"PEM0Vs8jf1w" },
{ name:"Yellow", artist:"Coldplay", mood:"Dreamy", bpm:88, youtube:"yKNxeF4KMsY" },
    // Party
{ name:"Uptown Funk", artist:"Mark Ronson ft. Bruno Mars", mood:"Party", bpm:115, youtube:"OPf0YbXqDm0" },
{ name:"Shape of You", artist:"Ed Sheeran", mood:"Party", bpm:96, youtube:"JGwWNGJdvx8" },
{ name:"Dance Monkey", artist:"Tones and I", mood:"Party", bpm:98, youtube:"q0hyYWKXF0Q" },
{ name:"Levitating", artist:"Dua Lipa", mood:"Party", bpm:103, youtube:"TUVcZfQe-Kw" },
{ name:"Cheap Thrills", artist:"Sia", mood:"Party", bpm:90, youtube:"nYh-n7EOtMA" },
    // Relaxed
{ name:"Perfect Strangers", artist:"Jonas Blue", mood:"Relaxed", bpm:121, youtube:"iP8r6d8e5oY" },
{ name:"Better Together", artist:"Jack Johnson", mood:"Relaxed", bpm:95, youtube:"u57d4_b_YgI" },
{ name:"I'm Yours", artist:"Jason Mraz", mood:"Relaxed", bpm:75, youtube:"EkHTsc9PU2A" },
{ name:"Riptide", artist:"Vance Joy", mood:"Relaxed", bpm:101, youtube:"uJ_1HMAGb4k" },
{ name:"Banana Pancakes", artist:"Jack Johnson", mood:"Relaxed", bpm:86, youtube:"OkyrIRyrRdY" }
];

// Enrich + sort by (mood, bpm)
const SORTED_SONGS = RAW_SONGS
    .map((s, i) => ({
        id: `song-${String(i).padStart(3, "0")}`,
        ...s,
        art: ALBUM_ART[s.mood] || "",
    }))
    .sort((a, b) => {
        if (a.mood < b.mood) return -1;
        if (a.mood > b.mood) return 1;
        return a.bpm - b.bpm;
    });

// ============================================================
// === BINARY SEARCH ON SORTED DATASET (CORE ALGORITHM) =======
// ============================================================
//
// Precondition: SORTED_SONGS is sorted ascending by (mood, bpm).
// For each target mood we run two binary searches:
//   1) lowerBound -> first index where song.mood >= target
//   2) upperBound -> first index where song.mood >  target
// The slice [lowerBound, upperBound) is the contiguous block of
// songs for that mood, already ordered by BPM.
// Equivalent to C++ std::lower_bound / std::upper_bound.
// Time complexity: O(log n) per mood.
// ============================================================
function lowerBound(arr, targetMood) {
    let lo = 0, hi = arr.length;
    while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        if (arr[mid].mood < targetMood) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
function upperBound(arr, targetMood) {
    let lo = 0, hi = arr.length;
    while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        if (arr[mid].mood <= targetMood) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
function binarySearchByMood(targetMood) {
    const start = lowerBound(SORTED_SONGS, targetMood);
    const end = upperBound(SORTED_SONGS, targetMood);
    return SORTED_SONGS.slice(start, end);
}
// ============================================================
// === END BINARY SEARCH ======================================
// ============================================================

function generatePlaylist(selectedMoods, count) {
    const trace = [];
    let matched = [];
    for (const mood of selectedMoods) {
        const block = binarySearchByMood(mood);
        if (block.length) {
            trace.push(`binarySearch('${mood}') → ${block.length} matches [bpm ${block[0].bpm}–${block[block.length - 1].bpm}]`);
        } else {
            trace.push(`binarySearch('${mood}') → 0 matches`);
        }
        matched = matched.concat(block);
    }
    // Interleave by BPM ascending across moods
    matched.sort((a, b) => a.bpm - b.bpm);

    const total = matched.length;
    let chosen = matched;
    if (count < total) {
        const step = total / count;
        chosen = [];
        for (let i = 0; i < count; i++) chosen.push(matched[Math.floor(i * step)]);
    }
    return { songs: chosen, total, trace };
}

// ============================================================
// 3. FAVORITES (localStorage)
// ============================================================
const FAV_KEY = "moodFlixx.favorites.v1";
function readFavorites() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; }
    catch { return []; }
}
function writeFavorites(list) {
    localStorage.setItem(FAV_KEY, JSON.stringify(list));
}
function isFavorite(id) { return readFavorites().some(s => s.id === id); }
function toggleFavorite(song) {
    const list = readFavorites();
    const i = list.findIndex(s => s.id === song.id);
    if (i >= 0) list.splice(i, 1);
    else list.unshift(song);
    writeFavorites(list);
    return i < 0;  // returns true if just added
}
function removeFavorite(id) {
    writeFavorites(readFavorites().filter(s => s.id !== id));
}
function clearFavorites() { writeFavorites([]); }

// ============================================================
// 4. AUDIO PREVIEW (Web Audio API mock based on BPM + mood)
// ============================================================
let audioCtx = null;
function getAudioCtx() {
    if (!audioCtx) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        audioCtx = new Ctx();
    }
    return audioCtx;
}
const MOOD_FREQ = {
    Action: 220, Energetic: 246, Party: 261, Funny: 277, Romantic: 293,
    Dreamy: 311, Calm: 329, Relaxed: 349, Sad: 196, Thriller: 174,
};
function playPreview(song, duration = 4) {
    const ctx = getAudioCtx();
    if (ctx.state === "suspended") ctx.resume();

    const baseFreq = MOOD_FREQ[song.mood] || 261;
    const beats = Math.max(2, Math.round((song.bpm / 60) * duration));
    const beatDur = duration / beats;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.05);
    master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    master.connect(ctx.destination);

    const oscs = [];
    for (let i = 0; i < beats; i++) {
        const t0 = ctx.currentTime + i * beatDur;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = i % 2 === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(baseFreq + (i % 4) * 50, t0);
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(0.5, t0 + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + beatDur * 0.85);
        osc.connect(g);
        g.connect(master);
        osc.start(t0);
        osc.stop(t0 + beatDur);
        oscs.push(osc);
    }
    return {
        duration,
        stop() {
            try {
                master.gain.cancelScheduledValues(ctx.currentTime);
                master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
                oscs.forEach(o => { try { o.stop(ctx.currentTime + 0.06); } catch (_) { } });
            } catch (_) { }
        },
    };
}

// ============================================================
// 5. STATE + DOM REFS
// ============================================================
const state = {
    selected: [],
    count: 8,
    loading: false,
    playlist: [],
    trace: [],
    currentlyPlaying: null,  // { id, handle }
};

const $ = (sel) => document.querySelector(sel);
const els = {
    moodGrid: $("#moodGrid"),
    clearMoodsBtn: $("#clearMoodsBtn"),
    songCount: $("#songCount"),
    countDisplay: $("#countDisplay"),
    generateBtn: $("#generateBtn"),
    mixingLabel: $("#mixingLabel"),
    mixingSub: $("#mixingSub"),
    resultsHeader: $("#resultsHeader"),
    resultsMeta: $("#resultsMeta"),
    emptyState: $("#emptyState"),
    loadingSkeleton: $("#loadingSkeleton"),
    playlist: $("#playlist"),
    bsTrace: $("#bsTrace"),
    bsTraceList: $("#bsTraceList"),
    toast: $("#toast"),
    particles: $("#particles"),
    pageHome: $("#page-home"),
    pageFav: $("#page-favorites"),
    favList: $("#favoritesList"),
    favEmpty: $("#favoritesEmpty"),
    clearFavBtn: $("#clearFavoritesBtn"),
};

// ============================================================
// 6. RENDERERS
// ============================================================
function renderMoodGrid() {
    els.moodGrid.innerHTML = MOODS.map(m => {
        const active = state.selected.includes(m.key);
        return `
      <button type="button" class="mood-card ${active ? "active" : ""}" data-mood="${m.key}" aria-pressed="${active}">
        ${active ? `<span class="mood-on-tag">ON</span>` : ""}
        <span class="mood-emoji">${m.emoji}</span>
        <span class="mood-label">${m.key}</span>
      </button>`;
    }).join("");
    els.moodGrid.querySelectorAll(".mood-card").forEach(btn => {
        btn.addEventListener("click", () => toggleMood(btn.dataset.mood));
    });
    els.clearMoodsBtn.classList.toggle("hide", state.selected.length === 0);
    updateMixingLabel();
}

function updateMixingLabel() {
    let label = "No moods picked";
    if (state.selected.length === 1) label = `${state.selected[0]} mode`;
    else if (state.selected.length === 2) label = `${state.selected[0]} + ${state.selected[1]}`;
    else if (state.selected.length > 2) label = `${state.selected.length} moods blended`;
    els.mixingLabel.textContent = label;
    els.mixingSub.textContent = `${state.count} song${state.count > 1 ? "s" : ""} requested`;
}

function updateSliderFill() {
    const v = state.count;
    const pct = ((v - 1) / 19) * 100;
    els.songCount.style.setProperty("--fill", pct + "%");
    els.countDisplay.textContent = v;
    updateMixingLabel();
}

function songCardHTML(song, index, options = {}) {
    const fav = isFavorite(song.id);
    const playing = state.currentlyPlaying?.id === song.id;
    const removeBtn = options.removable
        ? `<button class="remove-btn" data-action="remove" data-id="${song.id}">Remove</button>`
        : "";
    return `
    <div class="playlist-card" style="animation-delay:${index * 70}ms" data-card="${song.id}">
      <div class="album-art">
        ${song.art ? `<img src="${song.art}" alt="" loading="lazy" class="${playing ? "spinning" : ""}" />` : ""}
      </div>
      <div class="song-info">
        <div class="song-meta">
          <span>${MOOD_EMOJI[song.mood] || "🎵"} ${song.mood}</span>
          <span style="color:rgba(255,255,255,0.3)">•</span>
          <span class="song-bpm">${song.bpm} BPM</span>
        </div>
        <div class="song-name" title="${song.name}">${song.name}</div>
        <div class="song-artist" title="${song.artist}">${song.artist}</div>
      </div>
      ${playing ? `<div class="eq"><i></i><i></i><i></i><i></i></div>` : ""}
      <div class="song-actions">
        <button class="icon-btn ${playing ? "playing" : ""}" data-action="play" data-id="${song.id}" aria-label="${playing ? "Pause" : "Play"}">
          ${playing
            ? `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>`
            : `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`}
        </button>
        <button class="icon-btn fav-btn ${fav ? "active" : ""}" data-action="fav" data-id="${song.id}" aria-label="Favorite">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="${fav ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
            <path d="M12 21s-7.5-4.6-9.7-9.5C.5 7.4 3 4 6.5 4c2 0 3.6 1 4.6 2.4C12.6 5 14.2 4 16.2 4 19.7 4 22.2 7.4 21.7 11.5 19.5 16.4 12 21 12 21z"/>
          </svg>
        </button>
        ${removeBtn}
      </div>
    </div>`;
}

function renderPlaylist() {
    const showResults = state.playlist.length > 0;
    els.resultsHeader.classList.toggle("hide", !showResults);
    els.emptyState.classList.toggle("hide", showResults || state.loading);
    els.loadingSkeleton.classList.toggle("hide", !state.loading);
    els.bsTrace.classList.toggle("hide", state.trace.length === 0);
    els.resultsMeta.textContent = showResults ? `${state.playlist.length} tracks · binary search complete` : "";

    els.playlist.innerHTML = state.playlist.map((s, i) => songCardHTML(s, i)).join("");
    bindCardActions(els.playlist, false);

    els.bsTraceList.innerHTML = state.trace.map(t => `<li>→ ${t}</li>`).join("");
}

function renderFavorites() {
    const list = readFavorites();
    els.favEmpty.classList.toggle("hide", list.length > 0);
    els.clearFavBtn.classList.toggle("hide", list.length === 0);
    els.favList.innerHTML = list.map((s, i) => songCardHTML(s, i, { removable: true })).join("");
    bindCardActions(els.favList, true);
}

function bindCardActions(container, isFavList) {
    container.querySelectorAll("[data-action]").forEach(btn => {
        btn.addEventListener("click", () => {
            const action = btn.dataset.action;
            const id = btn.dataset.id;
            const song = (isFavList ? readFavorites() : state.playlist).find(s => s.id === id);
            if (!song) return;
            if (action === "play") onPlayClick(song);
            if (action === "fav") onFavClick(song, isFavList);
            if (action === "remove") onRemoveClick(id);
        });
    });
}

// ============================================================
// 7. EVENT HANDLERS
// ============================================================
function toggleMood(key) {
    const i = state.selected.indexOf(key);
    if (i >= 0) state.selected.splice(i, 1);
    else state.selected.push(key);
    renderMoodGrid();
}

function onPlayClick(song) {
    // Stop currently playing
    if (state.currentlyPlaying) {
        state.currentlyPlaying.handle?.stop();
        const wasSame = state.currentlyPlaying.id === song.id;
        state.currentlyPlaying = null;
        if (wasSame) { renderActive(); return; }
    }
    const handle = playPreview(song);
    playYouTube(song.youtube);
    state.currentlyPlaying = { id: song.id, handle };
    renderActive();
    setTimeout(() => {
        if (state.currentlyPlaying?.id === song.id) {
            state.currentlyPlaying = null;
            renderActive();
        }
    }, handle.duration * 1000);
}

function renderActive() {
    // Re-render whichever page is visible
    if (!els.pageHome.classList.contains("hide")) renderPlaylist();
    if (!els.pageFav.classList.contains("hide")) renderFavorites();
}

function onFavClick(song, isFavList) {
    const added = toggleFavorite(song);
    toast(added ? "Added to favorites ❤️" : "Removed from favorites");
    if (isFavList) renderFavorites();
    else renderPlaylist();
}

function onRemoveClick(id) {
    removeFavorite(id);
    toast("Removed");
    renderFavorites();
}

async function generate() {
    if (state.selected.length === 0) {
        toast("Pick at least one mood", "Tap an emoji card above to add it.");
        return;
    }
    state.loading = true;
    state.playlist = [];
    state.trace = [];
    els.generateBtn.disabled = true;
    els.generateBtn.querySelector(".btn-label").innerHTML =
        `<span class="loading-dots"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span> Searching…`;
    renderPlaylist();

    // Brief artificial delay so the loading anim is visible
    await new Promise(r => setTimeout(r, 750));

    const { songs, total, trace } =
  generatePlaylist(state.selected, state.count);

// 🔍 Call visualization
visualizeBinarySearch(
  songs,
  state.selected[0]
);

state.playlist = songs;
    state.trace = trace;
    state.loading = false;
    els.generateBtn.disabled = false;
    els.generateBtn.querySelector(".btn-label").textContent = "Generate Playlist 🎵";
    renderPlaylist();
    toast(`Generated ${songs.length} songs`, `${total} matches via binary search`);
}

// ============================================================
// 8. PAGE ROUTING (hash-based)
// ============================================================
function showPage(name) {
    const isFav = name === "favorites";
    els.pageHome.classList.toggle("hide", isFav);
    els.pageFav.classList.toggle("hide", !isFav);
    document.querySelectorAll(".nav-link").forEach(l => {
        l.classList.toggle("active", l.dataset.page === name);
    });
    if (isFav) renderFavorites();
    window.scrollTo({ top: 0, behavior: "smooth" });
}
function handleRoute() {
    const hash = window.location.hash.replace("#", "") || "home";
    showPage(hash);
}

// ============================================================
// 9. TOAST
// ============================================================
let toastTimer;
function toast(title, sub = "") {
    els.toast.innerHTML = `<div class="toast-title">${title}</div>${sub ? `<div class="toast-sub">${sub}</div>` : ""}`;
    els.toast.classList.remove("hide");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.add("hide"), 3000);
}

// ============================================================
// 10. PARTICLES BACKGROUND
// ============================================================
function spawnParticles(n = 18) {
    const NOTES = ["♪", "♫", "🎶", "♬", "♩"];
    let html = "";
    for (let i = 0; i < n; i++) {
        const left = Math.random() * 100;
        const delay = Math.random() * 14;
        const duration = 14 + Math.random() * 16;
        const size = 14 + Math.random() * 22;
        html += `<span style="left:${left}%; animation-delay:${delay}s; animation-duration:${duration}s; font-size:${size}px;">${NOTES[i % NOTES.length]}</span>`;
    }
    els.particles.innerHTML = html;
}

// ============================================================
// 11. INIT
// ============================================================
function init() {

    spawnParticles();
    createMusicNotes(); // 🎵 ADD THIS LINE
    renderMoodGrid();
    enableTilt();
    updateSliderFill();
    renderPlaylist();
    handleRoute();

    // Slider
    els.songCount.addEventListener("input", e => {
        state.count = parseInt(e.target.value, 10);
        updateSliderFill();
    });
    // Generate
    els.generateBtn.addEventListener("click", generate);
    // Clear moods
    els.clearMoodsBtn.addEventListener("click", () => {
        state.selected = [];
        renderMoodGrid();
    });
    // Clear favorites
    els.clearFavBtn.addEventListener("click", () => {
        clearFavorites();
        toast("Cleared all favorites");
        renderFavorites();
    });
    // Nav links + go-back button
    document.querySelectorAll("[data-page]").forEach(link => {
        link.addEventListener("click", e => {
            const target = link.dataset.page;
            window.location.hash = target;
        });
    });
    window.addEventListener("hashchange", handleRoute);
}

function visualizeBinarySearch(arr, targetMood) {

  const container =
    document.getElementById("visualization-container");

  if (!container) return;

  container.innerHTML = "";

  let left = 0;
  let right = arr.length - 1;

  function step() {

    if (left > right) return;

    let mid =
      Math.floor((left + right) / 2);

    container.innerHTML = "";

    arr.slice(0, 12).forEach((song, index) => {

      let box =
        document.createElement("div");

      box.style.width = "50px";
      box.style.height = "50px";
      box.style.display = "flex";
      box.style.alignItems = "center";
      box.style.justifyContent = "center";
      box.style.borderRadius = "8px";
      box.style.color = "white";

      box.textContent = song.bpm;

      if (index === mid) {
        box.style.background = "orange";
      }
      else if (index < left ||
               index > right) {
        box.style.background = "red";
      }
      else {
        box.style.background = "#a7459e";
      }

      container.appendChild(box);
    });

    if (arr[mid].mood === targetMood) {

      container.children[mid]
        .style.background = "green";

      return;
    }

    if (arr[mid].mood < targetMood) {
      left = mid + 1;
    }
    else {
      right = mid - 1;
    }

    setTimeout(step, 700);
  }

  step();
}
// ✨ Smooth Consistent Sparkle Trail

let lastSparkle = 0;

document.addEventListener("mousemove", (e) => {

  const now = Date.now();

  // Controls spacing between sparkles
  if (now - lastSparkle < 6) return;

  lastSparkle = now;

  const sparkle = document.createElement("div");

  sparkle.classList.add("sparkle");

  sparkle.style.left = e.clientX + "px";
  sparkle.style.top = e.clientY + "px";

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 800);

});
// 🎵 Floating Music Notes Background

function createMusicNotes() {

  const container =
    document.getElementById("music-background");

  const notes = ["🎵", "🎶", "🎼"];

  function spawnNote() {

    const note =
      document.createElement("div");

    note.classList.add("music-note");

// ⭐ Add ONLY this (safe size range)

const size =
    100 + Math.random() * 120;

note.style.width =
    size + "px";

note.style.height =
    size + "px";
/* ⭐ ADD THESE LINES BELOW (line 684) */
    note.textContent =
      notes[Math.floor(Math.random() * notes.length)];

    // Random position
    note.style.left =
      Math.random() * 100 + "vw";

    // Random speed
    const duration =
      6 + Math.random() * 6;

    note.style.animationDuration =
      duration + "s";

    container.appendChild(note);

    setTimeout(() => {
      note.remove();
    }, duration * 1000);

  }

  setInterval(spawnNote, 700);

}
// 🎴 Safe 3D Tilt for Dynamic Mood Cards

function enableTilt() {

    const cards =
        document.querySelectorAll(".mood-card");

    cards.forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                (y - centerY) / 10;

            const rotateY =
                (centerX - x) / 10;

            card.style.transform =
                `rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale(1.05)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "rotateX(0) rotateY(0) scale(1)";

        });

    });

}
document.addEventListener("DOMContentLoaded", init);
// 🌟 Cursor Glow Movement

const cursorRing =
    document.querySelector(".cursor-ring");

document.addEventListener("mousemove", e => {

    if (!cursorRing) return;

    cursorRing.style.left =
        e.clientX - 15 + "px";

    cursorRing.style.top =
        e.clientY - 15 + "px";

});s
function playYouTube(videoId) {

const player = document.getElementById("video-player");

if (!player || !videoId) return;

player.innerHTML = `
<iframe
width="100%"
height="100%"
src="https://www.youtube.com/embed/${videoId}?autoplay=1"
title="YouTube video player"
frameborder="0"
allow="autoplay; encrypted-media"
allowfullscreen>
</iframe>
`;

}