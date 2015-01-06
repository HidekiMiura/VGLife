class CreateVegetabletasks < ActiveRecord::Migration
  def change
    create_table :vegetabletasks do |t|
      t.string     :vegetable_code          # 野菜コード
      t.string     :temperate_zone_division # 地域区分（気温）
      t.string     :cultivate_task_code     # 栽培タスクコード
      t.string     :cultivate_task_name     # 栽培タスク名称
      t.string     :cultivate_task_type     # 栽培タスクタイプ
      t.string     :cultivate_task_term     # 栽培タスク時期
      t.string     :cultivate_task_comment  # 栽培タスクコメント
      t.string     :cultivate_task_image    # 栽培タスクイメージ

      t.timestamps
    end
      add_index :vegetabletasks, :cultivate_task_code
  end
end
