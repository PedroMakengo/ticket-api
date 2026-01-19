-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ORGANIZADOR',
    "activo" BOOLEAN NOT NULL DEFAULT false,
    "verifyToken" TEXT NOT NULL,
    "codigoOTP" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "data" DATETIME NOT NULL,
    "local" TEXT NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "Evento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Inscricao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeParticipante" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "eventoId" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "Inscricao_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'VALIDO',
    "eventoId" INTEGER NOT NULL,
    "inscricaoId" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usadoEm" DATETIME,
    CONSTRAINT "Ticket_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ticket_inscricaoId_fkey" FOREIGN KEY ("inscricaoId") REFERENCES "Inscricao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Inscricao_email_eventoId_key" ON "Inscricao"("email", "eventoId");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_codigo_key" ON "Ticket"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_inscricaoId_key" ON "Ticket"("inscricaoId");
