class Api::V1::CoursesController < ApplicationController
  before_action :set_course, only: %i[ show update destroy ]

  # GET /courses
  def index
  @courses = Course.where("end_date >= ?", Date.current)

  if params[:title].present?
    @courses = @courses.where("LOWER(title) LIKE ?", "%#{params[:title].downcase}%")
  end

  @courses = @courses.page(params[:page]).per(3)

  render json: {
    courses: @courses.as_json(include: :lessons),
    current_page: @courses.current_page,
    total_pages: @courses.total_pages,
    total_count: @courses.total_count
  }
  end


  # GET /courses/totalVideoSum
 def totalVideoSum
  total_video_size = Course.sum(:total_video_size)
  puts "Total video size sum: #{total_video_size}" 
  render json: { storage: total_video_size }
end


  # GET /courses/1
   def show
    render json: @course.to_json(include: :lessons)
  end


  # POST /courses
  def create
  @course = Course.new(course_params)

  if @course.save
    render json: @course, status: :created, location: api_v1_course_url(@course)
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
    params.require(:course).permit(:title, :description, :start_date, :end_date, :image_url)
  end
end
