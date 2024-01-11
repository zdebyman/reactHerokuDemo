class CreateGratitudes < ActiveRecord::Migration[7.1]
  def change
    create_table :gratitudes do |t|
      t.string :title
      t.text :prompt1
      t.text :answer1
      t.text :prompt2
      t.text :answer2
      t.text :prompt3
      t.text :answer3

      t.timestamps
    end
  end
end
