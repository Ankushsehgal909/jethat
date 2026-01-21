// Enhanced Services JavaScript with Slide Animations and Interactions

document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedServices();
});

function initializeEnhancedServices() {
    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    }

    // Initialize service cards
    initializeServiceCards();
    
    // Initialize intersection observer for animations
    initializeScrollAnimations();
    
    // Initialize parallax effects
    initializeParallaxEffects();
}

function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.enhanced-service-card');
    
    serviceCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover event listeners
        card.addEventListener('mouseenter', handleCardHover);
        card.addEventListener('mouseleave', handleCardLeave);
        
        // Add click event listener
        card.addEventListener('click', handleCardClick);
        
        // Initialize image slide animation
        initializeImageSlideAnimation(card);
    });
}

function initializeImageSlideAnimation(card) {
    const baseImage = card.querySelector('.service-image-base');
    const hoverImage = card.querySelector('.service-image-hover');
    const legacyImage = card.querySelector('.service-image');
    const overlay = card.querySelector('.service-overlay');
    const badge = card.querySelector('.service-badge');
    const content = card.querySelector('.service-content');
    const exploreBtn = card.querySelector('.explore-btn');
    
    // Set initial states for new dual-image system
    if (baseImage) {
        baseImage.style.transform = 'scale(1)';
        baseImage.style.transition = 'all 0.6s ease';
    }
    
    if (hoverImage) {
        hoverImage.style.transform = 'translateY(100%)';
        hoverImage.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    // Legacy support for single image
    if (legacyImage) {
        legacyImage.style.transform = 'translateY(20px)';
        legacyImage.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.transition = 'all 0.4s ease';
    }
    
    if (badge) {
        badge.style.transform = 'translateY(-10px)';
        badge.style.opacity = '0';
        badge.style.transition = 'all 0.4s ease';
    }
    
    if (content) {
        content.style.transform = 'translateY(20px)';
        content.style.transition = 'all 0.4s ease';
    }
    
    if (exploreBtn) {
        exploreBtn.style.transform = 'translateY(10px)';
        exploreBtn.style.opacity = '0';
        exploreBtn.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }
}

function handleCardHover(event) {
    const card = event.currentTarget;
    const baseImage = card.querySelector('.service-image-base');
    const hoverImage = card.querySelector('.service-image-hover');
    const legacyImage = card.querySelector('.service-image');
    const overlay = card.querySelector('.service-overlay');
    const badge = card.querySelector('.service-badge');
    const content = card.querySelector('.service-content');
    const exploreBtn = card.querySelector('.explore-btn');
    const featureTags = card.querySelectorAll('.feature-tag');
    
    // Animate dual-image system
    if (baseImage) {
        baseImage.style.transform = 'scale(1.05)';
    }
    
    if (hoverImage) {
        hoverImage.style.transform = 'translateY(0)';
    }
    
    // Legacy support for single image
    if (legacyImage) {
        legacyImage.style.transform = 'translateY(0) scale(1.05)';
    }
    
    // Show overlay
    if (overlay) {
        overlay.style.opacity = '1';
    }
    
    // Animate badge slide down
    if (badge) {
        badge.style.transform = 'translateY(0)';
        badge.style.opacity = '1';
    }
    
    // Animate content slide up
    if (content) {
        content.style.transform = 'translateY(0)';
    }
    
    // Show explore button with slide up animation
    if (exploreBtn) {
        setTimeout(() => {
            exploreBtn.style.transform = 'translateY(0)';
            exploreBtn.style.opacity = '1';
        }, 200);
    }
    
    // Animate feature tags
    featureTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.transform = 'translateY(-2px)';
        }, index * 50);
    });
    
    // Add card elevation
    card.style.transform = 'translateY(-12px)';
    card.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.15)';
}

function handleCardLeave(event) {
    const card = event.currentTarget;
    const baseImage = card.querySelector('.service-image-base');
    const hoverImage = card.querySelector('.service-image-hover');
    const legacyImage = card.querySelector('.service-image');
    const overlay = card.querySelector('.service-overlay');
    const badge = card.querySelector('.service-badge');
    const content = card.querySelector('.service-content');
    const exploreBtn = card.querySelector('.explore-btn');
    const featureTags = card.querySelectorAll('.feature-tag');
    
    // Reset dual-image system
    if (baseImage) {
        baseImage.style.transform = 'scale(1)';
    }
    
    if (hoverImage) {
        hoverImage.style.transform = 'translateY(100%)';
    }
    
    // Legacy support for single image
    if (legacyImage) {
        legacyImage.style.transform = 'translateY(20px) scale(1)';
    }
    
    // Hide overlay
    if (overlay) {
        overlay.style.opacity = '0';
    }
    
    // Hide badge
    if (badge) {
        badge.style.transform = 'translateY(-10px)';
        badge.style.opacity = '0';
    }
    
    // Reset content position
    if (content) {
        content.style.transform = 'translateY(20px)';
    }
    
    // Hide explore button
    if (exploreBtn) {
        exploreBtn.style.transform = 'translateY(10px)';
        exploreBtn.style.opacity = '0';
    }
    
    // Reset feature tags
    featureTags.forEach((tag) => {
        tag.style.transform = 'translateY(0)';
    });
    
    // Reset card elevation
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
}

function handleCardClick(event) {
    const card = event.currentTarget;
    const serviceType = card.getAttribute('data-service');
    
    // Add click animation
    card.style.transform = 'translateY(-8px) scale(0.98)';
    
    setTimeout(() => {
        card.style.transform = 'translateY(-12px) scale(1)';
        
        // Navigate to service page or trigger action
        exploreService(serviceType);
    }, 150);
}

function exploreService(serviceType) {
    // Add ripple effect
    createRippleEffect(event.target);
    
    // Service navigation mapping
    const serviceRoutes = {
        'cybersecurity': 'services/cybersecurity.html',
        'ai-ml': 'services/ai-ml.html',
        'web-development': 'services/web-development.html',
        'cloud-services': 'services/cloud-services.html',
        'mobile-development': 'services/mobile-development.html',
        'digital-consulting': 'services/digital-consulting.html'
    };
    
    const route = serviceRoutes[serviceType];
    
    if (route) {
        // Add loading animation
        showLoadingAnimation();
        
        // Navigate after animation
        setTimeout(() => {
            window.location.href = route;
        }, 800);
    } else {
        console.log(`Exploring ${serviceType} service...`);
        // Show modal or perform other action
        showServiceModal(serviceType);
    }
}

function createRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'service-loader';
    loader.innerHTML = `
        <div class="loader-spinner"></div>
        <p>Loading service details...</p>
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.remove();
    }, 800);
}

function showServiceModal(serviceType) {
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Service Details</h3>
                <button class="modal-close" onclick="closeServiceModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p>More information about ${serviceType} service coming soon!</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeServiceModal();
        }
    });
}

function closeServiceModal() {
    const modal = document.querySelector('.service-modal');
    if (modal) {
        modal.remove();
    }
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger staggered animations for cards
                if (entry.target.classList.contains('enhanced-service-card')) {
                    const cards = document.querySelectorAll('.enhanced-service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('slide-in');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe service cards
    document.querySelectorAll('.enhanced-service-card').forEach(card => {
        observer.observe(card);
    });
}

function initializeParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const serviceSection = document.getElementById('enhanced-services-section');
        
        if (serviceSection) {
            const rect = serviceSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                // Apply subtle parallax to service images
                const images = serviceSection.querySelectorAll('.service-image');
                images.forEach((image, index) => {
                    const speed = 0.5 + (index * 0.1);
                    const yPos = -(scrolled * speed);
                    image.style.transform = `translateY(${yPos}px)`;
                });
            }
        }
    });
}

// CSS for additional animations and effects
const additionalStyles = `
<style>
.ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.service-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    color: white;
}

.loader-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid #dc143c;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.service-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.modal-content {
    background: white;
    padding: 30px;
    border-radius: 20px;
    max-width: 500px;
    width: 90%;
    animation: modalSlideIn 0.3s ease-out;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
}

@keyframes modalSlideIn {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.slide-in {
    animation: slideInUp 0.6s ease-out forwards;
}

@keyframes slideInUp {
    from {
        transform: translateY(50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.animate-in {
    animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
    from {
        transform: translateY(30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Export functions for global access
window.exploreService = exploreService;
window.closeServiceModal = closeServiceModal;