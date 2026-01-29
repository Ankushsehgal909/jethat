document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navbarNav = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');

    function handleNavbarDisplay() {
        const isDesktop = window.innerWidth >= 992;
        if (isDesktop) {
            navbarNav.classList.add('show');
            navbarToggler.classList.add('collapsed');
            navbarToggler.setAttribute('aria-expanded', 'true');
        } else {
            navbarNav.classList.remove('show');
        }
    }

    handleNavbarDisplay();
    window.addEventListener('resize', handleNavbarDisplay);

    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.style.background = 'var(--bg-secondary)';
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.style.background = 'transparent';
            navbar.classList.remove('navbar-scrolled');
        }
    }

    updateNavbarBackground();
    window.addEventListener('scroll', function() {
        setTimeout(updateNavbarBackground, 10);
    });

    const mediaQuery = window.matchMedia('(min-width: 992px)');

    function handleHoverDropdown(e) {
        const dropdown = e.target.closest('.dropdown-hover');
        if (!dropdown || !mediaQuery.matches) return;

        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');

        if (e.type === 'mouseenter') {
            // Clear any existing timeout for this dropdown
            if (dropdown.hideTimeout) {
                clearTimeout(dropdown.hideTimeout);
                dropdown.hideTimeout = null;
            }
            
            if (dropdownMenu && toggle) {
                toggle.setAttribute('aria-expanded', 'true');
                dropdownMenu.classList.add('show');
                dropdown.classList.add('show');
            }
        } else if (e.type === 'mouseleave') {
            // Set a timeout to hide the dropdown
            dropdown.hideTimeout = setTimeout(() => {
                // Double-check if mouse is still not over the dropdown area
                if (!dropdown.matches(':hover')) {
                    if (dropdownMenu && toggle) {
                        toggle.setAttribute('aria-expanded', 'false');
                        dropdownMenu.classList.remove('show');
                        dropdown.classList.remove('show');
                    }
                }
                dropdown.hideTimeout = null;
            }, 200);
        }
    }

    const hoverDropdowns = document.querySelectorAll('.dropdown-hover');
    hoverDropdowns.forEach(function(dropdown) {
        dropdown.addEventListener('mouseenter', handleHoverDropdown);
        dropdown.addEventListener('mouseleave', handleHoverDropdown);
        
        // Also add hover handling to the dropdown menu itself
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.addEventListener('mouseenter', function() {
                // Clear any hide timeout when mouse enters dropdown menu
                if (dropdown.hideTimeout) {
                    clearTimeout(dropdown.hideTimeout);
                    dropdown.hideTimeout = null;
                }
            });
            
            dropdownMenu.addEventListener('mouseleave', function() {
                // Set timeout to hide when mouse leaves dropdown menu
                dropdown.hideTimeout = setTimeout(() => {
                    if (!dropdown.matches(':hover')) {
                        const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
                        if (dropdownMenu && toggle) {
                            toggle.setAttribute('aria-expanded', 'false');
                            dropdownMenu.classList.remove('show');
                            dropdown.classList.remove('show');
                        }
                    }
                    dropdown.hideTimeout = null;
                }, 200);
            });
        }
    });

    document.addEventListener('click', function(e) {
        if (!mediaQuery.matches) return;
        const isClickInside = e.target.closest('.dropdown-hover');
        if (!isClickInside) {
            const openDropdowns = document.querySelectorAll('.dropdown-hover.show');
            openDropdowns.forEach(function(dropdown) {
                const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (toggle && dropdownMenu) {
                    toggle.setAttribute('aria-expanded', 'false');
                    dropdownMenu.classList.remove('show');
                    dropdown.classList.remove('show');
                }
            });
        }
    });

    function updateActiveState() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link-enhanced');
        navLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    updateActiveState();

    const mobileToggle = document.querySelector('.mobile-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openDropdowns = document.querySelectorAll('.dropdown-hover.show');
            openDropdowns.forEach(function(dropdown) {
                const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (toggle && dropdownMenu) {
                    toggle.setAttribute('aria-expanded', 'false');
                    dropdownMenu.classList.remove('show');
                    dropdown.classList.remove('show');
                }
            });
        }
    });
});

