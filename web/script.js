//const BASE_URL = 'https://dbaezh78.github.io/biblia/libro/';
const BASE_URL = '/biblia/libro/';

// Estructura de datos: Aquí defines los libros y la cantidad de capítulos
// NOTA: Para este ejemplo, DEBES saber el número de capítulos de antemano.
// Si no lo sabes, necesitarías un servicio backend para listar los archivos.
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
    { name: "Tobías", folder: "tobias", chapters: 14 }, // Deuterocanónico
    { name: "Judit", folder: "judit", chapters: 16 }, // Deuterocanónico
    { name: "Ester", folder: "ester", chapters: 10 }, // 10 en el canon católico
    { name: "I Macabeos", folder: "1macabeos", chapters: 16 }, // Deuterocanónico
    { name: "II Macabeos", folder: "2macabeos", chapters: 15 }, // Deuterocanónico

    // --- SAPIENCIALES ---
    { name: "Job", folder: "job", chapters: 42 },
    { name: "Salmos", folder: "salmos", chapters: 150 },
    { name: "Proverbios", folder: "proverbios", chapters: 31 },
    { name: "Eclesiastés", folder: "eclesiastes", chapters: 12 },
    { name: "Cantar de Cantares", folder: "cantardecantares", chapters: 8 },
    { name: "Sabiduría", folder: "sabiduria", chapters: 19 }, // Deuterocanónico
    { name: "Eclesiástico", folder: "eclesiastico", chapters: 51 }, // Sirácida/Eclesiástico (Deuterocanónico)

    // --- PROFETAS MAYORES ---
    { name: "Isaías", folder: "isaias", chapters: 66 },
    { name: "Jeremías", folder: "jeremias", chapters: 52 },
    { name: "Lamentaciones", folder: "lamentaciones", chapters: 5 },
    { name: "Baruc", folder: "baruc", chapters: 6 }, // Deuterocanónico
    { name: "Ezequiel", folder: "ezequiel", chapters: 48 },
    { name: "Daniel", folder: "daniel", chapters: 14 }, // 14 en el canon católico

    // --- PROFETAS MENORES ---
    { name: "Oseas", folder: "oseas", chapters: 14 },
    { name: "Joel", folder: "joel", chapters: 4 }, // 4 capítulos si se sigue la división de la Vulgata.
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

    // --- EVANGELIOS ---
    { name: "Mateo", folder: "mateo", chapters: 28 },
    { name: "Marcos", folder: "marcos", chapters: 16 },
    { name: "Lucas", folder: "lucas", chapters: 24 },
    { name: "Juan", folder: "juan", chapters: 21 },
    
    // --- HECHOS ---
    { name: "Hechos", folder: "hechos", chapters: 28 },

    // --- CARTAS DE PABLO ---
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

    // --- CARTAS GENERALES ---
    { name: "Santiago", folder: "santiago", chapters: 5 },
    { name: "I Pedro", folder: "1pedro", chapters: 5 },
    { name: "II Pedro", folder: "2pedro", chapters: 3 },
    { name: "I Juan", folder: "1juan", chapters: 5 },
    { name: "II Juan", folder: "2juan", chapters: 1 },
    { name: "III Juan", folder: "3juan", chapters: 1 },
    { name: "Judas", folder: "judas", chapters: 1 },

    // --- APOCALIPSIS ---
    { name: "Apocalipsis", folder: "apocalipsis", chapters: 22 },
    
];

const audioPlayer = document.getElementById('audio-player');
const playlistContainer = document.getElementById('playlist');
const currentTrackInfo = document.getElementById('current-track-info');

let currentTrackIndex = 0;
let currentChapterList = []; // Lista plana de URIs de los capítulos en orden

/**
 * 1. Inicializa la lista aplanada de capítulos (currentChapterList).
 * 2. Genera el HTML de la playlist colapsable.
 */
function initializePlaylist() {
    // 1. Crear la lista plana de todos los audios en orden
    library.forEach(book => {
        for (let i = 1; i <= book.chapters; i++) {
            // Formato de capítulo: c01, c02, ..., c10, ...
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

            // Encontrar el índice en la lista plana (currentChapterList)
            // Esto es crucial para la reproducción secuencial
            const flatIndex = currentChapterList.findIndex(track => 
                track.title === `${book.name} - Capítulo ${i}`
            );
            
            if (flatIndex !== -1) {
                chapterItem.setAttribute('data-index', flatIndex);
                chapterItem.onclick = (event) => playTrack(parseInt(event.target.getAttribute('data-index')));
            }
            
            chapterListDiv.appendChild(chapterItem);
        }

        bookDiv.appendChild(chapterListDiv);
        playlistContainer.appendChild(bookDiv);
    });
}

/**
 * Función para reproducir una pista por su índice en la lista plana.
 * @param {number} index - El índice del capítulo en currentChapterList.
 */
function playTrack(index) {
    if (index >= 0 && index < currentChapterList.length) {
        currentTrackIndex = index;
        const track = currentChapterList[currentTrackIndex];
        
        audioPlayer.src = track.url;
        audioPlayer.play();
        updateDisplay(track.title);
        highlightCurrentTrack();
    } else if (index >= currentChapterList.length) {
        // Fin de la lista
        updateDisplay("Fin de la lista. Vuelve a empezar o selecciona otro capítulo.");
        audioPlayer.pause();
        audioPlayer.src = ""; // Detener la reproducción
        currentTrackIndex = -1; // Marcar como detenido
        highlightCurrentTrack(); // Desmarcar todos
    }
}

/**
 * Actualiza la información de la pista actual en el reproductor.
 * @param {string} title - El título de la pista.
 */
function updateDisplay(title) {
    currentTrackInfo.textContent = title;
}

/**
 * Resalta el capítulo que se está reproduciendo actualmente en la playlist.
 */
function highlightCurrentTrack() {
    // 1. Quitar el resaltado de todos
    document.querySelectorAll('.chapter-item').forEach(item => {
        item.classList.remove('playing');
    });

    // 2. Resaltar el actual si es válido
    const currentItem = document.querySelector(`.chapter-item[data-index="${currentTrackIndex}"]`);
    if (currentItem) {
        currentItem.classList.add('playing');
        
        // Opcional: Asegurarse de que el libro actual esté abierto
        const chapterListDiv = currentItem.closest('.chapter-list');
        const titleDiv = chapterListDiv.previousElementSibling;

        if (!chapterListDiv.classList.contains('active')) {
             toggleChapterList(titleDiv, chapterListDiv);
        }
    }
}

/**
 * Alterna la visibilidad de la lista de capítulos.
 */
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

// --- Lógica de Reproducción Secuencial ---
audioPlayer.addEventListener('ended', () => {
    // Cuando el audio termina, avanza al siguiente en la lista plana.
    playTrack(currentTrackIndex + 1);
});

// Iniciar la aplicación
initializePlaylist();

// Si quieres que empiece a reproducir el primer audio automáticamente,
// descomenta la siguiente línea (algunos navegadores pueden bloquear el 'autoplay').
// playTrack(0);