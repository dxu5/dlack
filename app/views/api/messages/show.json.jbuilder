json.extract! @message, :id, :body, :author_id, :channel_id
json.updated_at @message.updated_at.strftime("%I:%M %p")