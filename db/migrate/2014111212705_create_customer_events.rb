class CreateCustomerEvents < ActiveRecord::Migration
  def change
    create_table :customer_events do |t|
      t.references :customer, null: false           # 顧客レコードへの外部キー
      t.string :type, null: false                       # イベントタイプ
      t.datetime :created_at, null: false               # 発生時刻
    end
    
    add_index :customer_events, :created_at
    add_index :customer_events, [ :customer_id, :created_at]
    add_foreign_key :customer_events, :customers
  end
end
