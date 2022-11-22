interface Props {
    connected: boolean
    onClick: any
}

function ButtonAction({ connected, onClick }: Props) {
    return (
        <div className="flex flex-col justify-center items-stretch pl-2 w-2/12">
            <button
                className="bg-[#9580ff] border-2 rounded shadow text-sm text-white h-full px-2 hover:bg-white hover:text-[#9580ff] hover:border-[#9580ff]"
                onClick={onClick}
                disabled={!connected}
            >
                SEND
            </button>
        </div>
    )
}

export default ButtonAction