// scripts.js
class Compromisso {
    static CriaCompromisso = async()=>{
        try {
            debugger;
            // seleciona todas variáveis 


            // valida se os campos não podem ser vazios


            // cria requisão ajax: Mandar os valores pro back
            // $.ajax({
            //     url: '',
            //     type: 'post',
            //     data: {
            //         'titulo': titulo,
            //         'descricao': descricao,
            //         'status': 1,
            //         'data': data
            //     }, 
            //     success: function(response) {
            //         alert("Compromisso criado com sucesso.");
            //     },
            //     error: function(response) {
            //         alert("Houve um erro ao criar.");
            //     }
            // });
        } catch (error) {
            console.log(error)
        }
    }

    static AtualizaCompromisso = async()=>{
        try {
            // seleciona todas variáveis 


            // valida se os campos não podem ser vazios


            // cria requisão ajax: Mandar os valores pro back
        }catch(error) {
            console.log(error)
        }
    }

    static DeletaCompromisso = async()=>{
        debugger;
        try {
            // seleciona todas variáveis 


            // valida se os campos não podem ser vazios


            // cria requisão ajax: Mandar os valores pro back
        }catch(error) {
            console.log(error)
        }
    }

    static BuscaCompromisso = async()=>{
        try {
            // seleciona todas variáveis 


            // valida se os campos não podem ser vazios


            // cria requisão ajax: Mandar os valores pro back
        }catch(error) {
            console.log(error)
        }
    }
}

$(document).ready(function() {
    $('[a-id="cria-compromisso"]').click(function() {

        Compromisso.CriaCompromisso();

    });

    $('[a-id="atualiza-compromisso"]').click(function() {

        Compromisso.AtualizaCompromisso();

    });

    $('[a-id="deleta-compromisso"]').click(function() {
        debugger;
        Compromisso.DeletaCompromisso();

    });

    $('[a-id="busca-compromisso"]').click(function() {

        Compromisso.BuscaCompromisso();

    });
});
window.onload = function () {
    // Campo de data na página principal (MM/AAAA)
    const inputData = document.getElementById('data');
    if (inputData) {
        inputData.addEventListener('input', function () {
            let valor = inputData.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico

            // Adiciona a barra automaticamente depois do segundo dígito (MM/AAAA)
            if (valor.length >= 3) {
                valor = valor.slice(0, 2) + '/' + valor.slice(2);
            }

            inputData.value = valor;

            // Validação simples para formato MM/AAAA
            const regex = /^(0[1-9]|1[0-2])\/\d{4}$/;
            if (!regex.test(valor)) {
                inputData.classList.add('is-invalid');
                inputData.classList.remove('is-valid');
            } else {
                inputData.classList.remove('is-invalid');
                inputData.classList.add('is-valid');
            }
        });
    }

    // Campo de data no modal (DD/MM/AAAA)
    const inputDataModal = document.getElementById('dataModal');
    if (inputDataModal) {
        inputDataModal.addEventListener('input', function () {
            let valor = inputDataModal.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico

            // Adiciona a barra automaticamente depois do segundo e do quarto dígito (DD/MM/AAAA)
            if (valor.length >= 3) {
                valor = valor.slice(0, 2) + '/' + valor.slice(2);
            }
            if (valor.length >= 6) {
                valor = valor.slice(0, 5) + '/' + valor.slice(5);
            }

            inputDataModal.value = valor;

            // Validação simples para formato DD/MM/AAAA
            const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
            if (!regex.test(valor)) {
                inputDataModal.classList.add('is-invalid');
                inputDataModal.classList.remove('is-valid');
            } else {
                inputDataModal.classList.remove('is-invalid');
                inputDataModal.classList.add('is-valid');
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', function () {
    // Selecionar todas as linhas da tabela
    const linhasTabela = document.querySelectorAll('tbody tr');

    // Adicionar evento de clique a cada linha
    linhasTabela.forEach(function (linha) {
        linha.addEventListener('click', function () {
            // Extrair os dados do compromisso da linha
            const titulo = this.cells[0].textContent;
            const descricao = this.cells[1].textContent;
            const data = this.cells[2].textContent;

            // Preencher o modal de edição com os dados
            document.getElementById('tituloEdicao').value = titulo;
            document.getElementById('dataEdicao').value = data;
            document.getElementById('descricaoEdicao').value = descricao;

            // Abrir o modal de edição
            $('#modalEdicao').modal('show');
        });
    });
});