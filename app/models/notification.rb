# == Schema Information
#
# Table name: notifications
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  channel_id :integer          not null
#  read       :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Notification < ApplicationRecord
    validates :user_id, :channel_id, presence: true

    belongs_to :user
    belongs_to :channel
end
