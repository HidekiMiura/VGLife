class CreateWhatsnews < ActiveRecord::Migration
  def change
    create_table :whatsnews do |t|
      t.date       :reflect_start_date, null: false     # 反映開始日
      t.date       :reflect_end_date, null: false       # 反映終了日
      t.string     :transition_url, null: false             # 遷移先URL
      t.string     :show_text, null: false                  # 表示テキスト         
      t.string     :whatsnews_type, null: false             # 新着Type 
      t.string     :update_id, null: false                  # 更新者ID             

      t.timestamps
    end
  end
end
