# == Schema Information
#
# Table name: user_channels
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  channel_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class UserChannel < ApplicationRecord
    validates :user_id, :channel_id, presence: true
    validates :user_id, uniqueness: { scope: :channel_id }

    belongs_to :user

    belongs_to :channel
end
