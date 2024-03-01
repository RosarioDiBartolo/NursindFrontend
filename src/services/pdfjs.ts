
import * as pdfjs from "pdfjs-dist";

import * as pdfWorker from "pdfjs-dist/build/pdf.worker.mjs";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

export default pdfjs;