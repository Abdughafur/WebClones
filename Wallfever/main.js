    // Created by Abdughafur
        function setupPremiumCarousel(containerId) {
            const slider = document.getElementById(containerId);
            let isDown = false;
            let startX;
            let scrollLeft;
            let autoScrollInterval;
            let timeoutId;
            const scrollSpeed = 1; 

            function startScrolling() {
                autoScrollInterval = setInterval(() => {
                    if (!isDown) {
                        slider.scrollLeft += scrollSpeed;
                        if (slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth - 4)) {
                            slider.scrollLeft = 1;
                        }
                    }
                }, 30);
            }

            function stopScrolling() {
                clearInterval(autoScrollInterval);
            }

            function resetInactivityTimer() {
                stopScrolling();
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    startScrolling();
                }, 5000);
            }

            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                resetInactivityTimer();
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });

            slider.addEventListener('mouseleave', () => {
                if (isDown) {
                    isDown = false;
                    resetInactivityTimer();
                }
            });

            slider.addEventListener('mouseup', () => {
                isDown = false;
                resetInactivityTimer();
            });

            slider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 1.5;
                slider.scrollLeft = scrollLeft - walk;
            });

            slider.addEventListener('touchstart', (e) => {
                isDown = true;
                resetInactivityTimer();
                startX = e.touches[0].pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });

            slider.addEventListener('touchend', () => {
                isDown = false;
                resetInactivityTimer();
            });

            slider.addEventListener('touchmove', (e) => {
                if (!isDown) return;
                const x = e.touches[0].pageX - slider.offsetLeft;
                const walk = (x - startX) * 1.5;
                slider.scrollLeft = scrollLeft - walk;
            });

            startScrolling();
        }

        setupPremiumCarousel('reviews-drag-wrapper');
        setupPremiumCarousel('walls-drag-wrapper');

        const questions = document.querySelectorAll('.question');
        questions.forEach(button => {
            button.addEventListener('click', () => {
                const wrapper = button.parentElement;
                document.querySelectorAll('.question-wrapper').forEach(item => {
                    if (item !== wrapper) item.classList.remove('active');
                });
                wrapper.classList.toggle('active');
            });
        });

        const scrollTopBtn = document.getElementById('scrollToTop');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });