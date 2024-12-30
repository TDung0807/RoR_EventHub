class TransportsController < ApplicationController
    before_action :authenticate, only: [:create, :index, :update, :destroy]
  
    private
  
    def transport_params
      params.require(:transport).permit(:type, :brand, :price, :vendor_id)
    end
  
    public
  
    def create
      if current_user
        @transport = Transport.new(transport_params)
        if @transport.save
          render json: @transport.as_json, status: :created
        else
          render json: { message: "Creating error", errors: @transport.errors.full_messages }, status: :bad_request
        end
      else
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  
    def index
      if current_user
        render json: { transports: Transport.all.map(&:as_json) }, status: :ok
      else
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  
    def update
      if current_user
        @transport = Transport.find_by(id: params[:id])
        if @transport
          if @transport.update(transport_params)
            render json: { message: "Update successfully" }, status: :ok
          else
            render json: { message: "Update failed", errors: @transport.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { message: "Transport not found" }, status: :not_found
        end
      else
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  
    def destroy
      if current_user
        transport = Transport.find_by(id: params[:id])
        if transport
          if transport.destroy
            render json: { message: "Deleted successfully" }, status: :ok
          else
            render json: { message: "Deletion failed" }, status: :unprocessable_entity
          end
        else
          render json: { message: "Transport not found" }, status: :not_found
        end
      else
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  end
  