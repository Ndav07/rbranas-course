import PgPromiseConnectionAdpter from './infra/database/Pg-promise-connection-adpter'
import DatabaseRepositoryFactory from './infra/factory/Database-repository-factory'
import ExpressAdapter from './infra/http/Express-adapter'
import RouteConfig from './infra/http/Rounte-config'

const expressAdapter = new ExpressAdapter()

const connection = PgPromiseConnectionAdpter.getInstance()
const repositoryFactory = new DatabaseRepositoryFactory(connection)

new RouteConfig(expressAdapter, repositoryFactory)

expressAdapter.listen(3000)