class Game < ApplicationRecord
	has_many :scores
	def display_name
		game_code
	end
end
