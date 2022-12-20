import Broker from './infra/broker/Broker'
import OrderDAODatabase from './infra/dao/OrderDAODatabase'
import PgPromiseConnectionAdpter from './infra/database/Pg-promise-connection-adpter'
import DatabaseRepositoryFactory from './infra/factory/Database-repository-factory'
import ExpressAdapter from './infra/http/Express-adapter'
import RouteConfig from './infra/http/Rounte-config'

const expressAdapter = new ExpressAdapter()

const connection = PgPromiseConnectionAdpter.getInstance()
const repositoryFactory = new DatabaseRepositoryFactory()
const orderDAO = new OrderDAODatabase(connection)
const broker = new Broker()

new RouteConfig(expressAdapter, repositoryFactory, orderDAO, broker)

expressAdapter.listen(3000)