(function() {
  'use strict';
  
  // Data for the sections
  const sectionData = [
    {
      title: "Vision",
      desc: "A digitally secure world where businesses thrive without compromise."
    },
    {
      title: "Expertise", 
      desc: "Deep expertise in cybersecurity and software development with cutting-edge solutions."
    },
    {
      title: "Innovation",
      desc: "Continuous innovation to stay ahead of evolving cyber threats and technology trends."
    },
    {
      title: "Security",
      desc: "Comprehensive protection across all digital ecosystems and business operations."
    }
  ];

  // Utility functions
  function isMobile() {
    return window.innerWidth <= 991.98;
  }

  function isReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function initWhoWeAre() {
    const titleElement = document.getElementById('active-title');
    const descElement = document.getElementById('active-desc');
    const activeBox = document.getElementById('active-box');
    const sections = document.querySelectorAll('#who-we-are-sections-container section[data-index]');
    const stickyElement = document.querySelector('.who-we-are-sticky');
    
    if (!titleElement || !descElement || !sections.length) {
      console.log('Who We Are: Elements not found, retrying...');
      setTimeout(initWhoWeAre, 500);
      return;
    }

    console.log('Who We Are: Initializing with', sections.length, 'sections');

    // Add smooth transition to active box (only if motion is allowed)
    if (activeBox && !isReducedMotion()) {
      activeBox.style.transition = 'all 0.3s ease';
    }

    // Sticky detection for visual feedback (desktop only)
    if (stickyElement && !isMobile()) {
      const stickyObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio < 1) {
            stickyElement.classList.add('stuck');
          } else {
            stickyElement.classList.remove('stuck');
          }
        },
        { threshold: [1] }
      );
      stickyObserver.observe(stickyElement);
    }

    // Responsive intersection observer settings
    const getObserverOptions = () => {
      if (isMobile()) {
        return {
          root: null,
          rootMargin: '-10% 0px -10% 0px',
          threshold: 0.5
        };
      } else {
        return {
          root: null,
          rootMargin: '-20% 0px -20% 0px',
          threshold: 0.3
        };
      }
    };

    // Create intersection observer
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index'));
          const data = sectionData[index];
          
          if (data && titleElement && descElement) {
            console.log('Updating to section:', index, data.title);
            
            // Add fade effect (only if motion is allowed)
            if (activeBox && !isReducedMotion()) {
              activeBox.style.opacity = '0.7';
              activeBox.style.transform = 'translateY(5px)';
            }
            
            const updateContent = () => {
              titleElement.textContent = data.title;
              descElement.textContent = data.desc;
              
              // Reset fade effect
              if (activeBox && !isReducedMotion()) {
                activeBox.style.opacity = '1';
                activeBox.style.transform = 'translateY(0)';
              }
            };

            if (isReducedMotion()) {
              updateContent();
            } else {
              setTimeout(updateContent, 150);
            }
          }
        }
      });
    }, getObserverOptions());

    // Observe all sections
    sections.forEach(function(section) {
      observer.observe(section);
      console.log('Observing section:', section.getAttribute('data-index'));
    });

    // Add touch and hover effects
    sections.forEach(function(section) {
      const img = section.querySelector('img');
      if (img && !isReducedMotion()) {
        img.style.transition = 'transform 0.3s ease';
        
        // Mouse events for desktop
        section.addEventListener('mouseenter', function() {
          if (!isMobile()) {
            img.style.transform = 'scale(1.05)';
          }
        });
        
        section.addEventListener('mouseleave', function() {
          if (!isMobile()) {
            img.style.transform = 'scale(1)';
          }
        });

        // Touch events for mobile
        section.addEventListener('touchstart', function() {
          if (isMobile()) {
            img.style.transform = 'scale(1.02)';
          }
        }, { passive: true });
        
        section.addEventListener('touchend', function() {
          if (isMobile()) {
            setTimeout(() => {
              img.style.transform = 'scale(1)';
            }, 150);
          }
        }, { passive: true });
      }
    });

    // Handle resize events
    const handleResize = debounce(() => {
      // Reinitialize observer with new settings if needed
      observer.disconnect();
      sections.forEach(section => observer.observe(section));
    }, 250);

    window.addEventListener('resize', handleResize, { passive: true });

    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      sections.forEach(section => {
        const img = section.querySelector('img');
        if (img) {
          imageObserver.observe(img);
        }
      });
    }

    console.log('Who We Are: Initialization complete');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhoWeAre);
  } else {
    initWhoWeAre();
  }

  // Fallback initialization
  setTimeout(initWhoWeAre, 1000);
})();