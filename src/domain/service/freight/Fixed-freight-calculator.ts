import FreightCalculator from "../../service/freight/Freight-calculator"
import Item from "../../entity/Item"

export default class FixedFreightCalculator implements FreightCalculator {
  calculate(item: Item): number {
    return 10 
  }
}
