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

(() => {
    var dataInput = document.getElementById("data");
    VMasker(dataInput).maskPattern("99/9999"); // Máscara para MM/AAAA

    //Definição da data para o mês atual 
    var dia = new Date();
    var mes = String(dia.getMonth()+1).padStart(2,'0')
    var ano = dia.getFullYear();
    //Apresenta no campo
    dataInput.value = mes + '/' + ano;

    // Máscara para o campo de data do modal
    var dataModalInput = document.getElementById("dataModal");
    VMasker(dataModalInput).maskPattern("99/99/9999"); // Mesma máscara para o modal

    // Lógica de abertura e fechamento do modal
    var modal = document.getElementById("modalAgendamento");
    var btn = document.getElementById("agendarBtn");
    var span = document.getElementsByClassName("close")[0];
    var cancelarBtn = document.getElementById("cancelarBtn");

    // Abrir o modal ao clicar no botão "Agendar Compromisso"
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // Fechar o modal ao clicar no "X"
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Fechar o modal ao clicar no "Cancelar"
    cancelarBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Fechar o modal ao clicar fora dele
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

      // Lógica para abrir e fechar o modal de edição
    var modalEdicao = document.getElementById("modalEdicao");
    var btnFecharEdicao = document.getElementsByClassName("close")[1]; // Segundo botão "fechar" do modal de edição
    var cancelarEdicaoBtn = document.getElementById("cancelarEdicaoBtn");
    var editarBtn = document.getElementById("editarBtn"); // Botão temporário de edição

    // Função para abrir o modal de edição
    function abrirModalEdicao() {
        modalEdicao.style.display = "block";
    }

    // Função para fechar o modal de edição
    function fecharModalEdicao() {
        modalEdicao.style.display = "none";
    }

    // Abrir o modal ao clicar no botão "Abrir Modal de Edição"
    editarBtn.onclick = function() {
        abrirModalEdicao();
    }

    // Fechar o modal ao clicar no botão "fechar" (X)
    btnFecharEdicao.onclick = function() {
        fecharModalEdicao();
    }

    // Fechar o modal ao clicar no botão "Cancelar"
    cancelarEdicaoBtn.onclick = function() {
        fecharModalEdicao();
    }

    // Fechar o modal ao clicar fora dele
    window.onclick = function(event) {
        if (event.target == modalEdicao) {
            fecharModalEdicao();
        }
    }
})();