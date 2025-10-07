const PDFDocument = require('pdfkit');

const generarCVenPDF = (cv, res) => {
  const doc = new PDFDocument({ margin: 40 });

  // Headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=CV_${cv.nombre || 'sin_nombre'}.pdf`);
  doc.pipe(res);

  // === HEADER COLORIDO ===
  doc.rect(0, 0, doc.page.width, 80).fill('#E3F2FD');
  if (cv.nombre) {
    doc.fillColor('#0D47A1')
      .fontSize(24)
      .text(cv.nombre, 50, 30, { align: 'left' });
  }

  doc.fillColor('black');
  doc.moveDown(3);

  // === DATOS PERSONALES ===
  const tieneDatosPersonales = cv.email || cv.telefono || cv.ciudad || (cv.fechaNacimiento && !isNaN(Date.parse(cv.fechaNacimiento)));
  if (tieneDatosPersonales) {
    doc.fontSize(14).fillColor('#2196F3').text('Información Personal', { underline: true });
    doc.moveDown(0.5);
    doc.fillColor('black');

    if (cv.email) {
      doc.font('Helvetica-Bold').text('Email: ', { continued: true }).font('Helvetica').text(cv.email);
    }
    if (cv.telefono) {
      doc.font('Helvetica-Bold').text('Teléfono: ', { continued: true }).font('Helvetica').text(cv.telefono);
    }
    if (cv.ciudad) {
      doc.font('Helvetica-Bold').text('Ciudad: ', { continued: true }).font('Helvetica').text(cv.ciudad);
    }
    if (cv.fechaNacimiento && !isNaN(Date.parse(cv.fechaNacimiento))) {
      doc.font('Helvetica-Bold').text('Fecha de nacimiento: ', { continued: true }).font('Helvetica').text(new Date(cv.fechaNacimiento).toLocaleDateString());
    }

    doc.moveDown(1);
  }

  // === EXPERIENCIA ===
  if (cv.experiencia?.length) {
    const experienciasValidas = cv.experiencia.filter(exp => exp.empresa || exp.cargo || exp.fechaInicio || exp.fechaFin || exp.descripcion || (exp.habilidades?.length));
    if (experienciasValidas.length) {
      doc.fontSize(14).fillColor('#2196F3').text('Experiencia Profesional', { underline: true });
      doc.moveDown(0.5);

      experienciasValidas.forEach(exp => {
        if (exp.cargo || exp.empresa) {
          doc.fillColor('#0D47A1').font('Helvetica-Bold').text(`${exp.cargo ?? ''} - ${exp.empresa ?? ''}`);
        }

        if (exp.fechaInicio || exp.fechaFin) {
          const formatFecha = (fecha) => {
            if (fecha === '9999-12-31') return 'Actualidad';
            return new Date(fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
          };
          const inicio = exp.fechaInicio ? formatFecha(exp.fechaInicio) : '';
          const fin = exp.fechaFin ? formatFecha(exp.fechaFin) : '';
          doc.font('Helvetica').fillColor('black').text(`${inicio} - ${fin}`);
        }

        if (exp.descripcion) {
          doc.font('Helvetica').fillColor('black').text(exp.descripcion);
        }

        if (exp.habilidades?.length) {
          doc.font('Helvetica-Bold').text('Habilidades: ', { continued: true }).font('Helvetica').text(exp.habilidades.join(', '));
        }

        doc.moveDown(1);
      });
    }
  }

  // === EDUCACIÓN ===
  if (cv.educacion?.length) {
    const educacionesValidas = cv.educacion.filter(edu => edu.titulo || edu.institucion || edu.fechaInicio || edu.fechaFin || edu.descripcion);
    if (educacionesValidas.length) {
      doc.fontSize(14).fillColor('#2196F3').text('Formación Académica', { underline: true });
      doc.moveDown(0.5);

      educacionesValidas.forEach(edu => {
        if (edu.titulo || edu.institucion) {
          doc.fillColor('#0D47A1').font('Helvetica-Bold').text(`${edu.titulo ?? ''} - ${edu.institucion ?? ''}`);
        }

        if (edu.fechaInicio || edu.fechaFin) {
          const inicio = edu.fechaInicio ? new Date(edu.fechaInicio).toLocaleDateString() : '';
          const fin = edu.fechaFin ? new Date(edu.fechaFin).toLocaleDateString() : '';
          doc.font('Helvetica').fillColor('black').text(`${inicio} - ${fin}`);
        }

        if (edu.descripcion) {
          doc.font('Helvetica').fillColor('black').text(edu.descripcion);
        }

        doc.moveDown(1);
      });
    }
  }

  // === HABILIDADES ===
  if (cv.habilidades?.length) {
    const habilidadesValidas = cv.habilidades.filter(h => h?.trim() !== '');
    if (habilidadesValidas.length) {
      doc.fontSize(14).fillColor('#2196F3').text('Habilidades', { underline: true });
      doc.moveDown(0.5);
      doc.fillColor('black').font('Helvetica').text(habilidadesValidas.join(', '));
      doc.moveDown(1);
    }
  }

  // === IDIOMAS ===
  if (cv.idiomas?.length) {
    const idiomasValidos = cv.idiomas.filter(i => i?.trim() !== '');
    if (idiomasValidos.length) {
      doc.fontSize(14).fillColor('#2196F3').text('Idiomas', { underline: true });
      doc.moveDown(0.5);
      doc.fillColor('black').font('Helvetica').text(idiomasValidos.join(', '));
    }
  }

  doc.end();
};

module.exports = { generarCVenPDF };
