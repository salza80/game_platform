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

LanguageLevel.create!(short_desc: 'A1')
LanguageLevel.create!(short_desc: 'A2')
LanguageLevel.create!(short_desc: 'B1')
LanguageLevel.create!(short_desc: 'B2')
LanguageLevel.create!(short_desc: 'C1')