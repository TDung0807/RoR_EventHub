class EventsController < ApplicationController
  before_action :authenticate, only: [:create, :index, :update, :destroy, :upcoming, :events_by_user]

  def create
    if current_user
      @event = current_user.events.build(event_params)
      calculate_duration(@event)
      
      if @event.save
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
        if @event.update(event_params)
          calculate_duration(@event)
          
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
        render json: { events: @events.map(&:as_json) }, status: :ok
      else
        render json: { error: "User not found" }, status: :not_found
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  private

  def event_params
    params.required(:event).permit(:label, :date, :description, :location, :participants, :startHour, :endHour, :groupLabel)
  end

  def calculate_duration(event)
    if event.startHour.present? && event.endHour.present?
      start_time = event.startHour
      end_time = event.endHour
      duration = ((end_time - start_time) / 1.hour).round(2) 
      event.duration = duration
    end
  end
end
