// RUTA RELATIVA: Esto funcionará si la carpeta 'biblia/libro/' se encuentra en la raíz
// de tu servidor o estructura de archivos, donde el navegador pueda acceder a ella.
//const BASE_URL = 'https://dbaezh78.github.io/biblia/libro/';
const BASE_URL = '/biblia/libro/';

// --- CONSTANTES PARA EL ALMACENAMIENTO LOCAL ---
const LAST_INDEX_KEY = 'bibleLastTrackIndex';
const LAST_TIME_KEY = 'bibleLastTrackTime';
const COMPLETED_TRACKS_KEY = 'bibleCompletedTracks'; // Nueva clave para capítulos completados

// Estructura de datos completa 
const library = [
    // --- PENTATEUCO ---
    { name: "Génesis", folder: "genesis", chapters: 50 },
    { name: "Éxodo", folder: "exodo", chapters: 40 },
    { name: "Levítico", folder: "levitico", chapters: 27 },
    { name: "Números", folder: "numeros", chapters: 36 },
    { name: "Deuteronomio", folder: "deuteronomio", chapters: 34 },
    
    // --- HISTÓRICOS ---
    { name: "Josué", folder: "josue", chapters: 24 },
    { name: "Jueces", folder: "jueces", chapters: 21 },
    { name: "Rut", folder: "rut", chapters: 4 },
    { name: "I Samuel", folder: "1samuel", chapters: 31 },
    { name: "II Samuel", folder: "2samuel", chapters: 24 },
    { name: "I Reyes", folder: "1reyes", chapters: 22 },
    { name: "II Reyes", folder: "2reyes", chapters: 25 },
    { name: "I Crónicas", folder: "1cronicas", chapters: 29 },
    { name: "II Crónicas", folder: "2cronicas", chapters: 36 },
    { name: "Esdras", folder: "esdras", chapters: 10 },
    { name: "Nehemías", folder: "nehemias", chapters: 13 },
    { name: "Tobías", folder: "tobias", chapters: 14 },
    { name: "Judit", folder: "judit", chapters: 16 },
    { name: "Ester", folder: "ester", chapters: 10 },
    { name: "I Macabeos", folder: "1macabeos", chapters: 16 },
    { name: "II Macabeos", folder: "2macabeos", chapters: 15 },

    // --- SAPIENCIALES ---
    { name: "Job", folder: "job", chapters: 42 },
    { name: "Salmos", folder: "salmos", chapters: 150 },
    { name: "Proverbios", folder: "proverbios", chapters: 31 },
    { name: "Eclesiastés", folder: "eclesiastes", chapters: 12 },
    { name: "Cantar de Cantares", folder: "cantardecantares", chapters: 8 },
    { name: "Sabiduría", folder: "sabiduria", chapters: 19 },
    { name: "Eclesiástico", folder: "eclesiastico", chapters: 51 },

    // --- PROFETAS MAYORES ---
    { name: "Isaías", folder: "isaias", chapters: 66 },
    { name: "Jeremías", folder: "jeremias", chapters: 52 },
    { name: "Lamentaciones", folder: "lamentaciones", chapters: 5 },
    { name: "Baruc", folder: "baruc", chapters: 6 },
    { name: "Ezequiel", folder: "ezequiel", chapters: 48 },
    { name: "Daniel", folder: "daniel", chapters: 14 },

    // --- PROFETAS MENORES ---
    { name: "Oseas", folder: "oseas", chapters: 14 },
    { name: "Joel", folder: "joel", chapters: 4 },
    { name: "Amós", folder: "amos", chapters: 9 },
    { name: "Abdías", folder: "abdias", chapters: 1 },
    { name: "Jonás", folder: "jonas", chapters: 4 },
    { name: "Miqueas", folder: "miqueas", chapters: 7 },
    { name: "Nahún", folder: "nahun", chapters: 3 },
    { name: "Habacuc", folder: "habacuc", chapters: 3 },
    { name: "Sofonías", folder: "sofonias", chapters: 3 },
    { name: "Ageo", folder: "ageo", chapters: 2 },
    { name: "Zacarías", folder: "zacarias", chapters: 14 },
    { name: "Malaquías", folder: "malaquias", chapters: 3 },

    // --- NUEVO TESTAMENTO ---
    { name: "Mateo", folder: "mateo", chapters: 28 },
    { name: "Marcos", folder: "marcos", chapters: 16 },
    { name: "Lucas", folder: "lucas", chapters: 24 },
    { name: "Juan", folder: "juan", chapters: 21 },
    { name: "Hechos", folder: "hechos", chapters: 28 },
    { name: "Romanos", folder: "romanos", chapters: 16 },
    { name: "I Corintios", folder: "1corintios", chapters: 16 },
    { name: "II Corintios", folder: "2corintios", chapters: 13 },
    { name: "Gálatas", folder: "galatas", chapters: 6 },
    { name: "Efesios", folder: "efesios", chapters: 6 },
    { name: "Filipenses", folder: "filipenses", chapters: 4 },
    { name: "Colosenses", folder: "colosenses", chapters: 4 },
    { name: "I Tesalonicenses", folder: "1tesalonicenses", chapters: 5 },
    { name: "II Tesalonicenses", folder: "2tesalonicenses", chapters: 3 },
    { name: "I Timoteo", folder: "1timoteo", chapters: 6 },
    { name: "II Timoteo", folder: "2timoteo", chapters: 4 },
    { name: "Tito", folder: "tito", chapters: 3 },
    { name: "Filemón", folder: "filemon", chapters: 1 },
    { name: "Hebreos", folder: "hebreos", chapters: 13 },
    { name: "Santiago", folder: "santiago", chapters: 5 },
    { name: "I Pedro", folder: "1pedro", chapters: 5 },
    { name: "II Pedro", folder: "2pedro", chapters: 3 },
    { name: "I Juan", folder: "1juan", chapters: 5 },
    { name: "II Juan", folder: "2juan", chapters: 1 },
    { name: "III Juan", folder: "3juan", chapters: 1 },
    { name: "Judas", folder: "judas", chapters: 1 },
    { name: "Apocalipsis", folder: "apocalipsis", chapters: 22 },
];

const audioPlayer = document.getElementById('audio-player');
const playlistContainer = document.getElementById('playlist');
const currentTrackInfo = document.getElementById('current-track-info');

let currentTrackIndex = 0;
let currentChapterList = []; 

// ----------------------------------------------------
// --- FUNCIONES DE PERSISTENCIA ---
// ----------------------------------------------------

/**
 * Obtiene la lista de índices de capítulos completados del localStorage.
 * @returns {Set<number>} Un Set con los índices completados.
 */
function getCompletedTracks() {
    const data = localStorage.getItem(COMPLETED_TRACKS_KEY);
    return data ? new Set(JSON.parse(data)) : new Set();
}

/**
 * Marca un capítulo como completado en el localStorage y actualiza el DOM.
 * @param {number} index - El índice plano del capítulo.
 */
function markTrackAsCompleted(index) {
    const completedTracks = getCompletedTracks();
    completedTracks.add(index);
    localStorage.setItem(COMPLETED_TRACKS_KEY, JSON.stringify(Array.from(completedTracks)));
    
    // Actualizar el DOM inmediatamente para mostrar el checkmark
    const completedItem = document.querySelector(`.chapter-item[data-index="${index}"]`);
    if (completedItem) {
        completedItem.classList.add('completed');
    }
}

function savePlaybackPosition() {
    if (audioPlayer.src && (audioPlayer.currentTime > 1 || audioPlayer.paused)) {
        localStorage.setItem(LAST_INDEX_KEY, currentTrackIndex);
        localStorage.setItem(LAST_TIME_KEY, audioPlayer.currentTime);
    }
}

function loadPlaybackPosition() {
    const savedIndex = localStorage.getItem(LAST_INDEX_KEY);
    const savedTime = localStorage.getItem(LAST_TIME_KEY);

    if (savedIndex !== null && savedTime !== null && currentChapterList.length > 0) {
        const index = parseInt(savedIndex);
        const time = parseFloat(savedTime);
        
        if (time > 0 && index >= 0 && index < currentChapterList.length) {
            const track = currentChapterList[index];
            updateDisplay(`Continuar: ${track.title} (desde ${formatTime(time)})`);
            
            playTrack(index, time);

            highlightCurrentTrack();
        } else if (index >= 0 && index < currentChapterList.length) {
            updateDisplay(`Último capítulo: ${currentChapterList[index].title}`);
            currentTrackIndex = index;
            highlightCurrentTrack();
        }
    } else {
        updateDisplay("Selecciona un capítulo para comenzar.");
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// ---------------------------------------------
// --- FUNCIONES CENTRALES DEL REPRODUCTOR ---
// ---------------------------------------------

function playTrack(index, startTime = 0) {
    if (index >= 0 && index < currentChapterList.length) {
        currentTrackIndex = index;
        const track = currentChapterList[currentTrackIndex];
        
        audioPlayer.src = track.url;
        audioPlayer.currentTime = startTime;

        audioPlayer.play().catch(error => {
             console.error("Error al intentar reproducir automáticamente:", error);
             updateDisplay(`PAUSADO: ${track.title} (Listo para reanudar)`);
        });

        updateDisplay(track.title); 
        highlightCurrentTrack();
    } else if (index >= currentChapterList.length) {
        // Fin de la lista
        updateDisplay("Fin de la lista.");
        audioPlayer.pause();
        audioPlayer.src = ""; 
        currentTrackIndex = -1; 
        highlightCurrentTrack(); 
        localStorage.removeItem(LAST_INDEX_KEY);
        localStorage.removeItem(LAST_TIME_KEY);
    }
}

function updateDisplay(title) {
    currentTrackInfo.textContent = title;
}


function initializePlaylist() {
    const completedTracks = getCompletedTracks(); // Cargar el estado de completado
    
    // 1. Crear la lista plana de todos los audios en orden
    library.forEach(book => {
        for (let i = 1; i <= book.chapters; i++) {
            const chapterNumber = i < 10 ? `c0${i}` : `c${i}`;
            const url = `${BASE_URL}${book.folder}/${chapterNumber}.mp3`;
            currentChapterList.push({
                title: `${book.name} - Capítulo ${i}`,
                url: url
            });
        }
    });

    // 2. Generar el HTML de la playlist
    library.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book-container';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'book-title';
        titleDiv.setAttribute('aria-expanded', 'false');
        titleDiv.innerHTML = `${book.name} <span class="toggle-icon">▶</span>`;
        titleDiv.onclick = () => toggleChapterList(titleDiv, chapterListDiv);
        bookDiv.appendChild(titleDiv);

        const chapterListDiv = document.createElement('div');
        chapterListDiv.className = 'chapter-list';

        for (let i = 1; i <= book.chapters; i++) {
            const chapterItem = document.createElement('div');
            chapterItem.className = 'chapter-item';
            chapterItem.textContent = `Capítulo ${i}`;

            const flatIndex = currentChapterList.findIndex(track => 
                track.title === `${book.name} - Capítulo ${i}`
            );
            
            if (flatIndex !== -1) {
                chapterItem.setAttribute('data-index', flatIndex);
                
                // Aplicar la clase 'completed' si ya fue terminado
                if (completedTracks.has(flatIndex)) {
                    chapterItem.classList.add('completed');
                }
                
                // Al hacer clic, reproducir desde el inicio (tiempo 0)
                chapterItem.onclick = (event) => playTrack(parseInt(event.target.getAttribute('data-index')), 0); 
            }
            
            chapterListDiv.appendChild(chapterItem);
        }

        bookDiv.appendChild(chapterListDiv);
        playlistContainer.appendChild(bookDiv);
    });
}

function highlightCurrentTrack() {
    // 1. Quitar el resaltado de reproducción de todos
    document.querySelectorAll('.chapter-item').forEach(item => {
        item.classList.remove('playing');
    });

    // 2. Resaltar el actual si es válido
    const currentItem = document.querySelector(`.chapter-item[data-index="${currentTrackIndex}"]`);
    if (currentItem) {
        currentItem.classList.add('playing');
        
        // Asegurarse de que el libro actual esté abierto
        const chapterListDiv = currentItem.closest('.chapter-list');
        const titleDiv = chapterListDiv.previousElementSibling;

        if (!chapterListDiv.classList.contains('active')) {
             toggleChapterList(titleDiv, chapterListDiv);
        }
    }
}

function toggleChapterList(titleDiv, chapterListDiv) {
    const isExpanded = titleDiv.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
        chapterListDiv.classList.remove('active');
        titleDiv.setAttribute('aria-expanded', 'false');
    } else {
        chapterListDiv.classList.add('active');
        titleDiv.setAttribute('aria-expanded', 'true');
    }
}

// ----------------------------------
// --- INICIALIZACIÓN Y LISTENERS ---
// ----------------------------------

// 1. Iniciar la lista de capítulos
initializePlaylist();

// 2. Intentar cargar la última posición guardada al iniciar la página
loadPlaybackPosition(); 

// 3. Añadir listeners para guardar la posición
audioPlayer.addEventListener('pause', savePlaybackPosition); 
window.addEventListener('beforeunload', savePlaybackPosition); 

// Lógica de Reproducción Secuencial: Al terminar, avanza al siguiente
audioPlayer.addEventListener('ended', () => {
    // 1. Marcar el capítulo actual como completado
    if (currentTrackIndex !== -1) {
        markTrackAsCompleted(currentTrackIndex);
    }
    
    // 2. Limpiar el tiempo guardado y avanzar
    localStorage.removeItem(LAST_TIME_KEY);
    playTrack(currentTrackIndex + 1);
});