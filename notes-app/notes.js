const fs = require("fs");
const chalk = require("chalk");

// Notes-app utilities

const addNote = (title, body) => {
  const existingNotes = loadNotes();
  const duplicateNote = existingNotes.find(note => note.title === title);
  if (duplicateNote) {
    console.log("Title already taken!");
  } else {
    existingNotes.push({ title, body });
    saveNotes(existingNotes);
  }
};

const removeNote = title => {
  let existingNotes = loadNotes();
  const noteExists = existingNotes.find(note => note.title === title);
  if (noteExists) {
    existingNotes = existingNotes.filter(note => note.title !== title);
    saveNotes(existingNotes);
    console.log(chalk.green.inverse("Note removed!"));
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

const readNote = title => {
  const existingNotes = loadNotes();
  const concernedNote = existingNotes.filter(note => note.title === title);
  if (concernedNote.length > 0) {
    return concernedNote[0].body;
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

const listNotes = () => {
  const existingNotes = loadNotes();
  debugger
  existingNotes.forEach(note => console.log(note.title));
};

// Helper functions

const loadNotes = () => {
  try {
    const notesBuffer = fs.readFileSync("notes.json");
    const notesJSON = JSON.parse(notesBuffer.toString());
    return notesJSON;
  } catch (err) {
    return [];
  }
};

const saveNotes = notes => {
  fs.writeFileSync("notes.json", JSON.stringify(notes));
};

// Exports

module.exports = { addNote, listNotes, removeNote, readNote };
