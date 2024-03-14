const PDFDocument = require('pdfkit');
const fs = require('fs');
const data = require('./data.json')


// Create a document
const doc = new PDFDocument();

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));

// Main Report
doc
    .font('fonts/Roboto_Medium_500.ttf')
    .fontSize(25)
    .text(`${data.inspectionName}`);

doc
    .font('fonts/Roboto_Medium_500.ttf')
    .fontSize(25)
    .text(`${data.inspectionGroup}`);

data.inspectionSteps.forEach((elem) => {
    doc
        .font('fonts/Roboto_Regular_400.ttf')
        .fontSize(12)
        .text(`${elem.inspection}`);
    doc
        .font('fonts/Roboto_Regular_400.ttf')
        .fontSize(12)
        .text(`Ergebnis: ${elem.result}`);
})

// Attach Photos

doc
    .font('fonts/Roboto_Medium_500.ttf')
    .fontSize(25)
    .text(`Fotos`);

for (let index = 0; index < data.inspectionSteps.length; index++) {
    const step = data.inspectionSteps[index];
    if (step.photos.length > 0) {
        doc
            .font('fonts/Roboto_Regular_400.ttf')
            .fontSize(12)
            .text(step.inspection);
        step.photos.forEach((imgPath) => {
            doc.image(imgPath, {                
                fit: [250, 300],
                align: 'center',
                valign: 'center'
            });
        })
    }
}


// Finalize PDF file
doc.end();