# Dev Log for Startraveller Character Manager

This log is a tool for the collaborators to make notes, expand on details for
various commits, and track progress.

## Sept 15, 2015 (MIKE)
- FeatureBranch has been merged with master.  Each 'feature' of the character
is now a 'Feature', and each Feature has a corresponding bin on the character
object.  The Feature object keeps track of what the feature's value is based
on known dependencies, and the bin on the character keeps track of other
contributors and their values.  The idea here is that, once fully implemented
adding house rules or making this system useable for another RPG will involve
a simple, if prolonged, act of data entry.

## Sept 9, 2015 (MIKE)
- Created a new branch of the project, FeatureBranch, where I'm testing a few
ideas.

## Sept 5, 2015 (MIKE)
- Implemented (get/increment)baseAttributeScore methods in the character 
controller module.  This does not accord with our previous discussion regarding
accessing character objects, but I feel like this is a good idea in case we 
change the character architecture later.

## Sept 3, 2015 (MIKE)
- Added a GameError class to the project.  This is a new error-type is intended
to be used for violations of game rules instead of programming errors.
Documentation provided in GameError.js.
- Implemented the changeAttributeForCharacter method of AttributeController. It
is unclear to me whether what was implemented was what was intended for the
updateAttributes method in the plan.  Implemention induced a private method 
called isLegalAttributeBuy, as well as the AttributeList and Buy properties of
Attribute.js.  Buy includes two properties: 'Wallet' for the available spending
points, and 'Cost' which contains all the attribute score costs.  Documentation
provided in the appropriate files.

## Sept 2, 2015 (meeting)
- Major code overhaul and re-structuring. Today's commit provides a BLANK scaffolding
for future work (some of which will simply be ported over to the new structure, and
some of which will have to be implemented anew.) Also set up a new (more structured) 
work flow which eliminates our bifurcating tendencies.

## August 25, 2015 (MIKE)
- Continued TDD on add and remove class methods involving 2 classes.
- Added all Tech and Skill Classes to GameClasses.js.
- The OtherModification property of the classes in GameClasses.js illuminates 
upcoming implementation difficulties.  Most of these involve choices.
- For the upcoming abstraction process, in line with Brittany's comment on 
deciding on a 'hierarchy of character properties', I'm thinking the hierarchy 
should resemble Unalterable properties < Influenced but unchoosable < Choosable
where:
  - Unalterable properties: properties which are chosen during character 
  creation and then never modified (Attributes in our case)
  - Influenced but unchoosable: Things which are often influenced by other 
  choices, but are rarely or never chosen directly (Stats in our case)
  - Choosable: things which are selected directly and frequently, often during 
  the leveling up process (Skills in our case)

## August 24, 2015 (MIKE)
- Modified the UnitTest Class to include a title for the table and to make the 
table 100% of the screen width.  This makes it easier to distinguish between 
different groups of tests.
- Further modified the presentation of the Unit Tests to make the results 
column dynamically as small as is possible.  Also added headers.
- I've finished testing the add and remove class methods for single classes.
- Begun testing the add and remove class methods for two classes.

## August 17, 2015 (meeting)
- At end of project, let's re-evaluate whether jQuery actually was useful (did it save us time? memory? was it more elegant, or more readable code?).
- Figured out a basic responsive input form (to change the character name). Good start!

## August 5, 2015 (BRITTANY)
- Finalized CharacterController.js, with methods for adding, removing and
selecting characters. All works fine.
- Updated CharacterView.js in order to display basic info onto the 'character
sheet' section of the page. It now dynamically pulls data from the character
object. Note; in order to accomplish this I defined a basic data structure for
base class stats. See the copy of Character.js inside of bTesting/ for more
details on this.
- Next steps:
  - Help implement tests for existing modules
  - Design/implement project-wide error/exception handling

## August 5, 2015 (MIKE)
- Added a statModification object constructor to help with following "bin 
paths" for abilities and feats which alter stats, attributes, and other
such stuff.  
- Built a modest UnitTest object for us to move in the direction of test
driven development.  Fully functional, though a bit bare bones.  This material
has been moved out of my folder and into the general use area in a folder 
labelled "UnitTest".
- UnitTest Documentation:
  - instantiate a UnitTest object
  - Method addTest(sTestName, fTest) takes a string to name a boolean-valued
  function.  An exception is thrown when you try to name a test with a name
  already in use.  The test-function is considered to have passed if it 
  returns true.  Any unhandled exception the test throws will have its
  message displayed in lieu of "Passed!" or "Failed!".  Non-boolean outputs
  are ignored.  In retrospect this may be a design flaw.
  - Method removeTest(sTestName) removes the named test.
  - Method: run() will run all tests and return an an object containing the 
  test results.  Each test's results are indexed by the test's name.
  - Method runInHTML() will build a table in the local(?) HTML document and 
  display the test results there.
  - See UnitTestTester.html for a sample.  

## August 4, 2015 (MIKE)
- Fixed syntactic errors in various files of my code which prevented said code
from executing. 
- Added methods to Game to add and remove classes from characters.
- Added skeletons of the Chronographer, Webmaster, and Supercharger classes to
GameClasses.js (i.e. Game.Classes).
- I set up some basic HTML to test and develop code to display modifications to
the displayed character's base class stats (will, hit dice, etc.).  
- Embarrassingly my code does accurrately track base class stats between 
characters, but it fails to properly display classes after character switches.

## August 3, 2015 (BRITTANY)
- Redone CSS front-end template. Note: in this design, the screen is not at
all suited to mobile devices or any small-width viewing. Considering this
application is intended as a standalone browser script, I don't see that use
case coming up in this particular project anyway, so no worries.
- Incorporates a front-end "tabular" view for adding, removing, and switching
between characters stored in memory. In order to accomplish this, I also re-
organized all 'character' methods into the files listed in the **js/** folder.
- In this new organization, all Controller classes depend on corresponding
View and Model classes. There is also a 'main' controller for general
application flow/control. View and Model classes/functions are only ever
called/instantiated from corresponding Controllers.
- The .js files/modules are organized into groups of three, each group having
a model, view, and controller. There are some additional 'helper' modules.
- Used [this blog post](http://toddmotto.com/mastering-the-module-pattern)
for some inspiration/ideas for how to organize modules.

## August 3, 2015 (MIKE)
- Finally committed my work on the class infrastructure.  Lots of new files 
added and a bunch of edits.  We should discuss the utility of JSON files.  My
recent experiments with them suggest that they cannot contain functions... 
which is a bit of a problem for my current vision of the class
infrastructure.  That having been said, maybe this is a sign that my vision is
too complicated.  I've also added a handful of comments to the
BaseAttributeBuyer.js file so that I can have a friend look at the code and
give me some "best practices" adivce.

## July 31, 2015 (BRITTANY)
- Set up basic page layout with frame-like scrolling behaviour in divs. It
still needs some attention though, not quite there yet.

## July 31, 2015 (MIKE)
- The 8-step plan outlined in my log from July 20, 2015 has now more or less
been completed.  The current infrastructure actually has Game generate 2 blank 
character objects and the user is free to switch between them and can create 
more.  This current state of affairs is for testing/demonstration purposes.

NOTE: On investigating the classes for Star Traveller I've discovered that not 
all classes have feat trees, further the character creation document is
perhaps less informative than I might like... perhaps contacting Alistair to
get some input/clarification would be helpful?

## July 29, 2015 (BRITTANY)
- Added dev_log.md to separate logs from README/tasks.
- Imported Foundation (css/js frontend framework)
- Set up basic screen layout via index.html

## July 20, 2015 (MIKE)
- The 'controller' which was added last time was actually an amalgam of
controller and model as I understand those terms.  The Game.js file is my
initial step in separating those two.  My plan is as follows:

1. Web app loads
2. Controller instantiates Game (ideally I'd prefer if Game could behave
like a static class and never instantiate).
3. Controller asks Game to create a character object.
4. Game returns a blank-slate character object
5. The controller ties the information from said character object to the view
6. As the user generates input the controller feeds this information back into
the character object, which in turn then asks Game for help in updating itself.
7. Once the character object has been updated the controller updates View accordingly.
8. Repeat from step 6.

- The above algorithm can, as far as I am aware, see 'Game' everywhere
replaced by 'a database' with minimal hassle.  Our previous discussion
favoured using databases but, as I am unfamiliar with them, I am using the
approach now with full understanding that re-conceptualization and re-
implementation may result.
- In addition a web page for the testing and debugging of the 'Game' prototype
has been added to the project.

## July 19, 2015 (MIKE)
- Base Attribute Buyer view and controller added.
- The jQuery library is now accessed by the project.
