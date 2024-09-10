from flask import Flask, render_template, request, flash, redirect, url_for, session, abort
import sqlite3

app = Flask(__name__, static_folder='../frontend', template_folder='../frontend')


#CONEXÃO COM O BANCO
def ConectaBD():
    return sqlite3.connect("./bd/PraOntem")


#PADRÕES DE PROJETO
class Compromisso(object):
    def __init__(self, titulo, descricao, status, tipoCompromisso, data):
        self.titulo = titulo
        self.descricao = descricao
        self.status = status
        self.tipoCompromisso = tipoCompromisso
        self.data = data

class Reuniao(Compromisso):
    def __init__(self):
        self.titulo = "Reunião"

class Consulta(Compromisso):
    def __init__(self):
        self.titulo = "Consulta"

class Lembrete(Compromisso):
    def __init__(self):
        self.titulo = "Lembrete"

class CompromissoFactory(object):
    @staticmethod
    def CriaCompromisso(tipoCompromisso):
        if tipoCompromisso == 'Reunião':
            return Reuniao()
        elif tipoCompromisso == 'Consulta':
            return Consulta()
        elif tipoCompromisso == 'Lembrete':
            return Lembrete()

class Observer:
    def __init__(self, subject):
        subject.register(self)

    def NotificaUsuario():
        return "hw"


#ROTAS
@app.route('/cria/compromisso', methods=['POST'])
def CriaCompromisso():
    titulo = request.form.get('titulo')
    descricao = request.form.get('descricao')
    status = request.form.get('status')
    data = request.form.get('data')

    with ConectaBD() as conexao:
        cursor = conexao.cursor()
        cursor.execute('INSERT INTO Compromissos (Titulo, Descricao, Concluido, Data) VALUES (?, ?, ?, ?)', 
                       (titulo, descricao, status, data))
        conexao.commit()

    return '', 204

@app.route('/atualiza/compromisso', methods=['PUT'])
def AtualizaCompromisso():
    idCompromisso = request.form.get('idCompromisso')
    titulo = request.form.get('titulo')
    descricao = request.form.get('descricao')
    status = request.form.get('status')
    data = request.form.get('data')

    with ConectaBD() as conexao:
        cursor = conexao.cursor()
        cursor.execute('UPDATE Compromissos SET Titulo = ?, Descricao = ?, Concluido = ?, Data = ? WHERE IDCompromisso = ?', 
                       (titulo, descricao, status, data, idCompromisso))
        conexao.commit()

    return '', 204

@app.route('/deleta/compromisso', methods=['DELETE'])
def DeletaCompromisso():
    idCompromisso = request.form.get('idCompromisso')

    with ConectaBD() as conexao:
        cursor = conexao.cursor()
        cursor.execute('DELETE FROM Compromissos WHERE IDCompromisso = ? GO', 
                       (idCompromisso))
        conexao.commit()

    return '', 204

@app.route('/busca/compromissos', methods=['GET'])
def BuscaCompromissos():
    with ConectaBD() as conexao:
        cursor = conexao.cursor()
        cursor.execute('SELECT * FROM Compromissos')
        compromissos = cursor.fetchall()

        return compromissos

@app.route('/busca/compromissos/competencia', methods=['GET'])
def CompromissosPorCompetencia():
       with ConectaBD as conexao:
        cursor = conexao.cursor()
        cursor.execute('SELECT * FROM Compromissos')
        compromissos = cursor.fetchall()

        return compromissos

@app.route('/')
def PaginaInicial():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)