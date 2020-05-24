class Gender < ApplicationRecord
	ARTICLES = { m: 'der', f: 'die', n: 'das'}
	def display_name 
		desc
	end

	def definiteArticle
		ARTICLES[char_desc.to_sym]
	end
end
