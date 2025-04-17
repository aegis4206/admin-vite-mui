import { atom } from "jotai";
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { RefObject } from "react";


export const checkboxSelectedAtom = atom<GridRowSelectionModel>([]);
export const gridApiRefAtom = atom<RefObject<GridApiCommunity | null> | null>();