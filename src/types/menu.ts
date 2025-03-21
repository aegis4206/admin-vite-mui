import { ReactNode } from "react";

export interface BaseMenuItem {
  name: string;
  path: string;
  icon?: ReactNode;
  pageNode?: ReactNode;
}

export interface WithChildren extends BaseMenuItem {
  children: MenuItem[];
}

export interface WithNoSideBarRoute extends BaseMenuItem {
  noSideBarRoute: MenuItem[];
}

interface WithoutExtras extends BaseMenuItem {
  children?: never;
  noSideBarRoute?: never;
}

export type MenuItem = WithoutExtras | WithChildren | WithNoSideBarRoute;
