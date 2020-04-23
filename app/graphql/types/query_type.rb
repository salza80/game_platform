module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :falling_text_game, Types::FallingTextGame, null: false do
      description "A query to provide data for testing the falling text game"
      argument :topicId, String, required: true
      argument :levelId, String, required: true
    end
    
    def falling_text_game(topic_id:, level_id:)
      words = Array.new
      Noun.joins(:language_level).where("short_desc = ?", level_id).each do |noun|
        word = OpenStruct.new({ :question => noun.english, :answer => noun.word, :tip => noun.word })
        words.push(word)
      end
      game = Game.find_by(game_code: 'falling_text')
      OpenStruct.new({
        :game_code => game.game_code,
        :score_code => topic_id + '_' + level_id,
        :words => words
      })
    end
  end
end
