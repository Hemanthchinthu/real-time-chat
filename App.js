
import React, { useEffect, useRef, useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');
    ws.current.onmessage = (e) => setMessages((prev) => [...prev, e.data]);
    return () => ws.current.close();
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      ws.current.send(input);
      setInput('');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded w-full max-w-md h-[500px] flex flex-col">
        <div className="p-4 border-b font-bold">Real-Time Chat</div>
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {messages.map((msg, idx) => (
            <div key={idx} className="bg-gray-200 rounded p-2">{msg}</div>
          ))}
        </div>
        <div className="flex border-t">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-2 outline-none"
          />
          <button onClick={sendMessage} className="bg-blue-500 text-white px-4">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
