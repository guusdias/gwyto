class CreateCourses < ActiveRecord::Migration[7.2]
  def change
    create_table :courses do |t|
      t.string :title
      t.text :description
      t.date :start_date
      t.date :end_date
      t.integer :total_video_size

      t.timestamps
    end
  end
end
