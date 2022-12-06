import FreightCalculator from "./Freight-calculator"
import Item from "./Item"

export default class FixedFreightCalculator implements FreightCalculator {
  calculate(item: Item): number {
    return 10 
  }
}
