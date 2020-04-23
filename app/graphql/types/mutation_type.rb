module Types
  class MutationType < Types::BaseObject
    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end


    field :create_score, String, null: false do
      description "A mutation to add a new score"
      argument :gameCode, String, required: true
      argument :scoreCode, String, required: true
      argument :userName, String, required: true
      argument :score, Integer, required: true
    end

    def create_score(game_code:, score_code:, user_name:, score:)
    	game = Game.find_by(game_code: game_code)
 	    Score.create(score_code: score_code, game: game, user_name: user_name, score: score)
 	    'OK'
    end


  end
end
