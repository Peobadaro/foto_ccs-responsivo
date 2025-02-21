document.addEventListener('DOMContentLoaded', function() {
    // Exibir o formulário ao clicar no botão "Nova imagem +"
    document.querySelector('#nova-imagem-btn').addEventListener('click', function () {
        document.querySelector('.footer-section').style.display = 'block'; // Exibe a div com efeito de deslizar em 500ms
    });

    // Interceptar o evento de submit do formulário
    document.querySelector('#nova-imagem-form').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevenir o comportamento padrão do formulário
        console.log("Formulário enviado");

        const imageUrl = document.querySelector('#imagem-url').value.trim(); // Pegar o valor da URL
        if (isValidURL(imageUrl)) {
            const newImage = `
                <div class="image-card">
                    <img src="${imageUrl}" alt="Nova imagem"/>
                    <p>${imageUrl}</p>
                </div>`;
            document.querySelector('.image-gallery').innerHTML += newImage;
            document.querySelector('#imagem-url').value = ''; // Limpar o campo de URL
            document.querySelector('#nova-imagem-form').classList.add('hidden'); // Ocultar o formulário
            document.querySelector('#imagem-url').classList.remove('error'); // Remover classe de erro, se houver
        } else {
            alert('URL inválida. Por favor, insira uma URL válida.');
            document.querySelector('#imagem-url').classList.add('error'); // Adicionar classe de erro
        }
    });

    // Cancelar e esconder o formulário ao clicar em "Cancelar"
    document.querySelector('#cancelar-btn').addEventListener('click', function () {
        document.querySelector('#imagem-url').value = ''; // Limpar o campo de URL
        document.querySelector('#nova-imagem-form').classList.add('hidden'); // Ocultar o formulário
        document.querySelector('#imagem-url').classList.remove('error'); // Remover classe de erro, se houver
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

    document.querySelector('#adicionar-btn').addEventListener('click', function () {
        const imageUrl = document.querySelector('#imagem-url').value.trim(); // Pegar o valor do campo
        if (isValidURL(imageUrl)) {
            const newImage = `
                <div class="image-card">
                    <img src="${imageUrl}" alt="Nova imagem">
                </div>`;
            document.querySelector('.gallery-right .image-row:last').innerHTML += newImage; // Adiciona a imagem na galeria
            document.querySelector('#imagem-url').value = ''; // Limpar o campo de entrada
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
    document.querySelector('#cancelar-btn').addEventListener('click', function () {
        document.querySelector('#imagem-url').value = ''; // Limpar o campo de entrada
        document.querySelector('.footer-section').style.display = 'none'; // Ocultar a footer-section com animação
    });

    // Exibir largura e altura da janela no console
    console.log("Largura:", document.documentElement.clientWidth);
    console.log("Altura:", document.documentElement.clientHeight);

    // Manipulação dos menus dropdown
    document.querySelectorAll('.menu .dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownMenu = this.nextElementSibling;
            const parent = this.parentElement;
            
            // Fecha outros dropdowns
            document.querySelectorAll('.menu .dropdown-menu').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.style.display = 'none';
                    menu.parentElement.classList.remove('show');
                }
            });
            
            // Toggle do dropdown atual com animação
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            parent.classList.toggle('show');
        });
    });

    // Fecha os dropdowns quando clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.menu .dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
                menu.parentElement.classList.remove('show');
            });
        }
    });

    // Previne que o clique no menu propague para o documento
    document.querySelectorAll('.menu .dropdown-menu').forEach(menu => {
        menu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    let carrinho = [];
    
    // Manipulação do menu dropdown em mobile
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 640) {
                e.preventDefault();
                const dropdownMenu = this.nextElementSibling;
                const parent = this.parentElement;
                
                // Fecha outros dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    if (menu !== dropdownMenu) {
                        menu.style.display = 'none';
                        menu.parentElement.classList.remove('active');
                    }
                });
                
                // Toggle do dropdown atual
                parent.classList.toggle('active');
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // Fechar dropdowns ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
                menu.parentElement.classList.remove('active');
            });
        }
    });

    // Carrinho de compras
    const carrinhoToggle = document.querySelector('.carrinho-toggle');
    const carrinhoMenu = document.querySelector('.carrinho-menu');
    
    carrinhoToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        carrinhoMenu.style.display = carrinhoMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Fechar carrinho ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.carrinho-container')) {
            carrinhoMenu.style.display = 'none';
        }
    });

    // Adicionar produto ao carrinho
    document.querySelectorAll('.add-carrinho').forEach(button => {
        button.addEventListener('click', function() {
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

            const itemExistente = carrinho.find(item => item.id === produto.id);
            if (itemExistente) {
                itemExistente.quantidade++;
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
    document.querySelector('.finalizar-compra').addEventListener('click', function() {
        if (carrinho.length > 0) {
            alert('Compra finalizada! Total: R$ ' + document.querySelector('.total-valor').textContent);
            carrinho = [];
            atualizarCarrinho();
            carrinhoMenu.style.display = 'none';
        } else {
            alert('Seu carrinho está vazio!');
        }
    });
});
