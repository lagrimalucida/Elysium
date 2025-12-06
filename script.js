document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do DOM
    const body = document.body;
    const themeSwitch = document.getElementById('theme-switch');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('#content section');
    const mediaCards = document.querySelectorAll('.media-card');
    const videoModal = document.getElementById('video-modal');
    const videoFrame = document.getElementById('video-frame');
    const closeModalBtn = document.querySelector('.close-btn');
    const menuToggleBtn = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    // --- 1. Troca de Tema Dark/Light ---
    
    // Função para aplicar o tema
    const applyTheme = (isDark) => {
        if (isDark) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark'); // Salva a preferência
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        }
    };

    // Evento de clique no switch
    themeSwitch.addEventListener('change', (e) => {
        // 'checked' = true -> Dark; 'checked' = false -> Light
        applyTheme(e.target.checked);
    });

    // Carrega o tema salvo no localStorage ou define Dark como padrão
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        themeSwitch.checked = false; // Desmarca o switch se for Light
        applyTheme(false);
    } else {
        themeSwitch.checked = true; // Mantém marcado se for Dark ou não houver salvo
        applyTheme(true);
    }


    // --- 3. Navegação e Animação Suave (Redirecionamento) ---
    
    // Função para mostrar a seção correta
    const showSection = (targetId) => {
        // Remove a classe 'active-section' de todas as seções
        contentSections.forEach(section => {
            section.classList.remove('active-section');
            section.classList.add('hidden-section');
        });

        // Adiciona a classe 'active-section' à seção de destino
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
             // Força um reflow antes de adicionar a classe para garantir a animação
            void targetSection.offsetWidth; 
            targetSection.classList.remove('hidden-section');
            targetSection.classList.add('active-section');
        }
    };

    // Evento de clique para os links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o comportamento padrão de link (#)
            
            const targetId = link.getAttribute('href'); // Ex: '#home'
            showSection(targetId);
            
            // Lógica para fechar o menu no mobile após o clique
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    // Inicializa a navegação na primeira seção (Home)
    showSection('#home');


    // --- 5. Player Sobreposto (Modal) ---
    
    // Função para abrir o modal
    mediaCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoSrc = card.getAttribute('data-video-src');
            // Nota: Em um site real, você usaria o URL de um player (YouTube, Vimeo ou seu próprio player)
            // Aqui estamos simulando com um iframe genérico (poderia ser um vídeo do YouTube ou um arquivo .mp4)
            videoFrame.src = `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1`; // Exemplo Rick Roll (apenas para demonstração)
            videoModal.style.display = 'block';
        });
    });

    // Função para fechar o modal
    const closeModal = () => {
        videoModal.style.display = 'none';
        videoFrame.src = ''; // Para parar a reprodução do vídeo
    };

    // Fechar ao clicar no 'X'
    closeModalBtn.addEventListener('click', closeModal);

    // Fechar ao clicar fora do modal
    window.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeModal();
        }
    });


    // --- 2. Responsividade (Menu Mobile) ---

    menuToggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active'); // Alterna a classe 'active' para mostrar/esconder
    });
});