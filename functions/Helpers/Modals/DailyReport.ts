import { Restaurants } from "./RestaurantsEnum"

export interface DailyReport{
    date: Date,
    restaurant: Restaurants,
    totalRefeicoes: number,
    totalCaixa: number,
    totalMB: number,
    totalPlataformas: number,
    totalDespesasExtra: number,
    totalDinheiroEsperado: number,
    totalDinheiroReal: number,
    totalDesvios: number,
}