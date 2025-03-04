class RoomsController < ApplicationController
  skip_before_action :authenticate, only: [:index, :show]

  private

  def room_params
    params.require(:room).permit(:name, :price, :remark, :room_type)
  end

  public

  def create
    @hotel = Hotel.find_by(id: params[:hotel_id])
    if @hotel
      @room = @hotel.rooms.new(room_params) # Create room under the specific hotel

      if @room.save
        render json: { message: 'Room created successfully', room: @room.as_json }, status: :created
      else
        render json: { message: 'Failed to create room', errors: @room.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { message: 'Hotel not found' }, status: :not_found
    end
  end

  def index
    @hotel = Hotel.find_by(id: params[:hotel_id])
    if @hotel
      rooms = @hotel.rooms
      render json: { rooms: rooms.as_json }, status: :ok
    else
      render json: { message: 'Hotel not found' }, status: :not_found
    end
  end

  def show
    @room = Room.find_by(id: params[:id])
    if @room
      render json: { room: @room.as_json }, status: :ok
    else
      render json: { message: 'Room not found' }, status: :not_found
    end
  end

  def update
    @room = Room.find_by(id: params[:id])
    if @room
      if @room.update(room_params)
        render json: { message: 'Room updated successfully', room: @room.as_json }, status: :ok
      else
        render json: { message: 'Failed to update room', errors: @room.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { message: 'Room not found' }, status: :not_found
    end
  end

  def destroy
    @room = Room.find_by(id: params[:id])
    if @room
      if @room.destroy
        render json: { message: 'Room deleted successfully' }, status: :ok
      else
        render json: { message: 'Failed to delete room' }, status: :unprocessable_entity
      end
    else
      render json: { message: 'Room not found' }, status: :not_found
    end
  end
end
