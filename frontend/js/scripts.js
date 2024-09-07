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

};