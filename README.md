# vend-app
This is a project I'm building to gain more experience in React and Electron

## Running the Application Locally
* npm run electron-dev

### Project Purpose 
* Create an application which will easily handle the complexity of changing packages,
  handling package groupings, and creating pricing load files for Coca-Cola bottlers in America.
* Instead of requiring the user to have experience writing Excel formulas and possibly messing up
  a customer's pricing, this application will allow the user to do everything with minimal input,
  and easy drag-and-drop customization. 

### Current Features
* Creating Package Combinations
  * This feature lets the user add, edit, or delete package combinations. These packages typically have 4
    main attributes: Pack Size, Pack Type, Bevcat, and Brand. These combinations are what all Coca-Cola
    materials consist of. 
* Create Package Groupings
  * Because there are so many package combinations, it is often helpful to create product groupings. 
    This groups same-priced products together, cutting back on the number of inputs required for the user.

### Next Steps
* Create a Main Page - this will likely be the form for creating a pricing request spreadsheet, since 
  that is what the end user will be using the most!
* Add one final sub-group for Retail Vending Codes
  * This feature will allow someone to map all packages to specific price points with a custom name.
    When this is done, the user will be able to enter prices with just two inputs
    * One dropdown: RVC (retail vending codes)
    * One input: customer number
  * Currently, users are required to enter pricing for each package grouping. (There are 10+ current groupings)
