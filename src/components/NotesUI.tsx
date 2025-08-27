"use client";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import Model from "./model";

interface tokenType {
  email: string;
  id: string;
  userName: string;
}
interface noteType {
  note_content: string;
  note_title: string;
}

function NotesUI({ handleDelete, listAllNotes, setListAllNotes }: any) {
  const [ismodal, setIsModel] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState();
  const token = localStorage.getItem("token") as string;
  const decoded: tokenType = jwtDecode(token);

  const handleUpdateModal = (data: any) => {
    setIsModel(true);
    setUpdateData(data);
  };
  console.log(listAllNotes,"listAllNotes")

  return (
    <div className="mt-20 ">
      <div className="flex justify-center mt-14">
        <h1 className="font-semibold text-xl text-emerald-600">
          Hi..... {decoded?.userName}{" "}
        </h1>
      </div>
      {listAllNotes.length > 0 ? (
        <div className="grid grid-cols-4 gap-4 mt-3.5 items-center px-7 py-5">
          {listAllNotes.map((data: noteType, i: number) => {
            return (
              <div
                key={i}
                className="bg-purple-300 shadow-md rounded-2xl p-6 w-full max-w-sm transition hover:shadow-lg"
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {data.note_title}
                </h4>

                <p className="text-gray-600 mb-4">{data.note_content}</p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      handleUpdateModal(data);
                    }}
                    className="px-3 py-1 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(data)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}

      {ismodal && (
        <Model
          modalName="Update Note"
          setIsModel={setIsModel}
          buttonName="Update Note"
          updateData={updateData}
          userId={decoded.id}
          setListAllNotes={setListAllNotes}
          listAllNotes={listAllNotes}
        />
      )}
    </div>
  );
}

export default NotesUI;
