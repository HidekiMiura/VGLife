class CreateCultivatetasks < ActiveRecord::Migration
  def change
    create_table :cultivatetasks do |t|
      t.string     :cultivate_task_code     # 栽培タスクコード
      t.string     :cultivate_task_name     # 栽培タスク名称
      t.string     :temperate_zone_division # 地域区分（気温）
      t.string     :cultivate_task_type     # 栽培タスクタイプ
      t.string     :cultivate_task_term     # 栽培タスク時期
      t.string     :cultivate_task_comment  # 栽培タスクコメント
      t.string     :cultivate_task_image    # 栽培タスクイメージ
      t.string     :language_code           # 言語コード

      t.timestamps
    end
      add_index :cultivatetasks, :cultivate_task_code,unique:true
      add_index :cultivatetasks, :language_code
  end
end
