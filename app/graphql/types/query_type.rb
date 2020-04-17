module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :game_one, [Types::GameOne], null: false, description: "A query to provide data for testing the first game"
    
    def game_one
      words = Array.new
      Noun.all.each do |noun|
        word = OpenStruct.new({ :question => noun.english, :answer => noun.word, :tip => noun.word })
        words.push(word)
      end
      words
    end
  end
end
