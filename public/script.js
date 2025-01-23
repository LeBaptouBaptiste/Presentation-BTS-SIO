// Exemple : Animer l'apparition des sections au scroll
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});