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
    
    // Habilitar persistencia offline en Firestore para uso móvil offline
    db.enablePersistence().catch(err => {
      console.warn("Firestore offline persistence fallback:", err.code);
    });
    
    firebaseConfigured = true;
    console.log("Firebase inicializado con éxito.");
  } else {
    console.warn("Firebase SDK no detectado. Operando en modo local (LocalStorage).");
  }
} catch (e) {
  console.error("Error al inicializar Firebase. Operando en modo offline/local:", e);
}

// 3. Estado de autenticación y actualización de la interfaz de usuario del Sidebar
function actualizarInterfazPerfil(user) {
  const container = document.getElementById('perfilUsuarioCont');
  if (!container) return;

  if (user) {
    // Usuario autenticado: Mostrar foto de perfil, nombre y botón de Cerrar Sesión
    const photoURL = user.photoURL || 'src/img/ico.ico';
    const displayName = user.displayName || 'Usuario';
    
    container.innerHTML = `
      <img class="user-profile-img" src="${photoURL}" alt="Foto de perfil" onerror="this.src='src/img/ico.ico'">
      <div class="user-profile-info">
        <span class="user-profile-name">${displayName}</span>
        <button class="google-logout-btn" id="googleLogoutBtn">Cerrar Sesión</button>
      </div>
    `;
    
    // Registrar evento de cierre de sesión
    const logoutBtn = document.getElementById('googleLogoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', cerrarSesionGoogle);
    }
  } else {
    // Usuario no autenticado: Mostrar el botón original de Ingresar con Google
    container.innerHTML = `
      <button class="google-login-btn" id="googleLoginBtn">
        <svg viewBox="0 0 24 24" width="16" height="16" style="margin-right:8px; vertical-align: middle;"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/><path fill="#4285F4" d="M16.04 15.345c-1.127.756-2.536 1.2-4.04 1.2a5.09 5.09 0 0 1-4.827-3.44l-4.103 3.174A10.09 10.09 0 0 0 12 24c2.936 0 5.618-1.01 7.645-2.755l-3.605-5.9Z"/><path fill="#34A853" d="M12 16.545c-2.7 0-4.99-1.8-5.78-4.236L2.117 15.48A10.09 10.09 0 0 0 12 24c3.055 0 5.782-1.145 7.91-3l-3.87-4.455Z"/><path fill="#FBBC05" d="M23.52 12.273c0-.818-.073-1.609-.209-2.373H12v4.582h6.455a5.54 5.54 0 0 1-2.41 3.636l3.87 4.455c2.264-2.09 3.605-5.164 3.605-8.3Z"/></svg>
        Ingresar con Google
      </button>
    `;
    
    // Registrar evento de inicio de sesión
    const loginBtn = document.getElementById('googleLoginBtn');
    if (loginBtn) {
      loginBtn.addEventListener('click', iniciarSesionGoogle);
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
