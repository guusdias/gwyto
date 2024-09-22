require 'rails_helper'

RSpec.describe Api::V1::LessonsController, type: :controller do
  let!(:course) { create(:course) }
  let!(:lesson) { create(:lesson, course: course) }

  describe "GET #index" do
    it "returns a success response" do
      get :index, params: { course_id: course.id }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).length).to eq(course.lessons.count)
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      get :show, params: { course_id: course.id, id: lesson.id }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["id"]).to eq(lesson.id)
    end
  end

  describe "POST #create" do
    let(:valid_attributes) { { url: "https://example.com/lesson", size: 500 } }
    
    context "with valid attributes" do
      it "creates a new lesson" do
        expect {
          post :create, params: { course_id: course.id, lesson: valid_attributes }
        }.to change(Lesson, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid attributes" do
      it "returns unprocessable entity" do
        post :create, params: { course_id: course.id, lesson: { url: nil } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH/PUT #update" do
    let(:new_attributes) { { url: "https://new-url.com/lesson" } }

    it "updates the lesson" do
      put :update, params: { course_id: course.id, id: lesson.id, lesson: new_attributes }
      lesson.reload
      expect(lesson.url).to eq("https://new-url.com/lesson")
      expect(response).to have_http_status(:ok)
    end
  end

  describe "DELETE #destroy" do
    it "deletes the lesson" do
      expect {
        delete :destroy, params: { course_id: course.id, id: lesson.id }
      }.to change(Lesson, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end
