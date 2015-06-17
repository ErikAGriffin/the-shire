task default: %w[init]

task :init do
  sh 'bundle install'
  sh 'git remote remove origin'
  sh 'rm Rakefile'
  sh 'mv NextRakeFile Rakefile'
end
