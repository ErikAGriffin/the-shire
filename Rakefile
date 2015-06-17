task default: %w[init]

task :init do
  sh 'rm README.md'
  sh 'git remote remove origin'
  sh 'bundle install'
  sh 'npm install'
  sh 'rm Rakefile'
  sh 'mv NextRakeFile Rakefile'
end
