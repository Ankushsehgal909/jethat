
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.remove('d-none');
                scrollToTopBtn.classList.add('d-block');
            } else {
                scrollToTopBtn.classList.remove('d-block');
                scrollToTopBtn.classList.add('d-none');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const footerSections = document.querySelectorAll('.footer-section');
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

    const footerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    footerSections.forEach(section => {
        section.style.animationPlayState = 'paused';
        footerObserver.observe(section);
    });


});

