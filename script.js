document.addEventListener('DOMContentLoaded', function () {
    // Exibir o formulário ao clicar no botão "Nova imagem +"
    document.querySelector('#nova-imagem-btn').addEventListener('click', function () {
        document.querySelector('.footer-section').style.display = 'block'; // Exibe a div
    });

    // Interceptar o evento de submit do formulário
    document.querySelector('#nova-imagem-form').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevenir o comportamento padrão do formulário
        console.log("Formulário enviado");

        const imageUrl = document.querySelector('#imagem-url').value.trim(); // Pegar o valor da URL
        if (isValidURL(imageUrl)) {
            const newImage = document.createElement('div');
            newImage.classList.add('image-card');
            newImage.innerHTML = `
                <img src="${imageUrl}" alt="Nova imagem"/>
                <p>${imageUrl}</p>
            `;

            document.querySelector('.image-gallery').appendChild(newImage);
            document.querySelector('#imagem-url').value = ''; // Limpar o campo de URL
            document.querySelector('#nova-imagem-form').classList.add('hidden'); // Ocultar o formulário
            document.querySelector('#imagem-url').classList.remove('error'); // Remover classe de erro
        } else {
            alert('URL inválida. Por favor, insira uma URL válida.');
            document.querySelector('#imagem-url').classList.add('error'); // Adicionar classe de erro
        }
    });

    // Cancelar e esconder o formulário ao clicar em "Cancelar"
    document.getElementById('cancelar-btn').addEventListener('click', function () {
        document.querySelector('#imagem-url').value = ''; // Limpar o campo de URL
        document.querySelector('#nova-imagem-form').classList.add('hidden'); // Ocultar o formulário
        document.querySelector('#imagem-url').classList.remove('error'); // Remover classe de erro
    });

    // Função para validar URLs
    function isValidURL(url) {
        const urlPattern = new RegExp(
            '^(https?:\\/\\/)?' + 
            '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + 
            '((\\d{1,3}\\.){3}\\d{1,3}))' + 
            '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + 
            '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + 
            '(\\#[-a-zA-Z\\d_]*)?$', 
            'i'
        );
        return !!urlPattern.test(url);
    }

    document.querySelector('#adicionar-btn').addEventListener('click', function () {
        const imageUrl = document.querySelector('#imagem-url').value.trim();
        if (isValidURL(imageUrl)) {
            const newImage = document.createElement('div');
            newImage.classList.add('image-card');
            newImage.innerHTML = `<img src="${imageUrl}" alt="Nova imagem">`;

            const imageRows = document.querySelectorAll('.gallery-right .image-row');
            if (imageRows.length > 0) {
                imageRows[imageRows.length - 1].appendChild(newImage);
            }
            document.querySelector('#imagem-url').value = ''; // Limpar o campo de entrada
        } else {
            alert('URL inválida. Por favor, insira uma URL válida.');
        }
    });

    // Manipulação dos menus dropdown
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const dropdownMenu = this.nextElementSibling;

            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.style.display = 'none';
                }
            });

            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Fecha os dropdowns quando clicar fora
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });

    // Carrinho de compras
    const carrinhoToggle = document.querySelector('.carrinho-toggle');
    const carrinhoMenu = document.querySelector('.carrinho-menu');

    carrinhoToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        carrinhoMenu.classList.toggle('show');
    });

    // Fechar carrinho ao clicar fora
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.carrinho-container')) {
            carrinhoMenu.classList.remove('show');
        }
    });

    let carrinho = [];

    // Adicionar produto ao carrinho
    document.querySelectorAll('.add-carrinho').forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.produto-card');
            const produto = {
                id: this.dataset.id,
                nome: card.querySelector('h3').textContent,
                preco: parseFloat(card.querySelector('.preco').textContent
                    .replace('R$ ', '')
                    .replace('.', '')
                    .replace(',', '.')),
                quantidade: 1
            };

            const itemIndex = carrinho.findIndex(item => item.id === produto.id);
            if (itemIndex !== -1) {
                carrinho[itemIndex].quantidade++;
            } else {
                carrinho.push(produto);
            }

            atualizarCarrinho();
        });
    });

    function atualizarCarrinho() {
        const carrinhoItems = document.querySelector('.carrinho-items');
        carrinhoItems.innerHTML = '';

        let total = 0;
        carrinho.forEach(item => {
            total += item.preco * item.quantidade;
            const itemElement = document.createElement('div');
            itemElement.className = 'carrinho-item';
            itemElement.innerHTML = `
                <span>${item.nome}</span>
                <span>${item.quantidade}x</span>
                <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
            `;
            carrinhoItems.appendChild(itemElement);
        });

        document.querySelector('.carrinho-quantidade').textContent =
            carrinho.reduce((acc, item) => acc + item.quantidade, 0);
        document.querySelector('.total-valor').textContent = total.toFixed(2);
    }

    // Finalizar compra
    document.querySelector('.finalizar-compra').addEventListener('click', function () {
        if (carrinho.length > 0) {
            alert('Compra finalizada! Total: R$ ' + document.querySelector('.total-valor').textContent);
            carrinho = [];
            atualizarCarrinho();
            carrinhoMenu.classList.remove('show');
        } else {
            alert('Seu carrinho está vazio!');
        }
    });
});
