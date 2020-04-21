import GameRoutes from './game'
import OptionsSelectorRoutes from './optionsSelector'
import withGameLayout from '../layout'

export default withGameLayout(OptionsSelectorRoutes, GameRoutes)
