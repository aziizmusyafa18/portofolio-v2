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
    // 13. CONTACT FORM SUBMISSION
    // =============================================================
    const guestbookForm = document.getElementById('guestbook-form');

    if (guestbookForm) {
        guestbookForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name  = document.getElementById('guest-name').value.trim();
            const email = document.getElementById('guest-email').value.trim();
            const msg   = document.getElementById('guest-msg').value.trim();

            if (!name || !email || !msg) {
                alert('Mohon lengkapi semua data form kontak terlebih dahulu.');
                return;
            }

            const submitBtn = document.getElementById('submit-btn');
            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showSuccessModal(name);
                guestbookForm.reset();
                submitBtn.textContent = 'Kirim Pesan';
                submitBtn.disabled = false;
            }, 1200);
        });
    }

    function showSuccessModal(name) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; inset: 0;
            background: rgba(5, 8, 14, 0.88);
            display: flex; align-items: center; justify-content: center;
            z-index: 10001; opacity: 0;
            transition: opacity 0.4s ease;
            backdrop-filter: blur(6px);
        `;

        const box = document.createElement('div');
        box.style.cssText = `
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: 3rem 2.5rem;
            text-align: center;
            max-width: 460px;
            width: 90%;
            box-shadow: var(--shadow-premium), 0 0 50px rgba(16, 185, 129, 0.15);
            transform: scale(0.9) translateY(20px);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        `;
        box.innerHTML = `
            <div style="width:64px;height:64px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.25);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;color:var(--accent-primary);font-size:1.75rem;">✓</div>
            <h3 style="font-size:1.6rem;font-weight:800;color:var(--text-primary);margin-bottom:0.75rem;letter-spacing:-0.02em;">Pesan Terkirim!</h3>
            <p style="font-size:0.95rem;color:var(--text-secondary);margin-bottom:2rem;line-height:1.65;">
                Halo <strong>${name}</strong>, terima kasih telah menghubungi saya. Pesan Anda telah terekam dan saya akan segera merespons melalui email.
            </p>
            <button id="close-modal-btn" style="background:linear-gradient(135deg,#10B981,#06B6D4);color:#090D16;font-weight:700;padding:0.8rem 2rem;border:none;border-radius:10px;cursor:pointer;font-size:0.95rem;">Tutup</button>
        `;

        overlay.appendChild(box);
        document.body.appendChild(overlay);

        // Animate in
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
                box.style.transform = 'scale(1) translateY(0)';
            });
        });

        document.getElementById('close-modal-btn').addEventListener('click', () => {
            overlay.style.opacity = '0';
            box.style.transform = 'scale(0.9) translateY(20px)';
            setTimeout(() => overlay.remove(), 400);
        });

        // Also close on backdrop click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.opacity = '0';
                box.style.transform = 'scale(0.9) translateY(20px)';
                setTimeout(() => overlay.remove(), 400);
            }
        });
    }

}); // End DOMContentLoaded
