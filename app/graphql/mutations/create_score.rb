module Mutations
  class CreateScore < GraphQL::Schema::Mutation

    null false
    payload_type String
    description "A mutation to add a new score"
    argument :gameCode, String, required: true
    argument :scoreCode, String, required: true
    argument :score, Integer, required: true

    def resolve(game_code:, score_code:, score:)
      user = context[:current_user]

      raise Errors::ValidationError.new  "Not logged in" if !user

    	game = Game.find_by(game_code: game_code)
  	  Score.create(score_code: score_code, game: game, user: user, score: score)
  	  'OK'
    end
  end
 end
