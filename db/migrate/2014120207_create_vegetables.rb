class CreateVegetables < ActiveRecord::Migration
  def change
    create_table :vegetables do |t|
      t.string :vegetable_code                                  # 野菜コード
      t.string :vegetable_name, null: false                     # 野菜名称
      t.string :kind_ka, null: false, default: ''               # 科
      t.string :kind_zoku, default: ''                          # 属
      t.string :kind_syu, default: ''                           # 種
      t.string :vegetable_large_class, null: false, default: '' # 菜類大分類
      t.string :vegetable_small_class, null: false, default: '' # 菜類小分類
      t.string :plant_way                                       # 植え方
      t.boolean :stake_flg                                      # 支柱フラグ
      t.float :list_width_cm                                    # 畝幅(cm)
      t.float :list_height_cm                                   # 畝高(cm)
      t.integer :raise_seed_term                                # 育苗期間(日)
      t.boolean :thutiyose_flg                                  # 土寄フラグ
      t.string :companion_plant_json                            # コンパニオンプラント(json)
      t.integer:annual_perennial_herb                           # 一／多年草
      t.boolean :deep_yellow_vegetable_flg                      # 緑黄色野菜フラグ
      t.string :nutrient                                        # 栄養素
      t.string :preferred_ph                                    # 好適PH

      t.timestamps
    end

    add_index :vegetables, :vegetable_code, unique: true
    add_index :vegetables, :vegetable_name, unique: true

  end
end
