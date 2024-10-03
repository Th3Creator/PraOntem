import unittest
from backend.app import app  # Importa o aplicativo Flask para os testes

class TestBackend(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Configurações iniciais para o teste
        app.config['TESTING'] = True
        cls.client = app.test_client()  # Cria um cliente de teste do Flask

    def setUp(self):
        # Garante que o compromisso com ID 1 exista antes dos testes
        self.client.post('/cria/compromisso', data={
            'titulo': 'Compromisso Inicial',
            'descricao': 'Descrição Inicial',
            'status': 'Não',
            'data': '10/12/2024',
            'email': 'inicial@teste.com'
        })

    # 1. Teste da Rota: Criação de Compromisso
    def test_01_cria_compromisso(self):
        response = self.client.post('/cria/compromisso', data={
            'titulo': 'Reunião de Teste',
            'descricao': 'Discussão de projeto',
            'status': 'Não',
            'data': '15/12/2024',
            'email': 'teste@exemplo.com'
        })
        self.assertEqual(response.status_code, 204, "Erro ao criar compromisso")

    # 2. Teste da Rota: Atualização de Compromisso
    def test_02_atualiza_compromisso(self):
        response = self.client.put('/atualiza/compromisso', data={
            'idCompromisso': 1,
            'titulo': 'Reunião Atualizada',
            'descricao': 'Descrição Atualizada',
            'status': 'Sim',
            'data': '16/12/2024',
            'email': 'teste@exemplo.com'
        })
        self.assertEqual(response.status_code, 204, "Erro ao atualizar compromisso")

    # 3. Teste da Rota: Busca de Compromissos por Competência (Ano/Mês)
    def test_03_busca_compromissos(self):
        response = self.client.get('/busca/compromissos/competencia?ano=2024&mes=12')
        print(response.data.decode('utf-8'))  # Debug para verificar o retorno
        self.assertEqual(response.status_code, 200, "Erro ao buscar compromissos")
        self.assertIn('Reunião de Teste', response.data.decode('utf-8'), "Compromisso não encontrado no retorno")

    # 4. Teste da Rota: Exclusão de Compromisso
    def test_04_deleta_compromisso(self):
        response = self.client.delete('/deleta/compromisso', data={'idCompromisso': 1})
        self.assertEqual(response.status_code, 204, "Erro ao deletar compromisso")

if __name__ == '__main__':
    unittest.main()
