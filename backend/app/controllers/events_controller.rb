class EventsController < ApplicationController
  before_action :authenticate, only: [:create, :index, :update, :destroy]
  def create
    if current_user
      @event = current_user.events.build(event_params) 
      if @event.save
        render json: @event.as_json, status: :ok
      else
        render json: { message: "Error creating event", errors: @event.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def index
    render json: { events: Event.all.map(&:as_json) }
  end
  
  def update
    if current_user
      @event = current_user.events.find_by(id: params[:id])
      if @event
        if @event.update(event_params)
          render json: @event.as_json, status: :ok
        else
          render json: { message: "Error updating event", errors: @event.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: "Event not found or not authorized to update" }, status: :not_found
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def destroy
    if current_user
      @event = Event.find(params[:id])
      if @event.destroy
        render json: { message: "Event deleted successfully" }, status: :ok
      else
        render json: { message: "Error deleting event" }, status: :unprocessable_entity
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
  
  private
  def event_params
    params.required(:event).permit(:label, :date, :description, :duration,:location, :participants, :startHour,:endHour,:groupLabel)
  end
end
