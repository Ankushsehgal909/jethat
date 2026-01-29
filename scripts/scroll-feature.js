
    const container = document.querySelector('[data-container]');
    const cards = document.querySelectorAll('.feature-card');
    const numCards = cards.length;
    const cardGap = 30;
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

            // y position
            let y;
            if (progress <= cardStart) {
                y = isFirst ? stackedPosition : 700;
            } else if (progress >= cardEnd) {
                y = stackedPosition;
            } else {
                const frac = (progress - cardStart) / (cardEnd - cardStart);
                y = isFirst ? stackedPosition : 700 + frac * (stackedPosition - 700);
            }

            // opacity
            let opacity = 1;
            if (!isFirst) {
                const fadeStart = cardStart;
                const fadeEnd = cardStart + 0.1 / numCards;
                if (progress <= fadeStart) {
                    opacity = 0;
                } else if (progress < fadeEnd) {
                    opacity = (progress - fadeStart) / (fadeEnd - fadeStart);
                } else {
                    opacity = 1;
                }
            }

            // scale
            let scale;
            if (progress <= cardStart) {
                scale = isFirst ? 1 : 0.85;
            } else if (progress >= cardEnd) {
                scale = 1;
            } else {
                const frac = (progress - cardStart) / (cardEnd - cardStart);
                scale = isFirst ? 1 : 0.85 + frac * 0.15;
            }

            card.style.transform = `translateY(${y}px) scale(${scale})`;
            card.style.opacity = opacity;
            card.style.zIndex = index + 1;
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateCards);
            ticking = true;
        }
    });

    // Initial call
    updateCards();

    // Theme toggle functionality (optional)
    function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-bs-theme', newTheme);
    }
