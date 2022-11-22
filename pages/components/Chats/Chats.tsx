import React from 'react'

import ChatMessage from './ChatMessage'

interface IMsg {
  user: string;
  msg: string;
}
type Props = {
  chat: IMsg[]
  user: string
}

function Chat({chat, user} : Props) {
  return (
    <div className="flex-1 p-4 font-mono">
          {chat?.length ? (
            chat.map((chat, i) => (
             <ChatMessage key={"msg_" + i} chat={chat} user={user} />
            ))
          ) : (
            <div className="text-sm text-center text-gray-400 py-6">
              No chat messages
            </div>
          )}
        </div>
  )
}

export default Chat
