# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Channel.destroy_all
#Will need to manually create all channels and joins!!
# general = Channel.create!(title: "General", is_private: false, is_dm: false)
demo_user = User.create!(username: "dlack_demo", password: "password")
user1 = User.create!(username: "dxu5", password: "password")
user2 = User.create!(username: "dxu6", password: "password")


