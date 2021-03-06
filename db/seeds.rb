# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Channel.destroy_all
UserChannel.destroy_all
#Will need to manually create all channels and joins!!

demo_user = User.create!(username: "dlack_demo", password: "password")
general = Channel.create!(title: "General", is_private: false, is_dm: false, owner_id: demo_user.id)
user1 = User.create!(username: "dxu5", password: "password")
user2 = User.create!(username: "dxu6", password: "password")
user3 = User.create!(username: 'Derek', password: "password")
user4 = User.create!(username: 'Hailey', password: "password")
user5 = User.create!(username: 'Robert', password: "password")
userChannel1 = UserChannel.create!(user_id: demo_user.id, channel_id: general.id)
userChannel2 = UserChannel.create!(user_id: user1.id, channel_id: general.id)
userChannel3 = UserChannel.create!(user_id: user2.id, channel_id: general.id)
userChannel4 = UserChannel.create!(user_id: user3.id, channel_id: general.id)
userChannel5 = UserChannel.create!(user_id: user4.id, channel_id: general.id)
userChannel6 = UserChannel.create!(user_id: user5.id, channel_id: general.id)



