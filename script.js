// Открытие статьи при клике на карточку или передовицу
function openArticle(cardElement) {
    const category = cardElement.querySelector('.category-label').innerText;
    const titleEl = cardElement.querySelector('h1, h2');
    const title = titleEl ? titleEl.innerText : '';
    const subtitleEl = cardElement.querySelector('.subtitle');
    const subtitle = subtitleEl ? subtitleEl.innerText : '';
    const imgEl = cardElement.querySelector('img');
    const imgHtml = imgEl ? `<img src="${imgEl.src}" alt="${title}" class="reader-image">` : '';

    const fullTextContainer = cardElement.querySelector('.full-text');
    const metaEl = fullTextContainer.querySelector('.meta-info');
    const meta = metaEl ? metaEl.innerText : '';

    const paragraphs = Array.from(fullTextContainer.querySelectorAll('p'))
        .map(p => `<p>${p.innerHTML}</p>`)
        .join('');

    document.getElementById('reader-content').innerHTML = `
        <span class="category-label">${category}</span>
        <h1>${title}</h1>
        <div class="reader-subtitle">${subtitle}</div>
        <div class="reader-meta">${meta} • By The Young Times</div>
        ${imgHtml}
        <div class="reader-body">${paragraphs}</div>
    `;

    document.getElementById('front-page').style.display = 'none';
    document.getElementById('reader-view').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Запоминаем состояние в истории браузера, чтобы работала кнопка "Назад"
    history.pushState({ view: 'article' }, '', '#article');
}

// Возврат на главную страницу
function goHome(pushHistory = true) {
    document.getElementById('reader-view').style.display = 'none';
    document.getElementById('front-page').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushHistory && window.location.hash === '#article') {
        history.pushState({ view: 'home' }, '', window.location.pathname);
    }
}

// Фильтрация статей по рубрикам в верхнем меню
function filterCategory(category, btnElement) {
    goHome();

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    const leadStory = document.querySelector('.lead-story');
    const cards = document.querySelectorAll('.article-card');

    if (category === 'all') {
        leadStory.style.display = 'grid';
        cards.forEach(card => card.style.display = 'block');
    } else {
        leadStory.style.display = leadStory.dataset.category === category ? 'grid' : 'none';
        cards.forEach(card => {
            card.style.display = card.dataset.category === category ? 'block' : 'none';
        });
    }
}

// Плавный переход к блоку About
function scrollToAbout() {
    goHome();
    setTimeout(() => {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    }, 50);
}

// Поддержка системной кнопки "Назад" в браузере и на телефоне
window.addEventListener('popstate', () => {
    goHome(false);
});
