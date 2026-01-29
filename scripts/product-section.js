
$(document).ready(function() {

    
    if (typeof jQuery !== 'undefined' && typeof jQuery.fn.owlCarousel !== 'undefined') {
        setTimeout(function() {
            if (!$('.products-carousel-slider').hasClass('owl-loaded')) {
                console.log('Products: Fallback initialization');
                
                $(".products-carousel-slider").owlCarousel({
                    autoplay: true,
                    smartSpeed: 1000,
                    loop: true,
                    dots: true,
                    items: 1,
                    nav: false,
                    mouseDrag: true,
                    touchDrag: true,
                    pullDrag: true
                });
            }
        }, 2000);
    }
    setTimeout(function() {
        const wowElements = document.querySelectorAll('#products-section .wow:not(.animated)');
        wowElements.forEach(function(element) {
            element.style.visibility = 'visible';
            element.style.opacity = '1';
            element.style.transform = 'none';
            element.classList.add('animated');
        });
        
        const textElements = document.querySelectorAll('#products-section .display-1, #products-section h5, #products-section .text-gradient');
        textElements.forEach(function(element) {
            element.style.visibility = 'visible';
            element.style.opacity = '1';
        });
        
        const firstProductInfo = document.querySelector('.product-info-item[data-product="0"]');
        if (firstProductInfo) {
            firstProductInfo.classList.add('active');
        }
    }, 1000);
});
