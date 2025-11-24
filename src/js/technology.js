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
