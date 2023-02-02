import React, { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([] as string[]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const sender = getSender();
    //auto scroll
    document
      .getElementById("messages")
      ?.scrollTo(0, document.getElementById("messages")?.scrollHeight || 0);
    //
    setMessages([...messages, `${sender}: ${currentMessage}`]);
    setCurrentMessage("");
  };

  const getSender = () => {
    return "gracz1";
  };

  return (
    <div className="h-1/3 flex justify-center mt-5">
      <div className=" w-11/12 h-full flex flex-col gap-2">
        <div
          id="messages"
          className=" h-2/3 max-h-2/3 overflow-y-auto bg-white border-2 border-myBlack rounded-xl p-4"
        >
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <form className="w-full flex gap-4" onSubmit={handleSubmit}>
          <input
            className="w-9/12 h-8 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
            type="text"
            value={currentMessage}
            onChange={(event) => setCurrentMessage(event.target.value)}
          />
          <button
            className="h-8 text-center w-1/6 font-semibold border-2 border-myBlack rounded-lg"
            type="submit"
          >
            Wyślij
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
