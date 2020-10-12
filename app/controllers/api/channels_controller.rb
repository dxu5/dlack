class Api::ChannelsController < ApplicationController
    def create
    end
    def show
    end
    private
    def channel_params
        params.require(:channel).permit(:title, :is_private, :is_dm)
    end
end
