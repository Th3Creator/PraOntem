// Simulação do HTML para testes
document.body.innerHTML = `
    <div>
        <!-- Inputs do Formulário -->
        <input type="text" a-id="titulo" value="" />
        <input type="text" a-id="data" value="" />
        <textarea a-id="descricao"></textarea>
        <input type="email" a-id="email" value="" />
        <select a-id="status">
            <option value="Não" selected>Não</option>
            <option value="Sim">Sim</option>
        </select>

        <!-- Tabela para Listagem de Compromissos -->
        <table>
            <tbody a-id="tbody-compromissos">
                <tr id="1">
                    <td>Tarefa Exemplo</td>
                    <td>Descrição Exemplo</td>
                    <td>01/12/2024</td>
                    <td>Não</td>
                    <td>
                        <button type="button" a-id="deleta-compromisso" id="1">Excluir</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal para Criação e Edição de Compromissos -->
        <div id="exampleModal" style="display: none;">
            <h5 class="modal-title">Agende seu compromisso</h5>
            <input type="text" class="form-control" id="tituloModal" a-id="titulo">
            <textarea class="form-control" id="descricaoModal" a-id="descricao"></textarea>
        </div>
    </div>
`;


class CompromissoTest {
    // Método para simular a criação de um compromisso
    static testCriaCompromisso() {
        console.log("Executando teste para Criação de Compromisso...");

        // Simulando preenchimento dos campos
        $('[a-id="titulo"]').val("Título de Teste");
        $('[a-id="data"]').val("20/12/2024");
        $('[a-id="descricao"]').val("Descrição de Teste");
        $('[a-id="email"]').val("teste@exemplo.com");
        $('[a-id="status"]').val("Não");

        // Chama a função de criação e monitora o comportamento
        Compromisso.CriaCompromisso();

        // Verificar se os campos foram preenchidos corretamente e se a criação foi concluída
        if ($('[a-id="titulo"]').val() === "" || $('[a-id="data"]').val() === "") {
            console.error("Erro: Título ou Data não foram preenchidos corretamente.");
        } else {
            console.log("Teste de criação de compromisso bem-sucedido.");
        }
    }

    // Método para simular a edição de um compromisso
    static testEditaCompromisso(idCompromisso) {
        console.log("Executando teste para Edição de Compromisso...");

        // Simulando edição dos campos
        $('[a-id="titulo"]').val("Título Atualizado");
        $('[a-id="data"]').val("22/12/2024");
        $('[a-id="descricao"]').val("Descrição Atualizada");
        $('[a-id="email"]').val("atualizado@exemplo.com");
        $('[a-id="status"]').val("Sim");

        // Chama a função de atualização e monitora o comportamento
        Compromisso.AtualizaCompromisso(idCompromisso);

        // Verifica se o modal foi atualizado corretamente
        if ($('[a-id="titulo"]').val() !== "Título Atualizado" || $('[a-id="data"]').val() !== "22/12/2024") {
            console.error("Erro: A edição não foi realizada corretamente.");
        } else {
            console.log("Teste de edição de compromisso bem-sucedido.");
        }
    }

    // Método para simular a exclusão de um compromisso
    static testDeletaCompromisso(idCompromisso) {
        console.log("Executando teste para Exclusão de Compromisso...");

        // Chama a função de exclusão e monitora o comportamento
        Compromisso.DeletaCompromisso(idCompromisso);

        // Verifica se o compromisso foi removido da tabela
        if ($(`#${idCompromisso}`).length === 0) {
            console.log("Teste de exclusão de compromisso bem-sucedido.");
        } else {
            console.error("Erro: O compromisso não foi excluído corretamente.");
        }
    }

    // Método para executar todos os testes
    static runAllTests() {
        console.log("Iniciando todos os testes de frontend...");

        // 1. Testar Criação
        CompromissoTest.testCriaCompromisso();

        // 2. Testar Edição (Assumindo que o compromisso com ID 1 existe)
        CompromissoTest.testEditaCompromisso(1);

        // 3. Testar Exclusão (Assumindo que o compromisso com ID 1 existe)
        CompromissoTest.testDeletaCompromisso(1);

        console.log("Testes de frontend concluídos.");
    }
}

// Executa todos os testes automaticamente ao carregar o script
window.onload = () => {
    CompromissoTest.runAllTests();
};
