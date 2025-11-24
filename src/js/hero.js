document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // Логика переключения мобильного меню
    // ----------------------------------------------------
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');
    const navLinks = document.querySelectorAll('.nav__link');

    const toggleMenu = () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navList.classList.toggle('is-open');
    };

    navToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('is-open')) {
                toggleMenu();
            }
        });
    });

    // ----------------------------------------------------
    // Кастомная JS-анимация для секции Hero: "Путь Апгрейда"
    // Создает эффект расширяющегося сияния вокруг изображения.
    // ----------------------------------------------------
    const pathElement = document.getElementById('hero-animation-path');
    
    if(pathElement) {
        // Функция для запуска анимации
        const animatePath = () => {
            // Сброс стилей для повторного запуска
            pathElement.style.transition = 'none';
            pathElement.style.transform = 'translate(-50%, -50%) scale(0.1)';
            pathElement.style.opacity = 0;

            // Принудительный рефлоу для сброса transition
            void pathElement.offsetWidth; 

            // Запуск анимации через 100мс
            setTimeout(() => {
                pathElement.style.transition = 'transform 2s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.5s ease-out';
                pathElement.style.transform = 'translate(-50%, -50%) scale(2)'; // Увеличение в 2 раза
                pathElement.style.opacity = 0.8;
                
                // Сброс через 1.8с (чуть раньше, чем закончится основная анимация)
                setTimeout(() => {
                    pathElement.style.opacity = 0;
                }, 1800);
            }, 100);
        };
        
        // Запуск анимации при загрузке и повтор каждые 4 секунды
        animatePath();
        setInterval(animatePath, 4000);
    }
});