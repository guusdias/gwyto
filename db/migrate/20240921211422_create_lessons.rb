class CreateLessons < ActiveRecord::Migration[7.2]
  def change
    create_table :lessons do |t|
      t.string :url
      t.references :course, null: false, foreign_key: true
      t.integer :size

      t.timestamps
    end
  end
end
