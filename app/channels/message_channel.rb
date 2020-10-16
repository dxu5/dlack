class MessageChannel < ApplicationCable::Channel 
  def subscribed
    # stream_from "messages_channel"
    stream_from "channel-#{params["channel_id"]}:messages" #identifier
  end

  def unsubscribed; end
end
