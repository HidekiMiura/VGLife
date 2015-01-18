# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150117120338) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: true do |t|
    t.integer "customer_id",             null: false
    t.string  "type",                    null: false
    t.string  "temperate_zone_division", null: false
    t.string  "postal_code"
    t.string  "prefecture",              null: false
    t.string  "city"
    t.string  "address1"
    t.string  "address2"
    t.string  "company_name"
    t.string  "division_name"
  end

  add_index "addresses", ["city"], name: "index_addresses_on_city", using: :btree
  add_index "addresses", ["customer_id"], name: "index_addresses_on_customer_id", using: :btree
  add_index "addresses", ["prefecture", "city"], name: "index_addresses_on_prefecture_and_city", using: :btree
  add_index "addresses", ["type", "city"], name: "index_addresses_on_type_and_city", using: :btree
  add_index "addresses", ["type", "customer_id"], name: "index_addresses_on_type_and_customer_id", unique: true, using: :btree
  add_index "addresses", ["type", "prefecture", "city"], name: "index_addresses_on_type_and_prefecture_and_city", using: :btree

  create_table "cultivatetasks", force: true do |t|
    t.string   "cultivate_task_code"
    t.string   "cultivate_task_name"
    t.string   "temperate_zone_division"
    t.string   "cultivate_task_type"
    t.string   "cultivate_task_term"
    t.string   "cultivate_task_comment"
    t.string   "cultivate_task_image"
    t.string   "language_code"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "cultivatetasks", ["cultivate_task_code"], name: "index_cultivatetasks_on_cultivate_task_code", unique: true, using: :btree
  add_index "cultivatetasks", ["language_code"], name: "index_cultivatetasks_on_language_code", using: :btree

  create_table "customer_events", force: true do |t|
    t.integer  "customer_id", null: false
    t.string   "type",        null: false
    t.datetime "created_at",  null: false
  end

  add_index "customer_events", ["created_at"], name: "index_customer_events_on_created_at", using: :btree
  add_index "customer_events", ["customer_id", "created_at"], name: "index_customer_events_on_customer_id_and_created_at", using: :btree

  create_table "customers", force: true do |t|
    t.string   "email",            null: false
    t.string   "email_for_index",  null: false
    t.string   "nickname",         null: false
    t.string   "family_name",      null: false
    t.string   "given_name",       null: false
    t.string   "family_name_kana", null: false
    t.string   "given_name_kana",  null: false
    t.string   "gender"
    t.string   "hashed_password"
    t.date     "birthday"
    t.integer  "birth_year"
    t.integer  "birth_month"
    t.integer  "birth_mday"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "customers", ["birth_mday", "family_name_kana", "given_name_kana"], name: "index_customers_on_birth_mday_and_furigana", using: :btree
  add_index "customers", ["birth_mday", "given_name_kana"], name: "index_customers_on_birth_mday_and_given_name_kana", using: :btree
  add_index "customers", ["birth_month", "birth_mday"], name: "index_customers_on_birth_month_and_birth_mday", using: :btree
  add_index "customers", ["birth_month", "family_name_kana", "given_name_kana"], name: "index_customers_on_birth_month_and_furigana", using: :btree
  add_index "customers", ["birth_month", "given_name_kana"], name: "index_customers_on_birth_month_and_given_name_kana", using: :btree
  add_index "customers", ["birth_year", "birth_month", "birth_mday"], name: "index_customers_on_birth_year_and_birth_month_and_birth_mday", using: :btree
  add_index "customers", ["birth_year", "family_name_kana", "given_name_kana"], name: "index_customers_on_birth_year_and_furigana", using: :btree
  add_index "customers", ["birth_year", "given_name_kana"], name: "index_customers_on_birth_year_and_given_name_kana", using: :btree
  add_index "customers", ["email_for_index"], name: "index_customers_on_email_for_index", unique: true, using: :btree
  add_index "customers", ["family_name_kana", "given_name_kana"], name: "index_customers_on_family_name_kana_and_given_name_kana", using: :btree
  add_index "customers", ["given_name_kana"], name: "index_customers_on_given_name_kana", using: :btree

  create_table "gardenmaps", force: true do |t|
    t.integer  "customer_id",                              null: false
    t.integer  "garden_year",                              null: false
    t.string   "garden_type"
    t.string   "gardenmap_title"
    t.string   "plant_set_definition_json", limit: 100000
    t.string   "seed_plant_set_term"
    t.string   "cultivate_vegetable_list"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "map_width_cell"
    t.integer  "map_height_cell"
    t.integer  "max_canvas_X_cell"
    t.integer  "max_canvas_Y_cell"
  end

  add_index "gardenmaps", ["customer_id", "garden_year"], name: "index_gardenmaps_on_customer_id_and_garden_year", using: :btree
  add_index "gardenmaps", ["garden_year"], name: "index_gardenmaps_on_garden_year", using: :btree

  create_table "gardenplanevents", force: true do |t|
    t.integer  "gardenplan_id",   null: false
    t.string   "task_show_title"
    t.string   "task_type"
    t.string   "task_code"
    t.date     "task_event_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "gardenplanevents", ["task_event_date"], name: "index_gardenplanevents_on_task_event_date", using: :btree

  create_table "gardenplans", force: true do |t|
    t.integer  "customer_id",         null: false
    t.string   "vegetable_code",      null: false
    t.string   "vegetable_name"
    t.integer  "gardenplan_year",     null: false
    t.string   "seed_plant_set_term", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "gardenplans", ["gardenplan_year"], name: "index_gardenplans_on_gardenplan_year", using: :btree

  create_table "phones", force: true do |t|
    t.integer  "customer_id",                    null: false
    t.integer  "address_id"
    t.string   "number",                         null: false
    t.string   "number_for_index",               null: false
    t.string   "primary",          default: "f", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "phones", ["address_id"], name: "index_phones_on_address_id", using: :btree
  add_index "phones", ["customer_id"], name: "index_phones_on_customer_id", using: :btree
  add_index "phones", ["number_for_index"], name: "index_phones_on_number_for_index", using: :btree

  create_table "staff_events", force: true do |t|
    t.integer  "staff_member_id", null: false
    t.string   "type",            null: false
    t.datetime "created_at",      null: false
  end

  add_index "staff_events", ["created_at"], name: "index_staff_events_on_created_at", using: :btree
  add_index "staff_events", ["staff_member_id", "created_at"], name: "index_staff_events_on_staff_member_id_and_created_at", using: :btree

  create_table "staff_members", force: true do |t|
    t.string   "email",                            null: false
    t.string   "email_for_index",                  null: false
    t.string   "family_name",                      null: false
    t.string   "given_name",                       null: false
    t.string   "family_name_kana",                 null: false
    t.string   "given_name_kana",                  null: false
    t.string   "hashed_password"
    t.date     "start_date",                       null: false
    t.date     "end_date"
    t.boolean  "suspended",        default: false, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "staff_members", ["email_for_index"], name: "index_staff_members_on_email_for_index", unique: true, using: :btree
  add_index "staff_members", ["family_name_kana", "given_name_kana"], name: "index_staff_members_on_family_name_kana_and_given_name_kana", using: :btree

  create_table "vegetables", force: true do |t|
    t.string   "vegetable_code"
    t.string   "vegetable_name",                         null: false
    t.string   "kind_ka",                   default: "", null: false
    t.string   "kind_zoku",                 default: ""
    t.string   "kind_syu",                  default: ""
    t.string   "vegetable_large_class",     default: "", null: false
    t.string   "vegetable_small_class",     default: "", null: false
    t.string   "plant_way"
    t.boolean  "stake_flg"
    t.float    "list_width_cm"
    t.float    "list_height_cm"
    t.integer  "raise_seed_term"
    t.boolean  "thutiyose_flg"
    t.string   "companion_plant_json"
    t.integer  "annual_perennial_herb"
    t.boolean  "deep_yellow_vegetable_flg"
    t.string   "nutrient"
    t.string   "preferred_ph"
    t.integer  "row_order"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "vegetables", ["vegetable_code"], name: "index_vegetables_on_vegetable_code", unique: true, using: :btree
  add_index "vegetables", ["vegetable_name"], name: "index_vegetables_on_vegetable_name", unique: true, using: :btree

  create_table "vegetabletasks", force: true do |t|
    t.string   "vegetable_code"
    t.string   "temperate_zone_division"
    t.string   "cultivate_task_code"
    t.string   "cultivate_task_name"
    t.string   "cultivate_task_type"
    t.string   "cultivate_task_term"
    t.string   "cultivate_task_comment"
    t.string   "cultivate_task_image"
    t.string   "language_code"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "vegetabletasks", ["cultivate_task_code"], name: "index_vegetabletasks_on_cultivate_task_code", using: :btree
  add_index "vegetabletasks", ["language_code"], name: "index_vegetabletasks_on_language_code", using: :btree

  create_table "whatsnews", force: true do |t|
    t.date     "reflect_start_date", null: false
    t.date     "reflect_end_date",   null: false
    t.string   "transition_url",     null: false
    t.string   "show_text",          null: false
    t.string   "whatsnews_type",     null: false
    t.string   "update_id",          null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_foreign_key "customer_events", "customers", name: "customer_events_customer_id_fk"

  add_foreign_key "gardenmaps", "customers", name: "gardenmaps_customer_id_fk"

  add_foreign_key "gardenplanevents", "gardenplans", name: "gardenplanevents_gardenplan_id_fk"

  add_foreign_key "gardenplans", "customers", name: "gardenplans_customer_id_fk"

  add_foreign_key "phones", "addresses", name: "phones_address_id_fk"
  add_foreign_key "phones", "customers", name: "phones_customer_id_fk"

  add_foreign_key "staff_events", "staff_members", name: "staff_events_staff_member_id_fk"

end
