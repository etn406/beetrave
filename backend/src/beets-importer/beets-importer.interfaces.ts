export interface BeetsImporterTableConfig {
  fromTable: string;
  toTable: string;
  columnsMapping: Record<string, string>;
}

export interface BeetsImportResult {
  copied: number;
  updated: number;
  inserted: number;
  deleted: number;
}