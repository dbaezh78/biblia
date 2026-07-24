/**
 * annotation.js
 * Gestión de destacados (sombreado de colores, subrayado), notas, marcadores y su sincronización híbrida (Local + Cloud).
 * Control de vistas modales de anotaciones en el menú lateral.
 */

(function () {
  // Base de datos local de anotaciones (clave: libroId-cCap-vNum)
  let anotaciones = {};
  let seleccionados = []; // Guardará la lista de versículos seleccionados actualmente (objetos de datos)

  // Base de datos local de versículos diarios (clave: YYYY-MM-DD)
  let versiculosDiarios = {};
  let fechaSeleccionadaCalendario = null;

  // Base de datos local de escrutacios (clave: YYYY-MM-DD, valor: array de objetos)
  let escrutacios = {};
  let fechaSeleccionadaEscrutacio = null;

  // 1. Inicialización y Carga de LocalStorage
  function cargarAnotacionesLocales() {
    try {
      const datosGuardados = localStorage.getItem('biblia_anotaciones');
      if (datosGuardados) {
        anotaciones = JSON.parse(datosGuardados);
      }
    } catch (e) {
      console.error("Error al cargar anotaciones de LocalStorage:", e);
    }
  }

  function guardarAnotacionesLocales() {
    try {
      localStorage.setItem('biblia_anotaciones', JSON.stringify(anotaciones));
    } catch (e) {
      console.error("Error al guardar anotaciones en LocalStorage:", e);
    }
  }

  // 2. Sincronización con Firebase Firestore
  function obtenerFirestoreColeccion() {
    if (!window.firebaseAuth || !window.firebaseAuth.currentUser || !window.firebaseAuth.db) {
      return null;
    }
    const uid = window.firebaseAuth.currentUser.uid;
    return window.firebaseAuth.db.collection('users').doc(uid).collection('anotaciones');
  }

  // Subir anotación a Firestore
  function subirAnotacionFirestore(anotacion) {
    const col = obtenerFirestoreColeccion();
    if (!col) return;
    
    col.doc(anotacion.id).set(anotacion)
      .then(() => console.log("Anotación sincronizada en la nube:", anotacion.id))
      .catch(err => console.error("Error al sincronizar con Firebase:", err));
  }

  // Descargar y fusionar anotaciones desde Firestore al iniciar sesión
  function sincronizarConFirebase(user) {
    if (!user) return;
    
    const col = obtenerFirestoreColeccion();
    if (!col) return;
    
    col.get()
      .then(snapshot => {
        let cambiosLocales = false;
        
        snapshot.forEach(doc => {
          const anotacionNube = doc.data();
          const anotacionLocal = anotaciones[anotacionNube.id];
          
          if (!anotacionLocal) {
            // No existe localmente: Añadir a local
            anotaciones[anotacionNube.id] = anotacionNube;
            cambiosLocales = true;
          } else {
            // Existe localmente: Conservar la que tenga la fecha más reciente (ISOString)
            const fechaNube = new Date(anotacionNube.fecha);
            const fechaLocal = new Date(anotacionLocal.fecha || 0);
            
            if (fechaNube > fechaLocal) {
              anotaciones[anotacionNube.id] = anotacionNube;
              cambiosLocales = true;
            } else if (fechaLocal > fechaNube) {
              // La local es más nueva: Subir la local a Firestore
              subirAnotacionFirestore(anotacionLocal);
            }
          }
        });
        
        // Subir elementos creados localmente que no existen en la nube
        Object.keys(anotaciones).forEach(id => {
          const docExiste = snapshot.docs.some(d => d.id === id);
          if (!docExiste) {
            subirAnotacionFirestore(anotaciones[id]);
          }
        });

        if (cambiosLocales) {
          guardarAnotacionesLocales();
          aplicarAnotacionesAlCapituloActual();
        }
        console.log("Sincronización con Firebase completada con éxito.");
      })
      .catch(err => {
        console.error("Error al descargar datos de Firestore:", err);
      });
  }

  // Escuchar evento de autenticación Firebase
  document.addEventListener('firebaseAuthChange', (e) => {
    const user = e.detail;
    if (user) {
      sincronizarConFirebase(user);
      sincronizarVersiculosDiariosConFirebase(user);
      sincronizarEscrutaciosConFirebase(user);
    }
  });

  // --- Lógica del Versículo Diario y Calendario Histórico ---

  function obtenerFirestoreVersiculosColeccion() {
    if (!window.firebaseAuth || !window.firebaseAuth.currentUser || !window.firebaseAuth.db) {
      return null;
    }
    const uid = window.firebaseAuth.currentUser.uid;
    return window.firebaseAuth.db.collection('users').doc(uid).collection('versiculos_diarios');
  }

  function subirVersiculoDiarioFirestore(registro) {
    const col = obtenerFirestoreVersiculosColeccion();
    if (!col) return;
    
    col.doc(registro.fecha).set(registro)
      .then(() => console.log("Versículo diario sincronizado en la nube:", registro.fecha))
      .catch(err => console.error("Error al sincronizar versículo diario con Firebase:", err));
  }

  function cargarVersiculosDiariosLocales() {
    try {
      const datosGuardados = localStorage.getItem('biblia_versiculos_diarios');
      if (datosGuardados) {
        versiculosDiarios = JSON.parse(datosGuardados);
      }
    } catch (e) {
      console.error("Error al cargar versículos diarios de LocalStorage:", e);
    }
  }

  function guardarVersiculosDiariosLocales() {
    try {
      localStorage.setItem('biblia_versiculos_diarios', JSON.stringify(versiculosDiarios));
    } catch (e) {
      console.error("Error al guardar versículos diarios en LocalStorage:", e);
    }
  }

  function sincronizarVersiculosDiariosConFirebase(user) {
    if (!user) return;
    
    const col = obtenerFirestoreVersiculosColeccion();
    if (!col) return;
    
    col.get()
      .then(snapshot => {
        let cambiosLocales = false;
        
        snapshot.forEach(doc => {
          const registroNube = doc.data();
          const registroLocal = versiculosDiarios[registroNube.fecha];
          
          if (!registroLocal) {
            versiculosDiarios[registroNube.fecha] = registroNube;
            cambiosLocales = true;
          } else {
            if (JSON.stringify(registroLocal) !== JSON.stringify(registroNube)) {
              versiculosDiarios[registroNube.fecha] = registroNube;
              cambiosLocales = true;
            }
          }
        });
        
        // Subir elementos creados localmente que no existen en la nube
        Object.keys(versiculosDiarios).forEach(fecha => {
          const docExiste = snapshot.docs.some(d => d.id === fecha);
          if (!docExiste) {
            subirVersiculoDiarioFirestore(versiculosDiarios[fecha]);
          }
        });
        
        if (cambiosLocales) {
          guardarVersiculosDiariosLocales();
          actualizarRejillaCalendario();
        }
        console.log("Sincronización de versículos diarios con Firebase completada con éxito.");
      })
      .catch(err => {
        console.error("Error al descargar versículos de Firestore:", err);
      });
  }

  function obtenerFechaLocalHoy() {
    const d = new Date();
    const anio = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  }

  function irAVersiculo(libroId, ruta, capitulo, versiculo) {
    window.scrollToVerseAfterRender = versiculo;
    if (typeof window.cargarLibroYCapitulo === 'function') {
      window.cargarLibroYCapitulo(ruta, capitulo);
    }
  }

  function mostrarLecturaAlAzar() {
    if (!window.promesasBiblicas || window.promesasBiblicas.length === 0) {
      console.error("Lista de promesas no cargada.");
      if (typeof window.closeMenu === 'function') window.closeMenu();
      return;
    }

    // Filtrar solo líneas que tengan citas válidas (no comentarios vacíos o títulos de secciones)
    const citasValidas = window.promesasBiblicas.filter(ref => ref && ref.trim().length > 0 && !ref.trim().startsWith('//'));
    if (citasValidas.length === 0) {
      console.error("No hay citas válidas en promesasBiblicas.");
      if (typeof window.closeMenu === 'function') window.closeMenu();
      return;
    }

    // Elegir una al azar
    const indice = Math.floor(Math.random() * citasValidas.length);
    const ref = citasValidas[indice];

    // Parsear la cita, ej: "01_gn 28,15" o "23_sal 91,10-11"
    const parsed = parseCitaPromesa(ref);
    if (!parsed) {
      console.error("No se pudo parsear la cita:", ref);
      if (typeof window.closeMenu === 'function') window.closeMenu();
      return;
    }

    // Ir a la cita
    const libro = window.indiceLibrosRutas[parsed.libroId];
    if (libro) {
      irAVersiculo(parsed.libroId, libro.ruta, parsed.capitulo, parsed.versiculo);
    } else {
      console.error("Libro no encontrado en índice:", parsed.libroId);
    }
    
    if (typeof window.closeMenu === 'function') window.closeMenu();
  }

  function parseCitaPromesa(ref) {
    try {
      const parts = ref.trim().split(/\s+/);
      if (parts.length < 2) return null;
      const libroId = parts[0];
      const rest = parts[1].split(',');
      if (rest.length < 2) return null;
      const capitulo = parseInt(rest[0], 10);
      const versePart = rest[1];
      // Si tiene rango como "1-2" o "10-11", nos quedamos con el primer número para ir a él
      const versiculo = parseInt(versePart.split('-')[0], 10);
      return { libroId, capitulo, versiculo };
    } catch (e) {
      return null;
    }
  }

  function mostrarVersiculoDiarioHoy() {
    const hoy = obtenerFechaLocalHoy();
    const registro = versiculosDiarios[hoy];
    
    if (registro) {
      irAVersiculo(registro.libroId, registro.ruta, registro.capitulo, registro.versiculo);
      if (typeof window.closeMenu === 'function') window.closeMenu();
    } else {
      generarNuevoVersiculoDiario(hoy);
    }
  }

  function generarNuevoVersiculoDiario(fechaStr) {
    if (!window.promesasBiblicas || window.promesasBiblicas.length === 0) {
      console.error("Lista de promesas no cargada.");
      irAVersiculo("01_gn", "src/libros/01_gn.json", 1, 1);
      return;
    }

    const citasValidas = window.promesasBiblicas.filter(ref => ref && ref.trim().length > 0 && !ref.trim().startsWith('//'));
    if (citasValidas.length === 0) {
      console.error("No hay citas válidas en promesasBiblicas.");
      irAVersiculo("01_gn", "src/libros/01_gn.json", 1, 1);
      return;
    }

    // Elegir una al azar de promesas.js
    const indice = Math.floor(Math.random() * citasValidas.length);
    const ref = citasValidas[indice];

    const parsed = parseCitaPromesa(ref);
    if (!parsed) {
      console.error("No se pudo parsear la cita de promesas:", ref);
      irAVersiculo("01_gn", "src/libros/01_gn.json", 1, 1);
      return;
    }

    const libro = window.indiceLibrosRutas[parsed.libroId];
    if (!libro) {
      console.error("Libro no encontrado en índice:", parsed.libroId);
      irAVersiculo("01_gn", "src/libros/01_gn.json", 1, 1);
      return;
    }

    fetch(libro.ruta)
      .then(res => {
        if (!res.ok) throw new Error("No disponible");
        return res.json();
      })
      .then(data => {
        const capData = data.capitulos[parsed.capitulo];
        if (!capData) throw new Error(`Capítulo ${parsed.capitulo} no disponible`);
        
        const text = capData[parsed.versiculo] || "Texto no disponible";

        const nuevoRegistro = {
          fecha: fechaStr,
          libroId: parsed.libroId,
          libroNombre: libro.nombre,
          capitulo: parsed.capitulo,
          versiculo: parsed.versiculo,
          texto: text,
          ruta: libro.ruta
        };

        versiculosDiarios[fechaStr] = nuevoRegistro;
        guardarVersiculosDiariosLocales();
        subirVersiculoDiarioFirestore(nuevoRegistro);
        irAVersiculo(nuevoRegistro.libroId, nuevoRegistro.ruta, nuevoRegistro.capitulo, nuevoRegistro.versiculo);
        if (typeof window.closeMenu === 'function') window.closeMenu();
      })
      .catch(err => {
        console.error("Error al generar versículo diario de promesas:", err);
        alert("Hubo un problema al generar el versículo diario. Redirigiendo a Génesis.");
        irAVersiculo("01_gn", "src/libros/01_gn.json", 1, 1);
      });
  }

  const mesesNombres = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  function inicializarSelectoresCalendario() {
    const selectMes = document.getElementById('selectCalendarioMes');
    const selectAnio = document.getElementById('selectCalendarioAnio');
    if (!selectMes || !selectAnio) return;
    
    if (selectMes.children.length === 0) {
      mesesNombres.forEach((mes, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = mes;
        selectMes.appendChild(opt);
      });
    }
    
    if (selectAnio.children.length === 0) {
      const anioActual = new Date().getFullYear();
      for (let a = anioActual; a >= anioActual - 2; a--) {
        const opt = document.createElement('option');
        opt.value = a;
        opt.textContent = a;
        selectAnio.appendChild(opt);
      }
    }
    
    const hoy = new Date();
    selectMes.value = hoy.getMonth();
    selectAnio.value = hoy.getFullYear();
    
    selectMes.removeEventListener('change', actualizarRejillaCalendario);
    selectAnio.removeEventListener('change', actualizarRejillaCalendario);
    selectMes.addEventListener('change', actualizarRejillaCalendario);
    selectAnio.addEventListener('change', actualizarRejillaCalendario);
  }

  function actualizarRejillaCalendario() {
    const grid = document.getElementById('calendarioGrid');
    const selectMes = document.getElementById('selectCalendarioMes');
    const selectAnio = document.getElementById('selectCalendarioAnio');
    if (!grid || !selectMes || !selectAnio) return;
    
    const mes = parseInt(selectMes.value, 10);
    const anio = parseInt(selectAnio.value, 10);
    
    grid.innerHTML = "";
    
    const primerDia = new Date(anio, mes, 1).getDay();
    const totalDias = new Date(anio, mes + 1, 0).getDate();
    
    for (let i = 0; i < primerDia; i++) {
      const celda = document.createElement('div');
      celda.className = "calendario-dia-celda vacia";
      grid.appendChild(celda);
    }
    
    const hoyLocal = obtenerFechaLocalHoy();
    
    for (let dia = 1; dia <= totalDias; dia++) {
      const celda = document.createElement('div');
      celda.className = "calendario-dia-celda";
      celda.textContent = dia;
      
      const mesStr = String(mes + 1).padStart(2, '0');
      const diaStr = String(dia).padStart(2, '0');
      const fechaStr = `${anio}-${mesStr}-${diaStr}`;
      
      if (fechaStr === hoyLocal) {
        celda.classList.add('hoy');
      }
      
      if (versiculosDiarios[fechaStr]) {
        celda.classList.add('con-registro');
      }
      
      celda.addEventListener('click', () => {
        document.querySelectorAll('.calendario-dia-celda.seleccionada').forEach(c => {
          c.classList.remove('seleccionada');
        });
        
        celda.classList.add('seleccionada');
        fechaSeleccionadaCalendario = fechaStr;
        mostrarDetalleDia(fechaStr);
      });
      
      grid.appendChild(celda);
    }
  }

  function mostrarDetalleDia(fechaStr) {
    const vacioMsg = document.getElementById('detalleVacioMsg');
    const contenido = document.getElementById('detalleContenido');
    const ref = document.getElementById('detalleReferencia');
    const texto = document.getElementById('detalleTexto');
    const btnIr = document.getElementById('detalleBtnIr');
    
    if (!vacioMsg || !contenido || !ref || !texto || !btnIr) return;
    
    const registro = versiculosDiarios[fechaStr];
    if (registro) {
      vacioMsg.style.display = 'none';
      contenido.style.display = 'block';
      ref.textContent = `${registro.libroNombre} ${registro.capitulo}:${registro.versiculo}`;
      texto.textContent = `"${registro.texto}"`;
      
      btnIr.onclick = () => {
        irAVersiculo(registro.libroId, registro.ruta, registro.capitulo, registro.versiculo);
        cerrarCalendarioModal();
      };
    } else {
      vacioMsg.style.display = 'block';
      vacioMsg.textContent = `No hay ningún versículo diario registrado para el ${formatearFechaLimpia(fechaStr)}.`;
      contenido.style.display = 'none';
    }
  }

  function formatearFechaLimpia(fechaStr) {
    const parts = fechaStr.split('-');
    if (parts.length !== 3) return fechaStr;
    const anio = parts[0];
    const mesIdx = parseInt(parts[1], 10) - 1;
    const dia = parseInt(parts[2], 10);
    return `${dia} de ${mesesNombres[mesIdx]}, ${anio}`;
  }

  function abrirCalendarioModal() {
    const modal = document.getElementById('modalCalendario');
    if (modal) {
      modal.classList.add('open');
      inicializarSelectoresCalendario();
      actualizarRejillaCalendario();
      
      const vacioMsg = document.getElementById('detalleVacioMsg');
      const contenido = document.getElementById('detalleContenido');
      if (vacioMsg && contenido) {
        vacioMsg.style.display = 'block';
        vacioMsg.textContent = "Selecciona un día marcado en el calendario para ver el versículo.";
        contenido.style.display = 'none';
      }
      
      if (typeof window.closeMenu === 'function') window.closeMenu();
    }
  }

  function cerrarCalendarioModal() {
    const modal = document.getElementById('modalCalendario');
    if (modal) modal.classList.remove('open');
  }

  // ==========================================
  // LÓGICA DE ESCRUTACIO Y PARALELOS RECURSIVOS
  // ==========================================
  
  function cargarEscrutaciosLocales() {
    try {
      const datosGuardados = localStorage.getItem('biblia_escrutacios');
      if (datosGuardados) {
        escrutacios = JSON.parse(datosGuardados);
      }
    } catch (e) {
      console.error("Error al cargar escrutacios de LocalStorage:", e);
    }
  }

  function guardarEscrutaciosLocales() {
    try {
      localStorage.setItem('biblia_escrutacios', JSON.stringify(escrutacios));
    } catch (e) {
      console.error("Error al guardar escrutacios en LocalStorage:", e);
    }
  }

  function obtenerFirestoreEscrutaciosColeccion() {
    if (!window.firebaseAuth || !window.firebaseAuth.currentUser || !window.firebaseAuth.db) {
      return null;
    }
    const uid = window.firebaseAuth.currentUser.uid;
    return window.firebaseAuth.db.collection('users').doc(uid).collection('escrutacios');
  }

  function subirEscrutacioFirestore(escrutacio) {
    const col = obtenerFirestoreEscrutaciosColeccion();
    if (!col) return;
    
    col.doc(escrutacio.id).set(escrutacio)
      .then(() => console.log("Escrutacio sincronizado en la nube:", escrutacio.id))
      .catch(err => console.error("Error al sincronizar escrutacio con Firebase:", err));
  }

  function sincronizarEscrutaciosConFirebase(user) {
    if (!user) return;
    
    const col = obtenerFirestoreEscrutaciosColeccion();
    if (!col) return;
    
    col.get()
      .then(snapshot => {
        let cambiosLocales = false;
        
        snapshot.forEach(doc => {
          const escCloud = doc.data();
          const fecha = escCloud.fecha;
          
          if (!escrutacios[fecha]) {
            escrutacios[fecha] = [];
          }
          
          const existeLocal = escrutacios[fecha].some(e => e.id === escCloud.id);
          if (!existeLocal) {
            escrutacios[fecha].push(escCloud);
            cambiosLocales = true;
          } else {
            const idx = escrutacios[fecha].findIndex(e => e.id === escCloud.id);
            if (JSON.stringify(escrutacios[fecha][idx]) !== JSON.stringify(escCloud)) {
              escrutacios[fecha][idx] = escCloud;
              cambiosLocales = true;
            }
          }
        });
        
        Object.keys(escrutacios).forEach(fecha => {
          escrutacios[fecha].forEach(escLocal => {
            const docExiste = snapshot.docs.some(d => d.id === escLocal.id);
            if (!docExiste) {
              subirEscrutacioFirestore(escLocal);
            }
          });
        });
        
        if (cambiosLocales) {
          guardarEscrutaciosLocales();
          actualizarRejillaCalendarioEscrutacio();
        }
        console.log("Sincronización de escrutacios con Firebase completada con éxito.");
      })
      .catch(err => {
        console.error("Error al descargar escrutacios de Firestore:", err);
      });
  }

  const cacheEscrutacioLibros = {};

  function obtenerTextoVersiculo(libroId, cap, ver, callback) {
    const info = window.indiceLibrosRutas[libroId];
    if (!info) {
      callback("Texto no disponible");
      return;
    }
    
    if (cacheEscrutacioLibros[libroId]) {
      const data = cacheEscrutacioLibros[libroId];
      const txt = data.capitulos[cap] && data.capitulos[cap][ver] ? data.capitulos[cap][ver] : "Texto no disponible";
      callback(txt);
    } else {
      fetch(info.ruta)
        .then(res => res.json())
        .then(data => {
          cacheEscrutacioLibros[libroId] = data;
          const txt = data.capitulos[cap] && data.capitulos[cap][ver] ? data.capitulos[cap][ver] : "Texto no disponible";
          callback(txt);
        })
        .catch(err => {
          console.error(err);
          callback("Texto no disponible");
        });
    }
  }

  function filtrarLibrosEscrutacio() {
    const input = document.getElementById('inputEscrutacioBuscarLibro');
    const listOptions = document.getElementById('listEscrutacioLibroCustom');
    if (!input || !listOptions) return;
    
    const query = input.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    listOptions.style.display = "block";
    
    const options = listOptions.querySelectorAll('.custom-select-option');
    options.forEach(opt => {
      const txt = opt.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (txt.includes(query)) {
        opt.style.display = "block";
      } else {
        opt.style.display = "none";
      }
    });
  }

  function seleccionarLibroCustom(key) {
    const inputBuscar = document.getElementById('inputEscrutacioBuscarLibro');
    const listOptions = document.getElementById('listEscrutacioLibroCustom');
    const hiddenLibro = document.getElementById('selectEscrutacioLibro');
    if (!inputBuscar || !listOptions || !hiddenLibro) return;
    
    const nombre = window.indiceLibrosRutas[key].nombre;
    inputBuscar.value = nombre;
    hiddenLibro.value = key;
    listOptions.style.display = "none";
    
    alSeleccionarLibroEscrutacio();
  }

  function inicializarSelectoresEscrutacio() {
    const inputBuscar = document.getElementById('inputEscrutacioBuscarLibro');
    const listOptions = document.getElementById('listEscrutacioLibroCustom');
    const hiddenLibro = document.getElementById('selectEscrutacioLibro');
    if (!inputBuscar || !listOptions || !hiddenLibro) return;
    
    inputBuscar.value = "";
    hiddenLibro.value = "";
    listOptions.innerHTML = "";
    listOptions.style.display = "none";
    
    const keys = Object.keys(window.indiceLibrosRutas || {}).sort();
    
    keys.forEach(key => {
      const opt = document.createElement('div');
      opt.className = "custom-select-option";
      opt.setAttribute('data-value', key);
      opt.textContent = window.indiceLibrosRutas[key].nombre;
      
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        seleccionarLibroCustom(key);
      });
      listOptions.appendChild(opt);
    });
    
    const selectCap = document.getElementById('selectEscrutacioCapitulo');
    if (selectCap) {
      selectCap.value = "";
      selectCap.removeEventListener('change', alSeleccionarCapituloEscrutacio);
      selectCap.addEventListener('change', alSeleccionarCapituloEscrutacio);
      selectCap.removeEventListener('input', alSeleccionarCapituloEscrutacio);
      selectCap.addEventListener('input', alSeleccionarCapituloEscrutacio);
      
      // Al enfocar el capítulo, limpiar para que se desplieguen todos los números sin filtro del datalist
      selectCap.addEventListener('focus', () => {
        selectCap.value = "";
        alSeleccionarCapituloEscrutacio();
      });
    }
    
    const verInicio = document.getElementById('selectEscrutacioVerInicio');
    const verFin = document.getElementById('selectEscrutacioVerFin');
    if (verInicio) {
      verInicio.value = "";
      verInicio.addEventListener('focus', () => {
        verInicio.value = "";
      });
    }
    if (verFin) {
      verFin.value = "";
      verFin.addEventListener('focus', () => {
        verFin.value = "";
      });
    }
    
    if (keys.length > 0) {
      seleccionarLibroCustom(keys[0]);
    }
  }

  function alSeleccionarLibroEscrutacio() {
    const selectLibro = document.getElementById('selectEscrutacioLibro');
    const listCapitulos = document.getElementById('listCapitulos');
    const selectCap = document.getElementById('selectEscrutacioCapitulo');
    if (!selectLibro || !listCapitulos || !selectCap) return;
    
    const libroId = selectLibro.value;
    const info = window.indiceLibrosRutas[libroId];
    if (!info) return;
    
    if (cacheEscrutacioLibros[libroId]) {
      rellenarCapitulos(cacheEscrutacioLibros[libroId]);
    } else {
      fetch(info.ruta)
        .then(res => res.json())
        .then(data => {
          cacheEscrutacioLibros[libroId] = data;
          rellenarCapitulos(data);
        })
        .catch(err => console.error("Error al cargar libro en Escrutacio:", err));
    }
    
    function rellenarCapitulos(data) {
      listCapitulos.innerHTML = "";
      const chapters = Object.keys(data.capitulos).sort((a,b) => parseInt(a,10) - parseInt(b,10));
      chapters.forEach(cap => {
        const opt = document.createElement('option');
        opt.value = cap;
        listCapitulos.appendChild(opt);
      });
      
      // Sin valor por defecto
      selectCap.value = "";
      
      alSeleccionarCapituloEscrutacio();
    }
  }

  function alSeleccionarCapituloEscrutacio() {
    const selectLibro = document.getElementById('selectEscrutacioLibro');
    const selectCap = document.getElementById('selectEscrutacioCapitulo');
    const listVersiculos = document.getElementById('listVersiculos');
    const verInicio = document.getElementById('selectEscrutacioVerInicio');
    const verFin = document.getElementById('selectEscrutacioVerFin');
    if (!selectLibro || !selectCap || !listVersiculos || !verInicio || !verFin) return;
    
    const libroId = selectLibro.value;
    const cap = selectCap.value.trim();
    
    if (!cap) {
      listVersiculos.innerHTML = "";
      verInicio.value = "";
      verFin.value = "";
      return;
    }
    
    const data = cacheEscrutacioLibros[libroId];
    if (data && data.capitulos && data.capitulos[cap]) {
      const verses = Object.keys(data.capitulos[cap]).sort((a,b) => parseInt(a,10) - parseInt(b,10));
      
      listVersiculos.innerHTML = "";
      verses.forEach(ver => {
        const opt = document.createElement('option');
        opt.value = ver;
        listVersiculos.appendChild(opt);
      });
      
      // Dejar en blanco los versículos para que el usuario los seleccione o escriba
      verInicio.value = "";
      verFin.value = "";
    } else {
      listVersiculos.innerHTML = "";
      verInicio.value = "";
      verFin.value = "";
    }
  }

  function validarYClamparEscrutacioInputs() {
    const selectLibro = document.getElementById('selectEscrutacioLibro');
    const capInput = document.getElementById('selectEscrutacioCapitulo');
    const verInicioInput = document.getElementById('selectEscrutacioVerInicio');
    const verFinInput = document.getElementById('selectEscrutacioVerFin');
    
    if (!selectLibro || !capInput || !verInicioInput || !verFinInput) return null;
    
    const libroId = selectLibro.value;
    const data = cacheEscrutacioLibros[libroId];
    if (!data) return null;
    
    const chapters = Object.keys(data.capitulos);
    const totalChapters = chapters.length;
    
    let cap = parseInt(capInput.value, 10);
    if (isNaN(cap) || cap < 1) {
      alert("Por favor selecciona o escribe un capítulo válido.");
      return null;
    }
    if (cap > totalChapters) cap = totalChapters;
    capInput.value = cap;
    
    // Validar versículos
    const verses = Object.keys(data.capitulos[cap] || {});
    const totalVerses = verses.length;
    if (totalVerses === 0) {
      alert("Este capítulo no contiene versículos.");
      return null;
    }
    
    let verInicio = parseInt(verInicioInput.value, 10);
    if (isNaN(verInicio) || verInicio < 1) verInicio = 1;
    if (verInicio > totalVerses) verInicio = totalVerses;
    verInicioInput.value = verInicio;
    
    let verFin = parseInt(verFinInput.value, 10);
    if (isNaN(verFin) || verFin < 1) verFin = totalVerses;
    if (verFin > totalVerses) verFin = totalVerses;
    if (verFin < verInicio) verFin = verInicio;
    verFinInput.value = verFin;
    
    return { libroId, cap, verInicio, verFin };
  }

  function formatearCitaCoordenada(coorObj) {
    const info = window.indiceLibrosRutas[coorObj.libroId];
    if (!info) return coorObj.libroId;
    const citaVer = coorObj.verInicio === coorObj.verFin 
      ? coorObj.verInicio 
      : `${coorObj.verInicio}-${coorObj.verFin}`;
    return `${info.nombre} ${coorObj.cap}:${citaVer}`;
  }

  function crearNodoArbol(libroId, cap, verNum, nivel) {
    const coorStr = `${libroId}-c${cap}-v${verNum}`;
    const coorObj = { libroId, cap, verInicio: verNum, verFin: verNum };
    const citaFormateada = formatearCitaCoordenada(coorObj);
    
    const li = document.createElement('li');
    li.className = "escrutacio-arbol-nodo";
    li.setAttribute('data-coord', coorStr);
    li.setAttribute('data-nivel', nivel);
    
    const paralelos = window.mapaEnlacesParalelos && window.mapaEnlacesParalelos[coorStr];
    const tieneHijos = paralelos && paralelos.length > 0 && nivel < 10;
    
    const divCont = document.createElement('div');
    divCont.className = "escrutacio-nodo-contenido";
    
    if (tieneHijos) {
      const btnToggle = document.createElement('button');
      btnToggle.className = "escrutacio-nodo-toggle";
      btnToggle.textContent = "▶";
      btnToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleNodoArbol(li, paralelos, nivel + 1);
      });
      divCont.appendChild(btnToggle);
    } else {
      const bullet = document.createElement('span');
      bullet.style.width = "18px";
      bullet.style.display = "inline-block";
      divCont.appendChild(bullet);
    }
    
    const divDatos = document.createElement('div');
    divDatos.className = "escrutacio-nodo-datos";
    
    const spanCita = document.createElement('span');
    spanCita.className = "escrutacio-nodo-cita";
    spanCita.textContent = citaFormateada;
    divDatos.appendChild(spanCita);
    
    const spanTexto = document.createElement('span');
    spanTexto.className = "escrutacio-nodo-texto";
    spanTexto.textContent = "Cargando texto...";
    divDatos.appendChild(spanTexto);
    
    divCont.appendChild(divDatos);
    
    obtenerTextoVersiculo(libroId, cap, verNum, (texto) => {
      spanTexto.textContent = `"${texto}"`;
    });
    
    const btnIr = document.createElement('button');
    btnIr.className = "escrutacio-nodo-btn-ir";
    btnIr.textContent = "Ir 📖";
    btnIr.addEventListener('click', (e) => {
      e.stopPropagation();
      const infoLibro = window.indiceLibrosRutas[libroId];
      if (infoLibro) {
        irAVersiculo(libroId, infoLibro.ruta, cap, verNum);
        cerrarEscrutacioModal();
      }
    });
    divCont.appendChild(btnIr);
    
    li.appendChild(divCont);
    
    if (tieneHijos) {
      const subUl = document.createElement('ul');
      subUl.className = "escrutacio-arbol-sub";
      li.appendChild(subUl);
    }
    
    return li;
  }

  function toggleNodoArbol(li, paralelos, siguienteNivel) {
    const btnToggle = li.querySelector('.escrutacio-nodo-toggle');
    const subUl = li.querySelector('.escrutacio-arbol-sub');
    if (!subUl || !btnToggle) return;
    
    const estaAbierto = subUl.classList.contains('open');
    if (estaAbierto) {
      subUl.classList.remove('open');
      btnToggle.classList.remove('expanded');
    } else {
      subUl.classList.add('open');
      btnToggle.classList.add('expanded');
      
      if (subUl.children.length === 0) {
        paralelos.forEach(coorDestino => {
          const partes = coorDestino.trim().split('-');
          if (partes.length < 3) return;
          
          const libroIdDest = partes[0];
          const capNumDest = parseInt(partes[1].replace('c', ''), 10);
          
          const verPart = partes[2].replace('v', '');
          let verNum = parseInt(verPart, 10);
          
          const hijoLi = crearNodoArbol(libroIdDest, capNumDest, verNum, siguienteNivel);
          if (hijoLi) subUl.appendChild(hijoLi);
        });
      }
    }
  }

  function renderizarArbolEscrutacio(libroId, cap, verInicio, verFin) {
    const contenedor = document.getElementById('escrutacioArbolContenedor');
    const divisor = document.getElementById('escrutacioVisorArbol');
    const vacioMsg = document.getElementById('escrutacioVacioMsg');
    const titulo = document.getElementById('escrutacioTituloResultado');
    
    if (!contenedor || !divisor || !vacioMsg || !titulo) return;
    
    const info = window.indiceLibrosRutas[libroId];
    if (!info) return;
    
    const cNum = parseInt(cap, 10);
    const vIni = parseInt(verInicio, 10);
    const vFin = parseInt(verFin, 10);
    
    if (cacheEscrutacioLibros[libroId]) {
      ejecutarRenderizado();
    } else {
      fetch(info.ruta)
        .then(res => res.json())
        .then(data => {
          cacheEscrutacioLibros[libroId] = data;
          ejecutarRenderizado();
        })
        .catch(err => console.error("Error al cargar libro al renderizar árbol:", err));
    }
    
    function ejecutarRenderizado() {
      vacioMsg.style.display = 'none';
      divisor.style.display = 'block';
      
      const citaTexto = `${info.nombre} ${cNum}:${vIni === vFin ? vIni : vIni + '-' + vFin}`;
      titulo.textContent = citaTexto;
      
      contenedor.innerHTML = "";
      
      const ul = document.createElement('ul');
      ul.className = "escrutacio-arbol-contenedor";
      
      for (let v = vIni; v <= vFin; v++) {
        const li = crearNodoArbol(libroId, cNum, v, 1);
        if (li) ul.appendChild(li);
      }
      
      contenedor.appendChild(ul);
      
      setTimeout(() => {
        divisor.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
    }
  }

  // Calendario del Historial de Escrutacio
  function inicializarSelectoresEscrutacioHistorial() {
    const selectMes = document.getElementById('selectEscrutacioHistorialMes');
    const selectAnio = document.getElementById('selectEscrutacioHistorialAnio');
    if (!selectMes || !selectAnio) return;
    
    selectMes.innerHTML = "";
    mesesNombres.forEach((mes, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = mes;
      selectMes.appendChild(opt);
    });
    
    selectAnio.innerHTML = "";
    const anioActual = new Date().getFullYear();
    for (let a = anioActual - 5; a <= anioActual + 2; a++) {
      const opt = document.createElement('option');
      opt.value = a;
      opt.textContent = a;
      selectAnio.appendChild(opt);
    }
    
    fechaSeleccionadaEscrutacio = new Date();
    selectMes.value = fechaSeleccionadaEscrutacio.getMonth();
    selectAnio.value = fechaSeleccionadaEscrutacio.getFullYear();
    
    selectMes.removeEventListener('change', actualizarRejillaCalendarioEscrutacio);
    selectAnio.removeEventListener('change', actualizarRejillaCalendarioEscrutacio);
    selectMes.addEventListener('change', () => {
      fechaSeleccionadaEscrutacio.setMonth(parseInt(selectMes.value, 10));
      actualizarRejillaCalendarioEscrutacio();
    });
    selectAnio.addEventListener('change', () => {
      fechaSeleccionadaEscrutacio.setFullYear(parseInt(selectAnio.value, 10));
      actualizarRejillaCalendarioEscrutacio();
    });
  }

  function actualizarRejillaCalendarioEscrutacio() {
    const grid = document.getElementById('escrutacioHistorialGrid');
    if (!grid) return;
    
    grid.innerHTML = "";
    
    const mes = fechaSeleccionadaEscrutacio.getMonth();
    const anio = fechaSeleccionadaEscrutacio.getFullYear();
    
    const primerDia = new Date(anio, mes, 1).getDay();
    const totalDias = new Date(anio, mes + 1, 0).getDate();
    
    const hoyStr = obtenerFechaLocalHoy();
    
    for (let i = 0; i < primerDia; i++) {
      const celdaVacia = document.createElement('span');
      grid.appendChild(celdaVacia);
    }
    
    for (let d = 1; d <= totalDias; d++) {
      const celda = document.createElement('span');
      celda.textContent = d;
      
      const mesStr = (mes + 1).toString().padStart(2, '0');
      const diaStr = d.toString().padStart(2, '0');
      const fechaStr = `${anio}-${mesStr}-${diaStr}`;
      
      if (fechaStr === hoyStr) {
        celda.classList.add('hoy');
      }
      
      if (escrutacios[fechaStr] && escrutacios[fechaStr].length > 0) {
        celda.classList.add('con-registro');
      }
      
      celda.addEventListener('click', () => {
        const prevSel = grid.querySelector('.seleccionada');
        if (prevSel) prevSel.classList.remove('seleccionada');
        
        celda.classList.add('seleccionada');
        mostrarListaEscrutaciosDia(fechaStr);
      });
      
      grid.appendChild(celda);
    }
  }

  function mostrarListaEscrutaciosDia(fechaStr) {
    const contenedorLista = document.getElementById('escrutacioHistorialLista');
    if (!contenedorLista) return;
    
    contenedorLista.innerHTML = "";
    
    const items = escrutacios[fechaStr] || [];
    if (items.length === 0) {
      contenedorLista.innerHTML = `<div class="lista-vacio-msg">No hay escrutacios el ${formatearFechaEscrutacioLimpia(fechaStr)}.</div>`;
      return;
    }
    
    items.forEach(esc => {
      const divItem = document.createElement('div');
      divItem.className = "escrutacio-historial-item";
      
      const spanTexto = document.createElement('span');
      spanTexto.style.fontWeight = "bold";
      
      let citaTexto = esc.libroNombre;
      if (esc.capInicio !== undefined && esc.capFin !== undefined) {
        if (parseInt(esc.capInicio, 10) === parseInt(esc.capFin, 10)) {
          citaTexto += ` ${esc.capInicio}:${esc.verInicio === esc.verFin ? esc.verInicio : esc.verInicio + '-' + esc.verFin}`;
        } else {
          citaTexto += ` ${esc.capInicio}:${esc.verInicio} al ${esc.capFin}:${esc.verFin}`;
        }
      } else {
        citaTexto += ` ${esc.capitulo}:${esc.verInicio === esc.verFin ? esc.verInicio : esc.verInicio + '-' + esc.verFin}`;
      }
      spanTexto.textContent = citaTexto;
      
      const spanHora = document.createElement('span');
      spanHora.style.fontSize = "0.75em";
      spanHora.style.color = "#a0aec0";
      const hora = new Date(parseInt(esc.timestamp, 10)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      spanHora.textContent = hora;
      
      divItem.appendChild(spanTexto);
      divItem.appendChild(spanHora);
      
      divItem.addEventListener('click', () => {
        const cap = esc.capitulo !== undefined ? esc.capitulo : (esc.capInicio !== undefined ? esc.capInicio : 1);
        renderizarArbolEscrutacio(esc.libroId, cap, esc.verInicio, esc.verFin);
      });
      
      contenedorLista.appendChild(divItem);
    });

    setTimeout(() => {
      contenedorLista.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }

  function formatearFechaEscrutacioLimpia(fechaStr) {
    const parts = fechaStr.split('-');
    if (parts.length !== 3) return fechaStr;
    const anio = parts[0];
    const mesIdx = parseInt(parts[1], 10) - 1;
    const dia = parseInt(parts[2], 10);
    return `${dia} de ${mesesNombres[mesIdx]}, ${anio}`;
  }

  function abrirEscrutacioModal() {
    const modal = document.getElementById('modalEscrutacio');
    if (modal) {
      modal.style.display = "flex";
      modal.classList.add('open');
      
      inicializarSelectoresEscrutacio();
      inicializarSelectoresEscrutacioHistorial();
      actualizarRejillaCalendarioEscrutacio();
      toggleSelectorPasaje(true);
      
      const visor = document.getElementById('escrutacioVisorArbol');
      const vacio = document.getElementById('escrutacioVacioMsg');
      if (visor && vacio) {
        visor.style.display = 'none';
        vacio.style.display = 'block';
        vacio.textContent = "Selecciona un pasaje y presiona Escrutar.";
      }
      
      const histCont = document.getElementById('escrutacioHistorialCont');
      if (histCont) histCont.style.display = 'none';
      
      if (typeof window.closeMenu === 'function') window.closeMenu();
    }
  }

  function toggleSelectorPasaje(show) {
    const el = document.getElementById('escrutacioSelectorPasaje');
    const body = document.getElementById('escrutacioSelectorPasajeBody');
    const arrow = document.getElementById('selectorPasajeArrow');
    if (!el || !body || !arrow) return;
    
    const currentlyVisible = body.style.display !== 'none';
    const shouldShow = show !== undefined ? show : !currentlyVisible;
    
    if (shouldShow) {
      body.style.display = 'block';
      arrow.style.transform = 'rotate(0deg)';
      el.classList.remove('collapsed');
    } else {
      body.style.display = 'none';
      arrow.style.transform = 'rotate(-90deg)';
      el.classList.add('collapsed');
    }
  }

  function cerrarEscrutacioModal() {
    const modal = document.getElementById('modalEscrutacio');
    if (modal) {
      modal.style.display = "none";
      modal.classList.remove('open');
    }
  }

  function configurarEventosEscrutacio() {
    const inputBuscarLibro = document.getElementById('inputEscrutacioBuscarLibro');
    if (inputBuscarLibro) {
      inputBuscarLibro.addEventListener('input', filtrarLibrosEscrutacio);
      
      // Al enfocar, limpiar para permitir búsqueda y mostrar todos los elementos
      inputBuscarLibro.addEventListener('focus', () => {
        inputBuscarLibro.value = "";
        filtrarLibrosEscrutacio();
      });
    }

    // Cerrar el menú desplegable personalizado al hacer clic fuera
    document.addEventListener('click', (e) => {
      const container = e.target.closest('.custom-select-container');
      const listOptions = document.getElementById('listEscrutacioLibroCustom');
      const inputBuscar = document.getElementById('inputEscrutacioBuscarLibro');
      const hiddenLibro = document.getElementById('selectEscrutacioLibro');
      
      if (listOptions && listOptions.style.display === "block" && !container) {
        listOptions.style.display = "none";
        if (hiddenLibro && hiddenLibro.value && inputBuscar && window.indiceLibrosRutas[hiddenLibro.value]) {
          inputBuscar.value = window.indiceLibrosRutas[hiddenLibro.value].nombre;
        }
      }
    });

    const btnCloseEscrutacio = document.getElementById('closeEscrutacioBtn');
    if (btnCloseEscrutacio) {
      btnCloseEscrutacio.addEventListener('click', cerrarEscrutacioModal);
    }
    
    const modalEscrutacio = document.getElementById('modalEscrutacio');
    if (modalEscrutacio) {
      modalEscrutacio.addEventListener('click', (e) => {
        if (e.target === modalEscrutacio) {
          cerrarEscrutacioModal();
        }
      });
    }
    
    const btnToggleSelector = document.getElementById('btnToggleSelectorPasaje');
    if (btnToggleSelector) {
      btnToggleSelector.addEventListener('click', () => {
        toggleSelectorPasaje();
      });
    }

    const btnToggleHistorial = document.getElementById('btnToggleEscrutacioHistorial');
    const histCont = document.getElementById('escrutacioHistorialCont');
    if (btnToggleHistorial && histCont) {
      btnToggleHistorial.addEventListener('click', () => {
        const isVisible = histCont.style.display === 'block';
        if (isVisible) {
          histCont.style.display = 'none';
          toggleSelectorPasaje(true);
        } else {
          histCont.style.display = 'block';
          toggleSelectorPasaje(false);
        }
      });
    }
    
    const btnIniciar = document.getElementById('btnIniciarEscrutacio');
    if (btnIniciar) {
      btnIniciar.addEventListener('click', () => {
        const clampRes = validarYClamparEscrutacioInputs();
        if (!clampRes) return;
        
        const { libroId, cap, verInicio, verFin } = clampRes;
        
        const timestamp = Date.now().toString();
        const hoyStr = obtenerFechaLocalHoy();
        const infoLibro = window.indiceLibrosRutas[libroId];
        
        const nuevoEscrutacio = {
          id: timestamp,
          fecha: hoyStr,
          libroId: libroId,
          libroNombre: infoLibro.nombre,
          capitulo: cap,
          verInicio: verInicio,
          verFin: verFin,
          timestamp: timestamp
        };
        
        if (!escrutacios[hoyStr]) {
          escrutacios[hoyStr] = [];
        }
        escrutacios[hoyStr].push(nuevoEscrutacio);
        guardarEscrutaciosLocales();
        subirEscrutacioFirestore(nuevoEscrutacio);
        actualizarRejillaCalendarioEscrutacio();
        
        renderizarArbolEscrutacio(libroId, cap, verInicio, verFin);
      });
    }
  }

  // 3. Aplicar estilos en los versículos renderizados en el DOM
  function aplicarAnotacionesAlCapituloActual() {
    const versiculosDOM = document.querySelectorAll('.versiculo');
    versiculosDOM.forEach(v => {
      const vNum = v.getAttribute('data-vnum');
      const key = `${window.idLibroActual}-c${window.capituloActualNum}-v${vNum}`;
      const anotacion = anotaciones[key];
      
      // Buscar el span interno del texto (.v-texto)
      const spanTexto = v.querySelector('.v-texto') || v;
      
      // Limpiar clases de destacado anteriores
      spanTexto.classList.remove('destacado-azul', 'destacado-amarillo', 'destacado-rosado', 'destacado-verde', 'destacado-naranja', 'destacado-rojo', 'destacado-morado', 'subrayado-linea');
      
      if (anotacion) {
        if (anotacion.color) {
          spanTexto.classList.add(`destacado-${anotacion.color}`);
        }
        if (anotacion.subrayado) {
          spanTexto.classList.add('subrayado-linea');
        }
      }
    });
  }

  // Interceptar la función original de renderizado de versículos en jsgral.js
  const originalRenderizarVersiculos = window.renderizarVersiculos;
  window.renderizarVersiculos = function (libroData, capSeleccionado) {
    if (typeof originalRenderizarVersiculos === 'function') {
      originalRenderizarVersiculos(libroData, capSeleccionado);
    }
    
    // Registrar escuchadores y asegurar data-vnum en el DOM antes de aplicar las anotaciones
    configurarClicsEnVersiculos();

    // Aplicar sombreado y subrayado en el nuevo capítulo
    aplicarAnotacionesAlCapituloActual();

    // Comprobar si hay un scroll pendiente a un versículo específico (o múltiples separados por punto)
    if (window.scrollToVerseAfterRender) {
      const vTargetRaw = window.scrollToVerseAfterRender;
      window.scrollToVerseAfterRender = null;
      
      setTimeout(() => {
        const vNums = vTargetRaw.toString().includes('.') ? vTargetRaw.toString().split('.') : [vTargetRaw.toString()];
        const primerVNum = vNums[0];
        
        // Scroll al primer versículo de la lista
        const vElPrimer = document.querySelector(`.versiculo[data-vnum="${primerVNum}"]`);
        if (vElPrimer) {
          vElPrimer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Resaltar todos los versículos especificados por 3 segundos
        const elVersiculosResaltados = [];
        vNums.forEach(vNum => {
          const vEl = document.querySelector(`.versiculo[data-vnum="${vNum}"]`);
          if (vEl) {
            vEl.classList.add('seleccionado-actual');
            elVersiculosResaltados.push(vEl);
          }
        });

        if (elVersiculosResaltados.length > 0) {
          setTimeout(() => {
            elVersiculosResaltados.forEach(vEl => {
              vEl.classList.remove('seleccionado-actual');
            });
          }, 3000);
        }
      }, 500);
    }
  };

  // Quitar selección actual de versículos y guardar cambios de notas si corresponde
  function quitarSeleccionVersiculo() {
    document.querySelectorAll('.versiculo').forEach(el => {
      el.classList.remove('seleccionado-actual');
      const btn = el.querySelector('.btn-mas-versiculo');
      if (btn) btn.remove();
      const btnV = el.querySelector('.btn-voz-versiculo');
      if (btnV) btnV.remove();
    });
    
    if (seleccionados.length > 0) {
      const notaInput = document.getElementById('accionVNotaInput');
      if (notaInput) {
        const notaTexto = notaInput.value.trim();
        const batchFecha = new Date().toISOString();
        
        seleccionados.forEach(sel => {
          const anotacion = anotaciones[sel.key] || {
            id: sel.key,
            libroNombre: sel.libroNombre,
            libroId: sel.libroId,
            capitulo: sel.capitulo,
            versiculo: sel.vNum,
            texto: sel.texto,
            color: null,
            subrayado: false,
            marcador: false,
            nota: "",
            fecha: batchFecha
          };
          
          if (notaTexto !== (anotacion.nota || "")) {
            anotacion.nota = notaTexto;
            anotacion.fecha = batchFecha;
            
            anotaciones[sel.key] = anotacion;
            guardarAnotacionesLocales();
            subirAnotacionFirestore(anotacion);
          }
        });
      }
      seleccionados = [];
    }
  }

  // 4. Configurar escuchadores de clics en versículos
  function configurarClicsEnVersiculos() {
    const versiculos = document.querySelectorAll('.versiculo');
    versiculos.forEach(v => {
      // 1. Si no tiene data-vnum (versículos comunes sin paralelos), asignarlo desde el span num-v
      if (!v.getAttribute('data-vnum')) {
        const numSpan = v.querySelector('.num-v');
        if (numSpan) {
          v.setAttribute('data-vnum', numSpan.textContent.trim());
        }
      }

      // 2. Envolver el texto del versículo en un span .v-texto si no existe aún
      if (!v.querySelector('.v-texto')) {
        const nodosTexto = [];
        Array.from(v.childNodes).forEach(node => {
          // Ignorar el span del número de versículo, el botón de más, badges o scripts
          if (node.nodeType === Node.TEXT_NODE || 
              (node.nodeType === Node.ELEMENT_NODE && 
               !node.classList.contains('num-v') && 
               !node.classList.contains('btn-mas-versiculo') && 
               !node.classList.contains('btn-voz-versiculo') && 
               !node.classList.contains('badge-paralelo'))) {
            nodosTexto.push(node);
          }
        });
        
        if (nodosTexto.length > 0) {
          const spanTexto = document.createElement('span');
          spanTexto.className = 'v-texto';
          
          const numSpan = v.querySelector('.num-v');
          if (numSpan) {
            numSpan.after(spanTexto);
          } else {
            v.prepend(spanTexto);
          }
          
          nodosTexto.forEach(node => spanTexto.appendChild(node));
        }
      }

      // Reemplazamos clics previos eliminando listeners clonando
      const clon = v.cloneNode(true);
      v.parentNode.replaceChild(clon, v);
      
      clon.addEventListener('click', (e) => {
        // Si el clic viene directamente del botón de más o de voz, no hacer nada aquí
        if (e.target.closest('.btn-mas-versiculo') || e.target.closest('.btn-voz-versiculo')) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        seleccionarVersiculo(clon);
      });
    });
  }

  // Cargar selección de versículo y mostrar signo de más y paralelos
  function seleccionarVersiculo(vElement) {
    const vNum = vElement.getAttribute('data-vnum');
    const libroNombre = window.libroActualData.libro;
    const capNum = window.capituloActualNum;
    const libroId = window.idLibroActual;
    const key = `${libroId}-c${capNum}-v${vNum}`;

    // Verificar si el versículo ya está seleccionado
    const idx = seleccionados.findIndex(s => s.key === key);

    if (idx !== -1) {
      // Ya está seleccionado: Deseleccionarlo
      seleccionados.splice(idx, 1);
      vElement.classList.remove('seleccionado-actual');
      const btn = vElement.querySelector('.btn-mas-versiculo');
      if (btn) btn.remove();
      const btnV = vElement.querySelector('.btn-voz-versiculo');
      if (btnV) btnV.remove();

      // Si quedan versículos seleccionados, refrescar el Action Sheet (si está abierto)
      const panel = document.getElementById('panelAccionVersiculo');
      if (seleccionados.length > 0) {
        if (panel && panel.classList.contains('open')) {
          abrirActionSheetMulti();
        }
      } else {
        // Si ya no queda ninguno seleccionado, cerrar paneles
        if (panel && panel.classList.contains('open')) {
          cerrarActionSheet();
        }
        if (typeof window.panelParalelos !== 'undefined' && window.panelParalelos) {
          window.panelParalelos.classList.remove('open');
        }
      }
    } else {
      // No está seleccionado: Seleccionarlo
      vElement.classList.add('seleccionado-actual');
      
      // Crear el botón de más (+)
      const btnMas = document.createElement('button');
      btnMas.className = 'btn-mas-versiculo';
      btnMas.innerHTML = '+';
      btnMas.setAttribute('title', 'Opciones de Versículos');
      vElement.appendChild(btnMas);
      
      // Crear el botón de voz (Google Spanish TTS)
      const btnVoz = document.createElement('button');
      btnVoz.className = 'btn-voz-versiculo';
      btnVoz.setAttribute('title', 'Escuchar Versículos Seleccionados');
      btnVoz.innerHTML = '<span class="material-symbols-outlined" style="font-size: 14px;">hearing</span>';
      vElement.appendChild(btnVoz);
      
      // Limpiar texto (sin el botón de más ni el de voz)
      const tempClone = vElement.cloneNode(true);
      const btnMasInClone = tempClone.querySelector('.btn-mas-versiculo');
      if (btnMasInClone) btnMasInClone.remove();
      const btnVozInClone = tempClone.querySelector('.btn-voz-versiculo');
      if (btnVozInClone) btnVozInClone.remove();
      const textoLimpio = tempClone.innerText.replace(/^\d+\s*/, "").trim();

      seleccionados.push({
        key: key,
        vNum: vNum,
        texto: textoLimpio,
        elementoDOM: vElement,
        libroNombre: libroNombre,
        libroId: libroId,
        capitulo: capNum
      });

      // Configurar clic en el botón de más (+)
      btnMas.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        abrirActionSheetMulti();
      });

      // Configurar clic en el botón de voz (TTS)
      btnVoz.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Obtener versículos seleccionados ordenados
        const sortedSelected = [...seleccionados].sort((a, b) => {
          const numA = parseInt(a.vNum, 10);
          const numB = parseInt(b.vNum, 10);
          return numA - numB;
        });

        if (sortedSelected.length === 0) return;

        const items = sortedSelected.map(s => ({
          numV: s.vNum,
          texto: s.texto
        }));

        if (typeof window.toggleSpeakText === 'function') {
          window.toggleSpeakText(items, "seleccion_" + items.map(i => i.numV).join('_'));
        }
      });

      // Refrescar Action Sheet si ya está abierto
      const panel = document.getElementById('panelAccionVersiculo');
      if (panel && panel.classList.contains('open')) {
        abrirActionSheetMulti();
      }

      // Si tiene paralelos, abrir automáticamente el panel de paralelos nativo (para el último clicado)
      const tieneParalelos = vElement.getAttribute('data-destinos');
      if (tieneParalelos) {
        abrirParalelosNativos(libroNombre, capNum, vNum, tieneParalelos);
      } else {
        // Si el último seleccionado no tiene paralelos y es el único, cerrar paralelos
        if (seleccionados.length === 1 && typeof window.panelParalelos !== 'undefined' && window.panelParalelos) {
          window.panelParalelos.classList.remove('open');
        }
      }
    }
  }

  // Helper para abrir el panel de paralelos nativo de la app
  function abrirParalelosNativos(libroNombre, capNum, vNum, tieneParalelos) {
    if (typeof window.panelTitulo !== 'undefined' && window.panelTitulo) {
      window.panelTitulo.innerHTML = `📚 Paralelos de ${libroNombre} ${capNum},${vNum}`;
    }
    if (typeof window.panelContenido !== 'undefined' && window.panelContenido) {
      window.panelContenido.innerHTML = `<p style="color: #888; font-style: italic; padding: 10px;">Buscando textos paralelos...</p>`;
    }
    if (typeof window.panelParalelos !== 'undefined' && window.panelParalelos) {
      window.panelParalelos.classList.add('open');
    }
    
    const destinos = tieneParalelos.split(',');
    const consultasPromesas = destinos.map(coordenadaDestino => {
      const partes = coordenadaDestino.trim().split('-');
      if (partes.length < 3) return Promise.resolve('');
      const libroIdDest = partes[0];
      const capNumDest = partes[1].replace('c', '');
      
      let idVersiculoCompleto = "";
      let versesToFetch = [];
      let citaFormateadaLector = "";

      if (partes.length === 4) {
        // Rango, ej. v26-27
        const startV = parseInt(partes[2].replace('v', ''), 10);
        const endV = parseInt(partes[3], 10);
        idVersiculoCompleto = partes[2].replace('v', '');
        citaFormateadaLector = `${startV}-${endV}`;
        for (let i = startV; i <= endV; i++) {
          versesToFetch.push(i.toString());
        }
      } else {
        // Normal o con puntos, ej. v6.9
        idVersiculoCompleto = partes[2].replace('v', '');
        citaFormateadaLector = idVersiculoCompleto;
        if (idVersiculoCompleto.includes('.')) {
          versesToFetch = idVersiculoCompleto.split('.');
        } else {
          versesToFetch = [idVersiculoCompleto];
        }
      }

      const infoLibro = window.indiceLibrosRutas[libroIdDest];
      if (!infoLibro) return Promise.resolve('');

      return fetch(infoLibro.ruta)
        .then(res => res.ok ? res.json() : null)
        .then(libroJson => {
          if (!libroJson || !libroJson.capitulos || !libroJson.capitulos[capNumDest]) return '';
          
          let textoOriginal = "";
          textoOriginal = versesToFetch.map(vn => {
            if (vn.includes('_')) {
              const rangeParts = vn.split('_');
              return libroJson.capitulos[capNumDest][rangeParts[0]] || "";
            }
            return libroJson.capitulos[capNumDest][vn] || "";
          }).filter(Boolean).join(' ');

          let vistaPreviaTexto = textoOriginal.length > 40 ? textoOriginal.substring(0, 40).trim() + "..." : textoOriginal || "(No disponible)";
          const textoCitaFormateada = `${infoLibro.nombre} ${capNumDest},${citaFormateadaLector}`;

          return `
            <div class="bloque-paralelo-link" 
                 data-ruta="${infoLibro.ruta}" 
                 data-libro-id="${libroIdDest}" 
                 data-cap="${capNumDest}" 
                 data-verse="${versesToFetch.join('.')}" 
                 style="flex: 1 1 calc(50% - 10px); min-width: 250px; max-width: 100%; border-left: 3px solid #cc0000; padding: 4px; cursor: pointer; background: #fff; border-radius: 0 6px 6px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); box-sizing: border-box; margin-bottom: 4px;">
              <strong style="color: #cc0000; display: block; margin-bottom: 2px; font-size: 0.9em;">📌 ${textoCitaFormateada}</strong>
              <span style="font-style: italic; color: #4a5568; font-size: 0.85em; display: block; line-height: 1.3;">"${vistaPreviaTexto}"</span>
            </div>
          `;
        }).catch(() => '');
    });

    Promise.all(consultasPromesas).then(bloquesHtml => {
      if (window.panelContenido) {
        const htmlFinal = bloquesHtml.filter(b => b && b.trim() !== '').join('');
        if (htmlFinal.trim() === '') {
          window.panelContenido.innerHTML = `<p style="color: #888; font-style: italic; padding: 2px;">No se encontraron textos cruzados.</p>`;
        } else {
          const esMovil = window.innerWidth <= 600;
          window.panelContenido.innerHTML = `
            <div style="display: flex; flex-direction: ${esMovil ? 'column' : 'row'}; flex-wrap: wrap; gap: 4px; width: 100%; max-height: 180px; overflow-y: auto; padding: 5px; box-sizing: border-box;">
              ${htmlFinal}
            </div>
          `;
          if (typeof window.asignarEventosViajeReferencia === 'function') {
            window.asignarEventosViajeReferencia();
          }
        }
      }
    });
  }

  // 5. Lógica del Menú Contextual (Action Sheet)
  function inyectarActionSheet() {
    if (document.getElementById('panelAccionVersiculo')) return;

    const div = document.createElement('div');
    div.innerHTML = `
      <div class="panel-accion-versiculo" id="panelAccionVersiculo">
        <div class="accion-v-header">
          <div>
            <h4 class="accion-v-referencia" id="accionVReferencia">Libro 1:1</h4>
            <div class="accion-v-texto" id="accionVTexto">Cargando texto...</div>
          </div>
          <button class="ajustes-close-btn" id="closeAccionVBtn" aria-label="Cerrar">&times;</button>
        </div>
        
        <!-- Sombreado de Colores -->
        <div class="accion-v-colores-fila">
          <div class="accion-v-color-dot" data-color="azul" style="background-color: #38bdf8;" title="Azul"></div>
          <div class="accion-v-color-dot" data-color="amarillo" style="background-color: #fde047;" title="Amarillo"></div>
          <div class="accion-v-color-dot" data-color="rosado" style="background-color: #f472b6;" title="Rosado"></div>
          <div class="accion-v-color-dot" data-color="verde" style="background-color: #4ade80;" title="Verde"></div>
          <div class="accion-v-color-dot" data-color="naranja" style="background-color: #fb923c;" title="Naranja"></div>
          <div class="accion-v-color-dot" data-color="rojo" style="background-color: #f87171;" title="Rojo"></div>
          <div class="accion-v-color-dot" data-color="morado" style="background-color: #c084fc;" title="Morado"></div>
          <div class="accion-v-clear-dot" id="clearColorBtn" title="Limpiar Sombreado">🗑️</div>
        </div>
        
        <!-- Acciones Principales -->
        <div class="accion-v-botones-grid">
          <button class="accion-v-btn" id="btnAccionSubrayar">
            <span style="font-size:1.15rem;">✍️</span>
            <span>Subrayar</span>
          </button>
          <button class="accion-v-btn" id="btnAccionMarcador">
            <span style="font-size:1.15rem;">🔖</span>
            <span>Guardar</span>
          </button>
          <button class="accion-v-btn" id="btnAccionNota">
            <span style="font-size:1.15rem;">📝</span>
            <span>Nota</span>
          </button>
          <button class="accion-v-btn" id="btnAccionCopiar">
            <span style="font-size:1.15rem;">📋</span>
            <span>Copiar</span>
          </button>
        </div>

        <!-- Acciones Adicionales -->
        <div class="accion-v-botones-grid" style="grid-template-columns: repeat(2, 1fr); margin-bottom: 0;">
          <button class="accion-v-btn" id="btnAccionCompartir" style="flex-direction: row; gap: 8px; justify-content: center;">
            <span>🔗</span>
            <span>Compartir</span>
          </button>
          <button class="accion-v-btn" id="btnAccionParalelos" style="flex-direction: row; gap: 8px; justify-content: center; display: none;">
            <span>📚</span>
            <span>Paralelos</span>
          </button>
        </div>
        
        <!-- Entrada para notas -->
        <div class="accion-v-nota-contenedor" id="accionVNotaCont" style="position: relative;">
          <textarea class="accion-v-nota-input" id="accionVNotaInput" placeholder="Añade un comentario personal o nota de estudio..."></textarea>
          <button id="btnGuardarNotaRapido" class="btn-guardar-nota-rapido inhibido" title="Cambios guardados">✔️</button>
        </div>
      </div>
    `;
    document.body.appendChild(div.firstElementChild);
    configurarEventosActionSheet();
  }

  function abrirActionSheetMulti() {
    if (seleccionados.length === 0) return;

    // Ordenar los seleccionados por número de versículo para que la cita y el texto queden ordenados
    seleccionados.sort((a, b) => parseInt(a.vNum, 10) - parseInt(b.vNum, 10));

    const libroNombre = seleccionados[0].libroNombre;
    const capNum = seleccionados[0].capitulo;
    
    // Formatear cita de versículos (ej: "Génesis 1:1, 2" o "Génesis 1:1-3")
    const vNums = seleccionados.map(s => parseInt(s.vNum, 10));
    let citacionV = "";
    
    const esRangoContinuo = vNums.every((val, i, arr) => i === 0 || val === arr[i-1] + 1);
    if (esRangoContinuo && vNums.length > 1) {
      citacionV = `${vNums[0]}-${vNums[vNums.length - 1]}`;
    } else {
      citacionV = vNums.join(', ');
    }
    
    const referenciaCompleta = `${libroNombre} ${capNum}:${citacionV}`;
    const textoConcatenado = seleccionados.map(s => s.texto).join(' ');

    // Cargar en la UI
    document.getElementById('accionVReferencia').textContent = referenciaCompleta;
    document.getElementById('accionVTexto').textContent = `"${textoConcatenado}"`;

    // Determinar valores compartidos por todos
    let colorComun = null;
    const primerId = seleccionados[0].key;
    const primeraAnotacion = anotaciones[primerId];
    if (primeraAnotacion) {
      colorComun = primeraAnotacion.color;
      const mismoColor = seleccionados.every(s => {
        const a = anotaciones[s.key];
        return a && a.color === colorComun;
      });
      if (!mismoColor) colorComun = null;
    }

    // Cargar burbujas
    document.querySelectorAll('.accion-v-color-dot').forEach(dot => {
      if (dot.getAttribute('data-color') === colorComun) {
        dot.classList.add('selected');
      } else {
        dot.classList.remove('selected');
      }
    });

    // Subrayado común
    const todosSubrayados = seleccionados.every(s => {
      const a = anotaciones[s.key];
      return a && a.subrayado;
    });
    const btnSubrayar = document.getElementById('btnAccionSubrayar');
    if (todosSubrayados) btnSubrayar.classList.add('active');
    else btnSubrayar.classList.remove('active');

    // Marcador común
    const todosMarcadores = seleccionados.every(s => {
      const a = anotaciones[s.key];
      return a && a.marcador;
    });
    const btnMarcador = document.getElementById('btnAccionMarcador');
    if (todosMarcadores) btnMarcador.classList.add('active');
    else btnMarcador.classList.remove('active');

    // Nota común
    let notaComun = "";
    if (primeraAnotacion) {
      notaComun = primeraAnotacion.nota || "";
      const mismaNota = seleccionados.every(s => {
        const a = anotaciones[s.key];
        return a && a.nota === notaComun;
      });
      if (!mismaNota) notaComun = "";
    }
    
    const btnNota = document.getElementById('btnAccionNota');
    const notaCont = document.getElementById('accionVNotaCont');
    const notaInput = document.getElementById('accionVNotaInput');
    
    notaInput.value = notaComun;
    if (notaComun && notaComun.trim() !== "") {
      btnNota.classList.add('active');
      notaCont.style.display = 'block';
    } else {
      btnNota.classList.remove('active');
      notaCont.style.display = 'none';
    }
    actualizarIndicadorNota();

    // Configurar botón de Paralelos (Solo si hay un único versículo seleccionado)
    const btnParalelos = document.getElementById('btnAccionParalelos');
    const ultimoElementoDOM = seleccionados[seleccionados.length - 1].elementoDOM;
    const tieneParalelos = ultimoElementoDOM.getAttribute('data-destinos');
    if (tieneParalelos && seleccionados.length === 1) {
      btnParalelos.style.display = 'flex';
      btnParalelos.onclick = function (e) {
        e.stopPropagation();
        cerrarActionSheet();
        abrirParalelosNativos(libroNombre, capNum, vNums[0].toString(), tieneParalelos);
      };
    } else {
      btnParalelos.style.display = 'none';
    }

    // Deslizar panel arriba
    document.getElementById('panelAccionVersiculo').classList.add('open');
  }

  function actualizarIndicadorNota() {
    const input = document.getElementById('accionVNotaInput');
    const btn = document.getElementById('btnGuardarNotaRapido');
    if (!input || !btn) return;
    
    let notaOriginal = "";
    if (seleccionados.length > 0) {
      const primeraAnotacion = anotaciones[seleccionados[0].key];
      if (primeraAnotacion) {
        notaOriginal = primeraAnotacion.nota || "";
      }
    }
    
    const textoActual = input.value.trim();
    const esDiferente = textoActual !== notaOriginal;
    
    if (esDiferente) {
      btn.textContent = "💾";
      btn.className = "btn-guardar-nota-rapido activo";
      btn.title = "Guardar cambios pendientes";
    } else {
      btn.textContent = "✔️";
      btn.className = "btn-guardar-nota-rapido inhibido";
      btn.title = "Cambios guardados";
    }
  }

  function guardarNotaRapida(e) {
    if (e) e.stopPropagation();
    if (seleccionados.length === 0) return;
    
    const input = document.getElementById('accionVNotaInput');
    if (!input) return;
    
    const notaTexto = input.value.trim();
    const batchFecha = new Date().toISOString();
    
    seleccionados.forEach(sel => {
      const anotacion = anotaciones[sel.key] || {
        id: sel.key,
        libroNombre: sel.libroNombre,
        libroId: sel.libroId,
        capitulo: sel.capitulo,
        versiculo: sel.vNum,
        texto: sel.texto,
        color: null,
        subrayado: false,
        marcador: false,
        nota: "",
        fecha: batchFecha
      };
      
      anotacion.nota = notaTexto;
      anotacion.fecha = batchFecha;
      
      anotaciones[sel.key] = anotacion;
      guardarAnotacionesLocales();
      subirAnotacionFirestore(anotacion);
    });
    
    const btnNota = document.getElementById('btnAccionNota');
    if (btnNota) {
      if (notaTexto !== "") {
        btnNota.classList.add('active');
      } else {
        btnNota.classList.remove('active');
      }
    }
    
    actualizarIndicadorNota();
  }

  function cerrarActionSheet() {
    const panel = document.getElementById('panelAccionVersiculo');
    if (panel) {
      panel.classList.remove('open');
    }
    
    // Guardar cambios en la nota al cerrar si hay datos cargados
    if (seleccionados.length > 0) {
      const notaInput = document.getElementById('accionVNotaInput');
      if (notaInput) {
        const notaTexto = notaInput.value.trim();
        const batchFecha = new Date().toISOString();
        
        seleccionados.forEach(sel => {
          const anotacion = anotaciones[sel.key] || {
            id: sel.key,
            libroNombre: sel.libroNombre,
            libroId: sel.libroId,
            capitulo: sel.capitulo,
            versiculo: sel.vNum,
            texto: sel.texto,
            color: null,
            subrayado: false,
            marcador: false,
            nota: "",
            fecha: batchFecha
          };
          
          if (notaTexto !== (anotacion.nota || "")) {
            anotacion.nota = notaTexto;
            anotacion.fecha = batchFecha;
            
            anotaciones[sel.key] = anotacion;
            guardarAnotacionesLocales();
            subirAnotacionFirestore(anotacion);
          }
        });
      }

      // Quitar selección visual y botón de más de todos los versículos
      document.querySelectorAll('.versiculo').forEach(el => {
        el.classList.remove('seleccionado-actual');
        const btn = el.querySelector('.btn-mas-versiculo');
        if (btn) btn.remove();
        const btnV = el.querySelector('.btn-voz-versiculo');
        if (btnV) btnV.remove();
      });
      seleccionados = [];
    }
  }

  function configurarEventosActionSheet() {
    const panel = document.getElementById('panelAccionVersiculo');
    const btnCerrar = document.getElementById('closeAccionVBtn');
    
    if (btnCerrar) {
      btnCerrar.addEventListener('click', cerrarActionSheet);
    }
    
    // Clics fuera para cerrar la selección y el panel
    document.addEventListener('click', (e) => {
      const modal = document.getElementById('modalAnotaciones');
      
      if (!e.target.closest('.versiculo') && 
          (!panel || !panel.contains(e.target)) && 
          (!modal || !modal.contains(e.target)) &&
          !e.target.classList.contains('google-logout-btn') &&
          !e.target.classList.contains('google-login-btn')) {
        
        if (panel && panel.classList.contains('open')) {
          cerrarActionSheet();
        } else {
          quitarSeleccionVersiculo();
        }
      }
    });

    // Eventos de selección de color
    const dotsColor = document.querySelectorAll('.accion-v-color-dot');
    dotsColor.forEach(dot => {
      dot.addEventListener('click', () => {
        if (seleccionados.length === 0) return;
        
        const color = dot.getAttribute('data-color');
        
        // Determinar si quitamos o ponemos
        const primerId = seleccionados[0].key;
        const yaTieneColor = anotaciones[primerId] && anotaciones[primerId].color === color;
        const colorAAplicar = yaTieneColor ? null : color;

        if (colorAAplicar === null) {
          dotsColor.forEach(d => d.classList.remove('selected'));
        } else {
          dotsColor.forEach(d => d.classList.remove('selected'));
          dot.classList.add('selected');
        }

        seleccionados.forEach(sel => {
          const anotacion = anotaciones[sel.key] || {
            id: sel.key,
            libroNombre: sel.libroNombre,
            libroId: sel.libroId,
            capitulo: sel.capitulo,
            versiculo: sel.vNum,
            texto: sel.texto,
            color: null,
            subrayado: false,
            marcador: false,
            nota: "",
            fecha: new Date().toISOString()
          };

          const spanTexto = sel.elementoDOM.querySelector('.v-texto') || sel.elementoDOM;
          
          if (anotacion.color) {
            spanTexto.classList.remove(`destacado-${anotacion.color}`);
          }
          
          anotacion.color = colorAAplicar;
          anotacion.fecha = new Date().toISOString();

          if (colorAAplicar) {
            spanTexto.classList.add(`destacado-${colorAAplicar}`);
          }

          anotaciones[sel.key] = anotacion;
          guardarAnotacionesLocales();
          subirAnotacionFirestore(anotacion);
        });

        // Ocultar Action Sheet automáticamente después de seleccionar color
        setTimeout(() => cerrarActionSheet(), 200);
      });
    });

    // Limpiar color destacado y subrayado
    const clearBtn = document.getElementById('clearColorBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (seleccionados.length === 0) return;
        
        dotsColor.forEach(d => d.classList.remove('selected'));
        const btnSubrayar = document.getElementById('btnAccionSubrayar');
        if (btnSubrayar) btnSubrayar.classList.remove('active');

        seleccionados.forEach(sel => {
          const anotacion = anotaciones[sel.key] || {
            id: sel.key,
            libroNombre: sel.libroNombre,
            libroId: sel.libroId,
            capitulo: sel.capitulo,
            versiculo: sel.vNum,
            texto: sel.texto,
            color: null,
            subrayado: false,
            marcador: false,
            nota: "",
            fecha: new Date().toISOString()
          };

          const spanTexto = sel.elementoDOM.querySelector('.v-texto') || sel.elementoDOM;
          if (anotacion.color) {
            spanTexto.classList.remove(`destacado-${anotacion.color}`);
          }
          spanTexto.classList.remove('subrayado-linea');
          
          anotacion.color = null;
          anotacion.subrayado = false;
          anotacion.fecha = new Date().toISOString();

          anotaciones[sel.key] = anotacion;
          guardarAnotacionesLocales();
          subirAnotacionFirestore(anotacion);
        });

        // Ocultar Action Sheet automáticamente después de limpiar
        setTimeout(() => cerrarActionSheet(), 200);
      });
    }

    // Botón Subrayar
    const btnSubrayar = document.getElementById('btnAccionSubrayar');
    if (btnSubrayar) {
      btnSubrayar.addEventListener('click', () => {
        if (seleccionados.length === 0) return;
        
        const primerId = seleccionados[0].key;
        const yaSubrayado = anotaciones[primerId] && anotaciones[primerId].subrayado;
        const subrayadoAAplicar = !yaSubrayado;

        if (subrayadoAAplicar) btnSubrayar.classList.add('active');
        else btnSubrayar.classList.remove('active');

        seleccionados.forEach(sel => {
          const anotacion = anotaciones[sel.key] || {
            id: sel.key,
            libroNombre: sel.libroNombre,
            libroId: sel.libroId,
            capitulo: sel.capitulo,
            versiculo: sel.vNum,
            texto: sel.texto,
            color: null,
            subrayado: false,
            marcador: false,
            nota: "",
            fecha: new Date().toISOString()
          };

          const spanTexto = sel.elementoDOM.querySelector('.v-texto') || sel.elementoDOM;
          anotacion.subrayado = subrayadoAAplicar;
          anotacion.fecha = new Date().toISOString();

          if (subrayadoAAplicar) {
            spanTexto.classList.add('subrayado-linea');
          } else {
            spanTexto.classList.remove('subrayado-linea');
          }

          anotaciones[sel.key] = anotacion;
          guardarAnotacionesLocales();
          subirAnotacionFirestore(anotacion);
        });

        // Ocultar Action Sheet automáticamente después de subrayar
        setTimeout(() => cerrarActionSheet(), 200);
      });
    }

    // Botón Marcador (Guardar)
    const btnMarcador = document.getElementById('btnAccionMarcador');
    if (btnMarcador) {
      btnMarcador.addEventListener('click', () => {
        if (seleccionados.length === 0) return;
        
        const primerId = seleccionados[0].key;
        const yaMarcador = anotaciones[primerId] && anotaciones[primerId].marcador;
        const marcadorAAplicar = !yaMarcador;

        if (marcadorAAplicar) btnMarcador.classList.add('active');
        else btnMarcador.classList.remove('active');

        seleccionados.forEach(sel => {
          const anotacion = anotaciones[sel.key] || {
            id: sel.key,
            libroNombre: sel.libroNombre,
            libroId: sel.libroId,
            capitulo: sel.capitulo,
            versiculo: sel.vNum,
            texto: sel.texto,
            color: null,
            subrayado: false,
            marcador: false,
            nota: "",
            fecha: new Date().toISOString()
          };

          anotacion.marcador = marcadorAAplicar;
          anotacion.fecha = new Date().toISOString();

          anotaciones[sel.key] = anotacion;
          guardarAnotacionesLocales();
          subirAnotacionFirestore(anotacion);
        });

        // Ocultar Action Sheet automáticamente después de guardar
        setTimeout(() => cerrarActionSheet(), 200);
      });
    }

    // Botón Nota (Toggles textarea)
    const btnNota = document.getElementById('btnAccionNota');
    const notaCont = document.getElementById('accionVNotaCont');
    const notaInput = document.getElementById('accionVNotaInput');
    
    if (btnNota) {
      btnNota.addEventListener('click', () => {
        if (notaCont.style.display === 'none') {
          notaCont.style.display = 'block';
          btnNota.classList.add('active');
          notaInput.focus();
        } else {
          notaCont.style.display = 'none';
          if (notaInput.value.trim() === "") {
            btnNota.classList.remove('active');
          }
        }
      });
    }

    const btnGuardarNotaRapido = document.getElementById('btnGuardarNotaRapido');
    if (notaInput) {
      notaInput.addEventListener('input', actualizarIndicadorNota);
      notaInput.addEventListener('blur', () => guardarNotaRapida());
    }
    if (btnGuardarNotaRapido) {
      btnGuardarNotaRapido.addEventListener('click', guardarNotaRapida);
    }

    // Botón Copiar
    const btnCopiar = document.getElementById('btnAccionCopiar');
    if (btnCopiar) {
      btnCopiar.addEventListener('click', () => {
        if (seleccionados.length === 0) return;
        
        seleccionados.sort((a, b) => parseInt(a.vNum, 10) - parseInt(b.vNum, 10));
        
        const libroNombre = seleccionados[0].libroNombre;
        const capNum = seleccionados[0].capitulo;
        const vNums = seleccionados.map(s => parseInt(s.vNum, 10));
        let citacionV = "";
        const esRangoContinuo = vNums.every((val, i, arr) => i === 0 || val === arr[i-1] + 1);
        if (esRangoContinuo && vNums.length > 1) {
          citacionV = `${vNums[0]}-${vNums[vNums.length - 1]}`;
        } else {
          citacionV = vNums.join(', ');
        }

        const citaRef = `${libroNombre} ${capNum}:${citacionV}`;
        const textoCompletoCopiado = seleccionados.map(s => `[${s.vNum}] ${s.texto}`).join(' ');
        const copiadoTexto = `${citaRef} - "${textoCompletoCopiado}" (Biblia de Estudio)`;
        
        navigator.clipboard.writeText(copiadoTexto)
          .then(() => {
            alert("¡Versículos copiados al portapapeles con éxito!");
            // Ocultar Action Sheet automáticamente después de copiar
            setTimeout(() => cerrarActionSheet(), 200);
          })
          .catch(err => {
            console.error("Error al copiar texto:", err);
          });
      });
    }

    // Botón Compartir
    const btnCompartir = document.getElementById('btnAccionCompartir');
    if (btnCompartir) {
      btnCompartir.addEventListener('click', () => {
        if (seleccionados.length === 0) return;
        
        seleccionados.sort((a, b) => parseInt(a.vNum, 10) - parseInt(b.vNum, 10));
        const libroNombre = seleccionados[0].libroNombre;
        const capNum = seleccionados[0].capitulo;
        const vNums = seleccionados.map(s => parseInt(s.vNum, 10));
        let citacionV = "";
        const esRangoContinuo = vNums.every((val, i, arr) => i === 0 || val === arr[i-1] + 1);
        if (esRangoContinuo && vNums.length > 1) {
          citacionV = `${vNums[0]}-${vNums[vNums.length - 1]}`;
        } else {
          citacionV = vNums.join(', ');
        }

        const citaRef = `${libroNombre} ${capNum}:${citacionV}`;
        const textoCompletoCompartido = seleccionados.map(s => `[${s.vNum}] ${s.texto}`).join(' ');
        const compartirTexto = `${citaRef} - "${textoCompletoCompartido}"`;
        
        if (navigator.share) {
          navigator.share({
            title: 'Biblia de Estudio',
            text: compartirTexto,
            url: window.location.href
          })
          .then(() => {
            setTimeout(() => cerrarActionSheet(), 200);
          })
          .catch(err => console.warn(err));
        } else {
          navigator.clipboard.writeText(compartirTexto + " " + window.location.href);
          alert("Web Share no soportado. Se copió el texto y el enlace al portapapeles.");
          setTimeout(() => cerrarActionSheet(), 200);
        }
      });
    }
  }

  // 6. Modal de Listados (Marcadores, Notas, Destacados)
  function inyectarModalAnotaciones() {
    if (document.getElementById('modalAnotaciones')) return;

    const div = document.createElement('div');
    div.innerHTML = `
      <div class="modal-anotaciones" id="modalAnotaciones">
        <div class="modal-anotaciones-content">
          <div class="modal-anotaciones-header">
            <h3 class="modal-anotaciones-titulo" id="modalAnotacionesTitulo">Cargando...</h3>
            <button class="modal-anotaciones-close" id="closeModalAnotacionesBtn" aria-label="Cerrar">&times;</button>
          </div>
          <div class="modal-anotaciones-busqueda">
            <span class="material-symbols-outlined modal-anotaciones-buscar-icon">search</span>
            <input type="text" class="modal-anotaciones-input-buscar" id="buscarAnotacionesInput" placeholder="Buscar versículos o notas...">
          </div>
          <div class="modal-anotaciones-body" id="modalAnotacionesBody">
            <!-- Cargado con JS -->
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(div.firstElementChild);

    // Evento de Cierre del Modal
    const btnCerrar = document.getElementById('closeModalAnotacionesBtn');
    const modal = document.getElementById('modalAnotaciones');
    if (btnCerrar) {
      btnCerrar.addEventListener('click', () => {
        modal.classList.remove('open');
      });
    }
    
    // Cerrar al hacer clic en el fondo difuminado
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
        }
      });
    }
  }

  function mostrarAnotacionesDeTipo(tipo) {
    inyectarModalAnotaciones();
    
    const modal = document.getElementById('modalAnotaciones');
    const titulo = document.getElementById('modalAnotacionesTitulo');
    const inputBuscar = document.getElementById('buscarAnotacionesInput');
    
    // Cerrar sidebar si la función global existe
    if (typeof window.closeMenu === 'function') {
      window.closeMenu();
    }

    modal.classList.add('open');
    inputBuscar.value = ""; // Limpiar búsqueda previa

    let tituloTexto = "";
    if (tipo === 'marcadores') tituloTexto = "🔖 Mis Marcadores";
    else if (tipo === 'notas') tituloTexto = "📝 Mis Notas de Estudio";
    else if (tipo === 'destacados') tituloTexto = "🅰️ Textos Destacados";
    
    titulo.textContent = tituloTexto;

    // Función interna para filtrar y renderizar (agrupando por lote/fecha de marcado)
    function renderizarFiltro(query = "") {
      const bodyList = document.getElementById('modalAnotacionesBody');
      bodyList.innerHTML = "";

      const queryLimpia = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
      // Filtrar base de datos individualmente
      const filtrados = Object.values(anotaciones).filter(item => {
        // Filtrar por tipo primero
        if (tipo === 'marcadores' && !item.marcador) return false;
        if (tipo === 'notas' && (!item.nota || item.nota.trim() === "")) return false;
        if (tipo === 'destacados' && !item.color) return false;

        // Filtrar por búsqueda si hay texto
        if (queryLimpia !== "") {
          const textoRef = `${item.libroNombre} ${item.capitulo} ${item.versiculo}`.toLowerCase();
          const textoVersiculo = (item.texto || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const textoNota = (item.nota || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          
          return textoRef.includes(queryLimpia) || textoVersiculo.includes(queryLimpia) || textoNota.includes(queryLimpia);
        }

        return true;
      });

      // Agrupar items por fecha (lote) y libro/capítulo
      const grupos = {};
      filtrados.forEach(item => {
        // Clave basada en la fecha y el capítulo para agrupar marcas del mismo lote
        const claveGrupo = item.fecha ? `${item.libroId}_c${item.capitulo}_f${item.fecha}` : item.id;
        
        if (!grupos[claveGrupo]) {
          grupos[claveGrupo] = {
            libroId: item.libroId,
            libroNombre: item.libroNombre,
            capitulo: item.capitulo,
            versiculos: [parseInt(item.versiculo, 10)],
            textosMap: { [item.versiculo]: item.texto },
            clavesAnotaciones: [item.id],
            nota: item.nota || "",
            color: item.color,
            subrayado: item.subrayado,
            marcador: item.marcador,
            fecha: item.fecha
          };
        } else {
          // Agregar versículo a grupo existente
          const vNumInt = parseInt(item.versiculo, 10);
          if (!grupos[claveGrupo].versiculos.includes(vNumInt)) {
            grupos[claveGrupo].versiculos.push(vNumInt);
          }
          grupos[claveGrupo].textosMap[item.versiculo] = item.texto;
          grupos[claveGrupo].clavesAnotaciones.push(item.id);
          
          if (item.nota && item.nota !== grupos[claveGrupo].nota) {
            if (!grupos[claveGrupo].nota) {
              grupos[claveGrupo].nota = item.nota;
            } else if (!grupos[claveGrupo].nota.includes(item.nota)) {
              grupos[claveGrupo].nota += " | " + item.nota;
            }
          }
        }
      });

      // Convertir a array agrupado final
      const itemsAgrupados = Object.values(grupos).map(g => {
        g.versiculos.sort((a, b) => a - b);
        
        let citacionV = "";
        const esRangoContinuo = g.versiculos.every((val, i, arr) => i === 0 || val === arr[i-1] + 1);
        if (esRangoContinuo && g.versiculos.length > 1) {
          citacionV = `${g.versiculos[0]}-${g.versiculos[g.versiculos.length - 1]}`;
        } else {
          citacionV = g.versiculos.join(', ');
        }
        
        const textoCompleto = g.versiculos.map(vNum => g.textosMap[vNum]).join(' ');
        
        return {
          libroId: g.libroId,
          libroNombre: g.libroNombre,
          capitulo: g.capitulo,
          versiculo: citacionV,
          primerVersiculo: g.versiculos[0],
          texto: textoCompleto,
          clavesAnotaciones: g.clavesAnotaciones,
          nota: g.nota,
          color: g.color,
          subrayado: g.subrayado,
          marcador: g.marcador,
          fecha: g.fecha
        };
      });

      // Ordenar por fecha (más recientes arriba)
      itemsAgrupados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

      if (itemsAgrupados.length === 0) {
        bodyList.innerHTML = `<div class="item-anotacion-vacio">No se encontraron elementos guardados.</div>`;
        return;
      }

      itemsAgrupados.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-anotacion-card';
        
        let fechaFormateada = "";
        try {
          fechaFormateada = new Date(item.fecha).toLocaleDateString();
        } catch (e) {
          fechaFormateada = "";
        }

        let sombreadoHTML = "";
        if (item.color) {
          let emoji = "🟡";
          if (item.color === 'azul') emoji = "🔵";
          else if (item.color === 'rosado') emoji = "🌸";
          else if (item.color === 'verde') emoji = "🟢";
          else if (item.color === 'naranja') emoji = "🟠";
          else if (item.color === 'rojo') emoji = "🔴";
          else if (item.color === 'morado') emoji = "🟣";
          sombreadoHTML = `<span style="font-size:0.8rem; margin-right:4px;">${emoji} Destacado</span>`;
        } else {
          sombreadoHTML = `<span style="font-size:0.8rem; margin-right:4px;">⚪ Guardado</span>`;
        }

        card.innerHTML = `
          <div class="item-anotacion-ref">
            <span>📌 ${item.libroNombre} ${item.capitulo}:${item.versiculo}</span>
            <div class="item-anotacion-meta-col">
              <div class="item-anotacion-acciones">
                <button class="item-accion-btn btn-item-copiar" title="Copiar versículos">📋</button>
                <button class="item-accion-btn btn-item-compartir" title="Compartir versículos">🔗</button>
                <button class="item-accion-btn btn-item-borrar" title="Eliminar anotación">🗑️</button>
              </div>
              <span class="item-anotacion-fecha">${sombreadoHTML} ${fechaFormateada}</span>
            </div>
          </div>
          <div class="item-anotacion-texto">"${item.texto}"</div>
          ${item.nota ? `<div class="item-anotacion-nota"><strong>Nota:</strong> ${item.nota}</div>` : ''}
        `;

        // Detener la propagación cuando hagan clic en los botones de acción individuales
        const btnItemCopiar = card.querySelector('.btn-item-copiar');
        if (btnItemCopiar) {
          btnItemCopiar.addEventListener('click', (e) => {
            e.stopPropagation();
            const citaRef = `${item.libroNombre} ${item.capitulo}:${item.versiculo}`;
            const copiadoTexto = `${citaRef} - "${item.texto}" (Biblia de Estudio)`;
            navigator.clipboard.writeText(copiadoTexto)
              .then(() => alert("¡Versículos copiados al portapapeles!"))
              .catch(err => console.error(err));
          });
        }

        const btnItemCompartir = card.querySelector('.btn-item-compartir');
        if (btnItemCompartir) {
          btnItemCompartir.addEventListener('click', (e) => {
            e.stopPropagation();
            const citaRef = `${item.libroNombre} ${item.capitulo}:${item.versiculo}`;
            const compartirTexto = `${citaRef} - "${item.texto}"`;
            if (navigator.share) {
              navigator.share({
                title: 'Biblia de Estudio',
                text: compartirTexto,
                url: window.location.href
              }).catch(err => console.warn(err));
            } else {
              navigator.clipboard.writeText(compartirTexto + " " + window.location.href);
              alert("Texto y enlace copiados para compartir.");
            }
          });
        }

        const btnItemBorrar = card.querySelector('.btn-item-borrar');
        if (btnItemBorrar) {
          btnItemBorrar.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`¿Estás seguro de que deseas eliminar esta anotación para ${item.libroNombre} ${item.capitulo}:${item.versiculo}?`)) {
              item.clavesAnotaciones.forEach(key => {
                const anotacion = anotaciones[key];
                if (anotacion) {
                  anotacion.color = null;
                  anotacion.subrayado = false;
                  anotacion.marcador = false;
                  anotacion.nota = "";
                  anotacion.fecha = new Date().toISOString();
                  
                  delete anotaciones[key];
                  subirAnotacionFirestore(anotacion);
                }
              });
              
              guardarAnotacionesLocales();
              
              if (window.idLibroActual === item.libroId && window.capituloActualNum === item.capitulo) {
                aplicarAnotacionesAlCapituloActual();
              }
              
              renderizarFiltro(inputBuscar.value);
              alert("Anotación eliminada correctamente.");
            }
          });
        }

        // Al hacer clic, navegar al primer versículo del grupo en el lector principal
        card.addEventListener('click', () => {
          modal.classList.remove('open');
          
          window.scrollToVerseAfterRender = item.primerVersiculo;

          if (window.idLibroActual === item.libroId) {
            if (typeof window.seleccionarCapitulo === 'function') {
              window.seleccionarCapitulo(item.capitulo);
            }
          } else {
            if (typeof window.seleccionarLibro === 'function') {
              window.evitarAutoAbrirCapitulos = true;
              window.seleccionarLibro(item.libroId, window.indiceLibrosRutas[item.libroId].ruta);
              setTimeout(() => {
                if (typeof window.seleccionarCapitulo === 'function') {
                  window.seleccionarCapitulo(item.capitulo);
                }
              }, 300);
            }
          }
        });

        bodyList.appendChild(card);
      });
    }

    // Configurar trigger de búsqueda
    inputBuscar.oninput = (e) => {
      renderizarFiltro(e.target.value);
    };

    renderizarFiltro();
  }

  // 7. Enlazar eventos de la barra lateral al iniciar
  function configurarEventosSidebar() {
    const btnEscrutacio = document.getElementById('menuEscrutacioBtn');
    if (btnEscrutacio) {
      btnEscrutacio.addEventListener('click', (e) => {
        e.preventDefault();
        abrirEscrutacioModal();
      });
    }

    const btnEscrutacioCalendario = document.getElementById('menuEscrutacioCalendarioBtn');
    if (btnEscrutacioCalendario) {
      btnEscrutacioCalendario.addEventListener('click', (e) => {
        e.stopPropagation();
        abrirEscrutacioModal();
        const histCont = document.getElementById('escrutacioHistorialCont');
        if (histCont) histCont.style.display = 'block';
        toggleSelectorPasaje(false); // Colapsar el selector al abrir desde el calendario del menú
      });
    }

    const btnMarcadores = document.getElementById('menuMarcadoresBtn');
    const btnNotas = document.getElementById('menuNotasBtn');
    const btnDestacados = document.getElementById('menuDestacadosBtn');
    const btnCompartirApp = document.getElementById('menuCompartirAppBtn');
    const btnComentarios = document.getElementById('menuComentariosBtn');
    const btnOtrosRecursos = document.getElementById('btnOtrosRecursos');
    const submenuOtrosRecursos = document.getElementById('submenuOtrosRecursos');
    const btnRedesSociales = document.getElementById('btnRedesSociales');
    const submenuRedesSociales = document.getElementById('submenuRedesSociales');

    if (btnMarcadores) {
      btnMarcadores.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarAnotacionesDeTipo('marcadores');
      });
    }

    if (btnNotas) {
      btnNotas.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarAnotacionesDeTipo('notes'); // Filtro interno usa 'notas'
        mostrarAnotacionesDeTipo('notas');
      });
    }

    if (btnDestacados) {
      btnDestacados.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarAnotacionesDeTipo('destacados');
      });
    }

    if (btnCompartirApp) {
      btnCompartirApp.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Cerrar menú lateral si está abierto
        if (typeof window.closeMenu === 'function') {
          window.closeMenu();
        } else {
          const sidebar = document.getElementById('sidebar');
          const overlay = document.getElementById('overlay');
          if (sidebar) sidebar.classList.remove('open');
          if (overlay) overlay.classList.remove('show');
        }

        const shareData = {
          title: 'Biblia de Jerusalén con Paralelos',
          text: 'Te comparto la Biblia de Jerusalén con Paralelos para leer y estudiar las Escrituras.',
          url: 'https://biblia.resucito.do/'
        };

        if (navigator.share) {
          navigator.share(shareData)
            .catch((err) => {
              console.log('Error al compartir:', err);
            });
        } else {
          navigator.clipboard.writeText(shareData.text + " " + shareData.url)
            .then(() => {
              alert('Enlace y mensaje de la app copiados al portapapeles.');
            })
            .catch((err) => {
              console.error('Error al copiar:', err);
            });
        }
      });
    }

    if (btnComentarios) {
      btnComentarios.addEventListener('click', (e) => {
        // Cerrar menú lateral si está abierto
        if (typeof window.closeMenu === 'function') {
          window.closeMenu();
        } else {
          const sidebar = document.getElementById('sidebar');
          const overlay = document.getElementById('overlay');
          if (sidebar) sidebar.classList.remove('open');
          if (overlay) overlay.classList.remove('show');
        }
        // Dejamos que continúe el comportamiento nativo del enlace
      });
    }

    if (btnOtrosRecursos && submenuOtrosRecursos) {
      btnOtrosRecursos.addEventListener('click', (e) => {
        e.preventDefault();
        const isVisible = submenuOtrosRecursos.style.display === 'block';
        submenuOtrosRecursos.style.display = isVisible ? 'none' : 'block';
        btnOtrosRecursos.classList.toggle('open', !isVisible);
      });
    }

    if (btnRedesSociales && submenuRedesSociales) {
      btnRedesSociales.addEventListener('click', (e) => {
        e.preventDefault();
        const isVisible = submenuRedesSociales.style.display === 'block';
        submenuRedesSociales.style.display = isVisible ? 'none' : 'block';
        btnRedesSociales.classList.toggle('open', !isVisible);
      });
    }

    // Cerrar sidebar al hacer clic en cualquier recurso del submenú
    const submenuItems = document.querySelectorAll('.sidebar-submenu .submenu-item');
    submenuItems.forEach(item => {
      item.addEventListener('click', () => {
        if (typeof window.closeMenu === 'function') {
          window.closeMenu();
        } else {
          const sidebar = document.getElementById('sidebar');
          const overlay = document.getElementById('overlay');
          if (sidebar) sidebar.classList.remove('open');
          if (overlay) overlay.classList.remove('show');
        }
      });
    });

    // Eventos de Versículo Diario y Calendario
    const btnVersiculoDiario = document.getElementById('menuVersiculoDiarioBtn');
    const btnCalendario = document.getElementById('menuCalendarioBtn');
    const btnCloseCalendario = document.getElementById('closeCalendarioBtn');
    const modalCalendario = document.getElementById('modalCalendario');

    if (btnVersiculoDiario) {
      btnVersiculoDiario.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarVersiculoDiarioHoy();
      });
    }

    if (btnCalendario) {
      btnCalendario.addEventListener('click', (e) => {
        e.stopPropagation();
        abrirCalendarioModal();
      });
    }

    if (btnCloseCalendario) {
      btnCloseCalendario.addEventListener('click', cerrarCalendarioModal);
    }

    if (modalCalendario) {
      modalCalendario.addEventListener('click', (e) => {
        if (e.target === modalCalendario) {
          cerrarCalendarioModal();
        }
      });
    }
  }

  // Inicialización de lógica
  document.addEventListener('DOMContentLoaded', () => {
    cargarAnotacionesLocales();
    cargarVersiculosDiariosLocales();
    cargarEscrutaciosLocales();
    inyectarActionSheet();
    configurarEventosSidebar();
    configurarEventosEscrutacio();
    
    // Si la carga inicial de jsgral.js ya renderizó versículos, aplicar anotaciones
    setTimeout(() => {
      configurarClicsEnVersiculos();
      aplicarAnotacionesAlCapituloActual();
    }, 600);
  });
})();
