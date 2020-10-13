class Api::UsersController < ApplicationController
    def index
        if params[:search]
            @users = User.where("username LIKE :prefix", prefix: "#{params[:search]}%")
            render :index
        end
    end
    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            @channels = Channel.all.where(is_private: false)
            @channels.each do |channel|
                UserChannel.create(user_id: @user.id, channel_id: channel.id)
            end
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :password)
    end
end
