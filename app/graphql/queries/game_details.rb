module Queries
  class GameDetails < GraphQL::Schema::Resolver

    type Types::GameType, null: false 
    description "A query to get game details"
    argument :gameCode, String, required: true
    
    def resolve(game_code:)
      game = Game.find_by(game_code: game_code)
      
      OpenStruct.new({
        game_code: game.game_code,
        game_title: game.game_title,
        game_short_desc: game.game_short_desc,
        game_desc: game.game_desc
      })
    end
  end
end
