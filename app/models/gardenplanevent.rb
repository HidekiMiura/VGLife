class Gardenplanevent < ActiveRecord::Base
  belongs_to :gardenplan, class_name: 'Gardenplan', foreign_key: 'gardenplan_id'

  alias_attribute :occurred_at, :created_at
end
