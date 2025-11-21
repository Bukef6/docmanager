export interface User {
  id: number;
  username: string;
}

export interface DocumentApi {
  documents: DocumentItem[];
  total: number;
}

export interface DocumentItem {
  id: number;
  title: string;
  tag: string;
  createdAt: string;
  size: number;
  filePath: string;
}
