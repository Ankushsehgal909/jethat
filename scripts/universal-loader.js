/**
 * Universal Loader for All Pages
 * Include this script in all HTML pages for consistent loading experience
 */

(function() {
    'use strict';

    // Create and inject loader immediately
    const loaderHTML = `
        <div id="page-loader">
            <div class="loader-spinner">
                <img src="${getLogoPath()}" alt="JetHat Logo" class="loader-logo">
                <div class="spinner-ring"></div>
                <div class="spinner-ring-inner"></div>
                <div class="spinner-dot"></div>
            </div>
            
             <div class="loader-text">Loading JetHat...</div>
        
        </div>
    `;

    // Inject loader as first child of body
    if (document.body) {
        document.body.insertAdjacentHTML('afterbegin', loaderHTML);
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            document.body.insertAdjacentHTML('afterbegin', loaderHTML);
        });
    }

    // Get correct logo path based on current page location
    function getLogoPath() {
        const path = window.location.pathname;
        const depth = (path.match(/\//g) || []).length - 1;
        
        // Handle about folder pages specifically
        if (path.includes('/about/')) {
            return '../assets/images/logo.png';
        }
        
        if (depth === 0 || path.endsWith('index.html') || path.endsWith('/')) {
            return 'assets/images/logo.png';
        } else if (depth === 1) {
            return '../assets/images/logo.png';
        } else {
            return '../../assets/images/logo.png';
        }
    }

    // Progress tracking
    let progress = 0;
    const progressBar = document.getElementById('loader-progress-bar');
    const loaderText = document.querySelector('.loader-text');

    function updateProgress(value, text) {
        progress = Math.min(value, 100);
        
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        if (loaderText && text) {
            loaderText.textContent = text;
        }
    }

    function hideLoader() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }
    }

    // Track loading stages
    updateProgress(10, 'Initializing...');

    // Check if we're on an about page and add specific loading messages
    const isAboutPage = window.location.pathname.includes('/about/');
    const aboutPageName = isAboutPage ? window.location.pathname.split('/').pop().replace('.html', '') : '';

    // DOM Content Loaded
    document.addEventListener('DOMContentLoaded', function() {
        if (isAboutPage) {
            updateProgress(40, `Loading ${aboutPageName} content...`);
        } else {
            updateProgress(40, 'Loading Components...');
        }
    });

    // All resources loaded
    window.addEventListener('load', function() {
        if (isAboutPage) {
            updateProgress(80, `${aboutPageName} almost ready...`);
        } else {
            updateProgress(80, 'Almost Ready...');
        }
        
        // Give a moment for any lazy-loaded content
        setTimeout(() => {
            if (isAboutPage) {
                updateProgress(100, `Welcome to ${aboutPageName}!`);
            } else {
                updateProgress(100, 'Welcome!');
            }
            setTimeout(hideLoader, 300);
        }, 200);
    });

    // Fallback: Hide loader after max time
    setTimeout(() => {
        if (document.getElementById('page-loader')) {
            updateProgress(100, 'Ready!');
            hideLoader();
        }
    }, 5000);

    // Export utility for manual control
    window.pageLoader = {
        updateProgress: updateProgress,
        hide: hideLoader,
        show: function() {
            const loader = document.getElementById('page-loader');
            if (loader) {
                loader.classList.remove('hidden');
            }
        },
        // About page specific utilities
        aboutPages: {
            isAboutPage: function() {
                return window.location.pathname.includes('/about/');
            },
            getPageName: function() {
                if (this.isAboutPage()) {
                    return window.location.pathname.split('/').pop().replace('.html', '');
                }
                return '';
            },
            loadComponents: async function(components) {
                if (!this.isAboutPage()) return;
                
                updateProgress(50, 'Loading page components...');
                
                try {
                    await Promise.all(components.map(async ([id, path]) => {
                        const response = await fetch(path);
                        if (!response.ok) throw new Error(`Failed to load ${path}`);
                        const html = await response.text();
                        const element = document.getElementById(id);
                        if (element) element.innerHTML = html;
                    }));
                    
                    updateProgress(90, 'Components loaded successfully...');
                    return true;
                } catch (error) {
                    console.error('Error loading about page components:', error);
                    return false;
                }
            }
        }
    };

})();
