class Api::ChannelsController < ApplicationController
    def create
        @channel = Channel.new(channel_params)
        # Will pass user_ids as a param ("user_ids") and will use that!
        # Channel title if dm will be a string with usernames
        
        possibleUsers = params["user_ids"].split(",").map {|num| num.to_i}
        #title of dm channels is done (includes all parties username in the title)
        if @channel.is_dm
            users = []
            possibleUsers.each do |id|
                users.push(User.find_by(id: id).username)
            end
            @channel.title = users.join(", ")
        end

        if @channel.save
            #this will create the userChannels necessary for this channel and its users
            #if it is not private, will create permissions here for all users?
            if @channel.is_private
                possibleUsers.each do |userId|
                    UserChannel.create(user_id: userId, channel_id: @channel.id)
                end
            else
                @users = User.all
                @user.each do |user|
                    UserChannel.create(user_id: user.id, channel_id: @channel.id)
                end
            end
            debugger
        else
            render json: @channel.errors.full_messages, status: 422
        end
    end
    def show
        @channel = Channel.find_by(id: params[:id])
        if @channel
            render :show #need to create this json jbuilder file!
        else
            render json: ["Channel Not Found"], status: 404
        end
    end
    private
    def channel_params
        params.require(:channel).permit(:title, :is_private, :is_dm)
    end
end
