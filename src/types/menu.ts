import { ReactNode, JSX, LazyExoticComponent } from "react";
export interface MenuItem {
  name: string;
  path: string;
  icon?: ReactNode | undefined;
  pageNode?: LazyExoticComponent<() => JSX.Element> | undefined;
  children?: MenuItem[];
  noSideBarRoute?: MenuItem[];
}
export interface BackEndMenuItem {
  name: string;
  path: string;
  icon?: string;
  pageNode?: string;
  children?: BackEndMenuItem[];
  noSideBarRoute?: BackEndMenuItem[];
  permission?: (
    | "view"
    | "create"
    | "edit"
    | "delete"
    | "import"
    | "detail"
    | "close"
  )[];
}
