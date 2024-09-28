class CompromissoFactory:
      @staticmethod

      def criar_compromisso(tipo, titulo, descricao, data):
            if tipo == "Reunião":
                return Reuniao(titulo, descricao, data)
            elif tipo == "Consulta":
                 return Consulta(titulo, descricao, data)
            elif tipo == "Lembrete":
                return Lembrete(titulo, descricao, data)
            else:
                return f"Tipo de compromisso desconhecido"