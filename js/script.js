// Main JavaScript file for Portfolio

function saveTheme(theme) {
    try {
        localStorage.setItem('portfolioTheme', theme);
    } catch (error) {
        console.warn('Could not save theme to localStorage:', error);
    }
}

function getGreetingByHour(hour) {
    if (hour >= 5 && hour < 12) return "Good Morning, I'm Hussain Albaggal";
    if (hour >= 12 && hour < 18) return "Good Afternoon, I'm Hussain Albaggal";
    return "Good Evening, I'm Hussain Albaggal";
}

function formatElapsedTime(totalSeconds) {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function setSectionVisibility(button, content, isVisible) {
    if (!button || !content) return;
    content.classList.toggle('is-hidden', !isVisible);
    button.setAttribute('aria-expanded', String(isVisible));

    const sectionName = button.dataset.sectionName || 'Section';
    button.textContent = `${isVisible ? 'Hide' : 'Show'} ${sectionName} Section`;
}

function sortProjects(items, sortValue) {
    const sortedItems = [...items];

    sortedItems.sort((firstItem, secondItem) => {
        const firstTitle = firstItem.dataset.title || '';
        const secondTitle = secondItem.dataset.title || '';
        const firstDate = firstItem.dataset.date || '';
        const secondDate = secondItem.dataset.date || '';

        if (sortValue === 'date-asc') {
            return firstDate.localeCompare(secondDate);
        }

        if (sortValue === 'title-asc') {
            return firstTitle.localeCompare(secondTitle);
        }

        return secondDate.localeCompare(firstDate);
    });

    return sortedItems;
}

function getCategoryLabel(category) {
    if (category === 'web') return 'web projects';
    if (category === 'ml') return 'machine learning projects';
    return 'all projects';
}

function getLevelLabel(level) {
    if (level === 'beginner') return 'beginner-level';
    if (level === 'advanced') return 'advanced-level';
    return 'all-levels';
}

function getSortLabel(sortValue) {
    if (sortValue === 'date-asc') return 'oldest first';
    if (sortValue === 'title-asc') return 'title A-Z';
    return 'newest first';
}

function setInputErrorState(input, hasError) {
    if (!input) return;
    input.classList.toggle('input-error', hasError);
}

function setFeedbackMessage(container, type, lines) {
    if (!container) return;

    container.className = 'form-feedback';
    container.textContent = '';
    if (!Array.isArray(lines) || lines.length === 0) {
        return;
    }

    container.classList.add(type);

    const fragment = document.createDocumentFragment();
    lines.forEach((line) => {
        const row = document.createElement('div');
        row.textContent = line;
        fragment.appendChild(row);
    });

    container.appendChild(fragment);
}

function validateContactFormValues(values) {
    const { name, email, subject, message } = values;
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const fieldErrors = {
        name: !name || name.length < 3,
        email: !email || !emailRegex.test(email),
        subject: !subject || subject.length < 5,
        message: !message || message.length < 20
    };

    if (!name) errors.push('Name is required.');
    else if (name.length < 3) errors.push('Name must be at least 3 characters long.');

    if (!email) errors.push('Email is required.');
    else if (!emailRegex.test(email)) errors.push('Please enter a valid email address.');

    if (!subject) errors.push('Subject is required.');
    else if (subject.length < 5) errors.push('Subject must be at least 5 characters long.');

    if (!message) errors.push('Message is required.');
    else if (message.length < 20) errors.push('Message must be at least 20 characters long.');

    return { errors, fieldErrors };
}

document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    function setMobileNavState(isOpen) {
        if (!sidebar || !mobileNavToggle || !sidebarOverlay) return;

        document.body.classList.toggle('mobile-nav-open', isOpen);
        mobileNavToggle.classList.toggle('is-open', isOpen);
        mobileNavToggle.setAttribute('aria-expanded', String(isOpen));
        mobileNavToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        sidebarOverlay.hidden = !isOpen;
    }

    if (mobileNavToggle && sidebar && sidebarOverlay) {
        setMobileNavState(false);

        mobileNavToggle.addEventListener('click', () => {
            const isOpen = !document.body.classList.contains('mobile-nav-open');
            setMobileNavState(isOpen);
        });

        sidebarOverlay.addEventListener('click', () => {
            setMobileNavState(false);
        });

        globalThis.addEventListener('resize', () => {
            if (globalThis.innerWidth > 768) {
                setMobileNavState(false);
            }
        });
    }

    // Smooth scrolling for sidebar navigation links.
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (sidebarNav) {
        sidebarNav.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;

            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = targetId ? document.querySelector(targetId) : null;
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            if (globalThis.innerWidth <= 768) {
                setMobileNavState(false);
            }
        });
    }

    // Scroll-spy: keep the active sidebar link aligned with the visible section.
    const navLinks = Array.from(document.querySelectorAll('.sidebar-nav a[href^="#"]'));

    function setActiveNavLink(sectionId) {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;
            link.classList.toggle('is-active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    if (navLinks.length > 0) {
        const sectionsForSpy = navLinks
            .map((link) => link.getAttribute('href'))
            .filter(Boolean)
            .map((hash) => document.querySelector(hash))
            .filter(Boolean);

        setActiveNavLink('home');

        const getSectionAtViewportAnchor = () => {
            if (sectionsForSpy.length === 0) return 'home';

            const anchorY = globalThis.innerHeight * 0.32;
            let activeSectionId = sectionsForSpy[0].id;

            sectionsForSpy.forEach((section) => {
                const rect = section.getBoundingClientRect();

                if (rect.top <= anchorY) {
                    activeSectionId = section.id;
                }

                if (rect.top <= anchorY && rect.bottom > anchorY) {
                    activeSectionId = section.id;
                }
            });

            return activeSectionId;
        };

        let scrollSpyScheduled = false;
        const requestActiveSectionUpdate = () => {
            if (scrollSpyScheduled) return;

            scrollSpyScheduled = true;
            globalThis.requestAnimationFrame(() => {
                scrollSpyScheduled = false;
                setActiveNavLink(getSectionAtViewportAnchor());
            });
        };

        globalThis.addEventListener('scroll', requestActiveSectionUpdate, { passive: true });
        globalThis.addEventListener('resize', requestActiveSectionUpdate);
        requestActiveSectionUpdate();

        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                const targetId = link.getAttribute('href')?.replace('#', '');
                if (targetId) {
                    setActiveNavLink(targetId);
                }

                requestActiveSectionUpdate();
            });
        });
    }
    
    // Theme state management (Assignment 3)
    const themeToggleBtn = document.getElementById('themeToggle');
    let currentTheme = 'dark';

    function loadTheme() {
        try {
            const saved = localStorage.getItem('portfolioTheme');
            if (saved === 'dark' || saved === 'light') {
                currentTheme = saved;
            }
        } catch (error) {
            console.warn('localStorage unavailable:', error);
            currentTheme = 'dark';
        }
    }

    function applyTheme(theme) {
        document.body.classList.toggle('dark-mode', theme === 'dark');
        document.body.classList.toggle('light-mode', theme === 'light');
        if (themeToggleBtn) {
            themeToggleBtn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
        }
        saveTheme(theme);
    }

    if (themeToggleBtn) {
        loadTheme();
        applyTheme(currentTheme);
        themeToggleBtn.addEventListener('click', function() {
            const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            currentTheme = nextTheme;
            applyTheme(nextTheme);
        });
    }

    // Dynamic greeting logic
    function updateGreeting() {
        const greetingElement = document.getElementById('dynamicGreeting');
        if (!greetingElement) return;
        const hour = new Date().getHours();
        const greeting = getGreetingByHour(hour);
        greetingElement.textContent = greeting;
    }
    updateGreeting();

    // Visit timer logic
    const visitTimer = document.getElementById('visitTimer');
    const visitStartedAt = Date.now();

    function updateVisitTimer() {
        if (!visitTimer) return;
        const elapsedSeconds = Math.floor((Date.now() - visitStartedAt) / 1000);
        visitTimer.textContent = formatElapsedTime(elapsedSeconds);
    }

    updateVisitTimer();
    setInterval(updateVisitTimer, 1000);

    // Weather API integration
    const weatherStatus = document.getElementById('weatherStatus');
    const weatherTemperature = document.getElementById('weatherTemperature');
    const weatherUpdated = document.getElementById('weatherUpdated');
    const weatherRetryBtn = document.getElementById('weatherRetryBtn');
    const WEATHER_CACHE_KEY = 'portfolioWeatherCacheV1';
    const WEATHER_CACHE_TTL_MS = 10 * 60 * 1000;
    const WEATHER_REQUEST_TIMEOUT_MS = 7000;

    function setWeatherLoading() {
        weatherStatus.classList.remove('error');
        weatherStatus.textContent = 'Loading temperature...';
        weatherTemperature.textContent = '--';
        weatherUpdated.textContent = '';
        if (weatherRetryBtn) weatherRetryBtn.hidden = true;
    }

    function renderWeather(temperature, updatedAt) {
        weatherTemperature.textContent = `${temperature}°C`;
        weatherStatus.textContent = '';
        weatherUpdated.textContent = `Last updated: ${updatedAt.toLocaleString()}`;
        if (weatherRetryBtn) weatherRetryBtn.hidden = true;
    }

    function readWeatherCache() {
        try {
            const rawCache = localStorage.getItem(WEATHER_CACHE_KEY);
            if (!rawCache) return null;

            const parsed = JSON.parse(rawCache);
            const isFresh = parsed && typeof parsed.cachedAt === 'number' && Date.now() - parsed.cachedAt < WEATHER_CACHE_TTL_MS;
            const hasData = parsed && typeof parsed.temperature === 'number' && parsed.updatedAt;

            if (isFresh && hasData) {
                return parsed;
            }

            return null;
        } catch {
            return null;
        }
    }

    function writeWeatherCache(temperature, updatedAt) {
        try {
            const cachePayload = {
                temperature,
                updatedAt,
                cachedAt: Date.now()
            };
            localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(cachePayload));
        } catch {
            // Ignore cache writes if storage is unavailable.
        }
    }

    async function loadWeather() {
        if (!weatherStatus || !weatherTemperature || !weatherUpdated) return;

        const weatherApiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=26.2361&longitude=50.0393&current=temperature_2m&timezone=auto';

        try {
            const cachedWeather = readWeatherCache();
            if (cachedWeather) {
                renderWeather(cachedWeather.temperature, new Date(cachedWeather.updatedAt));
                return;
            }

            setWeatherLoading();

            const timeoutSignal = typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function'
                ? AbortSignal.timeout(WEATHER_REQUEST_TIMEOUT_MS)
                : undefined;

            const response = timeoutSignal
                ? await fetch(weatherApiUrl, { signal: timeoutSignal })
                : await fetch(weatherApiUrl);
            if (!response.ok) {
                throw new Error(`Weather request failed with status ${response.status}`);
            }

            const data = await response.json();
            const currentWeather = data?.current;
            const temperature = typeof currentWeather?.temperature_2m === 'number'
                ? currentWeather.temperature_2m
                : null;

            if (temperature === null) {
                throw new Error('Temperature data was not available in the API response.');
            }

            const updatedAt = currentWeather.time ? new Date(currentWeather.time) : new Date();
            renderWeather(temperature, updatedAt);
            writeWeatherCache(temperature, updatedAt.toISOString());
        } catch (error) {
            console.error('Unable to load weather data:', error);
            weatherStatus.classList.add('error');
            weatherStatus.textContent = 'Weather unavailable. Please try again.';
            weatherTemperature.textContent = '--';
            weatherUpdated.textContent = '';
            if (weatherRetryBtn) weatherRetryBtn.hidden = false;
        }
    }

    loadWeather();

    if (weatherRetryBtn) {
        weatherRetryBtn.addEventListener('click', loadWeather);
    }

    // Show/hide section state
    const sectionToggleButtons = document.querySelectorAll('.section-toggle-btn');

    sectionToggleButtons.forEach(button => {
        const targetId = button.dataset.target;
        const content = targetId ? document.getElementById(targetId) : null;
        if (!content) return;

        setSectionVisibility(button, content, true);

        button.addEventListener('click', () => {
            const isVisible = button.getAttribute('aria-expanded') === 'true';
            setSectionVisibility(button, content, !isVisible);
        });
    });

    // Project filtering logic
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const projectList = document.getElementById('projectList');
    const projectItems = Array.from(document.querySelectorAll('.project-item'));
    const projectEmptyState = document.getElementById('projectEmptyState');
    const projectSort = document.getElementById('projectSort');
    const projectResultsSummary = document.getElementById('projectResultsSummary');
    const experienceLevel = document.getElementById('experienceLevel');
    let activeCategory = 'all';
    let activeSort = 'date-desc';
    let activeLevel = 'all';

    function renderProjects() {
        const filteredProjects = projectItems.filter(item => {
            const itemCategory = item.dataset.category;
            const itemLevel = item.dataset.level;
            const matchesCategory = activeCategory === 'all' || itemCategory === activeCategory;
            const matchesLevel = activeLevel === 'all' || itemLevel === activeLevel;
            return matchesCategory && matchesLevel;
        });

        const sortedProjects = sortProjects(filteredProjects, activeSort);

        projectItems.forEach(item => item.classList.add('project-hidden'));

        if (projectList) {
            const fragment = document.createDocumentFragment();
            sortedProjects.forEach(item => {
                item.classList.remove('project-hidden');
                fragment.appendChild(item);
            });
            projectList.appendChild(fragment);
        }

        if (projectEmptyState) {
            projectEmptyState.style.display = sortedProjects.length === 0 ? 'block' : 'none';
        }

        if (projectResultsSummary) {
            projectResultsSummary.textContent = `Showing ${getLevelLabel(activeLevel)} ${getCategoryLabel(activeCategory)} sorted by ${getSortLabel(activeSort)}.`;
        }
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.filter || 'all';
            renderProjects();
        });
    });

    if (projectSort) {
        projectSort.addEventListener('change', () => {
            activeSort = projectSort.value;
            renderProjects();
        });
    }

    if (experienceLevel) {
        experienceLevel.value = activeLevel;
        experienceLevel.addEventListener('change', () => {
            activeLevel = experienceLevel.value;
            renderProjects();
        });
    }

    renderProjects();

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const contactInputs = [
        nameInput,
        emailInput,
        subjectInput,
        messageInput
    ].filter(Boolean);

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!formFeedback || !nameInput || !emailInput || !subjectInput || !messageInput) {
                return;
            }

            setFeedbackMessage(formFeedback, '', []);

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput.value.trim();
            const message = messageInput.value.trim();

            contactInputs.forEach(input => setInputErrorState(input, false));

            const { errors, fieldErrors } = validateContactFormValues({
                name,
                email,
                subject,
                message
            });

            setInputErrorState(nameInput, fieldErrors.name);
            setInputErrorState(emailInput, fieldErrors.email);
            setInputErrorState(subjectInput, fieldErrors.subject);
            setInputErrorState(messageInput, fieldErrors.message);

            if (errors.length > 0) {
                setFeedbackMessage(formFeedback, 'error', errors);
                return;
            }

            setFeedbackMessage(formFeedback, 'success', ['Message sent successfully!']);
            contactForm.reset();
        });

        ['input', 'change'].forEach(eventType => {
            contactForm.addEventListener(eventType, () => {
                if (formFeedback) {
                    setFeedbackMessage(formFeedback, '', []);
                }

                contactInputs.forEach(input => setInputErrorState(input, false));
            });
        });
    }

    // Add animation to elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const supportsIntersectionObserver = 'IntersectionObserver' in globalThis;
    const observer = supportsIntersectionObserver
        ? new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions)
        : null;
    
    const sectionElements = document.querySelectorAll('section');
    sectionElements.forEach(section => {
        section.classList.add('section-reveal');
        if (observer) {
            observer.observe(section);
        } else {
            section.classList.add('section-visible');
        }
    });
});
