class Api::MessagesController < ApplicationController
    def create
        @message = Message.new(message_params)
        @message.author_id = current_user.id
        if @message.save
            render :show
        else
            render json: @message.errors.full_messages, status: 422
        end
    end
    private
    def message_params
        params.require(:message).permit(:body, :author_id, :channel_id)
    end
end
