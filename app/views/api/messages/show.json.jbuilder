json.set! @message.id do
    json.extract! @message, :id, :author_id, :channel_id
end