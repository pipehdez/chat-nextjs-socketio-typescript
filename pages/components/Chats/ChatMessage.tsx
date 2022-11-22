import React from 'react'

interface IMsg {
    user: string;
    msg: string;
}

type Props = {
    chat: IMsg
    user: string
}

function ChatMessage({ chat, user }: Props) {
    return (
        <div className="my-4">
            <span
                className={chat.user === user ? 'text-[#80ffea]' : 'text-[#8aff80]'}
            >
                {chat.user === user ? "Me" : chat.user}
            </span>
            : 
            {
                chat.user === user ?  (
                    <span className="text-[#80ffea] rounded px-10 py-1 mx-1 bg-[#6c7393] border-[#80ffea] border-2">{chat.msg}</span>
                ) : (
                    <span className="text-[#8aff80] rounded px-10 py-1 mx-1 bg-[#6c7393] border-[#8aff80] border-2">{chat.msg}</span>
                )
            }
        </div>
    )
}

export default ChatMessage