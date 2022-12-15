import Item from "../../entity/Item";

export default interface FreightCalculator {
  calculate(item: Item): number
}
