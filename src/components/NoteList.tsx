import React, { useMemo, useState } from "react";
import { RawNote, Tag, Note } from "../App";
import ReactSelect from "react-select";
import NoteCard from "./NoteCard";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
};

export default function NoteList({ availableTags, notes }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" || note.title.includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.value === tag.value)
          ))
      );
    });
  }, [selectedTags, notes, title]);
  return (
    <div className="container">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Notes</h1>
        <div className="w-full mt-4 flex justify-end gap-4">
          <button
            type="button"
            className="py-4 px-6 border border-gray-700 rounded-md bg bg-blue-600 text-gray-200 hover:bg-blue-800 hover:border-gray-400"
          >
            Create
          </button>
          <button
            type="button"
            className="py-4 px-6 border border-gray-700 rounded-md bg bg-gray-400 text-gray-200 hover:bg-gray-800 hover:border-gray-400"
          >
            Edit Tags
          </button>
        </div>
      </div>
      <div className="mt-4">
        <form className="flex flex-wrap w-full">
          <div className="flex justify-evenly w-full">
            <div className="flex flex-col pr-4 w-full">
              <label className="text-xl font-medium">Title</label>
              <input
                type="text"
                name="title"
                placeholder="title"
                className="border border-gray-300 rounded-md p-4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col pr-4 w-full">
              <label className="text-xl font-medium">Tags</label>
              <ReactSelect
                value={selectedTags}
                options={availableTags}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, value: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </div>
          </div>
        </form>
      </div>
      <div className="mt-10 flex justify-between flex-wrap">
        {filteredNotes.map((filteredNote) => {
          return <NoteCard note={filteredNote} />;
        })}
      </div>
    </div>
  );
}
