document.addEventListener('DOMContentLoaded', () => {
    const cookiePopup = document.getElementById('cookie-popup');
    const acceptButton = document.getElementById('accept-cookies');
    const cookieName = 'nodeOnix_cookies_accepted';

    // 1. Проверяем, принимал ли пользователь cookies ранее
    if (localStorage.getItem(cookieName) !== 'true') {
        // Показываем попап, если не принимал
        cookiePopup.removeAttribute('hidden');
    }

    // 2. Устанавливаем обработчик на кнопку "Принять"
    acceptButton.addEventListener('click', () => {
        // Устанавливаем флаг в localStorage
        localStorage.setItem(cookieName, 'true');
        
        // Плавно скрываем попап
        cookiePopup.style.opacity = '0';
        setTimeout(() => {
            cookiePopup.setAttribute('hidden', true);
            cookiePopup.style.opacity = '1'; // Сброс для следующего визита
        }, 500);
    });

});