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
    function attachCardTilt(card) {
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
    }

    document.querySelectorAll('.project-card').forEach(attachCardTilt);


    // =============================================================
    // 12. GITHUB PROJECT SYNC
    //     Repositori publik diambil langsung dari GitHub. Karena ini
    //     frontend statis, jangan pernah menaruh personal access token
    //     di sini.
    // =============================================================
    const GITHUB_USERNAME = 'aziizmusyafa18';
    const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&direction=desc`;
    const AI_PROJECTS_URL = `ai-projects.json?v=${Date.now()}`;
    const portfolioGrid = document.getElementById('projects-grid');
    const githubStatus = document.getElementById('github-sync-status');
    const githubRefresh = document.getElementById('github-refresh');
    const githubSync = document.querySelector('.github-sync');

    const githubIcon = '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>';
    const externalIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';

    function getRepositoryCategory(repository) {
        const searchable = `${repository.name} ${repository.description || ''} ${(repository.topics || []).join(' ')}`.toLowerCase();
        if (/undang|wedding|nikah/.test(searchable)) return { key: 'undangan', label: 'Undangan Digital' };
        if (/warkop|kafe|cafe|coffee|restaurant|restoran/.test(searchable)) return { key: 'warkop', label: 'Warkop/Kafe' };
        if (/chatbot|chat|gemini|ai|artificial|bot/.test(searchable)) return { key: 'chatbot', label: 'AI/Chatbot' };
        if (/laravel|sistem|system|aplikasi|absen|akademik|spp|peminjaman|management|dashboard|php|express/.test(searchable)) return { key: 'sistem', label: 'Sistem Web' };
        return { key: 'lainnya', label: 'Lainnya' };
    }

    function formatRepositoryName(name) {
        return name.replace(/[-_]+/g, ' ').replace(/\b\w/g, character => character.toUpperCase());
    }

    function createProjectCard(repository, index) {
        const category = getRepositoryCategory(repository);
        const card = document.createElement('article');
        card.className = 'project-card reveal-up';
        card.dataset.category = category.key;
        card.style.transitionDelay = `${Math.min(index * 0.05, 0.25)}s`;

        const categoryElement = document.createElement('span');
        categoryElement.className = 'project-category';
        categoryElement.textContent = category.label;

        const title = document.createElement('h3');
        title.className = 'project-title';
        title.textContent = formatRepositoryName(repository.name);

        const description = document.createElement('p');
        description.className = 'project-desc';
        description.textContent = repository.aiDescription || repository.description || 'Repositori project dan eksperimen pengembangan web.';

        const technologies = document.createElement('div');
        technologies.className = 'project-tech';
        const tags = [...new Set([repository.language, ...(repository.topics || [])].filter(Boolean))].slice(0, 5);
        (tags.length ? tags : ['GitHub']).forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tech-tag';
            tagElement.textContent = tag;
            technologies.appendChild(tagElement);
        });

        const links = document.createElement('div');
        links.className = 'project-links';
        const sourceLink = document.createElement('a');
        sourceLink.className = 'project-link';
        sourceLink.href = repository.html_url;
        sourceLink.target = '_blank';
        sourceLink.rel = 'noopener noreferrer';
        sourceLink.innerHTML = `${githubIcon} Source Code`;
        links.appendChild(sourceLink);

        if (repository.homepage) {
            const demoLink = document.createElement('a');
            demoLink.className = 'project-link';
            demoLink.href = repository.homepage;
            demoLink.target = '_blank';
            demoLink.rel = 'noopener noreferrer';
            demoLink.innerHTML = `${externalIcon} Live Demo`;
            links.appendChild(demoLink);
        }

        card.append(categoryElement, title, description, technologies, links);
        return card;
    }

    function updateRepositoryCount(count) {
        const repositoryStat = document.querySelector('.stat-label');
        const repositoryNumber = [...document.querySelectorAll('.stat-card')].find(card => card.textContent.includes('Repositori GitHub'))?.querySelector('.stat-number');
        if (repositoryNumber) {
            repositoryNumber.dataset.target = count;
            repositoryNumber.textContent = `${count}+`;
        }
        if (repositoryStat) repositoryStat.dataset.repositoryCount = count;
    }

    async function loadGitHubProjects() {
        if (!portfolioGrid) return;
        githubSync?.classList.add('is-loading');
        githubRefresh?.setAttribute('disabled', 'disabled');
        if (githubStatus) githubStatus.textContent = 'Memuat proyek terbaru dari GitHub...';

        try {
            const [response, aiResponse] = await Promise.all([
                fetch(GITHUB_API_URL, {
                    headers: { Accept: 'application/vnd.github+json' },
                    cache: 'no-store'
                }),
                fetch(AI_PROJECTS_URL, { cache: 'no-store' }).catch(() => null)
            ]);
            if (!response.ok) throw new Error(`GitHub API mengembalikan status ${response.status}.`);

            const aiDescriptions = aiResponse?.ok ? await aiResponse.json() : {};
            const repositories = (await response.json())
                .filter(repository => !repository.private)
                .map(repository => ({
                    ...repository,
                    aiDescription: aiDescriptions[repository.full_name]?.aiGenerated
                        ? aiDescriptions[repository.full_name].description
                        : null
                }));

            if (!repositories.length) throw new Error('Belum ada repositori publik yang dapat ditampilkan.');

            portfolioGrid.replaceChildren(...repositories.map(createProjectCard));
            portfolioGrid.querySelectorAll('.project-card').forEach(card => {
                attachCardTilt(card);
                revealObserver.observe(card);
            });
            updateRepositoryCount(repositories.length);
            bindPortfolioFilters();
            applyPortfolioFilter(document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all');
            if (githubStatus) githubStatus.textContent = `${repositories.length} proyek tersinkron dari GitHub • ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;
        } catch (error) {
            console.error('Gagal memuat proyek GitHub:', error);
            if (githubStatus) githubStatus.textContent = 'GitHub belum dapat dihubungi. Menampilkan data proyek yang tersimpan.';
        } finally {
            githubSync?.classList.remove('is-loading');
            githubRefresh?.removeAttribute('disabled');
        }
    }


    // =============================================================
    // 13. PORTFOLIO FILTERING WITH SMOOTH TRANSITIONS
    // =============================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    function applyPortfolioFilter(filterValue) {
        document.querySelectorAll('.project-card').forEach(card => {
            const matches = filterValue === 'all' || card.getAttribute('data-category') === filterValue;
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = matches ? '1' : '0';
            card.style.transform = matches ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(12px)';
            card.style.display = matches ? 'flex' : 'none';
        });
    }

    function bindPortfolioFilters() {
        filterButtons.forEach(btn => {
            if (btn.dataset.filterBound === 'true') return;
            btn.dataset.filterBound = 'true';
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyPortfolioFilter(btn.getAttribute('data-filter'));
            });
        });
    }
    bindPortfolioFilters();
    const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
    githubRefresh?.addEventListener('click', loadGitHubProjects);
    loadGitHubProjects();
    applyPortfolioFilter(activeFilter);
    setInterval(() => {
        if (document.visibilityState === 'visible') loadGitHubProjects();
    }, 5 * 60 * 1000);


    // =============================================================
    // 14. CONTACT FORM — DUAL ACTION: EMAIL & WHATSAPP
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
