CREATE TABLE Compromissos (
    IDCompromisso INTEGER NOT NULL,
    Titulo VARCHAR(200) NOT NULL,
    Descricao VARCHAR(500) NOT NULL,
    Concluido BIT NOT NULL,
    Data DATETIME,
    PRIMARY KEY (IDCompromisso)
);


--DATETIME('now', 'localtime')

INSERT INTO Compromissos (Titulo, Descricao, Concluido, Data)
VALUES ("Agora", "O agora é só uma ilusão do que já está se tornando o passado", 1, DATETIME('now', 'localtime'))