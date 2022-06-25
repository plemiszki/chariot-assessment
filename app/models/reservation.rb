class Reservation < ApplicationRecord

  validates :user_id, :truck_id, :start_date, :end_date, presence: true

  validate :valid_date_range?

  belongs_to :user
  belongs_to :truck

  def valid_date_range?
    return unless start_date.present? && end_date.present?
    errors.add(:end_date, "must be after Start date") unless end_date.after?(start_date)
  end

end