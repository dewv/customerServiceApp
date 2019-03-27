# Contributing to the Customer Service App

## About this application
This application is used to make issues from emails sent to help@dewv.net by users of the NLC system.

## Use cases
Here is a description of the application's behavior, organized according to usage scenarios.

### Standard work flow
Customer submits an issue through second party server, such as an email. Issue gets made in github. As issue updates happens, the customer is notified via the app.

## What should I know before I get started?

### The server stack
The application is built on the following server software stack. 
- NLC Attendance App
- Github Webhooks

### NLC Attendance 
This service is built off the NLC App. For more information, please refer to [NLC Attendance Contributing document](https://github.com/dewv/nlcAttendance/blob/master/CONTRIBUTING.md)

### Github Webhooks
Should have general knowledge of what these are. https://developer.github.com/webhooks/

## Launching the application

## Style guides

### git commit messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line. It is generally our practice that code-related Issues are never manually closed; they should close automatically when code is merged to the master branch from commit and/or pull request messages that refer to the Issue.

### JavaScript style checking

The [eslint](https://eslint.org/) tool is used to check and correct JavaScript code, using configuration settings in the `.eslintrc` file.

There are several ways that this tool is activated.

1. It is the tool that produces the icons and associated messages that appear in the "gutter" of the source code editor, next to the line numbers.
2. The terminal command `npm run lint` executes a script in `package.json` that runs the tool and reports any findings. This script runs the tool with its `--fix` flag, which will automatically fix some code issues. Be aware that this can cause otherwise unexpected changes when you run `git status`.
3. The terminal command `npm test` executes a script in `package.json` that runs the lint script just discussed, along with other code quality scripts discussed elsewhere.

As discussed above, c9 has a problematic expectation for the location of the `.eslintrc` config file; we work around this with a symlink.

Even so, c9 can be strange about reacting to changes in the config file. If your editor is showing icons/messages that should be disabled by recent changes to the configuration, this trick will usually resolve the situation.

```bash
# if necessary, navigate to the project folder/repository
cd ~/workspace/nlcAttendance

# rename the symlink in the parent folder to 'x' (or any unused name)
mv ../.eslintrc ../x

# rename it again to restore its proper name
mv ../x ../.eslintrc
```

The bash command `mv` moves a file, which amounts to a rename when the same folder is used. By changing the name of the symlink then changing it back, we trick c9 into picking up the changes in the editor's display of eslint results.

### mocha style guide

- Include thoughtfully-worded, well-structured mocha tests in the `test` folder.
- Files that contain test code should be named to match the files that contain the code that they test. (Extensions may differ; all test code will be in `.js` files, but both `.js` and `.html` files will be tested.)
- Use`describe` to identify the component under test.
- Use one or more nested `context` blocks to categorize tests.
- Use`it` to describe expected behavior, usually beginning with the word "should"

#### Example

File `test/views/student/editForm.js` includes the following code to test the behavior of `views/pages/student/editForm.html`. (Note that the `pages` folder was dropped from the `test` file tree because we did not expect to test other `view` folder contents; however, this could change.)

```javascript
describe("Student views", ...
    context("The edit form", ...
    	it("should include a text input to edit the last name", ...
        it("should include select options to edit the fall sport", ...
```

### Documentation style guide

We use [jsdoc](https://usejsdoc.org/) to generate [our API documentation](https://dewv.github.io/nlcAttendance).

This includes documentation for the Request, Response, Record, Model, and Controller concepts from Express/Sails.

Each model file should document:

1. the model itself, as a module implementing the [Model](https://dewv.github.io/nlcAttendance/docs/Model.html) interface, and
2. a related record type, which implements the [Record](https://dewv.github.io/nlcAttendance/docs/Record.html) interface.

Each controller file should document the controller as a module implementing the [Controller](https://dewv.github.io/nlcAttendance/docs/Controller.html) interface.

Although Sails helpers are defined in module format, the framework essentially turns them into globally available functions. Accordingly, each helper file documents its helper from the caller's perspective, as if it were a global function.
