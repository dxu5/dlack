json.currentUser do
    json.extract! user, :id, :username
    if user.profile_picture.attached?
        json.profile_picture url_for(user.profile_picture)
    end
end
json.channels do 
    user.channels.each do |channel|
        json.set! channel.id do
            json.extract! channel, :id, :title, :is_private, :is_dm, :owner_id
        end
    end
end
if user.notifications.length > 0 
    json.notifications do
        user.notifications.each do |notification|
            json.set! notification.id do
                json.extract! notification, :id, :user_id, :channel_id, :read
            end
        end
    end
end
