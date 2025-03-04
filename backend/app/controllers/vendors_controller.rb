class VendorsController < ApplicationController
    before_action :authenticate, only: [:create, :index, :update, :destroy]
    validates :name, presence: true, allow_blank: false
    validates :contact, presence: true, allow_blank: false, format: { with: /\A\d{10,15}\z/, message: "must be a valid phone number" }
    validates :distance_limit, presence: true, numericality: { greater_than_or_equal_to: 0 }
    validates :time_limit, presence: true, numericality: { greater_than_or_equal_to: 0 }
    validates :service, presence: true, allow_blank: false
    private
  
    def vendor_params
      params.require(:vendor).permit(:name, :contact, :distance_limit, :time_limit, :service)
    end
  
    public
  
    def create
      if current_user
        @vendor = Vendor.new(vendor_params)
        if @vendor.save
          render json: @vendor.as_json, status: :created
        else
          render json: { message: "Creating error", errors: @vendor.errors.full_messages }, status: :bad_request
        end
      else
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  
    def index
      if current_user
        render json: { vendors: Vendor.all.map(&:as_json) }, status: :ok
      else
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  
    def update
      if current_user
        @vendor = Vendor.find_by(id: params[:id])
        if @vendor
          if @vendor.update(vendor_params)
            render json: { message: "Update successfully" }, status: :ok
          else
            render json: { message: "Update failed", errors: @vendor.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { message: "Vendor not found" }, status: :not_found
        end
      else
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  
    def destroy
      if current_user
        vendor = Vendor.find_by(id: params[:id])
        if vendor
          if vendor.destroy
            render json: { message: "Deleted successfully" }, status: :ok
          else
            render json: { message: "Deletion failed" }, status: :unprocessable_entity
          end
        else
          render json: { message: "Vendor not found" }, status: :not_found
        end
      else
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  end
  