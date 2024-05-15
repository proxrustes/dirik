export type Visit = {
  id: number,
  shiftId: number,
  totemName: string,
  clientsAmount: number,
  price: number,
  isPriceFixed: boolean,
  startAt: string,
  endAt?: string,
  resultPrice: number,
  cash: number,
  terminal: number,
  comment?: string
};
