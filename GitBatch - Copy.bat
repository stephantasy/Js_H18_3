@echo off
set /p var=Commit message : 
IF NOT [%var%]==[] (
	ECHO GIT ADD
	git add .
	ECHO GIT COMMIT
	git commit -am %var%
) ELSE (
	ECHO Fill the commit message!
)
PAUSE