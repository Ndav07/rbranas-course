import Connection from "./Connection"
import pqg from 'pg-promise'

export default class PgPromiseConnectionAdpter implements Connection {
  pgp: any
  static instace: PgPromiseConnectionAdpter

  private constructor() {
    this.pgp = pqg()('postgres://postgres:123456@localhost:5432/app')
  }

  static getInstance() {
    if(!PgPromiseConnectionAdpter.instace) {
      PgPromiseConnectionAdpter.instace = new PgPromiseConnectionAdpter()
    }
    return PgPromiseConnectionAdpter.instace
  }

  async query(statement: string, params: any[]): Promise<any> {
    return this.pgp.query(statement, params)
  }
}
