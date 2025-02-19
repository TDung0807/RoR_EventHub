class GroupsController < ApplicationController
    before_action :authenticate, only: [:create, :index, :show, :update, :destroy]
  
    private
    def group_params
      params.require(:group).permit(:group, :groupStatus, :transport_id, :quantity, :description, :hotel_remark, :transport_remark, :dish_remark, :hotel_id, :restaurant_id, dish_ids: [])
    end
  
    public
    def create
      unless current_user
        render json:{error:"Unauthorized"}, status: :unauthorized
      end
      @group = Group.new(group_params)
      if @group.save
        render json: @group.as_json, status: :ok
      else
        render json:{message:"Creating error", error:@group.errors.full_messages}, status: :bad_request
      end
    end
  
    def index
      groups = Group.includes(:restaurant, :transport, :hotel).all
      render json: { groups: groups.as_json(include: [:restaurant, :transport, :hotel]) }, status: :ok
    end
  
    def show
      @group = Group.includes(:restaurant, :transport, :hotel).find_by(id: params[:id])
      unless @group
        render json: { message: "Group not found" }, status: :not_found
        return
      end
      render json: { group: @group.as_json(include: [:restaurant, :transport, :hotel]) }, status: :ok
    end
  
    def update
      @group = Group.find_by(id: params[:id])
  
      unless @group
        render json: { message: "Group not found" }, status: :not_found
        return
      end
  
      if @group.update(group_params)
        if params[:quest_ids]
          @group.quests = Quest.find(params[:quest_ids])
        end
  
        render json: { message: "Updated successfully", group: @group.as_json }, status: :ok
      else
        render json: { message: "Update failed", errors: @group.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def destroy
      @group = Group.find_by(id: params[:id])
      unless current_user
        render json:{error:"Unauthorized"}, status: :unauthorized
      end
      unless @group
        render json:{message:"Group not found"}, status: :not_found
      end
  
      if @group.destroy
        render json: { message: "Deleted successfully" }, status: :ok
      else
        render json: { message: "Deletion failed" }, status: :unprocessable_entity
      end
    end
    def add_quests
      @group = Group.find(params[:group_id])
      quest_ids = params[:quest_ids]
    
      if quest_ids.blank?
        render json: { message: "No quests provided" }, status: :unprocessable_entity
        return
      end
    
      quests = Quest.find(quest_ids)
    
      if quests.empty?
        render json: { message: "No quests found" }, status: :not_found
      else
        @group.quests << quests
        update_quantity(@group)
        render json: { message: 'Quests added successfully', group: @group.as_json }, status: :ok
      end
    end
    
    def remove_quest
      @group = Group.find(params[:group_id])
      @quest = Quest.find(params[:quest_id])
    
      if @group.quests.include?(@quest)
        @group.quests.delete(@quest)
        update_quantity(@group)
        render json: { message: 'Quest removed successfully', group: @group.as_json }, status: :ok
      else
        render json: { message: 'Quest not found in this group' }, status: :not_found
      end
    end
    
  
    def quests
      @group = Group.find(params[:group_id])
      render json: { quests: @group.quests.as_json }, status: :ok
    end
    private

    def update_quantity(group)
      group.update(quantity: group.quests.count)
    end
  end
  
