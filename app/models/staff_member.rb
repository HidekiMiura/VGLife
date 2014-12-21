class StaffMember < ActiveRecord::Base
  include EmailHolder
  include PersonalNameHolder
  include PasswordHolder
  
  has_many :events, class_name: 'StaffEvent', dependent: :destroy

  validates :start_date, presence: true, date: {
    after_or_equal_to: Date.new(2014, 1, 1),
    before: ->(obj) { 1.year.from_now.to_date },
    allow_blank: true
  }
  validates :end_date, date: {
    after: :start_date,
    before: ->(obj) { 1.year.from_now.to_date },
    allow_blank: true
  }
  
  validates :email_for_index, uniqueness: { allow_blank: true }
    after_validation do
      if errors.include?(:email_for_index)
        errors.add(:email, :taken)
        errors.delete(:email_for_index)
      end
    end
  
  def active?
    !suspended? && start_date <=Date.today &&
    (end_date.nil? || end_date > Date.today)
  end
end
