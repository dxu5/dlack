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