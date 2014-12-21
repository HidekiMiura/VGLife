class CreateGardenplans < ActiveRecord::Migration
  def change
    create_table :gardenplans do |t|
      t.references :customer, null: false            # 顧客レコードへの外部キー
      t.string     :vegetable_code, null: false      # 野菜コード
      t.string     :vegetable_name                   # 野菜名称
      t.integer    :gardenplan_year, null: false     # 菜園計画年度
      t.string     :seed_plant_set_term, null: false # 菜園計画四季                       

      t.timestamps
    end
    add_index :gardenplans, :gardenplan_year
    add_foreign_key :gardenplans, :customers

  end
end