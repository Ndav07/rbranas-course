import StockEntry from "../../domain/entity/Stock-entry";
import OrderPlaced from "../../domain/event/Order-place";
import RepositoryFactory from "../../domain/factory/Repository-factory";
import StockEntryRepository from "../../domain/repository/Stock-entry-repository";
import Handler from "../../infra/broker/Handler";

export default class OrderPlacedStockHandler implements Handler {
  name = 'OrderPlaced'
  stockEntryRepository: StockEntryRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.stockEntryRepository = repositoryFactory.createStockEntryRepository() 
  }

  async handle(event: OrderPlaced): Promise<void> {
    for(const orderItem of event.order.getOrderItems()) {
      await this.stockEntryRepository.save(new StockEntry(orderItem.idItem, 'out', orderItem.quantity, event.order.date))
    }
  }
}