class Api::ChannelsController < ApplicationController
    def create
        @channel = Channel.new(channel_params)
        # Will pass user_ids as a param ("user_ids") and will use that!
        # Channel title if dm will be a string with usernames
        if params["channel"]["user_ids"]
            possibleUsers = params["channel"]["user_ids"].split(",").map {|num| num.to_i}
        end
        #title of dm channels is done (includes all parties username in the title)
        if @channel.is_dm
            users = []
            possibleUsers.each do |id|
                users.push(User.find_by(id: id).username)
            end
            @channel.title = users.join(", ")
        end

        @channel.owner_id = current_user.id

        if @channel.save
            #this will create the userChannels necessary for this channel and its users
            #if it is not private, will create permissions here for all users?
            if @channel.is_private
                possibleUsers.each do |userId|
                    UserChannel.create(user_id: userId, channel_id: @channel.id)
                end
            else
                @users = User.all
                @users.each do |user|
                    UserChannel.create(user_id: user.id, channel_id: @channel.id)
                end
            end
            #Need to render show json jbuilder here
            channelUsers = @channel.users.ids
            ActionCable
                .server #given
                .broadcast("channel:messages",#channel identifier
                        channel: {      #broadcast both message and user //////   add user reducer receive message
                            id: @channel.id,
                            title: @channel.title,
                            is_dm: @channel.is_dm,
                            is_private: @channel.is_private,
                            owner_id: @channel.owner_id
                        },
                        id: {
                            channelUsers: channelUsers
                        }
                    )
        else
            render json: @channel.errors.full_messages, status: 422
        end
    end

    def update
        @channel = Channel.find_by(id: params[:id])
        @userChannels = @channel.user_channels
        if params["channel"]["user_ids"]
            possibleUsers = params["channel"]["user_ids"].split(",").map {|num| num.to_i}
        end
        if @channel.update(channel_params)   
            if params["channel"]["user_ids"]
                @userChannels.each do |user_channel|
                    if possibleUsers.include?(user_channel.user_id) == false
                        user_channel.destroy
                    end
                end
                userids = []
                @userChannels.each do |user_channel|
                    userids.push(user_channel.user_id)
                end
                possibleUsers.each do |user_id|
                    if !userids.include?(user_id)
                        UserChannel.create(user_id: user_id, channel_id: @channel.id)
                    end
                end
                @channel = Channel.find_by(id: params[:id])
            end
            #Might need to include userChannels or users are in it so if current user not in it -> dispatch the delete with the id 
            #if new person or otherwise dont care and just dispatch the update action
            userIds = @channel.users.ids
            ActionCable
                .server #given
                .broadcast("channel:messages",#channel identifier
                        payload: (ApplicationController.renderer.render 'api/channels/channel_show.json.jbuilder', assigns:{channel: @channel}),
                        update: true,
                        userIds: userIds
                    )
            
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

    def destroy
        @channel = Channel.find_by(id: params[:id])
        @channel.destroy
        ActionCable
                .server #given
                .broadcast("channel:messages",#channel identifier
                        channel: {      #broadcast both message and user //////   add user reducer receive message
                            id: @channel.id,
                            delete: true
                        }

                    )
    end

    private
    def channel_params
        params.require(:channel).permit(:title, :is_private, :is_dm)
    end
end
