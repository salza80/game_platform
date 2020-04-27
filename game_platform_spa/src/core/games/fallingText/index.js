import GameRoutes from './game'
import GameSidebarRoutes from './gameSidebar'
import withGameLayout from '../layout'

export default withGameLayout(GameSidebarRoutes, GameRoutes)
