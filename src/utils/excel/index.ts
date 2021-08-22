import xlsx from 'xlsx'
import { AoAToSheet, JsonToSheet } from './types'

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
