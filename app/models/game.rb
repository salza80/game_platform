class Game < ApplicationRecord


	## implement parsing score code later

	def get_score_code(options)
		puts options
		return options.topicId + '_' + options.levelId
	end
end
