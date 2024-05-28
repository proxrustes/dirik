export type Shift = {
    id: number,
    creatorId: number,
    locationId: number,
    location: string,
    startDate: string,
    endDate: string |null,
    availableCash: number,
    totalCash: number,
    totalMoney: number
}