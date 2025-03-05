import { ReactNode } from "react";

export interface MenuItem {
  name: string;
  path: string;
  icon: ReactNode;
  children?: MenuItem[];
  pageNode?: ReactNode;
}
