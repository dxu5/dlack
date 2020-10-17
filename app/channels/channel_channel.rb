class ChannelChannel < ApplicationCable::Channel 
  def subscribed
    stream_from "channel:messages"
  end

  def unsubscribed; end
end