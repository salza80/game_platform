require 'test_helper'

class Api::GameOneControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_game_one_index_url
    assert_response :success
  end

end
