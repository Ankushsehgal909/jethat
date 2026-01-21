// CTA Section Animation Controller
function initializeCTAAnimations() {
    const ctaSection = document.getElementById('cta-component');
    
    if (!ctaSection) {
        console.log('CTA section not found, retrying...');
        setTimeout(initializeCTAAnimations, 100);
        return;
    }
    
    // ================= SCROLL ANIMATIONS ================= 
    
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    observer.observe(ctaSection);
    
    // ================= COUNTER ANIMATIONS ================= 
    
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                        // Add special formatting for certain counters
                        if (target === 99) {
                            counter.textContent = target + '%';
                        } else if (target === 24) {
                            counter.textContent = target + '/7';
                        } else if (target === 100) {
                            counter.textContent = target + '%';
                        }
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // ================= PROGRESS BAR ANIMATIONS ================= 
    
    const progressBars = document.querySelectorAll('.progress-animated');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;
                progressBar.style.setProperty('--target-width', targetWidth);
                progressBar.classList.add('animate');
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
    
    // ================= BUTTON INTERACTIONS ================= 
    
    // Enhanced button interactions
    const animatedBtns = document.querySelectorAll('.animated-btn');
    animatedBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ctaRipple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // ================= FORM INTERACTIONS ================= 
    
    // Email input enhancements
    const emailInput = document.querySelector('.email-input');
    if (emailInput) {
        emailInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.boxShadow = '0 5px 15px rgba(255, 140, 0, 0.2)';
        });
        
        emailInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
            this.parentElement.style.boxShadow = '';
        });
        
        // Email validation
        emailInput.addEventListener('input', function() {
            const email = this.value;
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            
            if (email.length > 0) {
                if (isValid) {
                    this.style.borderColor = '#28a745';
                    this.style.boxShadow = '0 0 0 0.2rem rgba(40, 167, 69, 0.25)';
                } else {
                    this.style.borderColor = '#dc3545';
                    this.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
                }
            } else {
                this.style.borderColor = 'rgba(255,140,0,.3)';
                this.style.boxShadow = '';
            }
        });
    }
    
    // Subscribe button functionality
    const subscribeBtn = document.querySelector('.subscribe-btn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = emailInput ? emailInput.value : '';
            const privacyCheck = document.getElementById('privacy-check');
            
            if (!email) {
                showNotification('Please enter your email address', 'error');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            if (!privacyCheck.checked) {
                showNotification('Please agree to receive updates', 'error');
                return;
            }
            
            // Simulate subscription
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Subscribing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<span class="btn-text">Subscribed!</span> <span class="btn-arrow">✅</span>';
                showNotification('Successfully subscribed to our newsletter!', 'success');
                
                // Reset form
                setTimeout(() => {
                    if (emailInput) emailInput.value = '';
                    privacyCheck.checked = false;
                    this.innerHTML = '<span class="btn-text">Subscribe</span> <span class="btn-arrow">✉️</span>';
                    this.disabled = false;
                }, 3000);
            }, 2000);
        });
    }
    
    // ================= DASHBOARD INTERACTIONS ================= 
    
    // Dashboard mockup interactions
    const dashboardMockup = document.querySelector('.dashboard-mockup');
    if (dashboardMockup) {
        dashboardMockup.addEventListener('mouseenter', function() {
            // Animate metric cards
            const metricCards = this.querySelectorAll('.metric-card');
            metricCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = 'translateY(-5px) scale(1.05)';
                }, index * 100);
            });
        });
        
        dashboardMockup.addEventListener('mouseleave', function() {
            const metricCards = this.querySelectorAll('.metric-card');
            metricCards.forEach(card => {
                card.style.transform = '';
            });
        });
    }
    
    // ================= FLOATING ELEMENTS ================= 
    
    // Enhanced floating elements with mouse interaction
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'translateY(-15px) scale(1.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
    });
    
    // ================= NOTIFICATION SYSTEM ================= 
    
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.cta-notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `cta-notification alert alert-${type === 'error' ? 'danger' : 'success'} position-fixed`;
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <span class="me-2">${type === 'error' ? '❌' : '✅'}</span>
                <span>${message}</span>
                <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // ================= PARALLAX EFFECTS ================= 
    
    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const bgElements = document.querySelectorAll('.bg-element');
        
        bgElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Add CSS for animations
    if (!document.getElementById('cta-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'cta-animation-styles';
        style.textContent = `
            @keyframes ctaRipple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
            
            .spinner-border-sm {
                width: 1rem;
                height: 1rem;
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('CTA animations initialized successfully');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            initializeCTAAnimations();
        }, 700);
    });
} else {
    setTimeout(() => {
        initializeCTAAnimations();
    }, 700);
}

// Export function for manual initialization
window.initializeCTAAnimations = initializeCTAAnimations;