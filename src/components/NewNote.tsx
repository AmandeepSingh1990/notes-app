import React, { useState } from "react";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const OPTIONS = [
  { label: "react", value: "react" },
  { label: "typescript", value: "typescript" },
  { label: "tailwind", value: "tailwind" },
];

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export default function NewNote({
  onSubmit,
  onAddTag,
  availableTags,
}: NewNoteProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    onSubmit({ title, markdown, tags: selectedTags });

    navigate("..");
  };
  return (
    <div className="container">
      <h1 className="text-4xl">New Notes</h1>
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
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newtag = { value: uuidv4(), label: label };
                  onAddTag(newtag);
                  setSelectedTags((prev) => [...prev, newtag]);
                }}
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
          <div className="py-8 w-full">
            <label className="text-xl font-medium">Body</label>
            <textarea
              rows={15}
              className="w-full border border-gray-300 rounded-md p-4"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
            />
          </div>
          <div className="w-full mt-4 flex justify-end gap-4">
            <button
              type="button"
              className="py-4 px-6 border border-gray-700 rounded-md bg bg-blue-600 text-gray-200 hover:bg-blue-800 hover:border-gray-400"
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              type="button"
              className="py-4 px-6 border border-gray-700 rounded-md bg bg-gray-400 text-gray-200 hover:bg-gray-800 hover:border-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
