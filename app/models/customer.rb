class Customer < ActiveRecord::Base
  include EmailHolder
  include PersonalNameHolder
  include PasswordHolder
  
  has_many :events, class_name: 'CustomerEvent', dependent: :destroy
  has_many :addresses, dependent: :destroy
  has_one :home_address, autosave: true
  has_one :work_address, autosave: true
  has_many :phones, dependent: :destroy
  has_many :personal_phones, -> { where(address_id: nil).order(:id) }, class_name: 'Phone', autosave: true
  has_many :gardenmaps, class_name: 'Gardenmap', dependent: :destroy
  has_many :gardenplans, class_name: 'Gardenplan', dependent: :destroy

  validates :gender, inclusion: { in: %w(male female), allow_blank: true }
  validates :birthday, date: {
    after: Date.new(1900, 1,1),
    before: ->(obj) {Date.today }, allow_blank: true
  }
  
  before_save do
    if birthday
      self.birth_year = birthday.year
      self.birth_month = birthday.month
      self.birth_mday = birthday.mday
    end
  end
end
