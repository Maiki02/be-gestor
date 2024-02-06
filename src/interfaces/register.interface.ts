import { Label } from "../models/Label";

export enum EnumSelect {
    INGRESOS = 'ingresos',
    GASTOS = 'gastos',
    VOID = ''
  }

export interface Register{
    id: string;
    section: EnumSelect;
    label: Label;
    date: string;
    amount: number;
    coin: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}