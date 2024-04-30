import React, { useMemo, SetStateAction } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import NewNote from "./components/NewNote";
import { v4 as uuidv4 } from "uuid";
import NoteList from "./components/NoteList";

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type Tag = {
  label: string;
  value: string;
};

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.value)),
      };
    });
  }, [notes, tags]);

  function onCreation({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.value) },
      ];
    });
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  return (
    <div className="m-10">
      <Routes>
        <Route
          path="/"
          element={<NoteList availableTags={tags} notes={notesWithTags} />}
        ></Route>
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreation}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        ></Route>
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
