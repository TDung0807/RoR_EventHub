class EventsController < ApplicationController
  before_action :authenticate, only: [:create, :index, :update, :destroy, :upcoming, :events_by_user]
  def index
    @events = Event.order(:date)
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
        @events = @user.events.order(:date) # Sort user events by date
        render json: { events: @events.as_json }, status: :ok
      else
        render json: { error: "User not found" }, status: :ok
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
  def add_quest
    quest = Quest.find_by(email: params[:email]) # Identify quest by email
    if quest.nil?
      render json: { error: "Quest not found" }, status: :not_found
      return
    end
    if @event.quests.include?(quest)
      render json: { message: "Quest is already added to the event" }, status: :unprocessable_entity
      return
    end
    
    @event.quests << quest
    if @event.save
      render json: { message: "Quest added successfully", event: @event }, status: :ok
    else
      render json: { error: "Failed to add quest", details: @event.errors.full_messages }, status: :unprocessable_entity
    end
  end
  def events_by_quest_email
    quest = Quest.find_by(email: params[:email])
    return render json: { error: "Quest not found" }, status: :not_found unless quest
  
    events = quest.events.order(:date)
    render json: { events: events.as_json }, status: :ok
  end
  private
  def event_params
    params.required(:event).permit(:label, :date, :description, :location, :participants, :startHour, :endHour, :groupLabel)
  end
end
