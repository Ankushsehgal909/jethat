// Universal Theme Toggle System for JetHat Website
class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || this.getPreferredTheme();
        this.init();
    }

    // Get stored theme from localStorage
    getStoredTheme() {
        return localStorage.getItem('jethat-theme');
    }

    // Get user's preferred theme from system
    getPreferredTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Store theme in localStorage
    setStoredTheme(theme) {
        localStorage.setItem('jethat-theme', theme);
    }

    // Initialize theme system
    init() {
        this.applyTheme(this.currentTheme);
        this.setupToggleButton();
        this.setupSystemThemeListener();
        this.updateToggleButton();
    }

    // Apply theme to the document
    applyTheme(theme) {
        const html = document.documentElement;
        const body = document.body;

        // Set data-bs-theme attribute for Bootstrap components
        html.setAttribute('data-bs-theme', theme);
        
        // Update body classes
        if (theme === 'dark') {
            body.style.background = 'linear-gradient(135deg, #000000, #1a1a1a)';
            body.style.color = '#ffffff';
            html.classList.add('dark-theme');
            html.classList.remove('light-theme');
        } else {
            body.style.background = 'linear-gradient(135deg, #fff7ed, #ffffff, #fffbeb)';
            body.style.color = '#333333';
            html.classList.add('light-theme');
            html.classList.remove('dark-theme');
        }

        // Update theme-specific elements
        this.updateThemeElements(theme);
        
        // Store the current theme
        this.currentTheme = theme;
        this.setStoredTheme(theme);
    }

    // Update theme-specific elements
    updateThemeElements(theme) {
        // Update hero sections
        this.updateHeroSections(theme);
        
        // Update navigation elements
        this.updateNavigationElements(theme);
        
        // Update footer elements
        this.updateFooterElements(theme);
        
        // Update all other components
        this.updateAllComponents(theme);

        // Update cards
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            if (theme === 'dark') {
                card.style.backgroundColor = 'var(--bg-card)';
                card.style.borderColor = 'var(--bs-gray-700)';
                card.style.color = 'var(--text-primary)';
            } else {
                card.style.backgroundColor = '#ffffff';
                card.style.borderColor = '#e0e0e0';
                card.style.color = '#333333';
            }
        });

        // Update dropdown menus
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(dropdown => {
            if (theme === 'dark') {
                dropdown.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)';
                dropdown.style.borderColor = 'rgba(220, 20, 60, 0.3)';
            } else {
                dropdown.style.background = 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)';
                dropdown.style.borderColor = 'rgba(220, 20, 60, 0.1)';
            }
        });

        // Update dropdown items
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            if (theme === 'dark') {
                item.style.color = '#ffffff';
            } else {
                item.style.color = '#333333';
            }
        });

        // Update form controls
        const formControls = document.querySelectorAll('.form-control, .form-select');
        formControls.forEach(control => {
            if (theme === 'dark') {
                control.style.backgroundColor = '#2a2a2a';
                control.style.borderColor = '#404040';
                control.style.color = '#ffffff';
            } else {
                control.style.backgroundColor = '#ffffff';
                control.style.borderColor = '#ced4da';
                control.style.color = '#333333';
            }
        });

        // Update offcanvas elements
        const offcanvas = document.querySelectorAll('.offcanvas');
        offcanvas.forEach(canvas => {
            if (theme === 'dark') {
                canvas.style.backgroundColor = '#000000';
                canvas.style.color = '#ffffff';
            } else {
                canvas.style.backgroundColor = '#ffffff';
                canvas.style.color = '#333333';
            }
        });

        // Update text elements
        const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
        textElements.forEach(element => {
            // Skip elements that already have specific color classes
            if (!element.classList.contains('text-gradient') && 
                !element.classList.contains('accent-primary') &&
                !element.classList.contains('accent-secondary') &&
                !element.classList.contains('accent-gold') &&
                !element.style.color) {
                if (theme === 'dark') {
                    element.style.color = 'var(--text-primary)';
                } else {
                    element.style.color = 'var(--text-light-primary)';
                }
            }
        });

        // Trigger custom event for components that need to update
        document.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: theme } 
        }));
    }

    // Update navigation elements
    updateNavigationElements(theme) {
        const navbar = document.querySelector('.navbar, .navbar-theme');
        if (navbar) {
            if (theme === 'dark') {
                navbar.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)';
                navbar.style.borderBottom = '1px solid rgba(220, 20, 60, 0.3)';
            } else {
                navbar.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 248, 248, 0.95) 100%)';
                navbar.style.borderBottom = '1px solid rgba(220, 20, 60, 0.2)';
            }
        }

        // Update navbar links
        const navLinks = document.querySelectorAll('.nav-link, .nav-link-enhanced, .navbar-nav .nav-link');
        navLinks.forEach(link => {
            if (theme === 'dark') {
                link.style.color = '#ffffff !important';
            } else {
                link.style.color = '#000000 !important';
            }
        });

        // Update nav text spans
        const navTexts = document.querySelectorAll('.nav-text');
        navTexts.forEach(text => {
            if (theme === 'dark') {
                text.style.color = '#ffffff';
            } else {
                text.style.color = '#000000';
            }
        });

        // Update dropdown menus
        const dropdowns = document.querySelectorAll('.dropdown-menu, .dropdown-menu-theme');
        dropdowns.forEach(dropdown => {
            if (theme === 'dark') {
                dropdown.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)';
                dropdown.style.borderColor = 'rgba(220, 20, 60, 0.3)';
                dropdown.style.color = '#ffffff';
            } else {
                dropdown.style.background = 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)';
                dropdown.style.borderColor = 'rgba(220, 20, 60, 0.1)';
                dropdown.style.color = '#333333';
            }
        });

        // Update dropdown items
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            if (theme === 'dark') {
                item.style.color = '#ffffff';
            } else {
                item.style.color = '#333333';
            }
        });
    }

    // Update footer elements
    updateFooterElements(theme) {
        const footer = document.querySelector('#footer-component, .footer-theme');
        if (footer) {
            if (theme === 'dark') {
                footer.style.background = 'linear-gradient(135deg, rgba(123, 2, 75, 0.3), rgba(0,0,0,0.5), rgba(39, 33, 0, 0.3))';
                footer.style.color = '#ffffff';
            } else {
                footer.style.background = 'linear-gradient(135deg, rgba(255, 247, 237, 0.9), rgba(255, 255, 255, 0.9), rgba(255, 251, 235, 0.9))';
                footer.style.color = '#333333';
            }
        }

        // Update footer pattern
        const footerPattern = document.querySelector('.footer-pattern-theme');
        if (footerPattern) {
            if (theme === 'dark') {
                footerPattern.style.opacity = '0.3';
            } else {
                footerPattern.style.opacity = '0.1';
            }
        }

        // Update footer text elements
        const footerTexts = document.querySelectorAll('.text-footer-theme');
        footerTexts.forEach(text => {
            if (theme === 'dark') {
                text.style.color = 'var(--text-secondary)';
            } else {
                text.style.color = 'var(--text-light-secondary)';
            }
        });
    }

    // Update all other components
    updateAllComponents(theme) {
        // Update cards
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            if (theme === 'dark') {
                card.style.backgroundColor = 'var(--bg-card)';
                card.style.borderColor = 'var(--bs-gray-700)';
                card.style.color = 'var(--text-primary)';
            } else {
                card.style.backgroundColor = '#ffffff';
                card.style.borderColor = '#e0e0e0';
                card.style.color = '#333333';
            }
        });

        // Update form controls
        const formControls = document.querySelectorAll('.form-control, .form-select');
        formControls.forEach(control => {
            if (theme === 'dark') {
                control.style.backgroundColor = '#2a2a2a';
                control.style.borderColor = '#404040';
                control.style.color = '#ffffff';
            } else {
                control.style.backgroundColor = '#ffffff';
                control.style.borderColor = '#ced4da';
                control.style.color = '#333333';
            }
        });

        // Update offcanvas elements
        const offcanvas = document.querySelectorAll('.offcanvas');
        offcanvas.forEach(canvas => {
            if (theme === 'dark') {
                canvas.style.backgroundColor = '#000000';
                canvas.style.color = '#ffffff';
            } else {
                canvas.style.backgroundColor = '#ffffff';
                canvas.style.color = '#333333';
            }
        });

        // Update text elements
        const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
        textElements.forEach(element => {
            // Skip elements that already have specific color classes
            if (!element.classList.contains('text-gradient') && 
                !element.classList.contains('accent-primary') &&
                !element.classList.contains('accent-secondary') &&
                !element.classList.contains('accent-gold') &&
                !element.style.color) {
                if (theme === 'dark') {
                    element.style.color = 'var(--text-primary)';
                } else {
                    element.style.color = 'var(--text-light-primary)';
                }
            }
        });

        // Update sections with specific theme classes
        const themeSections = document.querySelectorAll('.section-theme, .component-theme');
        themeSections.forEach(section => {
            if (theme === 'dark') {
                section.style.background = 'var(--gradient-dark-bg)';
                section.style.color = 'var(--text-primary)';
            } else {
                section.style.background = 'var(--gradient-light-bg)';
                section.style.color = 'var(--text-light-primary)';
            }
        });

        // Update testimonial sections
        const testimonialSections = document.querySelectorAll('.testimonial-section, .testimonial-theme');
        testimonialSections.forEach(section => {
            if (theme === 'dark') {
                section.style.background = 'linear-gradient(135deg, #1a1a1a, #2a2a2a)';
            } else {
                section.style.background = 'linear-gradient(135deg, #fff7ed, #ffffff, #fffbeb)';
            }
        });

        // Update product sections
        const productSections = document.querySelectorAll('.products-section, .product-theme');
        productSections.forEach(section => {
            if (theme === 'dark') {
                section.style.background = 'linear-gradient(135deg, #000000, #1a1a1a)';
            } else {
                section.style.background = 'linear-gradient(135deg, #fff7ed, #ffffff, #fffbeb)';
            }
        });

        // Update service sections
        const serviceSections = document.querySelectorAll('.services-section, .service-theme');
        serviceSections.forEach(section => {
            if (theme === 'dark') {
                section.style.background = 'linear-gradient(135deg, #1a1a1a, #2a2a2a)';
            } else {
                section.style.background = 'linear-gradient(135deg, #fff7ed, #ffffff, #fffbeb)';
            }
        });

        // Update stats sections
        const statsSections = document.querySelectorAll('.stats-section, .stats-theme');
        statsSections.forEach(section => {
            if (theme === 'dark') {
                section.style.background = 'linear-gradient(135deg, #000000, #1a1a1a)';
            } else {
                section.style.background = 'linear-gradient(135deg, #fff7ed, #ffffff, #fffbeb)';
            }
        });

        // Update call-to-action sections
        const ctaSections = document.querySelectorAll('.cta-section, .cta-theme');
        ctaSections.forEach(section => {
            if (theme === 'dark') {
                section.style.background = 'linear-gradient(135deg, #1a1a1a, #2a2a2a)';
            } else {
                section.style.background = 'linear-gradient(135deg, #fff7ed, #ffffff, #fffbeb)';
            }
        });

        // Update right panel
        const rightPanel = document.querySelector('#rightPanel, .right-panel-theme');
        if (rightPanel) {
            if (theme === 'dark') {
                rightPanel.style.background = 'linear-gradient(180deg, #000000, #1a1a1a)';
                rightPanel.style.borderLeft = '2px solid rgba(220, 20, 60, 0.3)';
            } else {
                rightPanel.style.background = 'linear-gradient(180deg, #ffffff, #f8f9fa)';
                rightPanel.style.borderLeft = '2px solid rgba(220, 20, 60, 0.2)';
            }
        }
    }

    // Update hero sections and background components
    updateHeroSections(theme) {
        // Update main hero section
        const heroSection = document.querySelector('#hero-section, .hero-section, [data-hero-container]');
        if (heroSection) {
            // Add theme classes for CSS variable control
            if (theme === 'dark') {
                heroSection.classList.add('hero-section-theme');
                heroSection.classList.remove('hero-section-light');
            } else {
                heroSection.classList.add('hero-section-light');
                heroSection.classList.remove('hero-section-theme');
            }
        }

        // Update about hero sections
        const aboutHero = document.querySelector('.about-hero, .about-hero-theme');
        if (aboutHero) {
            if (theme === 'dark') {
                aboutHero.classList.add('about-hero-theme');
                aboutHero.classList.remove('about-hero-light');
            } else {
                aboutHero.classList.add('about-hero-light');
                aboutHero.classList.remove('about-hero-theme');
            }
        }

        // Update all sections with theme-aware backgrounds
        const themeSections = document.querySelectorAll('.section-bg-theme, .hero-section-theme, .about-hero-theme');
        themeSections.forEach(section => {
            // The CSS variables will handle the actual styling
            section.style.transition = 'background 0.3s ease';
        });

        // Update overlay elements
        const overlayElements = document.querySelectorAll('.hero-overlay-theme, .hero-gradient-theme');
        overlayElements.forEach(overlay => {
            overlay.style.transition = 'background 0.3s ease';
        });

        // Update video fallback backgrounds
        const videoFallbacks = document.querySelectorAll('.video-fallback-theme');
        videoFallbacks.forEach(fallback => {
            fallback.style.transition = 'background 0.3s ease';
        });

        // Update decorative elements opacity
        const decorativeElements = document.querySelectorAll('.circuit-pattern-theme, .grid-pattern-theme, .cyber-grid-theme');
        decorativeElements.forEach(element => {
            element.style.transition = 'opacity 0.3s ease';
        });

        // Update floating elements opacity
        const floatingElements = document.querySelectorAll('.floating-elements-theme');
        floatingElements.forEach(element => {
            element.style.transition = 'opacity 0.3s ease';
        });

        // Force update for any elements that need manual styling
        this.updateManualStyling(theme);
    }

    // Update elements that need manual styling (fallback for non-CSS variable elements)
    updateManualStyling(theme) {
        // Update any remaining hero sections without theme classes
        const legacyHeroSections = document.querySelectorAll('.about-hero:not(.about-hero-theme)');
        legacyHeroSections.forEach(section => {
            if (theme === 'dark') {
                section.style.background = 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2a2a2a 100%)';
            } else {
                section.style.background = 'linear-gradient(135deg, #fff7ed 0%, #ffffff 50%, #fffbeb 100%)';
            }
        });

        // Update legacy background sections
        const legacyBgSections = document.querySelectorAll('section[style*="background"]:not(.section-bg-theme)');
        legacyBgSections.forEach(section => {
            if (section.style.background.includes('fff7ed') || section.style.background.includes('ffffff')) {
                if (theme === 'dark') {
                    section.style.background = 'linear-gradient(135deg, #1a1a1a, #2a2a2a)';
                    section.style.color = '#ffffff';
                } else {
                    section.style.background = 'linear-gradient(135deg, #fff7ed, #ffffff, #fffbeb)';
                    section.style.color = '#333333';
                }
            }
        });

        // Update legacy .bg-light and .bg-dark classes
        const bgLightElements = document.querySelectorAll('.bg-light:not(.section-bg-theme)');
        bgLightElements.forEach(element => {
            if (theme === 'dark') {
                element.style.background = 'linear-gradient(135deg, #1a1a1a, #2a2a2a)';
                element.style.color = '#ffffff';
            } else {
                element.style.background = 'linear-gradient(135deg, #fff7ed, #ffffff, #fffbeb)';
                element.style.color = '#333333';
            }
        });

        const bgDarkElements = document.querySelectorAll('.bg-dark:not(.video-fallback-theme)');
        bgDarkElements.forEach(element => {
            if (theme === 'dark') {
                element.style.background = '#000000';
            } else {
                element.style.background = '#f8f9fa';
            }
        });

        // Update circuit patterns and decorative elements that don't have theme classes
        const legacyCircuitPatterns = document.querySelectorAll('.circuit-pattern:not(.circuit-pattern-theme), .grid-pattern:not(.grid-pattern-theme), .cyber-grid:not(.cyber-grid-theme)');
        legacyCircuitPatterns.forEach(pattern => {
            if (theme === 'dark') {
                pattern.style.opacity = '0.8';
            } else {
                pattern.style.opacity = '0.4';
            }
        });

        // Update floating elements that don't have theme classes
        const legacyFloatingElements = document.querySelectorAll('.floating-security-icons:not(.floating-elements-theme), .floating-shapes:not(.floating-elements-theme), .particles:not(.floating-elements-theme)');
        legacyFloatingElements.forEach(element => {
            if (theme === 'dark') {
                element.style.opacity = '0.6';
            } else {
                element.style.opacity = '0.3';
            }
        });
    }

    // Setup toggle button functionality
    setupToggleButton() {
        const toggleButton = document.getElementById('theme-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    // Toggle between light and dark themes
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        this.updateToggleButton();
        
        // Add smooth transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    // Update toggle button icons
    updateToggleButton() {
        const sunIcon = document.getElementById('sun-icon');
        const moonIcon = document.getElementById('moon-icon');
        const toggleButton = document.getElementById('theme-toggle');

        if (sunIcon && moonIcon && toggleButton) {
            if (this.currentTheme === 'dark') {
                sunIcon.classList.remove('d-none');
                moonIcon.classList.add('d-none');
                toggleButton.classList.remove('btn-dark');
                toggleButton.classList.add('btn-light');
                toggleButton.setAttribute('title', 'Switch to Light Mode');
            } else {
                sunIcon.classList.add('d-none');
                moonIcon.classList.remove('d-none');
                toggleButton.classList.remove('btn-light');
                toggleButton.classList.add('btn-dark');
                toggleButton.setAttribute('title', 'Switch to Dark Mode');
            }
        }
    }

    // Listen for system theme changes
    setupSystemThemeListener() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.applyTheme(e.matches ? 'dark' : 'light');
                this.updateToggleButton();
            }
        });
    }

    // Get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Force theme update (useful for dynamically loaded content)
    forceUpdate() {
        this.updateThemeElements(this.currentTheme);
    }
}

// Initialize theme manager when DOM is loaded
let themeManager;

document.addEventListener('DOMContentLoaded', () => {
    themeManager = new ThemeManager();
});

// Make theme manager globally available
window.ThemeManager = ThemeManager;
window.getThemeManager = () => themeManager;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}