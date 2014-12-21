class Customer::TopController < Customer::Base
  def index
    # ↓エラー画面テストに使用[レコードが見つからない場合]
#    raise ActiveRecord::RecordNotFound
    render action: 'index'
  end
end
