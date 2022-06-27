class Reservation < ApplicationRecord

  validates :user_id, :truck_id, presence: true, unless: -> { validation_context == :dates_only }
  validates_date :start_date, :end_date

  validate :valid_date_range?

  belongs_to :user, optional: true
  belongs_to :truck, optional: true

  def valid_date_range?
    return unless start_date.present? && end_date.present?
    errors.add(:end_date, "cannot be before Start date") if end_date.before?(start_date)
  end

end
