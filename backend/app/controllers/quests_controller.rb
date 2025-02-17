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

  # ✅ Find Quest by Name
  def find_by_name
    @quest = Quest.find_by(name: params[:name])

    if @quest
      render json: { quest: @quest.as_json }, status: :ok
    else
      render json: { message: "Quest not found with this name" }, status: :not_found
    end
  end

  # ✅ Find Quest by Email
  def find_by_email
    @quest = Quest.find_by(email: params[:email])

    if @quest
      render json: { quest: @quest.as_json }, status: :ok
    else
      render json: { message: "Quest not found with this email" }, status: :not_found
    end
  end
end
