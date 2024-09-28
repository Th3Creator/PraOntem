class Compromisso:

    def __init__(self, titulo, descricao, data):
            self.titulo = titulo
            self.descricao = descricao
            self.data = data

    def criar(self):
        return f"{self.titulo} - {self.descricao} em {self.data}"