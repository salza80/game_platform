# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?

Gender.create!(char_desc: 'm', desc: 'Masculine') 
Gender.create!(char_desc: 'f', desc: 'Feminine') 
Gender.create!(char_desc: 'n', desc: 'Neutral') 

LanguageLevel.create!(level_code: 'A1')
LanguageLevel.create!(level_code: 'A2')
LanguageLevel.create!(level_code: 'B1')
LanguageLevel.create!(level_code: 'B2')
LanguageLevel.create!(level_code: 'C1')

Game.create!(game_code: 'falling_text', score_code_pattern: '#topicId_#levelId', game_title: 'Falling Text', game_short_desc: 'Practice your german with a falling text game.',
	game_desc: 'Shoot down the words as they appear, by typing the answer before they hit the blocks. When all the blocks are smashed the game is over!' /
	'  Score extra points by shooting down the bonus words that fly horizontally across the screen. With each level progression, you will score more points,' / 
	' so try to protect your blocks as long as possible to achieve the highest scores!. You can choose between practising vocabulary or conjugation.' / 
	' For Vocabulary the text displayed will be in English, type in the German translation to shoot the word down. For conjugation practice, ' /
	'a verb will be displayed in the infinitive, type it in the corresponding conjugated form to shoot the words.'
)

