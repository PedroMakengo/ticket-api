/*
  Warnings:

  - The primary key for the `Evento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Inscricao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Evento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "data" DATETIME NOT NULL,
    "local" TEXT NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "Evento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Evento" ("atualizadoEm", "capacidade", "criadoEm", "data", "descricao", "id", "local", "titulo", "userId") SELECT "atualizadoEm", "capacidade", "criadoEm", "data", "descricao", "id", "local", "titulo", "userId" FROM "Evento";
DROP TABLE "Evento";
ALTER TABLE "new_Evento" RENAME TO "Evento";
CREATE TABLE "new_Inscricao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nomeParticipante" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "eventoId" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "Inscricao_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Inscricao" ("atualizadoEm", "criadoEm", "email", "eventoId", "id", "nomeParticipante", "telefone") SELECT "atualizadoEm", "criadoEm", "email", "eventoId", "id", "nomeParticipante", "telefone" FROM "Inscricao";
DROP TABLE "Inscricao";
ALTER TABLE "new_Inscricao" RENAME TO "Inscricao";
CREATE UNIQUE INDEX "Inscricao_email_eventoId_key" ON "Inscricao"("email", "eventoId");
CREATE TABLE "new_Ticket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'VALIDO',
    "eventoId" TEXT NOT NULL,
    "inscricaoId" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usadoEm" DATETIME,
    CONSTRAINT "Ticket_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ticket_inscricaoId_fkey" FOREIGN KEY ("inscricaoId") REFERENCES "Inscricao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ticket" ("codigo", "criadoEm", "eventoId", "id", "inscricaoId", "status", "usadoEm") SELECT "codigo", "criadoEm", "eventoId", "id", "inscricaoId", "status", "usadoEm" FROM "Ticket";
DROP TABLE "Ticket";
ALTER TABLE "new_Ticket" RENAME TO "Ticket";
CREATE UNIQUE INDEX "Ticket_codigo_key" ON "Ticket"("codigo");
CREATE UNIQUE INDEX "Ticket_inscricaoId_key" ON "Ticket"("inscricaoId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
INSERT INTO "new_User" ("activo", "atualizadoEm", "codigoOTP", "criadoEm", "email", "id", "nome", "role", "senha", "verifyToken") SELECT "activo", "atualizadoEm", "codigoOTP", "criadoEm", "email", "id", "nome", "role", "senha", "verifyToken" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
