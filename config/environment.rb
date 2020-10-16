# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!




config.web_socket_server_url = "wss://dlack.herokuapp.com/cable" 
config.action_cable.allowed_request_origins = ['https://dlack.herokuapp.com', 'http://dlack.herokuapp.com']