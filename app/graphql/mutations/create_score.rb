module Mutations
  class CreateScore < GraphQL::Schema::Mutation

    null false
    payload_type String
    description "A mutation to add a new score"
    argument :gameCode, String, required: true
    argument :gameOptions, [Types::GameOptionInputType], required: true
    argument :score, Integer, required: true

    def resolve(game_code:, game_options:, score:)
      user = context[:current_user]
      options = {}
      game_options.each do | option |
        options[option.code] = option.value
      end


      raise Errors::ValidationError.new  "Not logged in" if !user

    	game = Game.find_by(game_code: game_code)
  	  Score.create!(game_options: options, game: game, user: user, score: score)
  	  'OK'
    end
  end
 end
