## Coding Guidelines

#Coding Style

Ensure you have line spaces between your methods but no whitespace between the lines of code encapsulated in the method. Methods should ideally be kept within a 1-8 line maximum. Anything larger and you will be asked to break it down before accepting any pull requests. 

#Unit Testing

If you introduce a new class, please make sure you add a similar named unit test to the ./tests/unit-test folder. Any new methods have to be covered by new tests in existing unit-test files. A must for bug fixes.

#Specifications

When adding new features, try to make sure it is backed up with a BDD style specification. This can be regarded as a wordy description that tests the entire system for a particular case. This are not required when fixing bugs, instead use a unit test. These are intended to describe the behaviours of the system.

#Depedencies

In order to keep this framework as vanilla as possible, please do not introduce any new dependencies unless absolutely required. We would like this project to be as lean as possible when it comes to that. You can introduce depedencies as much as you like with plugins. 

#Pull Requests

Once you have made your change please submit it via pull request. Not all pull requests will be merged but we will take as many as is reasonable without causing breaking changes to the public API of scarlet. Comments are important, do not commit without them! :)

Thanks!

 - Scarlet Team
