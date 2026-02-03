// Inicializar Animaciones
AOS.init({
    duration: 1000,
    once: false,
    mirror: true
});

// Efecto Lineal de Crecimiento (Funcionalista)
gsap.to("#plane-trigger", {
    width: "200px",
    duration: 2,
    scrollTrigger: {
        trigger: "#inicio",
        start: "top center",
    }
});

// Gestión de Modal
function toggleModal(id) {
    const modal = document.getElementById(id);
    modal.classList.toggle('hidden');
}

// Lógica de Autenticación con LocalStorage
function handleAuth(type) {
    const user = document.getElementById('user-input').value;
    const pass = document.getElementById('pass-input').value;

    if (!user || !pass) {
        alert("Por favor, llena los campos.");
        return;
    }

    let users = JSON.parse(localStorage.getItem('hool_users')) || [];

    if (type === 'register') {
        const exists = users.find(u => u.username === user);
        if (exists) {
            alert("El usuario ya existe.");
        } else {
            users.push({ username: user, password: pass });
            localStorage.setItem('hool_users', JSON.stringify(users));
            alert("Registro exitoso. Ahora puedes iniciar sesión.");
        }
    } else {
        const validUser = users.find(u => u.username === user && u.password === pass);
        if (validUser) {
            sessionStorage.setItem('active_hool_user', user);
            updateUI(user);
            toggleModal('login-modal');
        } else {
            alert("Credenciales incorrectas.");
        }
    }
}

function updateUI(username) {
    const authSection = document.getElementById('auth-section');
    if (username) {
        authSection.innerHTML = `
            <div class="flex items-center gap-4">
                <span class="text-hoolYellow font-bold uppercase text-xs">Bienvenidx, ${username}</span>
                <button onclick="logout()" class="text-white text-xs underline">Salir</button>
            </div>
        `;
    } else {
        authSection.innerHTML = `
            <button onclick="toggleModal('login-modal')" class="bg-hoolYellow text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition">Entrar</button>
        `;
    }
}

function logout() {
    sessionStorage.removeItem('active_hool_user');
    updateUI(null);
}

// Persistencia al recargar
window.onload = () => {
    const activeUser = sessionStorage.getItem('active_hool_user');
    if (activeUser) updateUI(activeUser);
};
