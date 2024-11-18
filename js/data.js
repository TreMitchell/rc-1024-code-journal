'use strict';
const defaultData = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
function writeData() {
  localStorage.setItem('journalData', JSON.stringify(data));
}
function readData() {
  const jsonData = localStorage.getItem('journalData');
  return jsonData ? JSON.parse(jsonData) : defaultData;
}
const data = readData();
