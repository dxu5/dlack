# == Schema Information
#
# Table name: channels
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  is_private :boolean          not null
#  is_dm      :boolean          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'test_helper'

class ChannelTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
