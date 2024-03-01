import { PDFDocumentProxy } from "pdfjs-dist";
  
import { TextItem, TextMarkedContent } from "pdfjs-dist/types/src/display/api";

import pdfjs from "@/services/pdfjs";

const days = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']


class OCRExtractor {
    constructor() {
        // constructor code if needed
    }

 
    
    // List of pandas Dataframes for different Pages of the same PDF
    async features( pdfDoc: PDFDocumentProxy  ) {
 
        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
            // Get the text content for the current page
            const page = await pdfDoc.getPage(pageNum);
            const textContent = await page.getTextContent( {normalizeWhitespace: true});
    
            this.handleItems(textContent.items);              
     
          }
          
        }
    
 
    handleItems(items: Array<TextItem >) {

        const rows: Array<Array<string>> = [];
        let row: Array<string> = [];

        items.map((i) => {
            const text = i.str;
            if (days.includes ( text ) ){
                rows.push([text, ...row    ] )
                row = [];
            }
            else{
                row.push(text)
            }
        } )  ;


        console.log(rows)
      }
    
    

}

export default OCRExtractor
 