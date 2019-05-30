class AdminPagesController < ApplicationController

  layout 'admin'

  def static
    render params[:page].underscore.to_s
  end

end
