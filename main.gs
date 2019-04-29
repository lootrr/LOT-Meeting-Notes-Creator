/* 
 * This code creates a meeting doc that is created every week.
 * filename and foldername needs to start with LOT.
 */
function docMain() {
  
  // timestamp of today's date.
  var MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
  var nowDate = new Date();
  var date = new Date(nowDate.getTime() + MILLIS_PER_DAY); // today + 1;
  var currDate = Utilities.formatDate(date, "PST", "MM/dd/yyyy");
  
  // finds the correct folder for the new date to be inserted into
  var destFolder = getFolder("LOT Spring Meeting Notes");
 
  // Creates a new Google Doc named 'Weekly meeting notes'
  var newDoc = DocumentApp.create("LOT " + currDate );
  
  // gets the docId for folder insertion.
  var docFile = DriveApp.getFileById( newDoc.getId() );
  
  // inserts the newly create doc into the specific Folder
  destFolder.addFile(docFile);
  DriveApp.getRootFolder().removeFile(docFile);
  
  docInfo(newDoc, destFolder, currDate);
  
}

/*
 * function that is used to edit the contents of the new document
 * @param doc      new document that is created
 * @param currDate current date of creation
 */
function docInfo(doc, folder, currDate){
  
  // current style of the document header.
  var style = {};
  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER;
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Corbel';
  style[DocumentApp.Attribute.FONT_SIZE] = 11;
  style[DocumentApp.Attribute.BOLD] = true;
  
  // creates the center text "Meeting Notes MM/DD/YYYY"
  
  var header = doc.getBody().insertParagraph(0, " ❆ Meeting Notes " + currDate + " ❆");
  header.setAttributes(style);
  
  // creates the menu bar right under the meeting notes blurb
  
  // creates the drive folder hyperLink
  var LOTFolder = getFolder("League of Tritons");
  var drive = doc.getBody().insertParagraph(1, "Drive");
  drive.setAttributes(style);
  drive.setLinkUrl(LOTFolder.getUrl());
  var star1 = doc.getBody().insertParagraph(2, " * ");
  star1.setAttributes(style);
  star1.merge();

  // create the LOT folder hyperlink
  var SprFolder = getFolder("LOT 19-20 Spring Quarter");
  var spr = doc.getBody().insertParagraph(2, "Spring Folder");
  spr.setLinkUrl(SprFolder.getUrl());
  spr.setAttributes(style);
  spr.merge();
  var star2 = doc.getBody().insertParagraph(2, " * ");
  star2.setAttributes(style);
  star2.merge();
  
  // create the previous notes hyperlink
  var MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
  var nowDate = new Date();
  var prevDate = new Date(nowDate.getTime() - 6 * MILLIS_PER_DAY); // change number for days (today - 6)
  var finalDate = Utilities.formatDate(prevDate, "PST", "MM/dd/yy");
  var prevDocFile = getFile("LOT " + finalDate);
  var prev = doc.getBody().insertParagraph(2, "Previous Meeting");
  prev.setLinkUrl(prevDocFile.getUrl());
  prev.setAttributes(style);
  prev.merge();
  var star3 = doc.getBody().insertParagraph(2, " * ");
  star3.setAttributes(style);
  star3.merge();
  
  // create the next notes hyperlink
  var next = doc.getBody().insertParagraph(2, "Next Meeting");
  next.setAttributes(style);
  next.merge();
  
}

/*
 * helper function used to find the insertion folder location.
 * @param folderName folder name that is to be searched
 */
function getFolder(folderName){      
  var folders = DriveApp.getFoldersByName(folderName);     
  return folders.next();
  
}

/*
 * helper function used to find the previous file location.
 * @param filename file name that is to be searched
 */
function getFile(fileName){
  var files = DriveApp.getFilesByName(fileName);        
  return files.next();
  
}
