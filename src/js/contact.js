document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const captchaLabel = document.getElementById('captcha-label');
    const captchaInput = document.getElementById('captcha');
    const captchaError = document.getElementById('captcha-error');
    const successMessage = document.getElementById('success-message');
    
    let expectedAnswer;

    // Генерация математической капчи
    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 9) + 1;
        const num2 = Math.floor(Math.random() * 9) + 1;
        expectedAnswer = num1 + num2;

        captchaLabel.textContent = `Проверка: Сколько будет ${num1} + ${num2}?`;
    };

    generateCaptcha();

    // Обработка формы
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Сброс прошлых сообщений
        captchaError.hidden = true;
        successMessage.hidden = true;

        const userAnswer = parseInt(captchaInput.value.trim());

        // Капча неверная
        if (userAnswer !== expectedAnswer) {
            captchaError.hidden = false;
            generateCaptcha();
            captchaInput.value = '';
            return;
        }

        // Эмуляция отправки
        const submitButton = form.querySelector('.form__submit-btn');
        submitButton.textContent = 'Отправка...';
        submitButton.disabled = true;

        setTimeout(() => {
            // Показываем success
            successMessage.hidden = false;
            form.reset();
            generateCaptcha();

            submitButton.textContent = 'Отправить Запрос';
            submitButton.disabled = false;

            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // ✅ Автоматическое скрытие через 3 секунды
            setTimeout(() => {
                successMessage.hidden = true;
            }, 3000);

        }, 1500);
    });
});