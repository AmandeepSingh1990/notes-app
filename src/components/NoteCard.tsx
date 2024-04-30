import React from "react";
import { RawNote, Note } from "../App";

type NoteCardProps = {
  note: Note;
};

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <div className="w-[49%] mt-4">
      <div className="border border-gray-400 rounded-md flex flex-col justify-center items-center p-10 hover:shadow-sm hover:shadow-gray-600 hover:scale-[101%]">
        <h4 className="text-xl">{note.title}</h4>
        <div className="flex gap-1">
          {note.tags.map((tag) => {
            return (
              <span className="border border-blue-500 rounded-xl text-white px-2 py-1 bg bg-blue-500">
                {tag.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
