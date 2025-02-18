class DishesController < ApplicationController
  before_action :authenticate, only: [:create, :index, :show, :update, :destroy]

  def create
    if current_user
      @restaurant = Restaurant.find(params[:restaurant_id])
      @dish = @restaurant.dishes.build(dish_params)
      if @dish.save
        render json: @dish.as_json, status: :created
      else
        render json: { message: "Error creating dish", errors: @dish.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def index
    @restaurant = Restaurant.find(params[:restaurant_id])
    render json: { dishes: @restaurant.dishes.map(&:as_json) }, status: :ok
  end

  def show
    @dish = Dish.find(params[:id])
    render json: @dish.as_json, status: :ok
  end

  def update
    if current_user
      @dish = Dish.find(params[:id])
      if @dish.update(dish_params)
        render json: @dish.as_json, status: :ok
      else
        render json: { message: "Error updating dish", errors: @dish.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def destroy
    if current_user
      @dish = Dish.find(params[:id])
      if @dish.destroy
        render json: { message: "Dish deleted successfully" }, status: :ok
      else
        render json: { message: "Error deleting dish" }, status: :unprocessable_entity
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
  def add_ingredients
    if current_user
      @dish = Dish.find(params[:id])
  
      if params[:ingredient_ids]
        ingredients = Ingredient.find(params[:ingredient_ids])
        @dish.ingredients << ingredients
        render json: { message: "Ingredients added successfully", dish: @dish.as_json(include: :ingredients) }, status: :ok
      else
        render json: { message: "No ingredient IDs provided" }, status: :bad_request
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
  
  private

  def dish_params
    params.require(:dish).permit(:name, :price, :description, :dish_type, :restaurant_id, ingredient_ids: [])
  end
end
