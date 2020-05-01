class Noun < ApplicationRecord
	belongs_to :gender
	belongs_to :language_level
	validates :word, uniqueness: true
end
