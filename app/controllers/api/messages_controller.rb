class Api::MessagesController < ApplicationController
    private
    def message_params
        params.require(:message).permit(:body, :author_id, :channel_id)
    end
end
