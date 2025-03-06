# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_03_06_032834) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "dishes", force: :cascade do |t|
    t.string "name"
    t.float "price"
    t.string "description"
    t.string "dish_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "restaurant_id", null: false
    t.index ["restaurant_id"], name: "index_dishes_on_restaurant_id"
  end

  create_table "dishes_ingredients", id: false, force: :cascade do |t|
    t.bigint "dish_id", null: false
    t.bigint "ingredient_id", null: false
    t.index ["dish_id"], name: "index_dishes_ingredients_on_dish_id"
    t.index ["ingredient_id"], name: "index_dishes_ingredients_on_ingredient_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "label"
    t.datetime "date"
    t.string "description"
    t.float "duration"
    t.string "location"
    t.integer "participants"
    t.time "start_hour"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.string "groupLabel"
    t.time "end_hour"
    t.index ["user_id"], name: "index_events_on_user_id"
  end

  create_table "events_groups", id: false, force: :cascade do |t|
    t.bigint "event_id", null: false
    t.bigint "group_id", null: false
    t.index ["event_id", "group_id"], name: "index_events_groups_on_event_id_and_group_id"
    t.index ["group_id", "event_id"], name: "index_events_groups_on_group_id_and_event_id"
  end

  create_table "events_quests", id: false, force: :cascade do |t|
    t.bigint "event_id", null: false
    t.bigint "quest_id", null: false
    t.string "status", default: "pending", null: false
    t.index ["event_id", "quest_id"], name: "index_events_quests_on_event_id_and_quest_id", unique: true
    t.index ["event_id"], name: "index_events_quests_on_event_id"
    t.index ["quest_id"], name: "index_events_quests_on_quest_id"
  end

  create_table "groups", force: :cascade do |t|
    t.string "group"
    t.string "groupStatus"
    t.integer "quantity"
    t.string "description"
    t.string "hotel_remark"
    t.string "transport_remark"
    t.string "dish_remark"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "transport_id", null: false
    t.bigint "hotel_id", null: false
    t.bigint "restaurant_id", null: false
    t.bigint "event_id"
    t.index ["hotel_id"], name: "index_groups_on_hotel_id"
    t.index ["restaurant_id"], name: "index_groups_on_restaurant_id"
    t.index ["transport_id"], name: "index_groups_on_transport_id"
  end

  create_table "groups_dishes", force: :cascade do |t|
    t.bigint "group_id", null: false
    t.bigint "dish_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dish_id"], name: "index_groups_dishes_on_dish_id"
    t.index ["group_id", "dish_id"], name: "index_groups_dishes_on_group_id_and_dish_id", unique: true
    t.index ["group_id"], name: "index_groups_dishes_on_group_id"
  end

  create_table "groups_quests", id: false, force: :cascade do |t|
    t.bigint "group_id", null: false
    t.bigint "quest_id", null: false
    t.integer "status", default: 0, null: false
    t.index ["group_id", "quest_id"], name: "index_groups_quests_on_group_id_and_quest_id"
    t.index ["quest_id", "group_id"], name: "index_groups_quests_on_quest_id_and_group_id"
  end

  create_table "hotels", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.float "rating"
    t.float "star"
    t.datetime "checkout_time"
    t.datetime "checkin_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "distance"
    t.string "contact"
  end

  create_table "ingredients", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_ingredients_on_name", unique: true
  end

  create_table "quests", force: :cascade do |t|
    t.string "email"
    t.string "phone"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "restaurants", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.string "contact"
    t.string "cuisine"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rooms", force: :cascade do |t|
    t.string "name"
    t.float "price"
    t.string "remark"
    t.string "room_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "hotel_id", null: false
    t.integer "capacity"
    t.index ["hotel_id"], name: "index_rooms_on_hotel_id"
  end

  create_table "transports", force: :cascade do |t|
    t.string "transport_type"
    t.string "brand"
    t.float "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "vendor_id", null: false
    t.index ["vendor_id"], name: "index_transports_on_vendor_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.integer "role", default: 0, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  create_table "vendors", force: :cascade do |t|
    t.string "name"
    t.string "contact"
    t.integer "distance_limit"
    t.integer "time_limit"
    t.string "service"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "dishes", "restaurants"
  add_foreign_key "events", "users"
  add_foreign_key "events_groups", "events", on_delete: :cascade
  add_foreign_key "events_quests", "events"
  add_foreign_key "events_quests", "quests"
  add_foreign_key "groups", "hotels"
  add_foreign_key "groups", "restaurants"
  add_foreign_key "groups", "transports"
  add_foreign_key "groups_dishes", "dishes"
  add_foreign_key "groups_dishes", "groups"
  add_foreign_key "rooms", "hotels"
  add_foreign_key "transports", "vendors"
end
