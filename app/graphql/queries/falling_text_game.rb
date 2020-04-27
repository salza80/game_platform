module Queries
  class FallingTextGame < GraphQL::Schema::Resolver

    type Types::FallingTextGame, null: false 
    description "A query to provide data for testing the falling text game"
    argument :topicCode, String, required: true
    argument :levelCode, String, required: true
    
    def resolve(topic_code:, level_code:)
      words = Array.new
      Noun.joins(:language_level).where("level_code = ?", level_code).each do |noun|
        word = OpenStruct.new({ :question => noun.english, :answer => noun.word, :tip => noun.word })
        words.push(word)
      end
      game = Game.find_by(game_code: 'falling_text')
      OpenStruct.new({
        :game_code => game.game_code,
        :score_code => topic_code + '_' + level_code,
        :game_title => game.game_title,
        :game_short_desc => game.game_short_desc,
        :game_desc => game.game_desc,
        :words => words
      })
    end
  end
end
