const PDFDocument = require('pdfkit');
const fs = require('fs');

const generarCVenPDF = (cv, res) => {
  const doc = new PDFDocument({ margin: 40 });

  // Headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=CV_${cv.nombre}.pdf`);
  doc.pipe(res);

  // === HEADER COLORIDO ===
  doc.rect(0, 0, doc.page.width, 80).fill('#E3F2FD');
  doc.fillColor('#0D47A1')
    .fontSize(24)
    .text(cv.nombre, 50, 30, { align: 'left' });

  // Volver al color negro para el contenido
  doc.fillColor('black');
  doc.moveDown(3);

  // === DATOS PERSONALES ===
  doc.fontSize(14).fillColor('#2196F3').text('Información Personal', { underline: true });
  doc.moveDown(0.5);
  doc.fillColor('black')
    .font('Helvetica-Bold').text('Email: ', { continued: true }).font('Helvetica').text(cv.email);
  doc.font('Helvetica-Bold').text('Teléfono: ', { continued: true }).font('Helvetica').text(cv.telefono);
  doc.font('Helvetica-Bold').text('Ciudad: ', { continued: true }).font('Helvetica').text(cv.ciudad);
  doc.font('Helvetica-Bold').text('Fecha de nacimiento: ', { continued: true }).font('Helvetica').text(new Date(cv.fechaNacimiento).toLocaleDateString());
  doc.moveDown(1);

  // === EXPERIENCIA ===
  if (cv.experiencia?.length) {
    doc.fontSize(14).fillColor('#2196F3').text('Experiencia Profesional', { underline: true });
    doc.moveDown(0.5);
    cv.experiencia.forEach(exp => {
      doc.fillColor('#0D47A1').font('Helvetica-Bold').text(`${exp.cargo} - ${exp.empresa}`);
      doc.fillColor('black')
      if (exp.fechaInicio || exp.fechaFin) {
        const inicio = exp.fechaInicio ? new Date(exp.fechaInicio).toLocaleDateString() : '';
        const fin = exp.fechaFin ? new Date(exp.fechaFin).toLocaleDateString() : '';
        doc.font('Helvetica').text(`${inicio} - ${fin}`);
      }

      if (exp.descripcion) {
        doc.text(exp.descripcion);
      }

      if (exp.habilidades?.length) {
        doc.font('Helvetica-Bold').text('Habilidades: ', { continued: true }).font('Helvetica').text(exp.habilidades.join(', '));
      }
      doc.moveDown(1);
    });
  }

  // === EDUCACIÓN ===
  if (cv.educacion?.length) {
    doc.fontSize(14).fillColor('#2196F3').text('Formación Académica', { underline: true });
    doc.moveDown(0.5);
    cv.educacion.forEach(edu => {
      doc.fillColor('#0D47A1').font('Helvetica-Bold').text(`${edu.titulo} - ${edu.institucion}`);
      doc.fillColor('black')
      if (edu.fechaInicio || edu.fechaFin) {
        const inicio = edu.fechaInicio ? new Date(edu.fechaInicio).toLocaleDateString() : '';
        const fin = edu.fechaFin ? new Date(edu.fechaFin).toLocaleDateString() : '';
        doc.font('Helvetica').text(`${inicio} - ${fin}`);
      }

      if (edu.descripcion) {
        doc.text(edu.descripcion);
      }
      doc.moveDown(1);
    });
  }

  // === HABILIDADES ===
  if (cv.habilidades?.length) {
    doc.fontSize(14).fillColor('#2196F3').text('Habilidades', { underline: true });
    doc.moveDown(0.5);
    doc.fillColor('black').font('Helvetica').text(cv.habilidades.join(', '));
    doc.moveDown(1);
  }

  // === IDIOMAS ===
  if (cv.idiomas?.length) {
    doc.fontSize(14).fillColor('#2196F3').text('Idiomas', { underline: true });
    doc.moveDown(0.5);
    doc.fillColor('black').font('Helvetica').text(cv.idiomas.join(', '));
  }

  doc.end();
};

module.exports = { generarCVenPDF };