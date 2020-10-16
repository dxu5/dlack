class Api::MessagesController < ApplicationController
    def create
        @message = Message.new(message_params)
        @message.author_id = current_user.id
        if @message.save
            ActionCable
                .server #given
                .broadcast("channel-#{@message.channel_id}:messages",#channel identifier
                        message: {      #broadcast both message and user //////   add user reducer receive message
                            id: @message.id,
                            body: @message.body,
                            author_id: @message.author_id,
                            channel_id: @message.channel_id,
                            updated_at: @message.updated_at.strftime("%I:%M %p"),
                        },
                        user: {
                            id: current_user.id,
                            username: current_user.username
                        })
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def destroy
        @message = Message.find_by(id: params[:id])
        @message.destroy
        render json: ["destroyed"]
    end

    private
    def message_params
        params.require(:message).permit(:body, :author_id, :channel_id)
    end
end
