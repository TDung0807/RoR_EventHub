class QuestsController < ApplicationController
  # Skipping authentication for all actions
  skip_before_action :authenticate, only: [:create, :index, :show, :update, :destroy, :find_by_name, :find_by_email]

  private

  def quest_params
    params.require(:quest).permit(:email, :phone, :name, group_ids: [])
  end

  public

  def create
    @quest = Quest.find_by(email: quest_params[:email])

    if @quest
      if params[:group_ids]
        @quest.groups = Group.find(params[:group_ids])
      end
      if @quest.update(quest_params)
        # Send email notification if the quest is added to a group
        NotifierMailer.group_assignment_notification(@quest).deliver_later
        render json: { message: "Quest updated successfully", quest: @quest.as_json }, status: :ok
      else
        render json: { message: "Update failed", errors: @quest.errors.full_messages }, status: :unprocessable_entity
      end
    else
      @quest = Quest.new(quest_params)
      if @quest.save
        if params[:group_ids]
          @quest.groups = Group.find(params[:group_ids])
        end
        # Send email notification if the quest is added to a group
        NotifierMailer.group_assignment_notification(@quest).deliver_later
        render json: @quest.as_json, status: :ok
      else
        render json: { message: "Creation error", error: @quest.errors.full_messages }, status: :bad_request
      end
    end
  end

  def index
    quests = Quest.all
    render json: { quests: quests.as_json }, status: :ok
  end

  def show
    @quest = Quest.find_by(id: params[:id])

    unless @quest
      render json: { message: "Quest not found" }, status: :not_found
    else
      render json: { quest: @quest.as_json }, status: :ok
    end
  end

  def update
    @quest = Quest.find_by(id: params[:id])

    unless @quest
      render json: { message: "Quest not found" }, status: :not_found
      return
    end

    if @quest.update(quest_params)
      if params[:group_ids]
        @quest.groups = Group.find(params[:group_ids])
      end
      # Send email notification if the quest is added to a group
      NotifierMailer.group_assignment_notification(@quest).deliver_later
      render json: { message: "Updated successfully", quest: @quest.as_json }, status: :ok
    else
      render json: { message: "Update failed", errors: @quest.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @quest = Quest.find_by(id: params[:id])

    unless @quest
      render json: { message: "Quest not found" }, status: :not_found
      return
    end

    if @quest.destroy
      render json: { message: "Deleted successfully" }, status: :ok
    else
      render json: { message: "Deletion failed" }, status: :unprocessable_entity
    end
  end

  def groups
    @quest = Quest.find(params[:quest_id])
    render json: { groups: @quest.groups.as_json }, status: :ok
  end

  def find_by_name
    @quest = Quest.find_by(name: params[:name])

    render json: { quest: @quest ? @quest.as_json : nil }, status: :ok
  end

  def find_by_email
    Rails.logger.info "Looking for quest with email: #{params[:email]}"
    @quest = Quest.find_by(email: params[:email])
    render json:  { quest: @quest ? @quest.as_json : nil }, status: :ok
  end

  def events_by_quest
    @quest = Quest.find_by(email: params[:email])
    return render json: { message: "Quest not found" }, status: :not_found unless @quest

    events = Event.where(id: @quest.groups.joins(:events).pluck(:event_id).compact.uniq).order(:date)
    event_data = events.map do |event|
      event_json = event.as_json
      groups_with_details = event.groups.map do |group|
        {
          group: group.as_json,
          restaurant: group.restaurant ? group.restaurant.as_json : nil,
          hotel: group.hotel ? group.hotel.as_json : nil,
          transport: group.transport ? group.transport.as_json : nil
        }
      end
      event_json.merge!(groups: groups_with_details)
      event_json
    end

    render json: { events: event_data }, status: :ok
  end
end
