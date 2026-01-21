/**
 * JetHat Loader System
 * Handles page loading and navigation lazy loading
 */

class LoaderManager {
    constructor() {
        this.pageLoader = null;
        this.navLoader = null;
        this.progressBar = null;
        this.loadingProgress = 0;
        this.componentsToLoad = 0;
        this.componentsLoaded = 0;
        
        this.init();
    }

    init() {
        this.createPageLoader();
        this.createNavLoader();
        this.startPageLoad();
    }

    /**
     * Create main page loader
     */
    createPageLoader() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div class="loader-spinner">
                <img src="assets/images/logo.png" alt="JetHat Logo" class="loader-logo">
                <div class="spinner-ring"></div>
                <div class="spinner-ring-inner"></div>
                <div class="spinner-dot"></div>
            </div>
            
            <div class="loader-text">Loading JetHat...</div>
            
           
        `;
        
        document.body.insertBefore(loader, document.body.firstChild);
        this.pageLoader = loader;
        // this.progressBar = document.getElementById('loader-progress-bar');
    }

    /**
     * Create navigation loader (for lazy loading)
     */
    createNavLoader() {
        const navLoader = document.createElement('div');
        navLoader.className = 'nav-loader';
        navLoader.id = 'nav-loader';
        navLoader.innerHTML = '<div class="nav-loader-bar"></div>';
        navLoader.style.display = 'none';
        
        document.body.appendChild(navLoader);
        this.navLoader = navLoader;
    }

    /**
     * Start page loading process
     */
    startPageLoad() {
        // Simulate initial load
        this.updateProgress(10);
        
        // Check if DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.updateProgress(30);
            });
        } else {
            this.updateProgress(30);
        }

        // Check if all resources are loaded
        if (document.readyState === 'complete') {
            this.updateProgress(50);
        } else {
            window.addEventListener('load', () => {
                this.updateProgress(50);
            });
        }
    }

    /**
     * Update loading progress
     */
    // updateProgress(progress) {
    //     this.loadingProgress = Math.min(progress, 100);
        
    //     if (this.progressBar) {
    //         this.progressBar.style.width = this.loadingProgress + '%';
    //     }

    //     // Update loading text
    //     const loaderText = document.querySelector('.loader-text');
    //     if (loaderText) {
    //         if (this.loadingProgress < 30) {
    //             loaderText.textContent = 'Initializing...';
    //         } else if (this.loadingProgress < 60) {
    //             loaderText.textContent = 'Loading Components...';
    //         } else if (this.loadingProgress < 90) {
    //             loaderText.textContent = 'Almost Ready...';
    //         } else {
    //             loaderText.textContent = 'Welcome to JetHat!';
    //         }
    //     }

    //     // Hide loader when complete
    //     if (this.loadingProgress >= 100) {
    //         setTimeout(() => this.hidePageLoader(), 500);
    //     }
    // }

    /**
     * Set total components to load
     */
    setComponentsCount(count) {
        this.componentsToLoad = count;
        this.componentsLoaded = 0;
    }

    /**
     * Mark component as loaded
     */
    componentLoaded() {
        this.componentsLoaded++;
        const progress = 50 + (this.componentsLoaded / this.componentsToLoad) * 50;
        this.updateProgress(progress);
    }

    /**
     * Hide page loader
     */
    hidePageLoader() {
        if (this.pageLoader) {
            this.pageLoader.classList.add('hidden');
            
            // Remove from DOM after animation
            setTimeout(() => {
                if (this.pageLoader && this.pageLoader.parentNode) {
                    this.pageLoader.parentNode.removeChild(this.pageLoader);
                }
            }, 500);
        }
    }

    /**
     * Show navigation loader
     */
    showNavLoader() {
        if (this.navLoader) {
            this.navLoader.style.display = 'block';
            const bar = this.navLoader.querySelector('.nav-loader-bar');
            if (bar) {
                bar.style.animation = 'none';
                setTimeout(() => {
                    bar.style.animation = 'navProgress 1s ease-in-out';
                }, 10);
            }
        }
    }

    /**
     * Hide navigation loader
     */
    hideNavLoader() {
        if (this.navLoader) {
            setTimeout(() => {
                this.navLoader.style.display = 'none';
            }, 1000);
        }
    }

    /**
     * Load component with loader
     */
    async loadComponentWithLoader(id, path) {
        this.showNavLoader();
        
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to load ${path}: ${response.status}`);
            }
            
            const html = await response.text();
            const element = document.getElementById(id);
            
            if (element) {
                // Add fade-in effect
                element.style.opacity = '0';
                element.innerHTML = html;
                
                // Trigger reflow
                element.offsetHeight;
                
                // Fade in
                element.style.transition = 'opacity 0.3s ease';
                element.style.opacity = '1';
            } else {
                console.warn(`Container #${id} not found`);
            }
            
            this.componentLoaded();
            
        } catch (error) {
            console.error(`Error loading component ${path}:`, error);
            this.componentLoaded(); // Still count as loaded to prevent hanging
        } finally {
            this.hideNavLoader();
        }
    }

    /**
     * Complete loading (call this when all components are loaded)
     */
    completeLoading() {
        this.updateProgress(100);
    }
}

// Create global loader instance
window.loaderManager = new LoaderManager();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoaderManager;
}
