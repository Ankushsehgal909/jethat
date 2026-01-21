/**
 * Dynamic Breadcrumb Badge Generator
 * Automatically generates breadcrumb badges based on current page path
 */

(function() {
    'use strict';

    // Configuration for page titles and icons
    const pageConfig = {
        // Root pages
        'index.html': { title: 'Home', icon: 'bi-house-door' },
        'contact.html': { title: 'Contact Us', icon: 'bi-headset' },
        'careers.html': { title: 'Careers', icon: 'bi-briefcase' },
        
        // About pages
        'about': { title: 'Company', icon: 'bi-info-circle' },
        'about/index.html': { title: 'About Us', icon: 'bi-book' },
        'about/team.html': { title: 'Our Team', icon: 'bi-people' },
        'about/projects-showcase.html': { title: 'Projects', icon: 'bi-folder' },
        'about/culture.html': { title: 'Culture', icon: 'bi-heart' },
        'about/development-pipeline.html': { title: 'Development', icon: 'bi-gear-fill' },
        'about/success-stories.html': { title: 'Success Stories', icon: 'bi-trophy' },
        
        // Products pages
        'products': { title: 'Products', icon: 'bi-box-seam' },
        'products/ai-lms.html': { title: 'AI LMS', icon: 'bi-mortarboard' },
        'products/anukaran-ai.html': { title: 'Anukaran AI', icon: 'bi-robot' },
        'products/e-library.html': { title: 'E-Library', icon: 'bi-book' },
        'products/magai.html': { title: 'MagAI', icon: 'bi-magic' },
        'products/multi-dictionary.html': { title: 'Multi Dictionary', icon: 'bi-translate' },
        'products/sambhasini-ai.html': { title: 'Sambhasini AI', icon: 'bi-chat-dots' },
        'products/virtual-naani.html': { title: 'Virtual Naani', icon: 'bi-person-video3' },
        
        // Services pages
        'services': { title: 'Services', icon: 'bi-gear' },
        'services/web-development.html': { title: 'Web Development', icon: 'bi-code-slash' },
        'services/mobile-development.html': { title: 'Mobile Development', icon: 'bi-phone' },
        'services/cloud-services.html': { title: 'Cloud Services', icon: 'bi-cloud' },
        'services/ai-ml.html': { title: 'AI & ML', icon: 'bi-cpu' },
        'services/cybersecurity.html': { title: 'Cybersecurity', icon: 'bi-shield-check' },
        
        // Legal pages
        'legal': { title: 'Legal', icon: 'bi-shield-check' },
        'legal/privacy-policy.html': { title: 'Privacy Policy', icon: 'bi-shield-lock' },
        'legal/terms-conditions.html': { title: 'Terms & Conditions', icon: 'bi-file-text' },
        'legal/terms-of-use.html': { title: 'Terms of Use', icon: 'bi-file-earmark-text' },
        'legal/cancellation-policy.html': { title: 'Cancellation Policy', icon: 'bi-x-circle' },
        
        // Technologies pages
        'technologies': { title: 'Technologies', icon: 'bi-lightning' },
        'technologies/index.html': { title: 'Tech Stack', icon: 'bi-stack' },
        'technologies/core.html': { title: 'Core Technologies', icon: 'bi-cpu-fill' },
        'technologies/innovation.html': { title: 'Innovation Lab', icon: 'bi-lightbulb' },
        'technologies/case-study.html': { title: 'Case Studies', icon: 'bi-journal-text' }
    };

    /**
     * Get current page path relative to root
     */
    function getCurrentPath() {
        let path = window.location.pathname;
        
        // Remove leading slash and any base path
        path = path.replace(/^\/+/, '');
        
        // If empty or just '/', it's the home page
        if (!path || path === '/') {
            return 'index.html';
        }
        
        // If it ends with '/', add index.html
        if (path.endsWith('/')) {
            path += 'index.html';
        }
        
        return path;
    }

    /**
     * Parse path into breadcrumb segments
     */
    function parseBreadcrumbs(path) {
        const segments = [];
        const parts = path.split('/');
        
        // Always start with Home
        segments.push({
            title: 'Home',
            path: 'index.html',
            isHome: true
        });
        
        // Build cumulative path for each segment
        let cumulativePath = '';
        
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            
            // Skip empty parts
            if (!part) continue;
            
            // Build cumulative path
            if (cumulativePath) {
                cumulativePath += '/' + part;
            } else {
                cumulativePath = part;
            }
            
            // Check if this is the last segment (current page)
            const isLast = (i === parts.length - 1);
            
            // Get config for this path
            let config = pageConfig[cumulativePath];
            
            // If no exact match, try folder name
            if (!config && !part.includes('.html')) {
                config = pageConfig[part];
            }
            
            // If still no config, create default
            if (!config) {
                config = {
                    title: formatTitle(part),
                    icon: 'bi-file-earmark'
                };
            }
            
            segments.push({
                title: config.title,
                icon: config.icon,
                path: cumulativePath,
                isLast: isLast
            });
        }
        
        return segments;
    }

    /**
     * Format a filename/folder name into a readable title
     */
    function formatTitle(str) {
        return str
            .replace('.html', '')
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    /**
     * Generate breadcrumb HTML with separator option
     */
    function generateBreadcrumbHTML(segments, separator = 'slash') {
        const separatorMap = {
            'slash': '/',
            'arrow': '→',
            'chevron': '›',
            'dot': '•'
        };
        
        const sep = separatorMap[separator] || separatorMap['chevron'];
        
        let html = '<span class="breadcrumb-text fs-6 fw-medium" style="color: inherit;">';
        
        segments.forEach((segment, index) => {
            // Add icon for first segment or last segment
            if (index === 0 || segment.isLast) {
                // html += `<i class="${segment.icon} me-2"></i>`;
            }
            
            // Add title
            html += segment.title;
            
            // Add separator if not last
            if (index < segments.length - 1) {
                html += ` <span class=" text-muted">${sep}</span> `;
            }
        });
        
        html += '</span>';
        
        return html;
    }

    /**
     * Initialize breadcrumb on page load
     */
    function initBreadcrumb(options = {}) {
        const {
            selector = '[data-breadcrumb]',
            separator = 'chevron',
            autoInit = true
        } = options;
        
        if (!autoInit) return;
        
        // Get current path and parse breadcrumbs
        const currentPath = getCurrentPath();
        const segments = parseBreadcrumbs(currentPath);
        
        // Generate HTML
        const breadcrumbHTML = generateBreadcrumbHTML(segments, separator);
        
        // Find all breadcrumb containers and inject
        const containers = document.querySelectorAll(selector);
        containers.forEach(container => {
            container.innerHTML = breadcrumbHTML;
        });
        
        // Also look for old manual breadcrumbs and replace them
        const oldBreadcrumbs = document.querySelectorAll('.badge.bg-secondary, .badge.bg--bs-secondary');
        oldBreadcrumbs.forEach(badge => {
            // Only replace if it looks like a breadcrumb (contains icon)
            if (badge.querySelector('i.bi')) {
                badge.outerHTML = breadcrumbHTML;
            }
        });
    }

    /**
     * Public API
     */
    window.BreadcrumbBadge = {
        init: initBreadcrumb,
        getCurrentPath: getCurrentPath,
        parseBreadcrumbs: parseBreadcrumbs,
        generateHTML: generateBreadcrumbHTML
    };

    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initBreadcrumb();
        });
    } else {
        initBreadcrumb();
    }

})();
