class IngredientsController < ApplicationController
  before_action :authenticate, only: [:create, :index, :show, :update, :destroy, :get_by_name]
  validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 100 }, allow_blank: false
  def create
    if current_user
      @ingredient = Ingredient.new(ingredient_params)
      if @ingredient.save
        render json: @ingredient.as_json, status: :created
      else
        render json: { message: "Error creating ingredient", errors: @ingredient.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def index
    render json: { ingredients: Ingredient.all.map(&:as_json) }, status: :ok
  end

  def show
    @ingredient = Ingredient.find(params[:id])
    render json: @ingredient.as_json, status: :ok
  end

  def update
    if current_user
      @ingredient = Ingredient.find(params[:id])
      if @ingredient.update(ingredient_params)
        render json: @ingredient.as_json, status: :ok
      else
        render json: { message: "Error updating ingredient", errors: @ingredient.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def destroy
    if current_user
      @ingredient = Ingredient.find(params[:id])
      if @ingredient.destroy
        render json: { message: "Ingredient deleted successfully" }, status: :ok
      else
        render json: { message: "Error deleting ingredient" }, status: :unprocessable_entity
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
  def get_by_name
    @ingredient = Ingredient.find_by("LOWER(name) = ?", params[:name].downcase)
    render json: { ingredient: @ingredient ? @ingredient.as_json : nil }, status: :ok
  end
  private

  def ingredient_params
    params.require(:ingredient).permit(:name)
  end
end
