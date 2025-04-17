import { atom } from "jotai";
import { ModalMessageProps } from "../types/modal";

export const modalMessageAtom = atom<ModalMessageProps<unknown>>();