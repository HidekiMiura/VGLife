class CreateAddresses < ActiveRecord::Migration                         
  def change                         
    create_table :addresses do |t|                         
      t.references :customer,null:false                # 顧客への外部キー       
      t.string     :type,null:false                    # 継承カラム
      t.string     :temperate_zone_division,null:false # 地域区分（気温）       
      t.string     :postal_code                        # 郵便番号       
      t.string     :prefecture,null:false              # 都道府県       
      t.string     :city                               # 市区町村 
      t.string     :address1                           # 町域、番地等 
      t.string     :address2                           # 建物名、部屋番号等       
      t.string     :company_name                       # 会社名       
      t.string     :division_name                      # 部署名       
    end                         
    add_index :addresses, :customer_id               
    add_index :addresses, [ :type, :customer_id ],unique: true  
#    add_foreign_key :addresses, :customers
  end                         
end                         
