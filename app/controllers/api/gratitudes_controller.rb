class Api::GratitudesController < ApplicationController
  before_action :set_gratitude, only: %i[ show update destroy ]

  def index
    @gratitudes = Gratitude.order(created_at: :desc)

    gratitudes_with_images = @gratitudes.map do |gratitude|
      if gratitude.image.attached?
        gratitude.as_json.merge(image_url: url_for(gratitude.image))
      else
        gratitude.as_json.merge(image_url: nil)
      end
    end

    render json: gratitudes_with_images
  end

  def show
    if @gratitude.image.attached?
      render json: @gratitude.as_json.merge(image_url: url_for(@gratitude.image))
    else
      render json: @gratitude.as_json.merge(image_url: nil)
    end
  end

  def create
    @gratitude = Gratitude.new(gratitude_params)

    if @gratitude.save
      render json: @gratitude, status: :created, location: api_gratitude_url(@gratitude)
    else
      render json: @gratitude.errors, status: :unprocessable_entity
    end
  end

  def update
    if @gratitude.update(gratitude_params)
      render json: @gratitude
    else
      render json: @gratitude.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @gratitude.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_gratitude
      @gratitude = Gratitude.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def gratitude_params
      params.require(:gratitude).permit(:title, :prompt1, :answer1, :prompt2, :answer2, :prompt3, :answer3, :image)
    end
end
