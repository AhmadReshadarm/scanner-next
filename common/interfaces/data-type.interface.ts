export interface DataType {
  key: React.Key;
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  parent: string;
}

export interface NewsDataType {
  key: React.Key;
  id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  image: string;
  showOnMain: boolean;
}
