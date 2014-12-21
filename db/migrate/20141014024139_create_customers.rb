class CreateCustomers < ActiveRecord::Migration                         
  def change                         
    create_table :customers do |t|                         
      t.string     :email,null:false            # メールアドレス       
      t.string     :email_for_index,null:false  # 索引用メールアドレス       
      t.string     :nickname,null:false         # ニックネーム       
      t.string     :family_name,null:false      # 氏       
      t.string     :given_name,null:false       # 名       
      t.string     :family_name_kana,null:false # 氏（カナ）       
      t.string     :given_name_kana,null:false  # 名（カナ）       
      t.string     :gender                      # 性別       
      t.string     :hashed_password             # パスワード
      t.date       :birthday                    # 誕生日
      t.integer    :birth_year                  # 索引用年
      t.integer    :birth_month                 # 索引用月
      t.integer    :birth_mday                  # 索引用日
      t.timestamps       
    end                         
    add_index :customers, :email_for_index,unique:true    
    add_index :customers, [ :family_name_kana, :given_name_kana ]    
    add_index :customers, [ :birth_year, :birth_month, :birth_mday ]
    add_index :customers, [ :birth_month, :birth_mday ]
    add_index :customers, :given_name_kana
    add_index :customers, [ :birth_year, :family_name_kana, :given_name_kana ], name: 'index_customers_on_birth_year_and_furigana'
    add_index :customers, [ :birth_year, :given_name_kana ]
    add_index :customers, [ :birth_month, :family_name_kana, :given_name_kana ], name: 'index_customers_on_birth_month_and_furigana'
    add_index :customers, [ :birth_month, :given_name_kana ]
    add_index :customers, [ :birth_mday, :family_name_kana, :given_name_kana ], name: 'index_customers_on_birth_mday_and_furigana'
    add_index :customers, [ :birth_mday, :given_name_kana ]
  end                         
end                         
