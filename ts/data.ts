interface JournalEntry {
  entryId: number;
  title: string;
  photoUrl: string;
  content: string;
}

interface Data {
  view: string;
  entries: JournalEntry[];
  editing: null | JournalEntry;
  nextEntryId: number;
}

const defaultData = {
  view: 'entry-form',
  entries: [] as JournalEntry[],
  editing: null,
  nextEntryId: 1,
};

function writeData(): void {
  localStorage.setItem('journalData', JSON.stringify(data));
}

function readData(): Data {
  const jsonData = localStorage.getItem('journalData');
  return jsonData ? JSON.parse(jsonData) : defaultData;
}

const data: Data = readData();
