### Commits

- Make a commit _atomic_, meaning the commit only changes **one** thing. <br>
  (It is preferred to have a lot of small commits, rather than a few big ones)
- Use the past tense ('Added feature' instead of 'Add feature')
- Describe what behavior is changed (or added) in the commit.
- When you want to provide a detailed description, summarize the commit using less than 50 characters, <br>
  then leave a blank line, and then write your detailed commit message:

```
 Derezz the master control program                                          <- summery of commit message
                                                                            <- intentional white line
 MCP turned out to be evil and had become intent on world domination.       
 This commit throws Tron's disc into MCP (causing its deresolution)         <- detailed commit message
 and turns it back into a chess game.                                       
```
- Begin the commit message with a Capital letter. ('**A**dded feature' instead of '**a**dded feature')

### Code Conventions

#### Java

- Method names are written in lowerCamelCase. (The first character of the first word is lowercase,
  and all other first characters of words are uppercase):

```java
public int getIdFromElement(Element element) {
    // code here;	
}
```

- Class names are written in UpperCamelCase. (Each first character of every word is uppercase):

```java
public class LineGenerator {
	
}
```
- When you want to use a number, String or character, store it in a variable whenever it gives more context or clarity:

```java
// GOOD
int numberOfDaysInWeek = 7;
setHours(numberOfDaysInWeek);

// WRONG
setHours(7);
```

- Keep lines shorter than 80 characters, with the limit on 100 characters.
- Make descriptive variable and method names.
- Leave a blank space between the `()` and the `{` character.
- Write a space before and after an operator:

```java
// GOOD
int a = b * c;

// WRONG
int a=b*c;
```
- Keep one blank line between methods.
- Keep one blank line between attribute fields and methods
- Write `final` variables using `UPPER_SNAKE_CASE`
- A method should do only one thing. Whenever it does more than one thing, split the method up in
  multiple helper methods. (try to keep methods under 10 lines)
- Try to keep classes under 255 lines. When a class is larger than 255, you can probably split it up
  because it does multiple things.
- Package names are named like classes, with `UpperCamelCase`. Packages are singular
  ('Controller' and 'Exception' instead of 'Controllers' and 'Exceptions')
- When `methodA()` uses `methodB()`, put `methodB()` directly under `methodA()`:

```java
public void methodA() {
    int number = methodB();    	
}

public int methodB() {
	// code here
}
```

### Branch Strategy

In this project we use the git branching model described in
https://nvie.com/posts/a-successful-git-branching-model/. The main branch of the repository is
called `master` and only pull requests from the `dev` branch and an `hotfix/` branch
can be merged into the `master` branch. We consider the `master` branch to be the branch
where the source code of **HEAD** is always in a production-ready state.

The `dev` branch is a branch where the source code is always functional. When the source code of
the `dev` branch is steady, it will be merged into the `master` branch.

The `feature/` branches are branches that can only be created by branching off the `dev` branch.
When the `feature/` branch is tested, it can and must be merged back into the `dev` branch by
creating a _Pull Request_, and assigning one or more reviewers to the PR (Pull Request).
You can ask a reviewer to review your Pull Request when it is not being reviewed for a period of time.
We use lowerCamelCase to name our `feature/` branches, with the prefix 'feature/':

```bash
git branch feature/editElementButton dev
```

The `hotfix/` branches are branches that can only be created by branching off the `master` branch.
When the `hotfix/` branch is tested, it can and must be merged back into the `master` branch,
and the `dev` branch. When you want to merge the `hotfix/` branch back into `master` and `dev`,
you need to create two Pull Requests, one for the `master` branch and one for the `dev` branch.
We use lowerCameCase to name our `hotfix` branches, with the prefix of 'hotfix/':

```bash
git branch hotfix/removeTreeId master
```

### Pull Requests

#### Guidelines for making a pull request:

- Make a pull request _atomic_, meaning the pull request only changes **one** functionality. <br>
  (It is preferred to have a lot of small pull requests, rather than a few big ones)
- Use the past tense ('Added functionality X' instead of 'Add functionality X')
- Whenever possible: unit test all your code in the `feature/` branch you want to merge into the `dev` branch.
- Write why you made the pull request (why does this feature needs to be added into the source code?)
- Write which things you changed, and describe the new behavior.
- When the pull request resolves an issue, write `fixes` + ` ` + `#` + `[number of issue]` so that the issue gets closed
  automatically when the pull request is merged. (example: `'fixes #51'`)
- Write a step-by-step guide on how to test the functionality that has been added in the `feature/` branch you want to merge.

#### Guidelines for reviewing a pull request:

- Validate that the changes in the pull request will benefit the main source code.
- Whenever possible: run and validate all the unit tests being written by the pull request author.
- Read the 'Files Changed' in check if the new code matches the _Code Conventions_.
- When you have questions about some lines, write them on the line in question.
- When the unit tests are successful and the code matches our code conventions, you as reviewer
  can approve the files, and merge the `feature/` branch into the `dev` branch.
- When you have suggestions for improvement, or tests fail for some reason, you can 'request changes'
  to indicate that the pull request author can improve his/her code before the pull request will be accepted.

#### Example:

```
Before:

When you wanted to show the tree in the application, you needed to call the getDemoTree() in
the treecontroller in the frontend. Also there was a crash whenever the tree was called from the
frontend, but the database was emtpy.

After:

fixes #15

Now when the frontend wants to show the tree, is doesn't call the getDemoTree()
but makes an API call to the backend. The backend receives this API call and first
checks if the PostgreSQL database is empty. When the database is empty, a postTree()
call will be made and the backend will store a basic root Tree in the database.
This basic tree only has one node; the root question (even without text).
This is done because the database can't be empty.

When you close and restart the backend, the database will not be cleared,
so the API does not need to be up all the time.
(Before when you closed the backend, all the data was lost).

Test:

!NOTE Test all this steps with the feature/clearTreeBeforeInsert branch in the backend.
If they both work as expected, they need to be merged into both dev branches
at the same time to keep the dev branches operational
```
