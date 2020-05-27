import withGameLayout from '../layout'
import GameSidebar from './gameSidebar'
import Game from './game'
import { DEFAULT_OPTIONS } from './constants'

export default withGameLayout('falling_text', DEFAULT_OPTIONS, GameSidebar, Game)
