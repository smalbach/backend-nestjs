import autoTable from 'jspdf-autotable'
import fs from 'fs';
import jsPDF from "jspdf"

//generate temp pdf file and return the file
export const generatePDF = (data: any, column: any) => {
  const doc = new jsPDF()
  const body = data.map((item: any) => Object.values(item));
  autoTable(doc, {
    foot: [['imagineapps.co']],
    head: [column],
    body: body,
  });
  doc.save('inventory.pdf');
  //get the file save in the temp folder
  //read the file and return the file
  const file = fs.readFileSync('inventory.pdf', 'base64');
  return file;
}