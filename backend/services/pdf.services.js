const PDFDocument = require('pdfkit');

const themeColors = {
  green: { primary: '#15803d', secondary: '#16a34a', bg: '#f0fdf4' },
  blue: { primary: '#1d4ed8', secondary: '#2563eb', bg: '#eff6ff' },
  purple: { primary: '#7e22ce', secondary: '#9333ea', bg: '#faf5ff' },
  red: { primary: '#b91c1c', secondary: '#dc2626', bg: '#fef2f2' },
  slate: { primary: '#334155', secondary: '#475569', bg: '#f8fafc' },
};

const generarCVenPDF = (cv, res) => {
  const doc = new PDFDocument({ margin: 40, size: 'A4' });
  const theme = themeColors[cv.theme] || themeColors.green;

  // Headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=CV_${cv.nombre || 'sin_nombre'}.pdf`);
  doc.pipe(res);

  // === HEADER ===
  // Fondo del header
  doc.rect(0, 0, doc.page.width, 100).fill(theme.bg);

  // Nombre
  if (cv.nombre) {
    doc.fillColor(theme.primary)
      .fontSize(28)
      .font('Helvetica-Bold')
      .text(cv.nombre.toUpperCase(), 40, 35, { align: 'left' });
  }

  // Datos de contacto en una línea
  doc.fontSize(10).font('Helvetica').fillColor('#4b5563');
  const contacto = [
    cv.email ? `${cv.email}` : '',
    cv.telefono ? `${cv.telefono}` : '',
    cv.ciudad ? `${cv.ciudad}` : ''
  ].filter(Boolean).join('   |   ');

  doc.text(contacto, 40, 70);

  doc.moveDown(4);

  // Función helper para títulos de sección
  const addSectionTitle = (title) => {
    doc.moveDown(0.5);
    doc.fontSize(14)
      .font('Helvetica-Bold')
      .fillColor(theme.primary)
      .text(title.toUpperCase());

    // Línea separadora
    doc.strokeColor(theme.secondary)
      .lineWidth(1)
      .moveTo(40, doc.y)
      .lineTo(550, doc.y)
      .stroke();

    doc.moveDown(0.5);
  };

  // === EXPERIENCIA ===
  if (cv.experiencia?.length) {
    const experienciasValidas = cv.experiencia.filter(exp => exp.empresa || exp.cargo);
    if (experienciasValidas.length) {
      addSectionTitle('Experiencia Profesional');

      experienciasValidas.forEach(exp => {
        doc.moveDown(0.5);

        // Cargo y Fechas en la misma línea
        const startY = doc.y;
        doc.fontSize(12).font('Helvetica-Bold').fillColor('#1f2937').text(exp.cargo || 'Sin cargo', 40, startY);

        const formatFecha = (fecha) => {
          if (!fecha) return '';
          if (fecha === '9999-12-31') return 'Actualidad';
          return new Date(fecha).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
        };
        const fechas = `${formatFecha(exp.fechaInicio)} - ${exp.actual ? 'Presente' : formatFecha(exp.fechaFin)}`;

        doc.fontSize(10).font('Helvetica').fillColor('#6b7280')
          .text(fechas, 40, startY, { align: 'right' });

        // Empresa
        doc.fontSize(11).font('Helvetica-Bold').fillColor(theme.secondary).text(exp.empresa || '', 40, doc.y + 2);

        // Descripción
        if (exp.descripcion) {
          doc.fontSize(10).font('Helvetica').fillColor('#374151')
            .text(exp.descripcion, { align: 'justify', indent: 10 });
        }

        doc.moveDown(0.5);
      });
      doc.moveDown(1);
    }
  }

  // === EDUCACIÓN ===
  if (cv.educacion?.length) {
    const educacionesValidas = cv.educacion.filter(edu => edu.titulo || edu.institucion);
    if (educacionesValidas.length) {
      addSectionTitle('Formación Académica');

      educacionesValidas.forEach(edu => {
        doc.moveDown(0.5);

        const startY = doc.y;
        doc.fontSize(12).font('Helvetica-Bold').fillColor('#1f2937').text(edu.titulo || 'Sin título', 40, startY);

        const inicio = edu.fechaInicio ? new Date(edu.fechaInicio).toLocaleDateString('es-ES', { year: 'numeric' }) : '';
        const fin = edu.fechaFin ? new Date(edu.fechaFin).toLocaleDateString('es-ES', { year: 'numeric' }) : '';

        doc.fontSize(10).font('Helvetica').fillColor('#6b7280')
          .text(`${inicio} - ${fin}`, 40, startY, { align: 'right' });

        doc.fontSize(11).font('Helvetica-Bold').fillColor(theme.secondary).text(edu.institucion || '', 40, doc.y + 2);

        if (edu.descripcion) {
          doc.fontSize(10).font('Helvetica').fillColor('#374151')
            .text(edu.descripcion, { indent: 10 });
        }
        doc.moveDown(0.5);
      });
      doc.moveDown(1);
    }
  }

  // === HABILIDADES E IDIOMAS (2 Columnas) ===
  const tieneHabilidades = cv.habilidades?.some(h => h?.trim());
  const tieneIdiomas = cv.idiomas?.some(i => i?.trim());

  if (tieneHabilidades || tieneIdiomas) {
    const startY = doc.y;

    if (tieneHabilidades) {
      // Columna Izquierda
      doc.fontSize(14).font('Helvetica-Bold').fillColor(theme.primary).text('HABILIDADES', 40, startY);
      doc.strokeColor(theme.secondary).lineWidth(1).moveTo(40, doc.y).lineTo(280, doc.y).stroke();
      doc.moveDown(0.5);

      cv.habilidades.filter(h => h?.trim()).forEach(h => {
        doc.fontSize(10).font('Helvetica').fillColor('#374151').text(`• ${h}`);
      });
    }

    if (tieneIdiomas) {
      // Columna Derecha
      // Si hay habilidades, volvemos arriba, si no, usamos la posición actual
      doc.y = startY;

      doc.fontSize(14).font('Helvetica-Bold').fillColor(theme.primary).text('IDIOMAS', 300, startY);
      doc.strokeColor(theme.secondary).lineWidth(1).moveTo(300, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(0.5);

      cv.idiomas.filter(i => i?.trim()).forEach(i => {
        doc.fontSize(10).font('Helvetica').fillColor('#374151').text(`• ${i}`, 300);
      });
    }
  }

  // Footer con fecha
  const pageCount = doc.bufferedPageRange().count;
  for (let i = 0; i < pageCount; i++) {
    doc.switchToPage(i);
    doc.fontSize(8).fillColor('#9ca3af').text(
      `Generado el ${new Date().toLocaleDateString()}`,
      40,
      doc.page.height - 30,
      { align: 'center', width: doc.page.width - 80 }
    );
  }

  doc.end();
};

module.exports = { generarCVenPDF };
