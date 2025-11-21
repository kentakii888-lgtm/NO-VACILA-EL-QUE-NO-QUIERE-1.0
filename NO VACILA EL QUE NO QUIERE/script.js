const personas = [
	{
		nombre: "Laureee",
		descripcion: "Estudiante de la ETI. Toca la bateria y tambien toca menores",
		foto: "img/laure.jpg",
		instagram: "https://www.instagram.com/lauree.gavazza/"
	},
	{
		nombre: "Coco",
		descripcion: "No tiene laburo. Apasionado por el corsa y las gorditas.",
		foto: "img/coco.jpg",
		instagram: "https://www.instagram.com/saantibenitez__/"
	},
	{
		nombre: "Eze",
		descripcion: "Repartidor textil. toca la flauta con su nariz y juega basquet.",
		foto: "img/eze1.jpg",
		instagram: "https://instagram.com/eze"
	},
	{
		nombre: "Guido",
		descripcion: "Estudiante el secundario. amante del vaper y de culear.",
		foto: "https://randomuser.me/api/portraits/men/23.jpg",
		instagram: "https://www.instagram.com/guidoo.raimundo/"
	},
	{
		nombre: "Pota",
		descripcion: "Estudiando en la ETI. Le gustan las compus y las turras.",
		foto: "img/pota1.jpg",
		instagram: "https://instagram.com/pota"
	},
	{
		nombre: "Patri",
		descripcion: "Estudiante de abogacia. Le gusta dormir y las milipilis",
		foto: "img/patri.jpg",
		instagram: "https://www.instagram.com/patriherrera__/"
	},

];

// --- LÓGICA UNIFICADA ---
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DEL PRELOADER ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.onload = () => { // Se usa window.onload para esperar a que todas las imágenes carguen
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        };
    }

    // --- LÓGICA PARA MODO OSCURO ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const applyTheme = (theme) => {
            document.body.classList.toggle('dark-mode', theme === 'dark');
            themeToggle.checked = theme === 'dark';
        };

        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);

        themeToggle.addEventListener('change', function() {
            const newTheme = this.checked ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    // --- LÓGICA PARA PÁGINA DE PERFILES ---
    const profilesList = document.getElementById('profiles-list');
    if (profilesList) {
        const personasOrdenadas = personas.sort((a, b) => a.nombre.localeCompare(b.nombre));
        personasOrdenadas.forEach((persona, idx) => {
            const btn = document.createElement('button');
            btn.className = 'open-profile-btn';
            btn.textContent = persona.nombre;
            btn.onclick = () => openProfileModal(idx);
            profilesList.appendChild(btn);
        });

        const modal = document.getElementById('profile-modal');
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.onclick = () => { modal.style.display = 'none'; };
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }

    // --- LÓGICA DEL MURO DE MENSAJES ---
    const muroForm = document.getElementById('muro-form');
    if (muroForm) {
        const muroNombre = document.getElementById('muro-nombre');
        const muroMensaje = document.getElementById('muro-mensaje');
        const muroLista = document.getElementById('muro-lista');
        const MENSAJES_STORAGE_KEY = 'mensajesDelMuro';

        const cargarMensajesGuardados = () => {
            const mensajes = JSON.parse(localStorage.getItem(MENSAJES_STORAGE_KEY) || '[]');
            muroLista.innerHTML = '';
            mensajes.forEach(mensaje => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${mensaje.nombre}:</strong> ${mensaje.texto}`;
                muroLista.prepend(li);
            });
        };

        cargarMensajesGuardados();

        muroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = muroNombre.value.trim();
            const mensaje = muroMensaje.value.trim();
            const honeypot = document.querySelector('#muro-form .honeypot-field').value;

            if (honeypot) return;

            if (nombre && mensaje) {
                const mensajes = JSON.parse(localStorage.getItem(MENSAJES_STORAGE_KEY) || '[]');
                mensajes.push({ nombre, texto: mensaje });
                localStorage.setItem(MENSAJES_STORAGE_KEY, JSON.stringify(mensajes));
                
                const li = document.createElement('li');
                li.innerHTML = `<strong>${nombre}:</strong> ${mensaje}`;
                muroLista.prepend(li);

                muroForm.reset();
            }
        });
    }

    // --- LÓGICA DEL SLIDESHOW (CARRUSEL) ---
    const slideshow = document.querySelector('.slideshow-container');
    if (slideshow) {
        let slideIndex = 1;
        const slides = document.getElementsByClassName("mySlides");

        const showSlides = (n) => {
            if (slides.length === 0) return;
            if (n > slides.length) slideIndex = 1;
            if (n < 1) slideIndex = slides.length;
            
            Array.from(slides).forEach(slide => slide.style.display = "none");
            slides[slideIndex - 1].style.display = "block";
        };

        window.plusSlides = (n) => showSlides(slideIndex += n);

        showSlides(slideIndex);
        setInterval(() => plusSlides(1), 5000);
    }

    // --- LÓGICA DE ANIMACIONES AL HACER SCROLL ---
    const hiddenElements = document.querySelectorAll('.hidden');
    if (hiddenElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        });
        hiddenElements.forEach((el) => observer.observe(el));
    }

    // --- LÓGICA DEL BOTÓN "VOLVER ARRIBA" ---
    const backToTopButton = document.getElementById("back-to-top-btn");
    if (backToTopButton) {
        window.onscroll = () => {
            const showButton = document.body.scrollTop > 100 || document.documentElement.scrollTop > 100;
            backToTopButton.style.display = showButton ? "block" : "none";
        };
        backToTopButton.onclick = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }
});

// Esta función se mantiene global para ser llamada desde los botones
function openProfileModal(idx) {
    const persona = personas[idx];
    const modal = document.getElementById('profile-modal');
    const modalProfile = document.getElementById('modal-profile-card');
    modalProfile.innerHTML = `
        <div class="profile-card">
            <img src="${persona.foto}" alt="Foto de perfil de ${persona.nombre}" class="profile-img">
            <h2 class="profile-name">${persona.nombre}</h2>
            <p class="profile-desc">${persona.descripcion}</p>
            <div class="profile-social">
                <a href="${persona.instagram}" title="Instagram de ${persona.nombre}" target="_blank"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram"></a>
            </div>
        </div>
    `;
    modal.style.display = 'block';
}
