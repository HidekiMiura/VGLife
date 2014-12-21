# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#　table_names = %w(staff_members administrators customers vegetables)
# table_names = %w(staff_events customer_events)
# table_names = %w(gardenmaps gardenplans  gardenplanevents)

 table_names = %w(gardenmaps gardenplans  gardenplanevents)
table_names.each do |table_name|
  path = Rails.root.join('db', 'seeds',Rails.env, "#{table_name}.rb")
  if File.exist?(path)
    puts "Creating #{table_name}...."
    require(path)
  end
end
