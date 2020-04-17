class Api::GameOneController < ApplicationController
  def index
  	@words = Noun.all
  end
end
