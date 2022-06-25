class CreateTrucks < ActiveRecord::Migration[6.1]
  def change

    create_table :trucks do |t|
      t.integer :number, null: false
      t.integer :truck_type, null: false

      t.timestamps
    end

    create_table :reservations do |t|
      t.integer :user_id, null: false
      t.integer :truck_id, null: false
      t.date :start_date, null: false
      t.date :end_date, null: false

      t.timestamps
    end

  end
end
