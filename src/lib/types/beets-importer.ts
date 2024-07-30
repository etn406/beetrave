export interface BeetsImporterTableConfig {
  id: string;
  fromTable: string;
  toTable: string;
  columnsMapping: Record<string, string>;
}

export interface BeetsImportResult {
  id: string;
  copied: number;
  updated: number;
  inserted: number;
  deleted: number;
}

/** Server-Side-Event Message */
export interface BeetsImportLog {
  name: 'log' | 'success' | 'error';
  message: string;
}
