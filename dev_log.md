# Dev Log for Startraveller Character Manager

This log is a tool for the collaborators to make notes, expand on details for
various commits, and track progress.

## August 3, 2015 (BRITTANY)
- Redone CSS front-end template. Note: in this design, the screen is not at
all suited to mobile devices or any small-width viewing. Considering this
application is intended as a standalone browser script, I don't see that use
case coming up in this particular project anyway, so no worries.

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
7. Once the character object has been updated the controller updates View
accordingly.
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
