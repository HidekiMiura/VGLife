class Staff::TopController < Staff::Base
  skip_before_action :authorize
  
  def index
# ↓エラー画面テストに使用
#   raise
    if current_staff_member
      render action: 'dashboard'
    else
      render action: 'index'
    end
    
  end
end
