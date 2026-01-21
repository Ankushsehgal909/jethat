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

    // Add smooth transition to active box
    if (activeBox) {
      activeBox.style.transition = 'all 0.3s ease';
    }

    // Sticky detection for visual feedback
    if (stickyElement) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio < 1) {
            stickyElement.classList.add('stuck');
          } else {
            stickyElement.classList.remove('stuck');
          }
        },
        { threshold: [1] }
      );
      observer.observe(stickyElement);
    }

    // Create intersection observer with better settings for full-height sections
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index'));
          const data = sectionData[index];
          
          if (data && titleElement && descElement) {
            console.log('Updating to section:', index, data.title);
            
            // Add fade effect
            if (activeBox) {
              activeBox.style.opacity = '0.7';
              activeBox.style.transform = 'translateY(5px)';
            }
            
            setTimeout(function() {
              titleElement.textContent = data.title;
              descElement.textContent = data.desc;
              
              // Reset fade effect
              if (activeBox) {
                activeBox.style.opacity = '1';
                activeBox.style.transform = 'translateY(0)';
              }
            }, 150);
          }
        }
      });
    }, {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Trigger when section is more centered
      threshold: 0.3 // Lower threshold for better detection
    });

    // Observe all sections
    sections.forEach(function(section) {
      observer.observe(section);
      console.log('Observing section:', section.getAttribute('data-index'));
    });

    // Add hover effects to images
    sections.forEach(function(section) {
      const img = section.querySelector('img');
      if (img) {
        img.style.transition = 'transform 0.3s ease';
        section.addEventListener('mouseenter', function() {
          img.style.transform = 'scale(1.05)';
        });
        section.addEventListener('mouseleave', function() {
          img.style.transform = 'scale(1)';
        });
      }
    });

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