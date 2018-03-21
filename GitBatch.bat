@echo off
ECHO GIT ADD
git add .
ECHO GIT COMMIT
git commit -am "Test auto-push"
ECHO GIT STATUS
git status
ECHO GIT PUSH
git push origin master
ECHO GIT STATUS
git status
PAUSE