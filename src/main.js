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

    // ----------------------------------------------------
    // Логика работы Аккордеона в секции Technology
    // ----------------------------------------------------
    const accordionHeaders = document.querySelectorAll('.accordion__header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const content = header.nextElementSibling;
            const isActive = currentItem.classList.contains('is-active');

            // Закрываем все остальные элементы
            document.querySelectorAll('.accordion__item.is-active').forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('is-active');
                    item.querySelector('.accordion__content').setAttribute('hidden', true);
                    item.querySelector('.accordion__header').setAttribute('aria-expanded', false);
                }
            });

            // Переключаем текущий элемент
            if (isActive) {
                currentItem.classList.remove('is-active');
                content.setAttribute('hidden', true);
                header.setAttribute('aria-expanded', false);
            } else {
                currentItem.classList.add('is-active');
                content.removeAttribute('hidden');
                header.setAttribute('aria-expanded', true);
            }
        });
    });

    // ----------------------------------------------------
    // Логика Капчи и Отправки Формы
    // ----------------------------------------------------
    const form = document.getElementById('contact-form');
    const captchaLabel = document.getElementById('captcha-label');
    const captchaInput = document.getElementById('captcha');
    const captchaError = document.getElementById('captcha-error');
    const successMessage = document.getElementById('success-message');
    
    let expectedAnswer;

    // 1. Генерация математической капчи
    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 9) + 1; 
        const num2 = Math.floor(Math.random() * 9) + 1; 
        
        const operation = '+'; 
        expectedAnswer = num1 + num2;
        
        captchaLabel.textContent = `Проверка: Сколько будет ${num1} ${operation} ${num2}?`;
    };

    generateCaptcha(); // Запускаем генерацию при загрузке

    // 2. Обработка отправки формы
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        captchaError.setAttribute('hidden', true);
        successMessage.setAttribute('hidden', true);

        const userAnswer = parseInt(captchaInput.value.trim());

        // Проверка Капчи
        if (userAnswer !== expectedAnswer) {
            captchaError.removeAttribute('hidden');
            generateCaptcha();
            captchaInput.value = '';
            return; 
        }

        // Имитация асинхронной отправки данных
        const submitButton = form.querySelector('.form__submit-btn');
        submitButton.textContent = 'Отправка...';
        submitButton.disabled = true;

        setTimeout(() => {
            // Успешный результат
            successMessage.removeAttribute('hidden');
            form.reset(); 
            generateCaptcha(); 
            
            submitButton.textContent = 'Отправить Запрос';
            submitButton.disabled = false;
            
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
        }, 1500); 
    });
    
    // ----------------------------------------------------
    // Логика Cookie Pop-up
    // ----------------------------------------------------
    const cookiePopup = document.getElementById('cookie-popup');
    const acceptButton = document.getElementById('accept-cookies');
    const cookieName = 'nodeOnix_cookies_accepted';

    // 1. Проверяем, принимал ли пользователь cookies ранее
    if (localStorage.getItem(cookieName) !== 'true') {
        cookiePopup.removeAttribute('hidden');
    }

    // 2. Устанавливаем обработчик на кнопку "Принять"
    acceptButton.addEventListener('click', () => {
        localStorage.setItem(cookieName, 'true');
        
        cookiePopup.style.opacity = '0';
        setTimeout(() => {
            cookiePopup.setAttribute('hidden', true);
            cookiePopup.style.opacity = '1';
        }, 500);
    });

});