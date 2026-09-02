/**
 * googlefirebase.js
 * Configuración e inicialización de Firebase.
 * Gestión del inicio de sesión con Google y sincronización del estado de autenticación.
 */

// 1. Configuración de Firebase (Reemplazar con tus credenciales de consola de Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyDj2R0hMVvda9NCNzgd5fxy84VVebJ19qQ",
  authDomain: "biblia-de-jerusalen-digital.firebaseapp.com",
  projectId: "biblia-de-jerusalen-digital",
  storageBucket: "biblia-de-jerusalen-digital.firebasestorage.app",
  messagingSenderId: "409423607422",
  appId: "1:409423607422:web:bd071c3514f7c437880a2f"
};

// Variables globales de servicio
let auth = null;
let db = null;
let firebaseConfigured = false;

// Initialize Firebase
// 2. Intentar inicializar Firebase

/*const app = initializeApp(firebaseConfig);*/
try {
  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    
    // Habilitar persistencia offline en Firestore para uso móvil offline con soporte multi-pestaña
    db.enablePersistence({ synchronizeTabs: true }).catch(err => {
      if (err.code !== 'failed-precondition' && err.code !== 'unimplemented') {
        console.warn("Firestore offline persistence fallback:", err.code);
      }
    });
    
    firebaseConfigured = true;
    console.log("Firebase inicializado con éxito.");
  } else {
    console.warn("Firebase SDK no detectado. Operando en modo local (LocalStorage).");
  }
} catch (e) {
  console.error("Error al inicializar Firebase. Operando en modo offline/local:", e);
}

function actualizarInterfazPerfil(user) {
  const container = document.getElementById('perfilUsuarioCont');
  if (!container) return;

  if (user) {
    const photoURL = user.photoURL || 'src/img/ico.ico';
    const displayName = user.displayName || 'Usuario';

    container.innerHTML = `
      <div class="user-profile-wrapper" style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img class="user-profile-img" src="${photoURL}" alt="Foto de perfil" onerror="this.src='src/img/ico.ico'" style="width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.15); object-fit: cover;">
          <div class="user-profile-info" style="display: flex; flex-direction: column; text-align: left; max-width: 130px;">
            <span class="user-profile-name" style="font-size: 0.9rem; font-weight: bold; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${displayName}</span>
            <button class="google-logout-btn" id="googleLogoutBtn" style="background: transparent; color: rgba(255, 255, 255, 0.7); border: none; font-size: 0.75rem; padding: 0; text-decoration: underline; cursor: pointer; text-align: left; width: fit-content; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255, 255, 255, 0.7)'">Cerrar Sesión</button>
          </div>
        </div>
        <button id="btnSalirAplicacion" title="Salir de la Aplicación" style="background: none; border: none; padding: 4px; color: rgba(255, 255, 255, 0.8); cursor: pointer; display: flex; align-items: center; justify-content: center; margin-right: 5px; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255, 255, 255, 0.8)'">
          <span class="material-symbols-outlined" style="font-size: 1.4rem;">logout</span>
        </button>
      </div>
    `;
    
    // Registrar evento de cierre de sesión
    const logoutBtn = document.getElementById('googleLogoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', cerrarSesionGoogle);
    }
    const salirBtn = document.getElementById('btnSalirAplicacion');
    if (salirBtn) {
      salirBtn.addEventListener('click', salirAplicacion);
    }
  } else {
    // Usuario no autenticado: Mostrar el botón original de Ingresar con Google y botón de Salir de la aplicación
    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <button class="google-login-btn" id="googleLoginBtn" style="flex-grow: 1; margin-right: 10px;">
          <svg viewBox="0 0 24 24" width="16" height="16" style="margin-right:8px; vertical-align: middle;"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/><path fill="#4285F4" d="M16.04 15.345c-1.127.756-2.536 1.2-4.04 1.2a5.09 5.09 0 0 1-4.827-3.44l-4.103 3.174A10.09 10.09 0 0 0 12 24c2.936 0 5.618-1.01 7.645-2.755l-3.605-5.9Z"/><path fill="#34A853" d="M12 16.545c-2.7 0-4.99-1.8-5.78-4.236L2.117 15.48A10.09 10.09 0 0 0 12 24c3.055 0 5.782-1.145 7.91-3l-3.87-4.455Z"/><path fill="#FBBC05" d="M23.52 12.273c0-.818-.073-1.609-.209-2.373H12v4.582h6.455a5.54 5.54 0 0 1-2.41 3.636l3.87 4.455c2.264-2.09 3.605-5.164 3.605-8.3Z"/></svg>
          Ingresar con Google
        </button>
        <button id="btnSalirAplicacion" title="Salir de la Aplicación" style="background: none; border: none; padding: 4px; color: rgba(255, 255, 255, 0.8); cursor: pointer; display: flex; align-items: center; justify-content: center; margin-right: 5px; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255, 255, 255, 0.8)'">
          <span class="material-symbols-outlined" style="font-size: 1.4rem;">logout</span>
        </button>
      </div>
    `;
    
    // Registrar evento de inicio de sesión
    const loginBtn = document.getElementById('googleLoginBtn');
    if (loginBtn) {
      loginBtn.addEventListener('click', iniciarSesionGoogle);
    }
    const salirBtn = document.getElementById('btnSalirAplicacion');
    if (salirBtn) {
      salirBtn.addEventListener('click', salirAplicacion);
    }
  }
}

// 4. Iniciar sesión con Google (Popup o Redirección en móviles)
function iniciarSesionGoogle() {
  if (!firebaseConfigured || !auth) {
    alert("Firebase no está configurado. Por favor, ingresa tus credenciales en 'src/js/googlefirebase.js' para habilitar el login.");
    return;
  }
  
  const provider = new firebase.auth.GoogleAuthProvider();
  
  // Intentar primero con Popup (más confiable para PWA y evitar bloqueos de cookies de terceros al redirigir en navegadores móviles)
  auth.signInWithPopup(provider)
    .then(result => {
      console.log("Sesión iniciada con éxito por Popup para:", result.user.displayName);
    })
    .catch(err => {
      console.warn("Popup bloqueado o fallido en este entorno, reintentando con Redirect:", err);
      
      // Fallback a Redirección si el popup fue bloqueado, cerrado, o no es soportado por el navegador
      if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user' || err.code === 'auth/operation-not-supported-in-this-environment') {
        auth.signInWithRedirect(provider).catch(redirectErr => {
          console.error("Error al iniciar redirección con Google:", redirectErr);
          alert("Error de autenticación por redirección: " + redirectErr.message);
        });
      } else {
        alert("Error de autenticación: " + err.message);
      }
    });
}

// 5. Cerrar sesión en Firebase
function cerrarSesionGoogle() {
  if (auth) {
    auth.signOut()
      .then(() => {
        console.log("Sesión cerrada con éxito.");
      })
      .catch(err => {
        console.error("Error al cerrar sesión:", err);
      });
  }
}

// 5b. Salir de la aplicación (Cerrar pestaña/web view)
function salirAplicacion() {
  if (navigator.app && navigator.app.exitApp) {
    navigator.app.exitApp(); // Entornos nativos como Cordova / Capacitor / WebView wrappers
  } else if (navigator.device && navigator.device.exitApp) {
    navigator.device.exitApp();
  } else {
    // Para navegadores web normales o PWAs
    window.close();
    // Fallback si el navegador bloquea window.close()
    setTimeout(() => {
      window.location.href = "about:blank";
    }, 200);
  }
}

// 6. Listener de estado de autenticación al cargar
document.addEventListener('DOMContentLoaded', () => {
  if (auth) {
    // Si viene de una redirección móvil, capturar el resultado
    auth.getRedirectResult()
      .then(result => {
        if (result && result.user) {
          console.log("Sesión restaurada tras redirección móvil:", result.user.displayName);
        }
      })
      .catch(err => {
        console.error("Error en resultado de redirección de login:", err);
      });

    // Monitorear cambios en el estado de inicio de sesión
    auth.onAuthStateChanged(user => {
      actualizarInterfazPerfil(user);
      
      // Disparar evento global para indicar que la sesión cambió
      const event = new CustomEvent('firebaseAuthChange', { detail: user });
      document.dispatchEvent(event);
    });
  } else {
    // Mostrar interfaz por defecto sin sesión si Firebase falló
    actualizarInterfazPerfil(null);
  }
});

// Exponer objetos a nivel global
window.firebaseAuth = {
  get currentUser() { return auth ? auth.currentUser : null; },
  get isConfigured() { return firebaseConfigured; },
  get db() { return db; },
  iniciarSesion: iniciarSesionGoogle,
  cerrarSesion: cerrarSesionGoogle
};
