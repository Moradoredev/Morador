document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. TYPED.JS — Alias y Roles animados
    // ============================================================
    var typedNombre = new Typed('#nombre-dinamico', {
        strings: ['MORADOR'],
        typeSpeed: 80,
        backSpeed: 60,
        backDelay: 2500,
        loop: true,
        showCursor: true
    });

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

    // ============================================================
    // 2. SMOOTH SCROLL
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================================
    // 3. NAV — Scroll effect + sección activa resaltada
    // ============================================================
    window.addEventListener('scroll', function () {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            nav.style.backdropFilter = 'none';
        }

        // Sección activa en el nav
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('nav-active');
            }
        });
    });

    // ============================================================
    // 4. MENÚ HAMBURGUESA
    // ============================================================
    const menuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuBtn.classList.toggle('is-active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuBtn.classList.remove('is-active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuBtn.classList.remove('is-active');
            }
        });
    }

    // ============================================================
    // 5. BARRA DE PROGRESO DE SCROLL
    // ============================================================
    const scrollBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / total) * 100;
        if (scrollBar) scrollBar.style.width = progress + '%';
    });

    // ============================================================
    // 6. PARTÍCULAS EN #HOGAR
    // ============================================================
    const canvas = document.getElementById('particulas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            const hogar = document.getElementById('hogar');
            canvas.width = hogar.offsetWidth;
            canvas.height = hogar.offsetHeight;
        }
        resizeCanvas();

        const particulas = [];
        const cantidad = 120;

        for (let i = 0; i < cantidad; i++) {
            particulas.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.2 + 0.3,
                dx: (Math.random() - 0.5) * 0.6,
                dy: (Math.random() - 0.5) * 0.3,
                alpha: Math.random(),
                fadeSpeed: Math.random() * 0.008 + 0.003,
                fadeDir: Math.random() > 0.5 ? 1 : -1
            });
        }

        function animarParticulas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particulas.forEach(p => {
                // Desvanecer y aparecer
                p.alpha += p.fadeSpeed * p.fadeDir;
                if (p.alpha >= 0.8) { p.fadeDir = -1; }
                if (p.alpha <= 0.05) { p.fadeDir = 1; }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 0, 0, ${p.alpha})`;
                ctx.fill();

                p.x += p.dx;
                p.y += p.dy;

                // Reaparecer por el lado opuesto
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
            });
            requestAnimationFrame(animarParticulas);
        }

        animarParticulas();

        window.addEventListener('resize', resizeCanvas);
    }

    // ============================================================
    // 7. FADE-IN AL HACER SCROLL (Intersection Observer)
    // ============================================================
    const fadeElements = document.querySelectorAll(
        '.juego-card, .skill-item, .colab-card, .contacto-card, .video-card, .setup-card-negra'
    );

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));

    // ============================================================
    // 8. BARRAS DE HABILIDADES — Animación al entrar en vista
    // ============================================================
    const progressFills = document.querySelectorAll('.progress-fill');
    progressFills.forEach(fill => {
        const targetWidth = fill.style.width;
        fill.style.width = '0%';
        fill.style.transition = 'width 1.2s ease';

        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        fill.style.width = targetWidth;
                    }, 200);
                    barObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        barObserver.observe(fill);
    });


    const tooltipData = {
        'Python': 'Scripts, automatización, bots, análisis de datos',
        'C#': 'Unity, mecánicas de juego, IA básica, sistemas',
        'JavaScript': 'Web, Node.js, Electron, React, animaciones',
        'Flutter': 'Apps móviles Android/iOS, UI nativa',
        'C++': 'Rendimiento, motores, sistemas de bajo nivel',
        'SQL (Bases de Datos)': 'MySQL, SQLite, consultas, relaciones',
        'Interfaces Gráficas (UI/UX)': 'Diseño de pantallas, flujos, prototipado'
    };

    const tooltip = document.createElement('div');
    tooltip.id = 'skill-tooltip';
    tooltip.style.cssText = `
        position: fixed;
        background: #111;
        border: 1px solid #ff0000;
        color: #fff;
        padding: 8px 14px;
        border-radius: 8px;
        font-size: 0.78rem;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 9999;
        max-width: 260px;
        font-family: monospace;
        box-shadow: 0 0 10px rgba(255,0,0,0.2);
    `;
    document.body.appendChild(tooltip);

    document.querySelectorAll('.skill-item').forEach(item => {
        const skillName = item.querySelector('.skill-info span')?.textContent;
        if (!tooltipData[skillName]) return;

        item.addEventListener('mouseenter', (e) => {
            tooltip.textContent = tooltipData[skillName];
            tooltip.style.opacity = '1';
        });

        item.addEventListener('mousemove', (e) => {
            tooltip.style.left = (e.clientX + 15) + 'px';
            tooltip.style.top = (e.clientY - 10) + 'px';
        });

        item.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    });

    const cursorDot = document.createElement('div');
    cursorDot.id = 'cursor-dot';
    cursorDot.style.cssText = `
        width: 10px; height: 10px;
        background: #ff0000;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        transition: transform 0.1s ease;
        box-shadow: 0 0 8px #ff0000;
    `;
    document.body.appendChild(cursorDot);

    const trailParticles = [];
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = (e.clientX - 5) + 'px';
        cursorDot.style.top = (e.clientY - 5) + 'px';

        // Estela
        const trail = document.createElement('div');
        trail.style.cssText = `
            width: 6px; height: 6px;
            background: rgba(255, 0, 0, 0.5);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 99998;
            left: ${e.clientX - 3}px;
            top: ${e.clientY - 3}px;
            transition: opacity 0.5s, transform 0.5s;
        `;
        document.body.appendChild(trail);
        trailParticles.push(trail);

        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0)';
        }, 50);

        setTimeout(() => {
            if (trail.parentNode) trail.parentNode.removeChild(trail);
        }, 600);
    });

    // Agrandar cursor en botones
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(2.5)';
            cursorDot.style.background = '#fff';
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorDot.style.background = '#ff0000';
        });
    });


    const lazyImages = document.querySelectorAll('.juego-img[style*="url"]');
    lazyImages.forEach(img => {
        const bgUrl = img.style.backgroundImage;
        img.style.backgroundImage = 'none';
        img.dataset.bg = bgUrl;

        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.backgroundImage = entry.target.dataset.bg;
                    lazyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        lazyObserver.observe(img);
    });

    function animarContador(el, target, suffix = '') {
        let start = 0;
        const duration = 2000;
        const step = target / (duration / 16);

        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                start = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(start).toString() + suffix;
        }, 16);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('[data-count]').forEach(counter => {
                    const target = parseInt(counter.dataset.count);
                    const suffix = counter.dataset.suffix || '';
                    animarContador(counter, target, suffix);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('#stats-section');
    if (statsSection) statsObserver.observe(statsSection);

    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-logo">
            <span class="pre-bracket">&lt;/&gt;</span>
            <span class="pre-nombre">MORADOR</span>
            <span class="pre-dev">.dev</span>
        </div>
        <div class="preloader-bar"><div class="preloader-fill"></div></div>
    `;
    preloader.style.cssText = `
        position: fixed; top: 0; left: 0;
        width: 100%; height: 100%;
        background: #000;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        z-index: 999999;
        transition: opacity 0.6s ease;
    `;
    document.body.appendChild(preloader);
    document.body.style.overflow = 'hidden';

    const preStyle = document.createElement('style');
    preStyle.textContent = `
        .preloader-logo { font-family: 'Courier New', monospace; font-size: 2rem; font-weight: 900; margin-bottom: 30px; }
        .pre-bracket { color: #fff; margin-right: 8px; }
        .pre-nombre { color: #fff; }
        .pre-dev { color: #ff0000; }
        .preloader-bar { width: 200px; height: 3px; background: #111; border-radius: 4px; overflow: hidden; }
        .preloader-fill { height: 100%; width: 0%; background: #ff0000; border-radius: 4px; transition: width 1.2s ease; box-shadow: 0 0 10px #ff0000; }
    `;
    document.head.appendChild(preStyle);

    setTimeout(() => {
        preloader.querySelector('.preloader-fill').style.width = '100%';
    }, 100);

    setTimeout(() => {
        preloader.style.opacity = '0';
        document.body.style.overflow = '';
        setTimeout(() => preloader.remove(), 600);
    }, 1800);

    const btnArriba = document.createElement('button');
    btnArriba.id = 'btn-arriba';
    btnArriba.innerHTML = '↑';
    btnArriba.style.cssText = `
        position: fixed;
        bottom: 30px; right: 30px;
        width: 45px; height: 45px;
        background: #ff0000;
        color: #fff;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s, transform 0.3s;
        z-index: 9998;
        box-shadow: 0 0 15px rgba(255,0,0,0.4);
    `;
    document.body.appendChild(btnArriba);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btnArriba.style.opacity = '1';
            btnArriba.style.transform = 'translateY(0)';
        } else {
            btnArriba.style.opacity = '0';
            btnArriba.style.transform = 'translateY(20px)';
        }
    });

    btnArriba.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const emailLink = document.querySelector('a[href^="mailto"]');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = 'jefryestevez22j@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                mostrarToast('✅ Email copiado al portapapeles');
            });
        });
    }

    function mostrarToast(mensaje) {
        const toast = document.createElement('div');
        toast.textContent = mensaje;
        toast.style.cssText = `
            position: fixed;
            bottom: 90px; right: 30px;
            background: #111;
            border: 1px solid #ff0000;
            color: #fff;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 0.85rem;
            z-index: 99999;
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.3s, transform 0.3s;
            font-family: monospace;
            box-shadow: 0 0 15px rgba(255,0,0,0.2);
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 10);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }


    window.addEventListener('scroll', () => {
        const hogar = document.getElementById('hogar');
        if (hogar) {
            const scrolled = window.scrollY;
            hogar.style.backgroundPositionY = (scrolled * 0.4) + 'px';
        }
    });

    const username = document.querySelector('.username');
    if (username) {
        const originalText = username.textContent;

        function glitch() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
            let iterations = 0;
            const interval = setInterval(() => {
                username.textContent = originalText.split('').map((char, i) => {
                    if (char === ' ') return ' ';
                    if (i < iterations) return originalText[i];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('');
                iterations += 0.5;
                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    username.textContent = originalText;
                }
            }, 40);
        }

        // Glitch al cargar y cada 8 segundos
        setTimeout(glitch, 2500);
        setInterval(glitch, 8000);

        // Glitch al pasar el mouse
        username.addEventListener('mouseenter', glitch);
    }

    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                konamiIndex = 0;
                activarEasterEgg();
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activarEasterEgg() {
        const egg = document.createElement('div');
        egg.innerHTML = `
            <div style="font-size:3rem; margin-bottom:15px;">🎮</div>
            <div style="font-family:monospace; font-size:1.1rem; color:#ff0000; margin-bottom:8px;">// EASTER EGG DESBLOQUEADO</div>
            <div style="font-family:monospace; font-size:0.9rem; color:#888;">console.log("Buen ojo, developer 👀");</div>
            <div style="font-family:monospace; font-size:0.85rem; color:#555; margin-top:10px;">↑↑↓↓←→←→BA — clásico.</div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                margin-top:20px; background:#ff0000; color:#fff;
                border:none; padding:8px 20px; border-radius:6px;
                cursor:pointer; font-weight:bold; font-family:monospace;
            ">CERRAR</button>
        `;
        egg.style.cssText = `
            position: fixed;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            background: #0a0a0a;
            border: 2px solid #ff0000;
            padding: 40px;
            border-radius: 15px;
            z-index: 999999;
            text-align: center;
            color: #fff;
            box-shadow: 0 0 40px rgba(255,0,0,0.3);
            animation: fadeInScale 0.4s ease;
        `;

        const eggStyle = document.createElement('style');
        eggStyle.textContent = `
            @keyframes fadeInScale {
                from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(eggStyle);
        document.body.appendChild(egg);
    }

    const logoDev = document.querySelector('.dot-dev');
    if (logoDev) {
        setInterval(() => {
            logoDev.style.opacity = logoDev.style.opacity === '0' ? '1' : '0';
        }, 600);
    }

    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button, input, textarea').forEach(el => {
        el.style.cursor = 'none';
    });

});
