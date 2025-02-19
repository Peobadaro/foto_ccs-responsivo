$(document).ready(function () {
    // Exibir o formulário ao clicar no botão "Nova imagem +"
    $('#nova-imagem-btn').click(function () {
        $('.footer-section').slideDown(500); // Exibe a div com efeito de deslizar em 500ms
    });

    // Interceptar o evento de submit do formulário
    $('#nova-imagem-form').on('submit', function (e) {
        e.preventDefault(); // Prevenir o comportamento padrão do formulário
        console.log("Formulário enviado");

        const imageUrl = $('#imagem-url').val().trim(); // Pegar o valor da URL
        if (isValidURL(imageUrl)) {
            const newImage = `
                <div class="image-card">
                    <img src="${imageUrl}" alt="Nova imagem"/>
                    <p>${imageUrl}</p>
                </div>`;
            $('.image-gallery').append(newImage);
            $('#imagem-url').val(''); // Limpar o campo de URL
            $('#nova-imagem-form').addClass('hidden'); // Ocultar o formulário
            $('#imagem-url').removeClass('error'); // Remover classe de erro, se houver
        } else {
            alert('URL inválida. Por favor, insira uma URL válida.');
            $('#imagem-url').addClass('error'); // Adicionar classe de erro
        }
    });

    // Cancelar e esconder o formulário ao clicar em "Cancelar"
    $('#cancelar-btn').click(function () {
        $('#imagem-url').val(''); // Limpar o campo de URL
        $('#nova-imagem-form').addClass('hidden'); // Ocultar o formulário
        $('#imagem-url').removeClass('error'); // Remover classe de erro, se houver
    });

    // Função para validar URLs
    function isValidURL(url) {
        const urlPattern = new RegExp(
            '^(https?:\\/\\/)?' + // Protocolo
            '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // Domínio
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // IP (v4)
            '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // Caminho
            '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // Query string
            '(\\#[-a-zA-Z\\d_]*)?$', // Fragmento
            'i'
        );
        return !!urlPattern.test(url);
    }

    $('#adicionar-btn').click(function () {
        const imageUrl = $('#imagem-url').val().trim(); // Pegar o valor do campo
        if (isValidURL(imageUrl)) {
            const newImage = `
                <div class="image-card">
                    <img src="${imageUrl}" alt="Nova imagem">
                </div>`;
            $('.gallery-right .image-row:last').append(newImage); // Adiciona a imagem na galeria
            $('#imagem-url').val(''); // Limpar o campo de entrada
        } else {
            alert('URL inválida. Por favor, insira uma URL válida.');
        }
    });

    document.getElementById('#cancelar-btn')?.addEventListener('click', function () {
        const footerInput = document.getElementById('url-footer');
        if (footerInput) {
            footerInput.value = '';
            footerInput.classList.remove('invalid-input', 'valid-input'); // Remove as classes de validação
        }
    });
    // Cancelar a adição de imagem e ocultar a footer-section
    $('#cancelar-btn').click(function () {
        $('#imagem-url').val(''); // Limpar o campo de entrada
        $('.footer-section').slideUp(500); // Ocultar a footer-section com animação
    });

    // Exibir largura e altura da janela no console
    console.log("Largura:", document.documentElement.clientWidth);
    console.log("Altura:", document.documentElement.clientHeight);

    // Código existente do menu dropdown
    $('.dropdown-toggle').click(function(e) {
        e.preventDefault();
        const $dropdownMenu = $(this).next('.dropdown-menu');
        $('.dropdown-menu').not($dropdownMenu).slideUp(300);
        $dropdownMenu.slideToggle(300);
    });

    // Fechar dropdown quando clicar fora
    $(document).click(function(e) {
        if (!$(e.target).closest('.dropdown').length) {
            $('.dropdown-menu').slideUp(300);
        }
    });
});
