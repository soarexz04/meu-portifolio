document.addEventListener('DOMContentLoaded', () => {
    
    // ==================================================
    // 1. EFEITO MÁQUINA DE ESCREVER (Página Inicial)
    // ==================================================
    const typewriterElement = document.getElementById('typewriter');
    
    if (typewriterElement) { 
        const text = ["Desenvolvedor Web Front-End", "Entusiasta Full-Stack", "Criador de Soluções"];
        const TYPING_SPEED = 100;    // Velocidade de digitar
        const ERASING_SPEED = 50;    // Velocidade de apagar
        const NEW_TEXT_DELAY = 2000; // Tempo de espera antes de apagar
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentPhrase = text[textIndex % text.length];
            let timeout;

            if (isDeleting) {
                charIndex--;
                typewriterElement.textContent = currentPhrase.substring(0, charIndex);
                timeout = ERASING_SPEED;

                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex++; 
                    timeout = 500; 
                }
            } else {
                charIndex++;
                typewriterElement.textContent = currentPhrase.substring(0, charIndex);
                timeout = TYPING_SPEED;

                if (charIndex === currentPhrase.length) {
                    isDeleting = true; 
                    timeout = NEW_TEXT_DELAY; 
                }
            }
            setTimeout(type, timeout);
        }
        type(); // Inicia o efeito
    }


    // ==================================================
    // 2. MENU ATIVO (Scrollspy - Página Inicial)
    // ==================================================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]'); 

    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Ativa quando a seção está no meio da tela
            threshold: 0 
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove ativo de todos
                    navLinks.forEach(link => link.classList.remove('active-link'));
                    
                    // Adiciona ativo ao link correspondente
                    const id = entry.target.id; 
                    const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active-link');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }


    // ==================================================
    // 3. ANIMAÇÃO FADE-IN (Todas as Páginas)
    // ==================================================
    const fadeInElements = document.querySelectorAll('.fade-in-section');

    if (fadeInElements.length > 0) {
        const fadeInObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target); // Para de observar depois que anima
                }
            });
        }, { rootMargin: '0px 0px -50px 0px' });

        fadeInElements.forEach(el => fadeInObserver.observe(el));
    }

});

// ==================================================
// 4. FUNÇÃO DA GALERIA DE CERTIFICADOS
// ==================================================
// Esta função precisa estar FORA do "DOMContentLoaded" para o HTML encontrá-la no onclick
function showImage(src, title) {
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');

    if (modalImg && modalTitle) {
        modalImg.src = src;          // Troca a imagem do modal
        modalTitle.innerText = title; // Troca o título do modal
    }
}