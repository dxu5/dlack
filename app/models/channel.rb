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
class Channel < ApplicationRecord
    validates :title, presence: true
    has_many :messages
    has_many :user_channels
    has_many :users,
    through: :user_channels,
    source: :user
end
