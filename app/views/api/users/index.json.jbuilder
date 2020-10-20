@users.each do |user|
    json.set! user.id do
        json.extract! user, :id, :username
        if user.profile_picture.attached?
            json.profile_picture url_for(user.profile_picture)
        end
    end
end