const { User, Pin } = require('../../db/models');
const bcrypt = require('bcryptjs');
const { SessionHelper } = require('../helper/SessionManagment');
const ExcelJS = require('exceljs');

exports.importFileToDb = async (exFile) => {
  const workbook = new ExcelJS.Workbook();
  new Promise((resolve, reject) => {
    workbook.xlsx.readFile(exFile).then(() => {
      const worksheet = workbook.getWorksheet(1);
      worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        if (rowNumber === 1) {
          return; // Skip header row
        }

        const rowData = row.values.slice(2);
        rowData.forEach(async (element) => {
          console.log(element[0]);
          await Pin.create({ pin_code: element[0] });
        });
      });
      resolve(true);
    });
    reject;
  });
};
