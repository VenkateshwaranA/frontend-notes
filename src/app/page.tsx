"use client";
import Model from "@/components/model";
import NotesUI from "@/components/NotesUI";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface tokenType {
  email: string;
  id: string;
  userName: string;
}
export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState<tokenType>();
  const [isModel, setIsModel] = useState(false);
  const [listAllNotes, setListAllNotes] = useState([]);
  const fetchtoken = localStorage.getItem("token") as string;

  useEffect(() => {
    const gettoken = localStorage.getItem("token") as string;
    if (gettoken) {
      const decoded: tokenType = jwtDecode(gettoken);
      setToken(decoded);
    }
  }, []);

  const handleDelete = async (data: any) => {
    const userChoice = confirm("Are you sure you want to delete this item?");

    if (userChoice) {
      const notesResp = await axios.delete(
        `${process.env.NEXT_PUBLIC_BE_URL}/note/${data._id}`
      );
      setListAllNotes(
        listAllNotes.filter((x: any) => x._id !== notesResp.data._id)
      );
    } else {
      console.log("Nothig Do");
    }
  };

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const notesResp = await axios.get(
          `${process.env.NEXT_PUBLIC_BE_URL}/notes/${token?.id}`
        );

        console.log({ notesResp });
        setListAllNotes(notesResp.data);
      } catch (error) {
        console.log("Error in fetch notes", error);
      }
    };
    fetchAllNotes();
  }, [token, isModel]);
  console.log("listAllNotes",listAllNotes)
  return (
    <>
      {token ? (
        <>
          <div className="fixed w-full top-0 bg-blue-400 flex justify-end gap-5 text-black font-semibold text-xl p-4">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              LogOut
            </button>
            <button onClick={() => setIsModel(true)}>Add Note</button>
          </div>
          <NotesUI
            handleDelete={handleDelete}
            listAllNotes={listAllNotes}
            setListAllNotes={setListAllNotes}
          />
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-lg rounded-2xl p-8 w-96 text-center">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Sign in to your account or create a new one
            </h1>

            <div className="flex flex-col gap-4">
              <Link
                href="/signin"
                className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg  transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg  transition"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      )}

      {isModel && (
        <Model
          modalName="Add Note"
          setIsModel={setIsModel}
          buttonName="Add Note"
          userId={token?.id}
        />
      )}
    </>
  );
}
