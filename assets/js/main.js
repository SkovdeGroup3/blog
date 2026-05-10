const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const backToTopButton = document.querySelector('.back-to-top');
const sections = document.querySelectorAll('main section[id]');
const allPicturesGrid = document.querySelector('#all-pictures-grid');

const renderAllPictures = () => {
    if (!allPicturesGrid) {
        return;
    }

    if (!Array.isArray(galleryImages) || galleryImages.length === 0) {
        allPicturesGrid.innerHTML = '<p class="gallery-empty">No images added yet.</p>';
        return;
    }

    allPicturesGrid.innerHTML = galleryImages
        .map(
            (image) => `
        <figure class="gallery-item">
            <img src="${image.src}" alt="${image.alt}" loading="lazy" />
            ${image.caption ? `<figcaption>${image.caption}</figcaption>` : ''}
        </figure>
    `
        )
        .join('');
};

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

navItems.forEach((link) => {
    link.addEventListener('click', () => {
        if (navLinks) {
            navLinks.classList.remove('open');
        }
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

window.addEventListener('scroll', () => {
    if (backToTopButton && window.scrollY > 450) {
        backToTopButton.classList.add('visible');
    } else if (backToTopButton) {
        backToTopButton.classList.remove('visible');
    }

    let currentSectionId = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 140;

        if (window.scrollY >= sectionTop) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navItems.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
    });
});

if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
}

renderAllPictures();
