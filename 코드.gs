// 현재 웹 앱 URL:
// https://script.google.com/macros/s/AKfycbwvKkUeFjOu8LJ_-Xh7BN7KnS0kT9A0lpDQe2S8XX403jNybkpC/exec

var SCRIPT_PROP = PropertiesService.getScriptProperties();

// https://developers.google.com/apps-script/guides/html/communication#forms
function processForm(formObject) {
  var folder = formObject.folder;
  var email = formObject.email;  
  SCRIPT_PROP.setProperty("folder", folder);
  SCRIPT_PROP.setProperty("email", email);
  return 'Input Data<br>Email: ' + email + '<br>Folder: ' + folder;
}

function getEmailBySession() {
  return Session.getActiveUser().getEmail();    
}

// 웹 앱에서 Create Folder 버튼을 클릭해서 team 폴더 만들기
// https://developers.google.com/apps-script/guides/html/communication
function teamFolder() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var email = scriptProperties.getProperty('email');
  var strFolder = scriptProperties.getProperty('folder');  
  var root = DriveApp.getRootFolder();  
  var getFolders = root.getFoldersByName(strFolder);
  if (getFolders.hasNext()) {
    var folder = getFolders.next();  
  } else {
    var folder = root.createFolder(strFolder);
    folder.addEditor(email);
  }    
  return folder.getName();
}
 
/** ======================================================
 * HTML Service: Create and Serve HTML
 * https://developers.google.com/apps-script/guides/html/
 */
function doGet () {  
  return HtmlService.createHtmlOutputFromFile('Index')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}