json.channel do
    #wrap in id
    json.extract! @channel, :id, :title, :is_dm, :is_private, :owner_id
end


json.users do
    @channel.users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :username
        end
    end
    @channel.messages.includes(:author).each do |message|
        json.set! message.author.id do
            json.extract! message.author, :id, :username
        end
    end
end

json.userChannels do 
    @channel.user_channels.each do |user_channel|
        json.set! user_channel.id do
            json.extract! user_channel, :id, :user_id, :channel_id
        end
    end
end

json.messages do 
    @channel.messages.each do |message|
        json.set! message.id do
            json.extract! message, :id, :body, :author_id, :channel_id 
            json.updated_at message.updated_at.strftime("%I:%M %p")
            if message.updated_at != message.created_at
                json.update true
            else
                json.update false
            end
        end
    end
end