document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // Логика переключения мобильного меню
    // ----------------------------------------------------
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');
    const navLinks = document.querySelectorAll('.nav__link');

    // Переключение состояния меню
    const toggleMenu = () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navList.classList.toggle('is-open');
    };

    navToggle.addEventListener('click', toggleMenu);

    // Закрытие меню при клике на ссылку (только в мобильном виде)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('is-open')) {
                toggleMenu();
            }
        });
    });

});