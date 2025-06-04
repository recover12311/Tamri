        document.addEventListener('DOMContentLoaded', () => {
            const mainNavbar = document.getElementById('mainNavbar');
            const navbarNav = document.getElementById('navbarNav');

            // Function to adjust body padding based on navbar height
            const adjustBodyPadding = () => {
                if (mainNavbar) {
                    const navbarHeight = mainNavbar.offsetHeight;
                    document.body.style.paddingTop = `${navbarHeight}px`;
                }
            };

            // Инициализация карусели Bootstrap
            // Теперь объект 'bootstrap' должен быть доступен
            const myCarousel = document.querySelector('#servicesCarousel');
            if (myCarousel) {
                const carousel = new bootstrap.Carousel(myCarousel, {
                    interval: 5000, // Автоматическое переключение каждые 5 секунд (по желанию)
                    wrap: true // Зациклить карусель
                });
            }

            // Call on page load and window resize
            adjustBodyPadding();
            window.addEventListener('resize', adjustBodyPadding);

            // Smooth scroll for navigation links
            document.querySelectorAll('.nav-link, .scroll-link').forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault(); // Prevent default anchor click behavior

                    const targetId = this.getAttribute('href'); // Get the target element ID
                    if (targetId && targetId.startsWith('#')) {
                        const targetElement = document.querySelector(targetId);

                        if (targetElement) {
                            const navbarHeight = mainNavbar ? mainNavbar.offsetHeight : 0;
                            // Calculate scroll position, accounting for fixed navbar
                            const scrollToPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

                            window.scrollTo({
                                top: scrollToPosition,
                                behavior: 'smooth'
                            });

                            // Close the mobile navigation menu after clicking a link (for Bootstrap's collapse)
                            if (navbarNav && navbarNav.classList.contains('show')) {
                                const bsCollapse = new bootstrap.Collapse(navbarNav, {
                                    toggle: false
                                });
                                bsCollapse.hide();
                            }
                        }
                    }
                });
            });
        });