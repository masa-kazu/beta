# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
initial_foods = [
  {
    content: 'initial food 1'
  },
  {
    content: 'initial food 2'
  },
  {
    content: 'initial food 3'
  }
]

initial_foods.each do |food|
  Food.create(food)
end