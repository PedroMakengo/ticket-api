/*
  Warnings:

  - Added the required column `horaFim` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horaInicio` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoParticipante` to the `Inscricao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoLugar` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoLugarDetalhes` to the `Ticket` table without a default value. This is not possible if the table is not empty.

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
    "horaInicio" TEXT NOT NULL,
    "horaFim" TEXT NOT NULL,
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
    "tipoParticipante" TEXT NOT NULL,
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
    "tipoLugar" TEXT NOT NULL,
    "tipoLugarDetalhes" TEXT NOT NULL,
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
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
