require 'rails_helper'

RSpec.describe Api::V1::CoursesController, type: :controller do
  let!(:course) { create(:course) }

  describe "GET #index" do
    it "returns a list of courses" do
      get :index
      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response["courses"].length).to eq(1)
    end
  end

  describe "GET #show" do
    it "returns a specific course" do
      get :show, params: { id: course.id }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["id"]).to eq(course.id)
    end
  end

  describe "POST #create" do
    let(:valid_attributes) { { title: "New Course", description: "Description", start_date: Date.today, end_date: Date.today + 1.month } }

    context "with valid attributes" do
      it "creates a new course" do
        expect {
          post :create, params: { course: valid_attributes }
        }.to change(Course, :count).by(1)
        expect(response).to have_http_status
