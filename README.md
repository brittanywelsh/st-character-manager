# Startraveller Character Manager

## What is Startraveller?

Startraveller is a tabletop RPG created by Alastair Jaimeson-Lane and friends.

## What is the Startraveller Character Manager?

This project is a collection of tools for use by DMs and players in Startraveller campaigns.

## Project Plan/To-Do List

### Stage 1 - Basic Setup

* ~~(B) Initialize git repo~~
* ~~(B) Build a front-end (HTML) scaffolding~~
* ~~(M) Build a scaffold for primary controller~~

### Stage 2A - Project Modules

(Each project module has both a backend/JS controller as well as a corresponding frontend widget.)

* (B) Demographic info section (name, gender, alignment, etc.)
* ~~(M) Section for filling out basic stats (based on points allocation scheme).~~
* (B) Section for picking race (note that race influences stats)
* (M/B) Section to choose (3) classes:
  - (B) Build logic for choosing classes
  - Implementing specific classes:
    + (M) Cybertech
    + (B) Biotech
    + (M) Other classes
* (M) Section to choose starting abilities/feats (based on classes)
* Companion
* Inventory (?) - may not be included in final project; re-evaluate at a later date

### Stage 2B - Utilities

* Write methods for saving/loading character data to/from a file
* Write a method to print out well-formatted, filled character sheets

### Stage 2C - Input/Output File Specifications

* Define JSON format for wrapping up all game logic/fixed data
* Define JSON format for character storage

### Stage 3 - Polishing and Refactoring

* Increase user-friendliness with explanations and perhaps 'walkthoughs'
* Plan a refactoring scheme for final project deliverables and re-organization of code
