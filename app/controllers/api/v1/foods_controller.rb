class Api::V1::FoodsController < ApplicationController

  def index
    foods = Food.order(updated_at: :desc)
    render json: foods
  end

  def show
    food = Food.find(params[:id])
    render json: food
  end

  def create
    food = Food.new(food_params)
    if food.save
      render json: food
    else
      render json: food.errors, status: 422
    end
  end

  def update
    food = Food.find(params[:id])
    if food.update(food_params)
      render json: food
    else
      render json: food.errors, status: 422
    end
  end

  def destroy
    if Food.destroy(params[:id])
      head :no_content
    else 
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  def destroy_all
    if Food.destroy_all
      head :no_content
    else
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  private

  def food_params
    params.require(:food).permit(:content, :complete)
  end

end