import React, { useState, useEffect, useRef } from "react";
import Head from 'next/head'
import Image from 'next/image'
import SocketIOClient from "socket.io-client";
import Chat from "./components/Chats";
import ButtonAction from "./components/ButtonAction";

import CustomInput from "./components/CustomInput";

interface IMsg {
  user: string;
  msg: string;
}

// create random user
const user = "User_" + String(new Date().getTime()).substr(-3);

export default function Home() {
  const inputRef = useRef(null);
  // connected flag
  const [connected, setConnected] = useState<boolean>(false);

  // init chat and message
  const [chat, setChat] = useState<IMsg[]>([]);
  const [msg, setMsg] = useState<string>("");

  useEffect((): any => {
    // connect to socket server
    // @ts-ignore
    const socket = SocketIOClient.connect(process.env.BASE_URL, {
      path: "/api/socket",
    });

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    // update chat on new message dispatched
    socket.on("message", (message: IMsg) => {
      setChat((chat) => [...chat, message]);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  const sendMessage = async () => {
    if (msg) {
      // build message obj
      const message: IMsg = {
        user,
        msg,
      };

      // dispatch message to other users
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      // reset field if OK
      if (resp.ok) setMsg("");
    }

    // focus after click
    // @ts-ignore
    inputRef?.current?.focus();
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="py-4 text-[#9580ff] border-2 border-[#9580ff] bg-gray-600 sticky top-0">
        <h1 className="text-center text-2xl font-semibold">Realtime Chat App</h1>
        <h2 className="mt-2 text-center">with Next.js and Socket.io</h2>
      </div>
      <div className="flex flex-col flex-1 bg-gray-800">
        <Chat
          chat={chat}
          user={user} />

        <div className="bg-gray-600 p-4 h-20 sticky bottom-0">
          <div className="flex flex-row flex-1 h-full divide-gray-200 divide-x">
            <CustomInput
              inputRef={inputRef}
              msg={msg}
              onChange={(e: any) => {
                setMsg(e.target.value);
              }}
              onKeyPress={(e: any) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              connected={connected} />

            <ButtonAction
              onClick={sendMessage}
              connected={connected} />

          </div>
        </div>

      </div>
    </div>
  )
}
