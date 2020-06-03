class Verb < ApplicationRecord
	has_many :verb_forms, dependent: :destroy
	belongs_to :language_level
	validates :infinitive, uniqueness: true

	def display_name 
		infinitive
	end

end
