class Api::V1::CoursesController < ApplicationController
  before_action :set_course, only: %i[ show update destroy ]

  # GET /courses
  def index
  @courses = Course.where(nil)

  if params[:end_date].present?
    @courses = @courses.where('end_date <= ?', params[:end_date])
  else
    @courses = @courses.where('end_date >= ?', Date.current)
  end

  @courses = @courses.page(params[:page]).per(3)

  render json: {
    courses: @courses,
    current_page: @courses.current_page,
    total_pages: @courses.total_pages,
    total_count: @courses.total_count
  }
end

  # GET /courses/1
  def show
    render json: @course
  end

  # POST /courses
  def create
    @course = Course.new(course_params)

    if @course.save
      render json: @course, status: :created, location: @course
    else
      render json: @course.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /courses/1
  def update
    if @course.update(course_params)
      render json: @course
    else
      render json: @course.errors, status: :unprocessable_entity
    end
  end

  # DELETE /courses/1
  def destroy
    @course.destroy!
  end

  private

    def set_course
      @course = Course.find(params[:id])
    end

    def course_params
      params.require(:course).permit(:title, :description, :start_date, :end_date, :total_video_size, :image_url)
    end
end
