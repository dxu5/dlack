class AddOwnerIdToChannels < ActiveRecord::Migration[5.2]
  def change
    add_column :channels, :owner_id, :integer
  end
end
