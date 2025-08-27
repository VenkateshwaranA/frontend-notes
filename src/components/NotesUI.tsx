"use client";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

interface tokenType {
  email: string;
  id: string;
  userName: string;
}

function NotesUI() {
  const [listAllNotes, setListAllNotes] = useState();
  const token = localStorage.getItem("token") as string;
  const decoded: tokenType = jwtDecode(token);

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const notesResp = await axios.get(
          `${process.env.NEXT_PUBLIC_BE_URL}/notes/${decoded.id}`
        );

        console.log({ notesResp });
        setListAllNotes(notesResp.data);
      } catch (error) {
        console.log("Error in fetch notes", error);
      }
    };
    fetchAllNotes();
  }, []);

  return <div>{listAllNotes ? <></> : <></>}</div>;
}

export default NotesUI;
