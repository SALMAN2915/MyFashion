function doGet(e){
  const page = e.parameter.page;
  if (page === 'login') return HtmlService.createTemplateFromFile('html/login').evaluate();
  if (page === 'signup') return HtmlService.createTemplateFromFile('html/signup').evaluate();
  if (page === 'admin') return HtmlService.createTemplateFromFile('html/admin').evaluate();
  return HtmlService.createTemplateFromFile('html/index').evaluate();
}

function include(filename) { return HtmlService.createHtmlOutputFromFile(filename).getContent(); }

function AddRecord(fullname, username, password, email, phone, gender, stylePref, dob) {
  const ss = SpreadsheetApp.openById('YOUR_SHEET_ID');
  const sheet = ss.getSheetByName('DATA');
  sheet.appendRow([fullname, username, password, email, phone, gender, stylePref, dob, new Date()]);
}

function checkLogin(username, password) {
  const ss = SpreadsheetApp.openById('YOUR_SHEET_ID');
  const rows = ss.getSheetByName('DATA').getDataRange().getValues();
  for (let i=1;i<rows.length;i++){
    if (rows[i][1]===username && rows[i][2]===password) return 'TRUE';
  }
  return 'FALSE';
}

function getAdminStats(){
  const ss = SpreadsheetApp.openById('YOUR_SHEET_ID');
  const users = ss.getSheetByName('DATA').getDataRange().getValues();
  const orders = ss.getSheetByName('Orders').getDataRange().getValues();
  const today = new Date().setHours(0,0,0,0);

  const total = users.length - 1;
  const newToday = users.slice(1).filter(r=> new Date(r[8]).setHours(0,0,0,0)===today).length;
  const active = 0; // optional
  const pending = orders.slice(1).filter(r=> r[2]==='Pending').length;

  return {
    labels: ['Total Users','New Today','Active','Pending Orders'],
    data: [total,newToday,active,pending]
  };
}
