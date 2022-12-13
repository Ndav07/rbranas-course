import Connection from "../../infra/database/Connection";
import GetOrderOutput from "./GetOrderOutput";

export default class GetOrder {
  constructor(readonly connection: Connection) {

  }

  async execute(code: string): Promise<GetOrderOutput> {
    const [orderData] = await this.connection.query('select code, total::float from ccca.order where code = $1', [code])
    const getOrderOutput = new GetOrderOutput(orderData.code, orderData.total)
    return getOrderOutput
  }
}
