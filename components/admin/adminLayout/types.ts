import { MenuProps } from "antd";

export type TMenuItem = Required<MenuProps>['items'][number];

export interface PathWords {
  [key: string]: string
}