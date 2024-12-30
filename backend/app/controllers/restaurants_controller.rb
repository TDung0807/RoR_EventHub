class RestaurantsController < ApplicationController
  before_action :authenticate, only: [:create, :index, :update, :destroy]

  def create
    if current_user
      @restaurant = Restaurant.new(restaurant_params)
      if @restaurant.save
        render json: @restaurant.as_json, status: :created
      else
        render json: { message: "Creating error", errors: @restaurant.errors.full_messages }, status: :bad_request
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def index
    if current_user
      render json: { restaurants: Restaurant.all.map(&:as_json) }, status: :ok
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def update
    if current_user
      @restaurant = Restaurant.find_by(id: params[:id])
      if @restaurant
        if @restaurant.update(restaurant_params)
          render json: { message: "Update successfully" }, status: :ok
        else
          render json: { message: "Update failed", errors: @restaurant.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { message: "Restaurant not found" }, status: :not_found
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def destroy
    if current_user
      restaurant = Restaurant.find_by(id: params[:id])
      if restaurant
        if restaurant.destroy
          render json: { message: "Deleted successfully" }, status: :ok
        else
          render json: { message: "Deletion failed" }, status: :unprocessable_entity
        end
      else
        render json: { message: "Restaurant not found" }, status: :not_found
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  private
  def restaurant_params
    params.require(:restaurant).permit(:name, :address, :contact, :cuisine)
  end
end
