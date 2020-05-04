import withGameLayout from '../layout'
import GameSidebar from './gameSidebar'
import Game from './game'
import { DEFAULT_OPTIONS } from "./constants"

export default withGameLayout(DEFAULT_OPTIONS, GameSidebar, Game)
