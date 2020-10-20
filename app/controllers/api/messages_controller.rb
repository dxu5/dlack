class Api::MessagesController < ApplicationController
    def create
        @message = Message.new(message_params)
        @message.author_id = current_user.id
        if @message.save
            channel = @message.channel
            users = channel.users
            notifications = []
            users.each do |user|
                if user.id == current_user.id  
                    notifications.push(Notification.create!(user_id: user.id, channel_id: channel.id, read: true))
                else
                    notifications.push(Notification.create!(user_id: user.id, channel_id: channel.id, read: false))
                end
            end
            if current_user.profile_picture.attached? == false
                user = {
                    id: current_user.id,
                    username: current_user.username,
                }
            else
                user = {
                    id: current_user.id,
                    username: current_user.username,
                    profile_picture: url_for(current_user.profile_picture)
                }
            end
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
                        user: user,
                        notifications: notifications
                    )
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def destroy
        @message = Message.find_by(id: params[:id])
        @message.destroy
        ActionCable
                .server #given
                .broadcast("channel-#{@message.channel_id}:messages",#channel identifier
                        message: {      #broadcast both message and user //////   add user reducer receive message
                            id: @message.id,
                        })
        # render json: ["destroyed"]
    end

    def update
        @message = Message.find_by(id: params[:id])
        if @message.update(message_params)
            ActionCable
                .server #given
                .broadcast("channel-#{@message.channel_id}:messages",#channel identifier
                        message: {      #broadcast both message and user //////   add user reducer receive message
                            id: @message.id,
                            body: @message.body,
                            author_id: @message.author_id,
                            channel_id: @message.channel_id,
                            updated_at: @message.updated_at.strftime("%I:%M %p"),
                            update: true
                        },
                        user: {
                            id: current_user.id,
                            username: current_user.username
                        })
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    private
    def message_params
        params.require(:message).permit(:body, :author_id, :channel_id)
    end
end
