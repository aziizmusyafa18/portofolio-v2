/**
 * Script Portofolio Aziiz Musyafa
 * Tema: Modern Minimalist (Intermediate Web Developer Style)
 * 
 * Fitur:
 * 1. Theme Toggle (Dark / Light)
 * 2. Mobile Navigation
 * 3. Scroll Progress Bar (di atas layar)
 * 4. Mouse Spotlight (efek sorot kursor)
 * 5. Header Scrolled Styling
 * 6. Active Navigation Link on Scroll
 * 7. Beragam Scroll Reveal Animations (up, down, left, right, zoom)
 * 8. Terminal Typing Animation (Hero Section)
 * 9. Counter Animated Stats (About Section)
 * 10. Skill Bar Animations
 * 11. 3D Card Tilt Effect (Project Cards)
 * 12. Portfolio Filtering
 * 13. Contact Form Submission Modal
 */

document.addEventListener('DOMContentLoaded', () => {

    // =============================================================
    // 1. THEME TOGGLE (Dark / Light)
    // =============================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        if (current === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });


    // =============================================================
    // 2. MOBILE NAVIGATION TOGGLE
    // =============================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    mobileToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        mobileToggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            mobileToggle.innerHTML = '&#9776;';
        });
    });


    // =============================================================
    // 3. SCROLL PROGRESS BAR
    // =============================================================
    const scrollProgressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (scrollProgressBar) {
            scrollProgressBar.style.width = `${progress}%`;
        }
    }, { passive: true });


    // =============================================================
    // 4. MOUSE SPOTLIGHT EFFECT
    // =============================================================
    const spotlight = document.getElementById('mouse-spotlight');
    if (spotlight) {
        document.addEventListener('mousemove', (e) => {
            spotlight.style.left = e.clientX + 'px';
            spotlight.style.top  = e.clientY + 'px';
        }, { passive: true });
    }


    // =============================================================
    // 5. HEADER SCROLLED STYLING
    // =============================================================
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });


    // =============================================================
    // 6. ACTIVE NAVIGATION LINK ON SCROLL
    // =============================================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { root: null, threshold: 0.15, rootMargin: '-20% 0px -65% 0px' });

    sections.forEach(s => sectionObserver.observe(s));


    // =============================================================
    // 7. SCROLL REVEAL ANIMATIONS (Beragam Arah)
    //    Classes: reveal-up, reveal-down, reveal-left, reveal-right, reveal-zoom
    // =============================================================
    const revealClasses = ['.reveal-up', '.reveal-down', '.reveal-left', '.reveal-right', '.reveal-zoom'];
    const allRevealEls = document.querySelectorAll(revealClasses.join(','));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use delay from inline style if set
                const delay = entry.target.style.transitionDelay || '0s';
                entry.target.style.transitionDelay = delay;
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    allRevealEls.forEach(el => revealObserver.observe(el));


    // =============================================================
    // 8. TERMINAL TYPING ANIMATION (Hero Section)
    //    Mengetik baris kode karakter per karakter
    // =============================================================
    const terminalOutput = document.getElementById('terminal-output');

    // HTML lines yang akan diketik per baris
    // Menggunakan array of { html: '<p>...', delay: ms } 
    const codeLines = [
        { raw: '<span class="code-keyword">const</span> developer = {', delay: 0 },
        { raw: '&nbsp;&nbsp;<span class="code-property">name</span>: <span class="code-string">"Aziiz Musyafa"</span>,', delay: 500 },
        { raw: '&nbsp;&nbsp;<span class="code-property">role</span>: <span class="code-string">"Backend &amp; Frontend Engineer"</span>,', delay: 950 },
        { raw: '&nbsp;&nbsp;<span class="code-property">coreStack</span>: [<span class="code-string">"Laravel"</span>, <span class="code-string">"PHP"</span>, <span class="code-string">"MySQL"</span>, <span class="code-string">"JS"</span>],', delay: 1450 },
        { raw: '&nbsp;&nbsp;<span class="code-property">experience</span>: <span class="code-number">3</span>, <span class="code-comment">// years</span>', delay: 1950 },
        { raw: '&nbsp;&nbsp;<span class="code-property">readyForWork</span>: <span class="code-keyword">true</span>', delay: 2350 },
        { raw: '};', delay: 2700 },
        { raw: '', delay: 3000 },
        { raw: '<span class="code-keyword">console</span>.log(developer.role);', delay: 3200 },
        { raw: '<span class="code-comment">// ▶ "Backend &amp; Frontend Engineer"</span>', delay: 3700 },
    ];

    if (terminalOutput) {
        // Add blinking cursor to the output area first
        const cursorEl = document.createElement('span');
        cursorEl.className = 'cursor';
        terminalOutput.appendChild(cursorEl);

        codeLines.forEach((line, index) => {
            setTimeout(() => {
                const p = document.createElement('p');
                p.innerHTML = line.raw;

                // Insert before cursor
                terminalOutput.insertBefore(p, cursorEl);

                // Scroll to bottom of terminal
                terminalOutput.scrollTop = terminalOutput.scrollHeight;

                // Remove cursor after last line
                if (index === codeLines.length - 1) {
                    setTimeout(() => {
                        cursorEl.remove();
                    }, 2000);
                }
            }, line.delay);
        });
    }


    // =============================================================
    // 9. ANIMATED COUNTER STATS (About Section)
    // =============================================================
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    function animateCounter(el, target, duration = 1500) {
        const start = performance.now();
        const easeOut = (t) => 1 - Math.pow(1 - t, 3);

        const update = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(easeOut(progress) * target);
            el.textContent = current + (el.dataset.suffix || '+');
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target + (el.dataset.suffix || '+');
        };
        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'), 10);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));


    // =============================================================
    // 10. SKILL BAR ANIMATIONS
    // =============================================================
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach((bar, i) => {
                    const pct = bar.getAttribute('data-percentage');
                    setTimeout(() => { bar.style.width = pct; }, i * 120);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    if (skillsSection) skillObserver.observe(skillsSection);


    // =============================================================
    // 11. 3D CARD TILT EFFECT (Project Cards)
    // =============================================================
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotateX = ((y - cy) / cy) * -6; // max 6deg
            const rotateY = ((x - cx) / cx) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });


    // =============================================================
    // 12. PORTFOLIO FILTERING WITH SMOOTH TRANSITIONS
    // =============================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allProjectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            allProjectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const matches = filterValue === 'all' || category === filterValue;

                // Fade out
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.94) translateY(12px)';

                setTimeout(() => {
                    if (matches) {
                        card.style.display = 'flex';
                        // Force reflow then fade in
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1) translateY(0)';
                            });
                        });
                    } else {
                        card.style.display = 'none';
                    }
                }, 280);
            });
        });
    });


    // =============================================================
    // 13. CONTACT FORM — DUAL ACTION: EMAIL & WHATSAPP
    // =============================================================

    const MY_EMAIL = 'aziizmusyafa18@gmail.com';
    const MY_WA    = '6285728582004';

    /**
     * Validasi isian form. Jika tidak valid, tampilkan shake animation
     * dan kembalikan false.
     */
    function validateContactForm() {
        const name  = document.getElementById('guest-name').value.trim();
        const email = document.getElementById('guest-email').value.trim();
        const msg   = document.getElementById('guest-msg').value.trim();

        const form = document.getElementById('guestbook-form');

        if (!name || !email || !msg) {
            // Shake animation visual feedback
            form.style.transition = 'transform 0.1s ease';
            let shakeCount = 0;
            const shakeInterval = setInterval(() => {
                form.style.transform = shakeCount % 2 === 0 ? 'translateX(6px)' : 'translateX(-6px)';
                shakeCount++;
                if (shakeCount > 5) {
                    clearInterval(shakeInterval);
                    form.style.transform = 'translateX(0)';
                }
            }, 60);
            alert('Mohon lengkapi semua field: Nama, Email, dan Pesan.');
            return null;
        }

        // Validasi format email sederhana
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Format email tidak valid. Contoh: nama@email.com');
            return null;
        }

        return { name, email, msg };
    }

    // Tombol KIRIM VIA EMAIL
    const btnEmail = document.getElementById('btn-send-email');
    if (btnEmail) {
        btnEmail.addEventListener('click', () => {
            const data = validateContactForm();
            if (!data) return;

            const subject  = encodeURIComponent(`[Portofolio] Pesan dari ${data.name}`);
            const body     = encodeURIComponent(
                `Halo Aziiz,\n\nSaya ${data.name} (${data.email}) ingin menghubungi Anda.\n\nPesan:\n${data.msg}\n\n--\nDikirim melalui form portofolio aziiz.dev`
            );
            const mailtoURL = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;

            // Buka mail client
            window.location.href = mailtoURL;

            // Reset form setelah jeda singkat
            setTimeout(() => {
                document.getElementById('guestbook-form').reset();
                showToast('📧 Mail client dibuka! Silakan kirim email Anda.', 'email');
            }, 500);
        });
    }

    // Tombol KIRIM VIA WHATSAPP
    const btnWA = document.getElementById('btn-send-wa');
    if (btnWA) {
        btnWA.addEventListener('click', () => {
            const data = validateContactForm();
            if (!data) return;

            const message = encodeURIComponent(
                `Halo Aziiz! 👋\n\nSaya *${data.name}* (${data.email}) menemukan portofolio Anda dan ingin berkata:\n\n_${data.msg}_\n\nSalam,\n${data.name}`
            );
            const waURL = `https://wa.me/${MY_WA}?text=${message}`;

            // Buka WhatsApp di tab baru
            window.open(waURL, '_blank');

            // Reset form
            setTimeout(() => {
                document.getElementById('guestbook-form').reset();
                showToast('💬 WhatsApp dibuka! Silakan kirim pesan Anda.', 'wa');
            }, 500);
        });
    }

    /**
     * Toast Notification kecil di pojok kanan bawah
     * sebagai konfirmasi aksi tanpa mengganggu UX
     */
    function showToast(message, type = 'email') {
        const existing = document.querySelector('.toast-notif');
        if (existing) existing.remove();

        const colors = {
            email: 'linear-gradient(135deg, #10B981, #06B6D4)',
            wa:    'linear-gradient(135deg, #25D366, #128C7E)'
        };

        const toast = document.createElement('div');
        toast.className = 'toast-notif';
        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: ${colors[type]};
            color: #fff;
            font-family: var(--font-body);
            font-weight: 600;
            font-size: 0.9rem;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.3);
            z-index: 20000;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1);
            max-width: 320px;
            line-height: 1.5;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                toast.style.opacity = '1';
                toast.style.transform = 'translateY(0)';
            });
        });

        // Auto dismiss after 4 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 350);
        }, 4000);
    }

}); // End DOMContentLoaded

