class Game < ApplicationRecord
	has_many :scores

	## implement parsing score code later

	def display_name
		game_code
	end

	def get_score_code(options)
		puts options
		return options.game_code + '_' + options.level_code
	end
end
