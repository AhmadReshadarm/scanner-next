import { Parameter } from 'swagger/services';

export interface PayloadCategory {
  name: string;
  desc: string;
  url: string;
  image: string;
  parent?: string;
  parameters?: Parameter[];
  id?: string | string[] | undefined;
  children?: string[];
}
