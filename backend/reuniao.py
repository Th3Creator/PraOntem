class Reuniao(Compromisso):
    def __init__(self, titulo, descricao, data):
        super().__init__(titulo, descricao, data)
       
    def criar(self):
        return f"Reunião: {super().criar()}"
    
    