class EventsController < ApplicationController
  before_action :authenticate, only: [:create, :index, :update, :destroy, :upcoming, :events_by_user]
  def index
    @events = Event.all
    render json: @events.as_json, status: :ok
  end
  
  def create
    if current_user
      @event = current_user.events.build(event_params)
  
      if @event.save # This automatically triggers all model validations
        render json: @event.as_json, status: :ok
      else
        render json: { message: "Error creating event", errors: @event.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def update
    if current_user
      @event = current_user.events.find_by(id: params[:id])
      
      if @event
        if @event.update(event_params) # Validations are triggered automatically here
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

  def upcoming
    upcoming_events = Event.where("date >= ?", Date.today).order(:date)
    render json: { events: upcoming_events.map(&:as_json) }, status: :ok
  end

  def events_by_user
    if current_user
      @user = User.find_by(id: params[:user_id])
      if @user
        @events = @user.events
        render json: { events: @events.any? ? @events.map(&:as_json) : nil }, status: :ok
      else
        render json: { error: "User not found" }, status: :ok
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  private

  def event_params
    params.required(:event).permit(:label, :date, :description, :location, :participants, :startHour, :endHour, :groupLabel)
  end
end
