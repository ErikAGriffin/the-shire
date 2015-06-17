require 'hobbit'
require 'hobbit/hole'
require 'bcrypt'
require './custom-hobbit'

class Server < Hobbit::Base
  include Hobbit::Hole

  require './lib/database_setup'

  # get '/' do
  #   render_static 'index.html'
  # end

  get '*' do
    render 'entry'
  end


end
