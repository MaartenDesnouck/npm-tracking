function main() {
  // Initialising sheet
  var DATA = PropertiesService.getScriptProperties().getProperty('sheetId');
  var data = SpreadsheetApp.openById(DATA);

  var npmStats = data.getSheets()[0];
  var RAW = npmStats;

  var STARTDATUM = new Date("Jan 12, 2017 0:00:00");
  var statDate = new Date(new Date().getTime() - (86400 * 1000));
  var timezone = 'GMT';

  // Setting data
  var myTimeFormat = Utilities.formatDate(statDate, timezone, 'dd-MM-yyyy');
  var finalRow = time_dayDiff(STARTDATUM, statDate);
  sheet_setValue(finalRow, 0, RAW, myTimeFormat);

  // Populate interval
  row = finalRow - 5;
  while (row <= finalRow){
    var statDate = new Date(STARTDATUM.getTime() + (86400 * 1000 * (row-1)));
    var npmTimeFomat = Utilities.formatDate(statDate, timezone, 'yyyy-MM-dd');
    
    var data = JSON.parse(Web.getHTML('https://api.npmjs.org/downloads/point/' + npmTimeFomat + '/google-apps-script'));
    sheet_setValue(row, 1, RAW, data.downloads);
    var data = JSON.parse(Web.getHTML('https://api.npmjs.org/downloads/point/' + npmTimeFomat + '/node-google-apps-script'));
    sheet_setValue(row, 3, RAW, data.downloads);
    var data = JSON.parse(Web.getHTML('https://api.npmjs.org/downloads/point/' + npmTimeFomat + '/@google/clasp'));
    sheet_setValue(row, 5, RAW, data.downloads);
    
    row = row + 1;
  }
}
