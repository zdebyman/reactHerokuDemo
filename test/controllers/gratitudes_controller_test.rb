require "test_helper"

class GratitudesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @gratitude = gratitudes(:one)
  end

  test "should get index" do
    get gratitudes_url, as: :json
    assert_response :success
  end

  test "should create gratitude" do
    assert_difference("Gratitude.count") do
      post gratitudes_url, params: { gratitude: { answer1: @gratitude.answer1, answer2: @gratitude.answer2, answer3: @gratitude.answer3, prompt1: @gratitude.prompt1, prompt2: @gratitude.prompt2, prompt3: @gratitude.prompt3, title: @gratitude.title } }, as: :json
    end

    assert_response :created
  end

  test "should show gratitude" do
    get gratitude_url(@gratitude), as: :json
    assert_response :success
  end

  test "should update gratitude" do
    patch gratitude_url(@gratitude), params: { gratitude: { answer1: @gratitude.answer1, answer2: @gratitude.answer2, answer3: @gratitude.answer3, prompt1: @gratitude.prompt1, prompt2: @gratitude.prompt2, prompt3: @gratitude.prompt3, title: @gratitude.title } }, as: :json
    assert_response :success
  end

  test "should destroy gratitude" do
    assert_difference("Gratitude.count", -1) do
      delete gratitude_url(@gratitude), as: :json
    end

    assert_response :no_content
  end
end
