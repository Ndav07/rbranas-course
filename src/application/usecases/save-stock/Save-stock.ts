import StockEntry from "../../../domain/entity/Stock-entry";
import RepositoryFactory from "../../../domain/factory/Repository-factory";
import StockEntryRepository from "../../../domain/repository/Stock-entry-repository";
import SaveStockInput from "./Save-stock-input";

export default class SaveStock {
  stockEntryRepository: StockEntryRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.stockEntryRepository = repositoryFactory.createStockEntryRepository()
  }

  async execute(input: SaveStockInput) {
    await this.stockEntryRepository.save(
      new StockEntry(
        input.idItem,
        input.operation,
        input.quantity,
        new Date()
      )
    )
  }
}