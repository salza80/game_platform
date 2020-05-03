class VerbForm < ApplicationRecord
	belongs_to :verb


	def display_name 
		return form << '-' << subject if subject?
		form
	end
end
