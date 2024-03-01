import pdfjs from "@/services/pdfjs";

class PDFBlock {
  files: FileList;

  constructor(files: FileList) {
    this.files = files;
  }

  async getFile(idx: number) {
    const file = this.files[idx];

    if (file) {
      const pdfContent: BinaryData = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsArrayBuffer(file);
      });

      const pdf = await pdfjs.getDocument({ data: pdfContent }).promise;

      // Do something with the pdf object if needed
      console.log(`PDF object for file at index ${idx}:`, pdf);

      return pdf;
    }
  }
}

export default PDFBlock;