class EventsController < ApplicationController
  before_action :authenticate, only: [:create, :index, :update, :destroy, :upcoming, :events_by_user]
  before_action :set_event, only: [:update, :destroy, :add_quest]

  def index
    @events = Event.order(:date)
    render json: @events.as_json, status: :ok
  end

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

  def update
    if @event
      if @event.update(event_params)
        render json: @event.as_json, status: :ok
      else
        render json: { message: "Error updating event", errors: @event.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Event not found or not authorized to update" }, status: :not_found
    end
  end

  def destroy
    if @event.destroy
      render json: { message: "Event deleted successfully" }, status: :ok
    else
      render json: { message: "Error deleting event" }, status: :unprocessable_entity
    end
  end

  def upcoming
    upcoming_events = Event.where("date >= ?", Date.today).order(:date)
    render json: { events: upcoming_events.as_json }, status: :ok
  end

  def events_by_user
    if current_user
      @user = User.find_by(id: params[:user_id])
      if @user
        @events = @user.events.order(:date)
        render json: { events: @events.as_json }, status: :ok
      else
        render json: { error: "User not found" }, status: :not_found
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def add_quest
    return render json: { error: "Event not found" }, status: :not_found unless @event

    quest = Quest.find_by(email: params[:email])
    return render json: { error: "Quest not found" }, status: :not_found unless quest

    if @event.quests.include?(quest)
      render json: { message: "Quest is already added to the event" }, status: :unprocessable_entity
    else
      @event.quests << quest
      if @event.save
        render json: { message: "Quest added successfully", event: @event }, status: :ok
      else
        render json: { error: "Failed to add quest", details: @event.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  def events_by_quest_email
    quest = Quest.find_by(email: params[:email])
    return render json: { error: "Quest not found" }, status: :not_found unless quest

    events = quest.events.order(:date)
    render json: { events: events.as_json }, status: :ok
  end

  # New: Fetch all events for a given group
  def events_by_group
    group = Group.find_by(id: params[:group_id])
    return render json: { error: "Group not found" }, status: :not_found unless group

    events = group.events.order(:date)
    render json: { events: events.as_json }, status: :ok
  end

  private

  def event_params
    params.required(:event).permit(:label, :date, :description, :location, :participants, :start_hour, :end_hour, :group_id)
  end

  def set_event
    @event = Event.find_by(id: params[:id])
    render json: { error: "Event not found" }, status: :not_found unless @event
  end
  
end
