(function() {
    'use strict';

    const cardsData = [
        {
            title: "Advanced AI Technology",
            color: "primary",
            image: "https://picsum.photos/400/300?random=1",
            bullets: [
                "Powered by cutting-edge natural language processing",
                "Machine learning algorithms that improve over time",
                "Context-aware responses for natural conversations"
            ]
        },
        {
            title: "Multi-Language Support",
            color: "success",
            image: "https://picsum.photos/400/300?random=2",
            bullets: [
                "Build chatbots that communicate in multiple languages",
                "Automatic language detection and translation",
                "Seamless cross-language conversations"
            ]
        },
        {
            title: "Lightning-Fast Performance",
            color: "warning",
            image: "https://picsum.photos/400/300?random=3",
            bullets: [
                "Optimized for instant response times",
                "Handle thousands of concurrent conversations",
                "Low-latency infrastructure worldwide"
            ]
        },
        {
            title: "Enterprise-Grade Security",
            color: "danger",
            image: "https://picsum.photos/400/300?random=4",
            bullets: [
                "End-to-end encryption for all conversations",
                "GDPR and SOC 2 compliant infrastructure",
                "Role-based access control and audit logs"
            ]
        },
        {
            title: "Analytics & Insights",
            color: "info",
            image: "https://picsum.photos/400/300?random=5",
            bullets: [
                "Real-time conversation analytics dashboard",
                "Track user engagement and satisfaction metrics",
                "AI-powered insights to improve performance"
            ]
        }
    ];

    function initProducts() {
        const cardsContainer = document.getElementById("cardsContainer");
        
        if (!cardsContainer) {
            console.log('Products: Container not found, retrying...');
            setTimeout(initProducts, 500);
            return;
        }

        console.log('Products: Initializing with', cardsData.length, 'cards');

        // Clear existing content
        cardsContainer.innerHTML = '';

        cardsData.forEach((card, index) => {
            const el = document.createElement("div");
            el.className = `card position-absolute top-0 start-0 end-0 mx-auto bg-white border-light shadow-lg`;
            el.style.width = "100%";
            el.style.height = "450px";
            el.style.maxWidth = "1200px";
            el.style.border = "1px solid rgba(220, 20, 60, 0.1)";
            el.dataset.index = index;

            el.innerHTML = `
                <div class="card-body p-3 p-md-4">
                    <div class="row align-items-center">
                        <div class="col-md-6 pe-md-4">
                            <div class="d-inline-flex p-3 rounded text-white mb-3" style="background: linear-gradient(135deg, var(--accent-primary), var(--accent-gold));">
                                <span class="fw-bold">AI</span>
                            </div>
                            <h3 class="h2 fw-bold mb-3 text-dark">${card.title}</h3>
                            <ul class="list-unstyled mb-3">
                                ${card.bullets.map(b => `
                                    <li class="d-flex align-items-start text-muted mb-2">
                                        <span class="rounded-circle me-3 mt-2" style="width: 6px; height: 6px; background: linear-gradient(135deg, var(--accent-primary), var(--accent-gold));"></span>
                                        <span style="color: #666666;">${b}</span>
                                    </li>
                                `).join("")}
                            </ul>
                            <button class="btn rounded-pill px-4" style="background: linear-gradient(135deg, var(--accent-primary), var(--accent-gold)); border: none; color: white;">
                                Learn more <i class="bi bi-arrow-right ms-2"></i>
                            </button>
                        </div>
                        <div class="col-md-6">
                            <img src="${card.image}" class="img-fluid rounded shadow" alt="${card.title}">
                        </div>
                    </div>
                </div>
            `;

            cardsContainer.appendChild(el);
        });

        // Scroll Animation Logic
        const container = document.querySelector('#products-section');
        const cards = document.querySelectorAll('#cardsContainer .card');
        const numCards = cards.length;
        const cardGap = 20; // Reduced from 30 to 20 for tighter spacing
        let ticking = false;

        function updateCards() {
            const start = container.offsetTop;
            const end = start + container.offsetHeight - window.innerHeight;
            let progress = 0;

            if (end > start) {
                progress = Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)));
            }

            cards.forEach((card, index) => {
                const cardStart = index / numCards;
                const cardEnd = (index + 0.5) / numCards;
                const stackedPosition = index * cardGap;
                const isFirst = index === 0;

                let y;
                if (progress <= cardStart) y = isFirst ? stackedPosition : 700;
                else if (progress >= cardEnd) y = stackedPosition;
                else {
                    const frac = (progress - cardStart) / (cardEnd - cardStart);
                    y = isFirst ? stackedPosition : 700 + frac * (stackedPosition - 700);
                }

                let opacity = index === 0 ? 1 : progress < cardStart ? 0 : 1;
                let scale = index === 0 ? 1 : progress < cardStart ? 0.85 : 1;

                card.style.transform = `translateY(${y}px) scale(${scale})`;
                card.style.opacity = opacity;
                card.style.zIndex = index + 1;
            });

            ticking = false;
        }

        window.addEventListener("scroll", () => {
            if (!ticking) {
                requestAnimationFrame(updateCards);
                ticking = true;
            }
        });

        updateCards();
        console.log('Products: Initialization complete');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProducts);
    } else {
        initProducts();
    }

    // Fallback initialization
    setTimeout(initProducts, 1000);
})();