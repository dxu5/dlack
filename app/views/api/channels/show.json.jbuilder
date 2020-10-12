json.channel do
    json.extract! @channel, :id, :title, :is_dm, :is_private
end


json.users do
    @channel.users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :username
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