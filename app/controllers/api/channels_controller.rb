class Api::ChannelsController < ApplicationController
    def create
        @channel = Channel.new(channel_params)
        # Will pass user_ids as a param (string) and will use that!
        # Channel title if dm will be a string with usernames
        debugger
        if @channel.is_dm
            
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
