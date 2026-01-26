/**
 * Career Page JavaScript
 * Handles component loading, animations, job search/filter, and scroll progress
 */

// Component Loader Function
async function loadComponent(id, path) {
    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`${path} (${res.status})`);
        const html = await res.text();

        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
        else console.warn(`Missing container #${id}`);
    } catch (err) {
        console.error(`Component load failed: ${path}`, err);
    }
}

// Scroll Progress Function
function initializeScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollBar = document.getElementById('scroll-bar');
    
    if (scrollProgress && scrollBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            scrollBar.style.width = scrollPercentage + '%';
        });
    }
}

// Reveal Animations (Intersection Observer)
function initializeRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe reveal elements
    document.querySelectorAll('.reveal-up').forEach(el => {
        observer.observe(el);
    });

    // Trigger animations on page load for elements in viewport
    setTimeout(() => {
        document.querySelectorAll('.reveal-up').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('visible');
            }
        });
    }, 100);
}

// GSAP Animations
function initializeGSAPAnimations() {
    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Fade in animations
        gsap.utils.toArray('.fade-in-up').forEach((element, i) => {
            gsap.fromTo(element, {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        gsap.utils.toArray('.fade-in-left').forEach((element, i) => {
            gsap.fromTo(element, {
                opacity: 0,
                x: -50
            }, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        gsap.utils.toArray('.fade-in-right').forEach((element, i) => {
            gsap.fromTo(element, {
                opacity: 0,
                x: 50
            }, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }
}

// Job Search and Filter Functionality
function initializeJobSearch() {
    const searchInput = document.getElementById('jobSearch');
    const departmentFilter = document.getElementById('departmentFilter');
    const workModelFilter = document.getElementById('workModelFilter');
    const experienceFilters = document.querySelectorAll('.experience-filter');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const jobListItems = document.querySelectorAll('.job-list-item');
    const jobCount = document.getElementById('jobCount');
    const noResults = document.getElementById('noResults');
    const jobListContainer = document.getElementById('jobListContainer');

    if (!jobListItems.length) return;

    function filterJobs() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedDepartment = departmentFilter ? departmentFilter.value : '';
        const selectedWorkModel = workModelFilter ? workModelFilter.value : '';
        
        // Get selected experience levels
        const selectedExperience = Array.from(experienceFilters)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        let visibleCount = 0;

        jobListItems.forEach(item => {
            const title = item.querySelector('.job-list-title').textContent.toLowerCase();
            const department = item.dataset.department;
            const workModel = item.dataset.workModel;
            const experience = item.dataset.experience;

            // Check search term
            const matchesSearch = !searchTerm || title.includes(searchTerm);
            
            // Check department
            const matchesDepartment = !selectedDepartment || department === selectedDepartment;
            
            // Check work model
            const matchesWorkModel = !selectedWorkModel || workModel === selectedWorkModel;
            
            // Check experience level
            const matchesExperience = selectedExperience.length === 0 || selectedExperience.includes(experience);

            if (matchesSearch && matchesDepartment && matchesWorkModel && matchesExperience) {
                item.style.display = 'flex';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Update job count
        if (jobCount) {
            jobCount.textContent = visibleCount;
        }

        // Show/hide no results message
        if (visibleCount === 0) {
            if (jobListContainer) jobListContainer.style.display = 'none';
            if (noResults) noResults.style.display = 'block';
        } else {
            if (jobListContainer) jobListContainer.style.display = 'block';
            if (noResults) noResults.style.display = 'none';
        }
    }

    function clearFilters() {
        if (searchInput) searchInput.value = '';
        if (departmentFilter) departmentFilter.value = '';
        if (workModelFilter) workModelFilter.value = '';
        experienceFilters.forEach(checkbox => checkbox.checked = false);
        filterJobs();
    }

    // Add event listeners
    if (searchInput) searchInput.addEventListener('input', filterJobs);
    if (departmentFilter) departmentFilter.addEventListener('change', filterJobs);
    if (workModelFilter) workModelFilter.addEventListener('change', filterJobs);
    if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', clearFilters);
    
    experienceFilters.forEach(checkbox => {
        checkbox.addEventListener('change', filterJobs);
    });
}

// Smooth Scrolling for Anchor Links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize Theme Manager
function initializeThemeManager() {
    setTimeout(() => {
        if (window.ThemeManager) {
            window.themeManager = new window.ThemeManager();
        }
    }, 500);
}

// Main Initialization Function
async function initializeCareerPage() {
    // Load navigation
    await loadComponent('navigation-component', 'components/navigation/navigation.html');
    
    // Load right panel
    await loadComponent('right-panel-component', 'components/right-panel/right-panel.html');
    
    // Load footer
    await loadComponent('footer-component', 'components/footer/footer.html');
    
    // Initialize theme toggle after navigation is loaded
    initializeThemeManager();
    
    // Initialize all features
    initializeScrollProgress();
    initializeRevealAnimations();
    initializeGSAPAnimations();
    initializeJobSearch();
    initializeSmoothScroll();
    
    console.log('✅ Career page initialized successfully');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeCareerPage);

// Export for potential use in other scripts
window.CareerPage = {
    loadComponent,
    initializeScrollProgress,
    initializeRevealAnimations,
    initializeGSAPAnimations,
    initializeJobSearch,
    initializeSmoothScroll,
    initializeCareerPage
};

