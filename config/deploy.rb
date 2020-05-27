# config valid for current version and patch releases of Capistrano
lock "~> 3.14.0"

set :application, "game_platform"
set :repo_url, "git@github.com:salza80/game_platform.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

set :deploy_to, "/home/deploy/#{fetch :application}"

set :rvm_custom_path, "/usr/share/rvm"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure

append :linked_files, "config/master.key"

namespace :deploy do
  namespace :check do
    before :linked_files, :set_master_key do
      on roles(:app), in: :sequence, wait: 10 do
        unless test("[ -f #{shared_path}/config/master.key ]")
          upload! 'config/master.key', "#{shared_path}/config/master.key"
        end
        unless test("[ -f #{shared_path}/config/database.yml ]")
          upload! 'config/database.yml', "#{shared_path}/config/database.yml"
        end
        unless test("[ -f #{shared_path}/config/credentials.yml.enc ]")
          upload! 'config/credentials.yml.enc', "#{shared_path}/config/credentials.yml.enc"
        end
      end
    end
  end
end

after "deploy:assets:precompile", "deploy:spa_build"
namespace :deploy do
  desc 'Run rake yarn:install'
  task :spa_build do
    on roles(:web) do
      within release_path do
        execute("cd #{release_path}/game_platform_spa && npm install && SKIP_PREFLIGHT_CHECK=true npm run build")
        execute("cd #{release_path} && cp -R game_platform_spa/build/* public/spa")
        execute("rm -rf #{release_path}/game_platform_spa/*")
      end
    end
  end
end



append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', '.bundle', 'public/system', 'public/uploads'
append :linked_files, 'config/database.yml', 'config/credentials.yml.enc'