/* 
 * This code creates a meeting doc that is created every week.
 */
function docMain() {
  
  // timestamp of today's date.
  var currDate = Utilities.formatDate(new Date(), "PST", "MM/dd/yyyy");
  
  // finds the correct folder for the new date to be inserted into
  var folder = getFolder("LOT Spring Meeting Notes");
 
  // Creates a new Google Doc named 'Weekly meeting notes'
  var doc = DocumentApp.create(currDate);
  
  // gets the docId for folder insertion.
  var docFile = DriveApp.getFileById( doc.getId());
  
  // inserts the newly create doc into the specific Folder
  folder.addFile(docFile);
  DriveApp.getRootFolder().removeFile(docFile);
  
  docEdit(doc, currDate, folder);
  
}

/*
 * function that is used to edit the contents of the new document
 * @param doc      new document that is created
 * @param currDate current date of creatioj
 */
function docEdit(doc, currDate, folder){
    
  // Creates the center text "Meeting Notes MM/DD/YYYY"
  var header = doc.getBody().insertParagraph(0, "Meeting Notes " + currDate);
  header.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  
  // Creates the menu bar right under the meeting notes blurb
  var menu = doc.getBody().insertParagraph(1,"Drive" +" * " + folder.getUrl());
  menu.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
}

/*
 * helper function used to find the insertion folder location.
 * @param folderName folder name that is to be searched
 */
function getFolder(folderName){      
  
  var folders = DriveApp.getFolders();     
  
  // iterates the drive to find the folder
  while (folders.hasNext()) {
    var folder = folders.next();
    if(folderName == folder.getName()) {         
      return folder;
    }
  }
  return null;
}
