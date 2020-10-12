json.channels do
    user.channels.each do |channel|
        json.set! channel.id do
            json.extract! channel, :id, :title, :is_private, :is_dm
        end
    end
end