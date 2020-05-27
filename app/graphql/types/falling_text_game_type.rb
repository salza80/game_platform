module Types
  class FallingTextWordsType < Types::BaseObject
    field :question, String, null: false
    field :answer, String, null: false
    field :tip, String, null: false
    field :voice, String, null: false
  end
  
	class FallingTextGameType < Types::BaseObject
    field :words, [Types::FallingTextWordsType], null: false
  end
end