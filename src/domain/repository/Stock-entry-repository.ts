import StockEntry from "../entity/Stock-entry";

export default interface StockEntryRepository {
  getByIdItem(idItem: number): Promise<StockEntry[]>
  save(stockEntry: StockEntry): Promise<void>
  clear(): Promise<void>
}
