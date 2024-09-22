class Course < ApplicationRecord
  has_many :lessons, dependent: :destroy

  def update_total_video_size
    self.update(total_video_size: lessons.sum(:size))
  end
end
