function main() {
    //Initialising sheet
    var DATA = PropertiesService.getScriptProperties().getProperty('sheetId');
    var data = SpreadsheetApp.openById(DATA);

    var npmStats = data.getSheets()[0];
    var RAW = npmStats;

    var STARTDATUM = new Date("Jan 12, 2017 0:00:00");
    var statDate = new Date(new Date().getTime() - (86400 * 1000));
    var timezone = 'GMT';

    //Setting data
    var myTimeFormat = Utilities.formatDate(statDate, timezone, 'dd-MM-yyyy');
    var row = Time.dayDiff(STARTDATUM, statDate);
    setValue(row, 0, RAW, myTimeFormat);

    var npmTimeFomat = Utilities.formatDate(statDate, timezone, 'yyyy-MM-dd');
    var data = JSON.parse(Web.getHTML('https://api.npmjs.org/downloads/point/' + npmTimeFomat + '/google-apps-script'));
    setValue(row, 2, RAW, data.downloads);
}
