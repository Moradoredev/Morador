document.addEventListener('DOMContentLoaded', () => {
    // Animación para alias (MORADOR / CLOP)
    var typedNombre = new Typed('#nombre-dinamico', {
        strings: ['MORADOR', 'CLOP_Gamer21'], 
        typeSpeed: 80,
        backSpeed: 60,
        backDelay: 2500,
        loop: true,
        showCursor: true
    });

    // Animación para especialidades
    var typedRol = new Typed('#rol-dinamico', {
        strings: [
            '|Game Developer', 
            '|C# Programmer', 
            '|Unity Expert', 
            '|Error Debugger'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        loop: true
    });

    // Smooth scroll para los enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    // 1. Efecto de scroll para la barra de navegación
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            nav.style.backdropFilter = 'none';
        }
    });

    // 2. Lógica del Menú (Abrir, Cerrar y auto-ocultar)
    const menuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (menuBtn && navMenu) {
        // Abrir/Cerrar al tocar el botón
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuBtn.classList.toggle('is-active');
        });

        // CERRAR AUTOMÁTICAMENTE al hacer clic en cualquier enlace
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuBtn.classList.remove('is-active');
            });
        });

        // CERRAR AUTOMÁTICAMENTE si haces clic fuera del menú
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuBtn.classList.remove('is-active');
            }
        });
    }

});