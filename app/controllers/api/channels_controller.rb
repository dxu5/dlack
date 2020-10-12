class Api::ChannelsController < ApplicationController
    def create
        @channel = Channel.new(channel_params)
        # Will pass user_ids as a param ("user_ids") and will use that!
        # Channel title if dm will be a string with usernames
        
        possibleUsers = params["user_ids"].split(",").map {|num| num.to_i}
        #title of dm channels is done
        if @channel.is_dm
            users = []
            possibleUsers.each do |id|
                if id != current_user.id
                    users.push(User.find_by(id: id).username)
                end
            end
            @channel.title = users.join(", ")
        end

        if @channel.save
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
