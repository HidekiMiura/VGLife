class Vegetable < ActiveRecord::Base

  validates :vegetable_code, :vegetable_name, :kind_ka, :vegetable_large_class, :vegetable_large_class, presence: true
  
  KIND_KAS = %w(
    ウリ科 ナス科 マメ科 アブラナ科 ユリ科 キク科
  )
  VEGETABLE_LARGE_CLASS = %w(
    果菜類 葉菜類 根菜類  
  )
  VEGETABLE_SMALL_CLASS = %w(
　    ウリ類 ナス類 マメ類 ネギ類 菌類 菜類 生類 柔類 塊根類 直根類
  )
  validates :kind_ka, inclusion: { in: KIND_KAS, allow_blank: true }
  validates :vegetable_large_class, inclusion: { in: VEGETABLE_LARGE_CLASS, allow_blank: true }
  validates :vegetable_small_class, inclusion: { in: VEGETABLE_SMALL_CLASS, allow_blank: true }
end
