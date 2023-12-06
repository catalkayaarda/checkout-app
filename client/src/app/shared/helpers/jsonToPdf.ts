const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function jsonToPdf(data: any, title: string) {
  let head = [];
  let row = [];
  for (var key in data) {
    head.push(key);
    row.push(data[key]);
  }
  let pdf = {
    content: [
      {
        text: title,
        bold: true,
        fontSize: 20,
        alignment: 'center',
        margin: [0, 0, 0, 20],
      },
      {
        columns: [head, row],
      },
    ],
  };

  pdfMake.createPdf(pdf).download(title);
}
