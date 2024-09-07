console.log("Script carregado com sucesso!");

window.onload = function() {
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



};