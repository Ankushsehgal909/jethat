/**
 * About Pages Shared Loader
 * Common loading functionality for all about pages
 */

(function() {
    'use strict';

    // About page configuration
    const ABOUT_PAGES = {
        'index': 'Our Story',
        'culture': 'Company Culture', 
        'team': 'Our Team',
        'projects-showcase': 'Projects Showcase',
        'development-pipeline': 'Development Pipeline',
        'success-stories': 'Success Stories'
    };

    // Get current page info
    function getCurrentPageInfo() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');
        return {
            filename: filename,
            title: ABOUT_PAGES[filename] || 'About',
            isAboutPage: path.includes('/about/')
        };
    }

    // Standard about page components
    function getStandardComponents() {
        return [
            ['navigation-component', '../components/navigation/navigation.html'],
            ['footer-component', '../components/footer/footer.html'],
            ['right-panel-component', '../components/right-panel/right-panel-subdirectory.html']
        ];
    }

    // Load about page components with progress tracking
    async function loadAboutPageComponents(additionalComponents = []) {
        const pageInfo = getCurrentPageInfo();
        
        if (!pageInfo.isAboutPage) {
            console.warn('About page loader called on non-about page');
            return false;
        }

        console.log(`🚀 Loading ${pageInfo.title} page...`);

        // Update loader progress
        if (window.pageLoader) {
            window.pageLoader.updateProgress(30, `Loading ${pageInfo.title}...`);
        }

        // Combine standard and additional components
        const allComponents = [...getStandardComponents(), ...additionalComponents];

        try {
            // Load all components in parallel
            await Promise.all(allComponents.map(async ([id, path]) => {
                try {
                    const response = await fetch(path);
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                    
                    const html = await response.text();
                    const element = document.getElementById(id);
                    
                    if (element) {
                        element.innerHTML = html;
                        console.log(`✅ Loaded component: ${id}`);
                    } else {
                        console.warn(`⚠️ Container not found: #${id}`);
                    }
                } catch (error) {
                    console.error(`❌ Failed to load ${id} from ${path}:`, error);
                    throw error;
                }
            }));

            // Update progress
            if (window.pageLoader) {
                window.pageLoader.updateProgress(70, 'Components loaded successfully...');
            }

            // Hide fallback content
            const fallbackContent = document.getElementById('fallback-content');
            if (fallbackContent) {
                fallbackContent.style.display = 'none';
            }

            // Trigger navigation fix
            setTimeout(() => {
                if (window.fixNavigationPaths) {
                    window.fixNavigationPaths();
                    console.log('✅ Navigation paths fixed');
                }
                
                // Dispatch navigation loaded event
                document.dispatchEvent(new CustomEvent('navigationLoaded'));
            }, 100);

            // Initialize page-specific animations
            setTimeout(() => {
                initializePageAnimations(pageInfo.filename);
            }, 200);

            console.log(`✅ ${pageInfo.title} page loaded successfully`);
            
            if (window.pageLoader) {
                window.pageLoader.updateProgress(100, `Welcome to ${pageInfo.title}!`);
            }

            return true;

        } catch (error) {
            console.error(`❌ Error loading ${pageInfo.title} page:`, error);
            
            // Show error in fallback content
            const fallbackContent = document.getElementById('fallback-content');
            if (fallbackContent) {
                fallbackContent.innerHTML = `
                    <h1 class="display-4 fw-bold text-gradient mb-4">${pageInfo.title}</h1>
                    <div class="alert alert-warning">
                        <i class="bi bi-exclamation-triangle me-2"></i>
                        Some components are still loading. Please refresh the page if content doesn't appear.
                    </div>
                `;
            }
            
            return false;
        }
    }

    // Initialize page-specific functionality (animations removed to prevent conflicts)
    function initializePageAnimations(pageName) {
        // Page-specific initialization without animations
        console.log(`✅ ${pageName} page initialized without conflicting animations`);
        
        // Only initialize basic functionality, no scroll animations
        // This prevents conflicts between similar hero sections
    }

    // Generic functionality for all about pages (animations removed)
    function initializeGenericAnimations() {
        // Animation initialization removed to prevent conflicts
        // between similar hero sections in team.html and projects-showcase.html
        console.log('✅ Generic functionality initialized without animations');
    }

    // Auto-initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        const pageInfo = getCurrentPageInfo();
        
        if (pageInfo.isAboutPage) {
            // Load standard components for all about pages
            loadAboutPageComponents();
        }
    });

    // Export for manual use
    window.aboutPageLoader = {
        loadComponents: loadAboutPageComponents,
        getCurrentPageInfo: getCurrentPageInfo,
        getStandardComponents: getStandardComponents,
        ABOUT_PAGES: ABOUT_PAGES
    };

})();