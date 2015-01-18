class CreateGardenmaps < ActiveRecord::Migration
  def change
    create_table   :gardenmaps do |t|
      t.references :customer, null: false                    # 顧客レコードへの外部キー
      t.integer    :garden_year, null: false                 # 菜園年度
      t.string     :garden_type                              # 菜園タイプ
      t.string     :gardenmap_title                          # 菜園タイトル
      t.integer    :map_width_cell                           # 菜園図_横マス数
      t.integer    :map_height_cell                          # 菜園図_縦マス数
      t.integer    :max_canvas_X_cell                        # 菜園図_最大Xマス位置
      t.integer    :max_canvas_Y_cell                        # 菜園図_最大Yマス位置
      t.string     :plant_set_definition_json, limit: 100000 # 配置定義(json)
      t.string     :seed_plant_set_term                      # 採種・定植時期
      t.string     :cultivate_vegetable_list                 # 栽培野菜リスト

      t.timestamps
    end
    add_index :gardenmaps, :garden_year
    add_index :gardenmaps, [ :customer_id, :garden_year]
    add_foreign_key :gardenmaps, :customers

  end
end
