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
      restaurants = Restaurant.all.map do |restaurant|
        restaurant_data(restaurant)
      end
      render json: { restaurants: restaurants }, status: :ok
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def show
    if current_user
      restaurant = Restaurant.find_by(id: params[:id])
      if restaurant
        render json: restaurant_data(restaurant), status: :ok
      else
        render json: { message: "Restaurant not found" }, status: :not_found
      end
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

  def restaurant_data(restaurant)
    dishes = restaurant.dishes
    dish_total = dishes.count

    main_ingredient = dishes.joins(:ingredients)
                            .group('ingredients.name')
                            .order('COUNT(ingredients.id) DESC')
                            .limit(1)
                            .pluck('ingredients.name')
                            .first

    restaurant.as_json.merge({
      dish_total: dish_total,
      main_ingredient: main_ingredient
    })
  end
end
