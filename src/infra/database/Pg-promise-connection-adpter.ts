import Connection from "./Connection"
import pqg from 'pg-promise'

export default class PgPromiseConnectionAdpter implements Connection {
  pgp: any

  constructor() {
    this.pgp = pqg()('postgres://postgres:123456@localhost:5432/app')
  }

  async query(statement: string, params: any[]): Promise<any> {
    return this.pgp.query(statement, params)
  }
}