class Admin::TopController < Admin::Base
  skip_before_action :authorize
  
  def index
# ↓エラー画面テストに使用
# raise IpAddressRejected
    if current_administrator
      render action: 'dashboard'
    else
      render action:'index'
    end
  end
end
