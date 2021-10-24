import xlsx from 'xlsx'
import { AoAToSheet, ExcelData, JsonToSheet } from './types'

const { utils, writeFile } = xlsx

export function exportJsonToExcel<T = any>({
  data,
  header,
  filename = 'excel.xlsx',
  json2SheetOpts = {},
  writeOptions = { bookType: 'xlsx' }
}: JsonToSheet<T>) {
  const arrData = [...data]
  if (header) {
    arrData.unshift(header)
    json2SheetOpts.skipHeader = true
  }

  const worksheet = utils.json_to_sheet(arrData, json2SheetOpts)

  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, worksheet, filename)

  writeFile(workbook, filename, writeOptions)
}

export function exportAoAToExcel<T = any>({
  data,
  header,
  filename = 'excel.xlsx',
  writeOptions = { bookType: 'xlsx' }
}: AoAToSheet<T>) {
  const arrData = [...data]
  if (header) {
    arrData.unshift(header)
  }

  const worksheet = utils.aoa_to_sheet(arrData)

  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, worksheet, filename)

  writeFile(workbook, filename, writeOptions)
}

function getHeaderRow(sheet: xlsx.WorkSheet) {
  if (!sheet || !sheet['!ref']) return []
  const headers: string[] = []
  const range = xlsx.utils.decode_range(sheet['!ref'])
  const R = range.s.r
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cell = sheet[xlsx.utils.encode_cell({ c: C, r: R })]
    let hdr = 'UNKNOWN ' + C
    if (cell && cell.t) hdr = xlsx.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

export function getExcelData(workbook: xlsx.WorkBook) {
  const excelData: ExcelData[] = []
  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName]

    const header: string[] = getHeaderRow(worksheet)
    const data = xlsx.utils.sheet_to_json(worksheet)
    excelData.push({
      header,
      data,
      sheetName
    })
  }
  return excelData
}

export function parseExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function (e) {
      const data = e.target?.result
      const workbook = xlsx.read(data, { type: 'array' })
      const excelData = getExcelData(workbook)
      resolve(excelData)
    }

    reader.onerror = function (err) {
      reject(err)
    }

    reader.readAsArrayBuffer(file)
  })
}
