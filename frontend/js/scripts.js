class Compromisso {
    static CriaCompromisso = async()=>{
        try {        
            let titulo = $('[a-id="titulo"]').val();
            let data = $('[a-id="data"]').val();
            let descricao = $('[a-id="descricao"]').val();

            $.ajax({
                url: '/cria/compromisso',
                type: 'post',
                data: {
                    'titulo': titulo,
                    'descricao': descricao,
                    'status': 1,
                    'data': data
                }, 
                success: function(response) {
                    alert("Compromisso criado com sucesso.");
                },
                error: function(response) {
                    alert("Houve um erro ao criar.");
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    static AtualizaCompromisso = async()=>{
        try {

        }catch(error) {
            console.log(error)
        }
    }

    static DeletaCompromisso = async(idCompromisso)=>{
        try {
            
            $.ajax({
                url: '/deleta/compromisso',
                type: 'delete',
                data: {
                    'idCompromisso': idCompromisso,
                }, 
                success: function(response) {
                    alert("Deletado!");
                    Compromisso.BuscaCompromissos();
                },
                error: function(response) {
                    alert("Houve um erro ao deletar.");
                }
            });
        }catch(error) {
            console.log(error)
        }
    }

    static BuscaCompromissos = async()=>{
        try {
            let dataCompetencia = $('[a-id="data-competencia"]').val();
            let [mes, ano] = dataCompetencia.split('/');

            $.ajax({
                url: '/busca/compromissos/competencia',
                type: 'get',
                data: {
                    'ano': ano,
                    'mes': mes,
                }, 
                success: function(response) {
                    Compromisso.ListaCompromissos(response);
                },
                error: function(response) {
                    alert("Houve um erro ao buscar.");
                }
            });
        }catch(error) {
            console.log(error)
        }
    }

    static ListaCompromissos = (compromissos)=>{
        let tBody = $('[a-id="tbody-compromissos"]');
        tBody.empty();

        compromissos.forEach((compromisso) => {
            let compromissoHTML = `
                <tr>
                    <td>${compromisso.Titulo}</td>
                    <td>${compromisso.Descricao}</td>
                    <td>${compromisso.Data}</td>
                    <td>Sim</td>
                    <td>
                        <button type="button" class="btn btn-outline-danger" id="${compromisso.IDCompromisso}" a-id="deleta-compromisso">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></path>
                            </svg>       
                        </button>
                    </td>
                </tr>
            `;

            tBody.append(compromissoHTML);
        });
    }
}

$(document).ready(function() {
    $('[a-id="cria-compromisso"]').click(function() {

        Compromisso.CriaCompromisso();

    });

    $('[a-id="atualiza-compromisso"]').click(function() {

        Compromisso.AtualizaCompromisso();

    });

    $('[a-id="busca-compromisso"]').click(function() {

        Compromisso.BuscaCompromissos();

    });

    $(document).on('click', '[a-id="deleta-compromisso"]', function() {

        Compromisso.DeletaCompromisso($(this).attr('id'));

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