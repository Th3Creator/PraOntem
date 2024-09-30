from flask import Flask, render_template, request, flash, redirect, url_for, session, abort, jsonify
import sqlite3
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

app = Flask(__name__, static_folder='../frontend', template_folder='../frontend')

# Padrão singleton 
class DatabaseConnection:
    _instance = None

    def __init__(self):
        if not DatabaseConnection._instance:
            DatabaseConnection._instance = sqlite3.connect("./bd/PraOntem", check_same_thread=False)
            # Adicione a linha abaixo para retornar os dados no formato de dicionário
            DatabaseConnection._instance.row_factory = sqlite3.Row

    @staticmethod
    def get_instance():
        if not DatabaseConnection._instance:
            DatabaseConnection._instance = sqlite3.connect("./bd/PraOntem", check_same_thread=False)
            DatabaseConnection._instance.row_factory = sqlite3.Row
        return DatabaseConnection._instance

# Uso:
def ConectaBD():
    return DatabaseConnection.get_instance()

# Padrão Observer
class Subject:
    def __init__(self):
        self._observers = []

    def register(self, observer):
        self._observers.append(observer)

    def unregister(self, observer):
        self._observers.remove(observer)

    def notify(self, compromisso):
        for observer in self._observers:
            observer.update(compromisso)

class Observer:
    def update(self, compromisso):
        raise NotImplementedError("A subclasse deve implementar o método 'update'")

# Observador que envia e-mails
class EmailObserver(Observer):
    def update(self, compromisso):
        destinatario = compromisso['email']
        assunto = f"Compromisso {compromisso['status']}"
        corpo = f"Olá! Seu compromisso foi {compromisso['status']}:\n\nTítulo: {compromisso['titulo']}\nDescrição: {compromisso['descricao']}\nData: {compromisso['data']}."
        enviar_email(destinatario, assunto, corpo)

# Classe CompromissoManager que gerencia compromissos e notifica observadores
class CompromissoManager(Subject):
    def criar_compromisso(self, titulo, descricao, status, data, email):
        compromisso = {
            'titulo': titulo,
            'descricao': descricao,
            'status': status,
            'data': data,
            'email': email
        }
        # Salvar no banco de dados
        with ConectaBD() as conexao:
            cursor = conexao.cursor()
            cursor.execute('INSERT INTO Compromissos (Titulo, Descricao, Concluido, Data, Email) VALUES (?, ?, ?, ?, ?)', 
                           (titulo, descricao, status, data, email))
            conexao.commit()

        # Notificar observadores (ex: enviar e-mail)
        self.notify(compromisso)

    def atualizar_compromisso(self, idCompromisso, titulo, descricao, status, data, email):
        compromisso = {
            'titulo': titulo,
            'descricao': descricao,
            'status': status,
            'data': data,
            'email': email
        }
        # Atualizar no banco de dados
        with ConectaBD() as conexao:
            cursor = conexao.cursor()
            cursor.execute('UPDATE Compromissos SET Titulo = ?, Descricao = ?, Concluido = ?, Email = ?, Data = ? WHERE IDCompromisso = ?', 
                           (titulo, descricao, status, email, data, idCompromisso))
            conexao.commit()

        # Notificar observadores (ex: enviar e-mail)
        self.notify(compromisso)

    def deletar_compromisso(self, idCompromisso):
        with ConectaBD() as conexao:
            cursor = conexao.cursor()
            # Buscar o compromisso a ser deletado
            cursor.execute('SELECT Titulo, Descricao, Data, Email FROM Compromissos WHERE IDCompromisso = ?', (idCompromisso,))
            compromisso = cursor.fetchone()

            if compromisso:
                # Monta o dicionário de dados do compromisso
                compromisso_info = {
                    'titulo': compromisso['Titulo'],
                    'descricao': compromisso['Descricao'],
                    'status': 'deletado',
                    'data': compromisso['Data'],
                    'email': compromisso['Email']
                }

                # Deletar o compromisso do banco de dados
                cursor.execute('DELETE FROM Compromissos WHERE IDCompromisso = ?', (idCompromisso,))
                conexao.commit()

                # Notificar os observadores (ex: enviar e-mail)
                self.notify(compromisso_info)     
    

def enviar_email(destinatario, assunto, corpo):
    remetente = 'trab.agendamento@gmail.com'
    senha = 'rckf wcli lwuj avbz'
    
    msg = MIMEMultipart()
    msg['From'] = remetente
    msg['To'] = destinatario
    msg['Subject'] = assunto
    msg.attach(MIMEText(corpo, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(remetente, senha)
        server.sendmail(remetente, destinatario, msg.as_string())
        server.quit()
        print(f"E-mail enviado para {destinatario}")
    except Exception as e:
        print(f"Erro ao enviar e-mail: {e}")

compromisso_manager = CompromissoManager()
email_observer = EmailObserver()
compromisso_manager.register(email_observer)  # Registrar o observador de e-mails

@app.route('/cria/compromisso', methods=['POST'])
def CriaCompromisso():
    titulo = request.form.get('titulo')
    email = request.form.get('email')
    descricao = request.form.get('descricao')
    status = request.form.get('status')
    data = request.form.get('data')

    compromisso_manager.criar_compromisso(titulo, descricao, status, data, email)
    return '', 204

@app.route('/atualiza/compromisso', methods=['PUT'])
def AtualizaCompromisso():
    idCompromisso = request.form.get('idCompromisso')
    titulo = request.form.get('titulo')
    descricao = request.form.get('descricao')
    email = request.form.get('email')
    status = request.form.get('status')
    data = request.form.get('data')

    compromisso_manager.atualizar_compromisso(idCompromisso, titulo, descricao, status, data, email)
    return '', 204

@app.route('/deleta/compromisso', methods=['DELETE'])
def DeletaCompromisso():
    
    compromisso_manager.deletar_compromisso(request.form.get('idCompromisso'))

    return '', 204


@app.route('/busca/compromissos/competencia', methods=['GET'])
def CompromissosPorCompetencia():
    ano = request.args.get('ano')
    mes = request.args.get('mes')

    if not ano or not mes:
        return jsonify({"error": "Parâmetros 'ano' e 'mes' são necessários."}), 400

    try:
        with ConectaBD() as conexao:
            cursor = conexao.cursor()
            query = """
                SELECT Compromisso.IDCompromisso, 
                    Compromisso.Titulo, 
                    Compromisso.Descricao, 
                    Compromisso.Data,
                    Compromisso.Concluido
                FROM Compromissos Compromisso
                WHERE substr(Compromisso.Data, 4, 2) = ?  
                AND substr(Compromisso.Data, 7, 4) = ? 
            """
            cursor.execute(query, (mes, ano))
            compromissos = cursor.fetchall()

            resultado = [{"IDCompromisso": c[0], "Titulo": c[1], "Descricao": c[2], "Data": c[3],  "Concluido": c[4]} for c in compromissos]
            return jsonify(resultado)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/busca/compromisso/<int:id>', methods=['GET'])
def CompromissoPorID(id):
    try:
        with ConectaBD() as conexao:
            cursor = conexao.cursor()
            query = """
                SELECT IDCompromisso, Titulo, Descricao, Data, Concluido, Email
                FROM Compromissos
                WHERE IDCompromisso = ?
            """
            cursor.execute(query, (id,))
            compromisso = cursor.fetchone()

            if compromisso:
                resultado = {
                    "IDCompromisso": compromisso[0],
                    "Titulo": compromisso[1],
                    "Descricao": compromisso[2],
                    "Data": compromisso[3],
                    "Concluido": compromisso[4],
                    "Email": compromisso[5]
                }
                return jsonify(resultado), 200
            else:
                return jsonify({"error": "Compromisso não encontrado."}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/')
def PaginaInicial():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)