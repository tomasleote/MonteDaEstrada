const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
        ShadingType, PageBreak, TableOfContents, PageNumber } = require('docx');
const fs = require('fs');

// Color scheme
const COLORS = {
  primary: "1E3A8A",
  secondary: "6B7280",
  accent: "059669",
  lightBlue: "DBEAFE",
  lightGreen: "D1FAE5",
  white: "FFFFFF"
};

const tableBorder = {
  top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
  bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
  left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
  right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }
};

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Calibri", size: 24 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Calibri", color: COLORS.primary },
        paragraph: { spacing: { before: 360, after: 240 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Calibri", color: COLORS.primary },
        paragraph: { spacing: { before: 280, after: 180 }, outlineLevel: 1 } }
    ]
  },
  numbering: {
    config: [
      { reference: "checkmarks", levels: [{ level: 0, format: "bullet", text: "✅", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "crosses", levels: [{ level: 0, format: "bullet", text: "❌", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: {
      page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    headers: {
      default: new Header({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Proposta: Ecossistema Digital The Touril Collection", font: "Calibri", size: 20, color: COLORS.secondary })] })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Página " }), new TextRun({ children: [PageNumber.CURRENT] }),
          new TextRun({ text: " | Fevereiro 2026", color: COLORS.secondary })] })] })
    },
    children: [
      new Paragraph({ spacing: { before: 3000 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "PROPOSTA", font: "Calibri", size: 32, bold: true, color: COLORS.secondary })] }),
      new Paragraph({ spacing: { before: 400, after: 800 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Ecossistema Digital", font: "Calibri", size: 56, bold: true, color: COLORS.primary })] }),
      new Paragraph({ spacing: { after: 200 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "The Touril Collection", font: "Calibri", size: 48, bold: true, color: COLORS.accent })] }),
      new Paragraph({ spacing: { before: 800, after: 2000 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Transformação Estratégica de Marca e Presença Digital", font: "Calibri", size: 28, italics: true, color: COLORS.secondary })] }),

      new Table({ width: { size: 9026, type: WidthType.DXA }, columnWidths: [9026], rows: [
        new TableRow({ children: [new TableCell({ shading: { fill: COLORS.lightGreen, type: ShadingType.CLEAR },
          margins: { top: 200, bottom: 200, left: 200, right: 200 }, width: { size: 9026, type: WidthType.DXA },
          children: [
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 },
              children: [new TextRun({ text: "Investimento Total: €1.450", size: 32, bold: true, color: COLORS.accent })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 },
              children: [new TextRun({ text: "Valor de Mercado: €10.300 - €21.000", size: 28 })] }),
            new Paragraph({ alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: "Poupança: €8.850 - €19.550 (86-93%)", size: 28, bold: true, color: COLORS.accent })] })
          ] })] })
      ]}),

      new Paragraph({ spacing: { before: 2000 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Fevereiro 2026", size: 24, color: COLORS.secondary })] }),
      new Paragraph({ children: [new PageBreak()] }),

      new TableOfContents("Índice", { hyperlink: true, headingStyleRange: "1-2" }),
      new Paragraph({ children: [new PageBreak()] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("📋 Sumário Executivo")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Esta proposta apresenta um plano estratégico para transformar três websites independentes (Herdade do Touril, Monte da Estrada e Monte do Papa-léguas) num ecossistema digital coeso que reflete a excelência e identidade da marca Touril, mantendo a individualidade de cada propriedade.", size: 24 })] }),

      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("💰 Investimento & Comparação de Mercado")] }),

      new Table({ width: { size: 9026, type: WidthType.DXA }, columnWidths: [3008, 2006, 2006, 2006], rows: [
        new TableRow({ children: [
          new TableCell({ shading: { fill: COLORS.primary, type: ShadingType.CLEAR }, margins: { top: 120, bottom: 120, left: 120, right: 120 },
            width: { size: 3008, type: WidthType.DXA }, borders: tableBorder,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Serviço", bold: true, size: 24, color: COLORS.white })] })] }),
          new TableCell({ shading: { fill: COLORS.primary, type: ShadingType.CLEAR }, margins: { top: 120, bottom: 120, left: 120, right: 120 },
            width: { size: 2006, type: WidthType.DXA }, borders: tableBorder,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Agência", bold: true, size: 24, color: COLORS.white })] })] }),
          new TableCell({ shading: { fill: COLORS.primary, type: ShadingType.CLEAR }, margins: { top: 120, bottom: 120, left: 120, right: 120 },
            width: { size: 2006, type: WidthType.DXA }, borders: tableBorder,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Freelancer", bold: true, size: 24, color: COLORS.white })] })] }),
          new TableCell({ shading: { fill: COLORS.accent, type: ShadingType.CLEAR }, margins: { top: 120, bottom: 120, left: 120, right: 120 },
            width: { size: 2006, type: WidthType.DXA }, borders: tableBorder,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Proposta", bold: true, size: 24, color: COLORS.white })] })] })
        ]}),
        new TableRow({ children: [
          new TableCell({ margins: { top: 100, bottom: 100, left: 120, right: 120 }, width: { size: 3008, type: WidthType.DXA }, borders: tableBorder,
            children: [new Paragraph({ children: [new TextRun({ text: "Website Hotel", size: 22 })] })] }),
          new TableCell({ margins: { top: 100, bottom: 100, left: 120, right: 120 }, width: { size: 2006, type: WidthType.DXA }, borders: tableBorder,
            children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "€5.000-€10.000", size: 22 })] })] }),
          new TableCell({ margins: { top: 100, bottom: 100, left: 120, right: 120 }, width: { size: 2006, type: WidthType.DXA }, borders: tableBorder,
            children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "€2.500-€5.000", size: 22 })] })] }),
          new TableCell({ shading: { fill: COLORS.lightGreen, type: ShadingType.CLEAR }, margins: { top: 100, bottom: 100, left: 120, right: 120 },
            width: { size: 2006, type: WidthType.DXA }, borders: tableBorder,
            children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "€300", size: 22, bold: true, color: COLORS.accent })] })] })
        ]}),
        new TableRow({ children: [
          new TableCell({ shading: { fill: COLORS.lightBlue, type: ShadingType.CLEAR }, margins: { top: 120, bottom: 120, left: 120, right: 120 },
            width: { size: 3008, type: WidthType.DXA }, borders: tableBorder,
            children: [new Paragraph({ children: [new TextRun({ text: "TOTAL", bold: true, size: 24 })] })] }),
          new TableCell({ shading: { fill: COLORS.lightBlue, type: ShadingType.CLEAR }, margins: { top: 120, bottom: 120, left: 120, right: 120 },
            width: { size: 2006, type: WidthType.DXA }, borders: tableBorder,
            children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "€10.300-€21.000", bold: true, size: 24 })] })] }),
          new TableCell({ shading: { fill: COLORS.lightBlue, type: ShadingType.CLEAR }, margins: { top: 120, bottom: 120, left: 120, right: 120 },
            width: { size: 2006, type: WidthType.DXA }, borders: tableBorder,
            children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "€5.300-€10.800", bold: true, size: 24 })] })] }),
          new TableCell({ shading: { fill: COLORS.accent, type: ShadingType.CLEAR }, margins: { top: 120, bottom: 120, left: 120, right: 120 },
            width: { size: 2006, type: WidthType.DXA }, borders: tableBorder,
            children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "€1.450", bold: true, size: 26, color: COLORS.white })] })] })
        ]})
      ]}),

      new Paragraph({ spacing: { before: 240 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Poupança: €8.850-€19.550 (86-93%)", size: 28, bold: true, color: COLORS.accent })] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const outputPath = 'c:\\Users\\leotm\\Desktop\\Projetos\\Programming\\MonteDaEstrada\\Proposta-Touril.docx';
  fs.writeFileSync(outputPath, buffer);
  console.log('✅ Document created: ' + outputPath);
});
