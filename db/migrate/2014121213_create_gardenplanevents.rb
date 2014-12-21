class CreateGardenplanevents < ActiveRecord::Migration
  def change
    create_table :gardenplanevents do |t|
      t.references :gardenplan, null: false     # 菜園計画レコードへの外部キー
      t.string     :task_show_title             # タスク表示タイトル
      t.string     :task_type                   # タスクタイプ
      t.string     :task_code                   # タスクコード
      t.date       :task_event_date             # タスクイベント年月日

      t.timestamps
    end
      add_index :gardenplanevents, :task_event_date
      add_foreign_key :gardenplanevents, :gardenplans
  end
end
