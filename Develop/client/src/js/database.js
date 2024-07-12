import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');
  const textEditorDB = await openDB('jate', 1);
  const transVariable = textEditorDB.transaction('jate', 'readwrite');
  const storeVariable = transVariable.objectStore('jate');
  const request = storeVariable.put({ id: 1, value: content })
  const result = await request;
  console.log('Data saved to the database', result.value);
}


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  const itorDB = await openDB('jate', 1);
  const transVariable = textEditorDB.transaction('jate', 'readonly');
  const storeVariable = transVariable.objectStore('jate');
  const request = storeVariable.getAll(); 
  const result = await request;
  console.log('result.value', result);
  return result;
  
}
initdb();
