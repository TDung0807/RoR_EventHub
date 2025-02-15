class HotelsController < ApplicationController
  before_action :authenticate, only: [:create, :index, :update, :destroy]

  private
  def hotel_params
    params.require(:hotel).permit(:name, :address, :rating, :star, :checkout_time, :checkin_time, :distance, :contact)
  end

  public
  def create
    if current_user
      @hotel = Hotel.new(hotel_params)
      if @hotel.save
        render json: @hotel.as_json, status: :created
      else
        render json: { message: "Creating error", errors: @hotel.errors.full_messages }, status: :bad_request
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def index
    if current_user
      render json: { hotels: Hotel.all.map(&:as_json) }, status: :ok
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def update
    if current_user
      @hotel = Hotel.find_by(id: params[:id])
      if @hotel
        if @hotel.update(hotel_params)
          render json: { message: "Update successfully" }, status: :ok
        else
          render json: { message: "Update failed", errors: @hotel.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { message: "Hotel not found" }, status: :not_found
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def destroy
    if current_user
      hotel = Hotel.find_by(id: params[:id])
      if hotel
        if hotel.destroy
          render json: { message: "Deleted successfully" }, status: :ok
        else
          render json: { message: "Deletion failed" }, status: :unprocessable_entity
        end
      else
        render json: { message: "Hotel not found" }, status: :not_found
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
