import RepositoryFactory from "../../../domain/factory/Repository-factory";
import StockEntryRepository from "../../../domain/repository/Stock-entry-repository";
import StockCalculator from "../../../domain/service/Stock-calculator";

export default class GetStock {
  stockEntryRepository: StockEntryRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.stockEntryRepository = repositoryFactory.createStockEntryRepository()
  }

  async execute(idItem: number): Promise<number> {
    const stockEntries = await this.stockEntryRepository.getByIdItem(idItem)
    const calculate = new StockCalculator()
    return calculate.calculate(stockEntries)
  }
}
