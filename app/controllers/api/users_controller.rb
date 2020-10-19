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

    def update
        @user = User.find_by(id: params[:id])
        old_username = @user.username
        if @user.update(user_params)
            @dms = @user.channels.where(is_dm: true)
            @dms.each do |dm|
                old_title = dm.title.split(", ")
                new_title = old_title.map { |x| x == old_username ? @user.username : x }.join(", ")
                dm.title = new_title
                dm.save!
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
