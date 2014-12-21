class VegetablePresenter < ModelPresenter
  delegate :vegetable_code,
   :vegetable_name,
   :kind_syu,
   :kind_zoku,
   :kind_ka,
   :vegetable_large_class,
   :vegetable_small_class,
   :plant_way,
   :stake_flg,
   :list_width_cm,
   :list_height_cm,
   :raise_seed_term,
   :thutiyose_flg,
   :companion_plant_json,
   :annual_perennial_herb,
   :deep_yellow_vegetable_flg,
   :nutrient,
   :preferred_ph,
   to: :object

  def flg_mark(name)
    name ? raw('&#x2611;') : raw('&#x2610;')
  end

  def kind
    object.kind_ka + '|' + object.vegetable_large_class + ':' + object.vegetable_small_class
  end
end
