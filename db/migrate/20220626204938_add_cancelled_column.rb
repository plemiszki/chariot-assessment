class AddCancelledColumn < ActiveRecord::Migration[6.1]
  def change
    add_column :reservations, :is_cancelled, :boolean, default: false
  end
end
