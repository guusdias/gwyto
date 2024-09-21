class Api::V1::LessonsController < ApplicationController
  before_action :set_course
  before_action :set_lesson, only: [:show, :update, :destroy]

  # GET /courses/:course_id/lessons
  def index
    @lessons = @course.lessons
    render json: @lessons
  end

  # GET /courses/:course_id/lessons/:id
  def show
    render json: @lesson
  end

  # POST /courses/:course_id/lessons
  def create
    @lesson = @course.lessons.build(lesson_params)

    if @lesson.save
      @course.update_total_video_size
      render json: @lesson, status: :created
    else
      render json: @lesson.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /courses/:course_id/lessons/:id
  def update
    if @lesson.update(lesson_params)
      @course.update_total_video_size
      render json: @lesson
    else
      render json: @lesson.errors, status: :unprocessable_entity
    end
  end

  # DELETE /courses/:course_id/lessons/:id
  def destroy
    @lesson.destroy
    @course.update_total_video_size
    head :no_content
  end

  private

  def set_course
    @course = Course.find(params[:course_id])
  end

  def set_lesson
    @lesson = @course.lessons.find(params[:id])
  end

  def lesson_params
    params.require(:lesson).permit(:url, :size)
  end
end
