class MessageChannel < ApplicationCable::Channel 
  def subscribed
    stream_from "channel-#{params["channel_id"]}:messages"
  end

  def unsubscribed; end
end
