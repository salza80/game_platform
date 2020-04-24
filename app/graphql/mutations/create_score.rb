module Mutations
  class CreateScore < GraphQL::Schema::Mutation

    null false
    payload_type String
    description "A mutation to add a new score"
    argument :gameCode, String, required: true
    argument :scoreCode, String, required: true
    argument :userName, String, required: true
    argument :score, Integer, required: true

    def resolve(game_code:, score_code:, user_name:, score:)
    	game = Game.find_by(game_code: game_code)
  	  Score.create(score_code: score_code, game: game, user_name: user_name, score: score)
  	  'OK'
    end
  end
 end
