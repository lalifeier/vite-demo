import { JSON2SheetOpts, WritingOptions } from 'xlsx/types';

export interface JsonToSheet<T = any> {
  data: T[];
  header?: T;
  filename?: string;
  json2SheetOpts?: JSON2SheetOpts;
  writeOptions?: WritingOptions;
}

export interface AoAToSheet<T = any> {
  data: T[][];
  header?: T[];
  filename?: string;
  writeOptions?: WritingOptions;
}

export interface ExcelData<T = any> {
  header: string[];
  data: T[];
  sheetName: string;
}
