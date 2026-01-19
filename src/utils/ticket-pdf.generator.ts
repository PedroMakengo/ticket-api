import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';

// Interface para os dados do ticket
export interface TicketData {
  eventName: string;
  location: string;
  date: string;
  time: string;
  participantName: string;
  participantType: string;
  seatType: string;
  seatDetails: string;
  ticketId: string;
  orderRef: string;
  baseUrl?: string;
}

// Função utilitária para gerar o ticket em PDF
export async function generateTicketPDF(
  ticketData: TicketData,
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: [595, 400],
        margins: { top: 40, bottom: 40, left: 40, right: 40 },
        autoFirstPage: false, // Desativa criação automática de páginas
      });

      const tmpDir = path.join(process.cwd(), 'tmp');
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }

      const fileName = `ticket-${ticketData.ticketId.replace(/[^a-zA-Z0-9]/g, '')}-${Date.now()}.pdf`;
      const outputPath = path.join(tmpDir, fileName);
      const writeStream = fs.createWriteStream(outputPath);

      doc.pipe(writeStream);

      // Adiciona apenas UMA página
      doc.addPage({
        size: [595, 400],
        margins: { top: 40, bottom: 40, left: 40, right: 40 },
      });

      // Gera o QR Code como URL de validação
      const validationUrl = `http://localhost:3000/validate-ticket?ticketId=${encodeURIComponent(ticketData.ticketId)}&orderRef=${encodeURIComponent(ticketData.orderRef)}&participant=${encodeURIComponent(ticketData.participantName)}`;

      const qrCodeImage = await QRCode.toDataURL(validationUrl, {
        width: 100,
        margin: 1,
        color: {
          dark: '#2C4A4A',
          light: '#FFFFFF',
        },
      });

      // Badge "CONFIRMADO"
      doc.fontSize(10).fillColor('#E8B4B4').text('CONFIRMADO', 50, 50);

      // Título do evento
      doc
        .fontSize(32)
        .fillColor('#000000')
        .font('Helvetica-Bold')
        .text(ticketData.eventName, 50, 80, { width: 350 });

      // Subtítulo - Local
      doc
        .fontSize(16)
        .fillColor('#2A7B7B')
        .font('Helvetica')
        .text(ticketData.location, 50, 125, { width: 350 });

      // Seção: DATA E HORA
      doc.fontSize(10).fillColor('#999999').text('DATA E HORA', 50, 170);

      doc
        .fontSize(14)
        .fillColor('#000000')
        .font('Helvetica-Bold')
        .text(ticketData.date, 50, 185);

      doc
        .fontSize(12)
        .fillColor('#666666')
        .font('Helvetica')
        .text(ticketData.time, 50, 205);

      // Seção: PARTICIPANTE
      doc.fontSize(10).fillColor('#999999').text('PARTICIPANTE', 280, 170);

      doc
        .fontSize(14)
        .fillColor('#000000')
        .font('Helvetica-Bold')
        .text(ticketData.participantName, 280, 185, { width: 150 });

      doc
        .fontSize(12)
        .fillColor('#666666')
        .font('Helvetica')
        .text(ticketData.participantType, 280, 205, { width: 150 });

      // Seção: LUGAR / TIPO
      doc.fontSize(10).fillColor('#999999').text('LUGAR / TIPO', 50, 250);

      doc
        .fontSize(14)
        .fillColor('#000000')
        .font('Helvetica-Bold')
        .text(ticketData.seatType, 50, 265);

      doc
        .fontSize(12)
        .fillColor('#666666')
        .font('Helvetica')
        .text(ticketData.seatDetails, 50, 285);

      // Seção: ID DO INGRESSO
      doc.fontSize(10).fillColor('#999999').text('ID DO INGRESSO', 280, 250);

      doc
        .fontSize(14)
        .fillColor('#000000')
        .font('Helvetica-Bold')
        .text(ticketData.ticketId, 280, 265);

      doc
        .fontSize(12)
        .fillColor('#666666')
        .font('Helvetica')
        .text(`Ref. Pedido: ${ticketData.orderRef}`, 280, 285);

      // Adiciona o QR Code real
      doc.image(qrCodeImage, 450, 50, {
        width: 100,
        height: 100,
      });

      // Instrução do QR Code
      doc
        .fontSize(8)
        .fillColor('#666666')
        .text('Escaneie o código para', 435, 165, {
          width: 120,
          align: 'center',
        });

      doc
        .fontSize(9)
        .fillColor('#2A7B7B')
        .font('Helvetica-Bold')
        .text('entrada rápida', 435, 177, {
          width: 120,
          align: 'center',
        });

      // Ícone do evento (badge)
      doc.roundedRect(420, 50, 20, 20, 3).fillColor('#2C4A4A').fill();

      doc.end();

      writeStream.on('finish', () => {
        console.log(`✅ Ticket PDF gerado com sucesso em: ${outputPath}`);
        resolve(outputPath);
      });

      writeStream.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
}
