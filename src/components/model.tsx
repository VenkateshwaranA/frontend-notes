"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  title: string;
  content: string;
};

type props = {
  modalName: string;
  buttonName: string;
  userId?: string | undefined;
  updateData?: updateData;
  setIsModel: (value: boolean) => void;
  setListAllNotes?: any;
  listAllNotes?: any;
};

interface updateData {
  note_title: string;
  note_content: string;
  _id: string;
}

function Model({
  modalName,
  buttonName,
  userId,
  updateData,
  setIsModel,
  setListAllNotes,
  listAllNotes,
}: props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const handleClickButton: SubmitHandler<Inputs> = async (data) => {
    try {
      if (updateData) {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_BE_URL}/note/${updateData._id}`,
          {
            user_id: userId,
            note_title: data.title,
            note_content: data.content,
          }
        );
        setListAllNotes((prevNotes: any[]) =>
          prevNotes.map((note: any) => {
            return note._id?.toString() === res.data._id?.toString()
              ? {
                  ...note,
                  note_content: res.data.note_content,
                  note_title: res.data.note_title,
                }
              : note;
          })
        );

        setIsModel(false);
      } else {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BE_URL}/notes`,
          {
            user_id: userId,
            note_title: data.title,
            note_content: data.content,
          }
        );
        setIsModel(false);
      }
    } catch (error) {
      console.error("Error in buton Click", error);
    }
  };

  useEffect(() => {
    if (updateData) {
      setValue("title", updateData.note_title);
      setValue("content", updateData.note_content);
    }
  }, [setValue]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {modalName}
        </h2>

        <form onSubmit={handleSubmit(handleClickButton)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              {...register("title", {
                required: "Title is required",
              })}
              type="text"
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-amber-500"
              }`}
              placeholder="Enter email"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              {...register("content", {
                required: "Content is required",
              })}
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                errors.content
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-amber-500"
              }`}
              placeholder="Enter email"
            />
            {errors.content && (
              <p className="text-red-500 text-xs mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="w-full bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition"
            >
              {buttonName}
            </button>
            <button
              type="button"
              className="px-4 cursor-pointer py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              onClick={() => {
                setIsModel(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Model;
