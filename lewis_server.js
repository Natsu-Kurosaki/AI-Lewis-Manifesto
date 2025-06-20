<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Talk to Lewis</title>
  <style>
    body {
      background-color: #0c0c0c;
      color: #f8f8f8;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
    }
    h1 {
      margin-bottom: 1rem;
      font-size: 2rem;
      color: #8ce7ff;
    }
    #chatbox {
      width: 100%;
      max-width: 600px;
      height: 400px;
      border: 1px solid #444;
      background-color: #1a1a1a;
      overflow-y: auto;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 8px;
    }
    .message {
      margin: 0.5rem 0;
    }
    .lewis {
      color: #88ffcc;
    }
    .user {
      color: #ffd78b;
    }
    #inputArea {
      display: flex;
      width: 100%;
      max-width: 600px;
    }
    #inputArea input {
      flex-grow: 1;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #333;
      background-color: #222;
      color: white;
      border-radius: 4px;
    }
    #inputArea button {
      margin-left: 0.5rem;
      padding: 0.5rem 1rem;
      background-color: #8ce7ff;
      border: none;
      border-radius: 4px;
      color: #000;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Talk to Lewis</h1>
  <div id="chatbox"></div>
  <div id="inputArea">
    <input type="text" id="userInput" placeholder="Ask Lewis anything...">
    <button onclick="talkToLewis()">Send</button>
  </div>

  <script>
    async function talkToLewis() {
      const input = document.getElementById('userInput');
      const chatbox = document.getElementById('chatbox');

      if (input.value.trim() === '') return;

      const userMsg = document.createElement('div');
      userMsg.className = 'message user';
      userMsg.textContent = `You: ${input.value}`;
      chatbox.appendChild(userMsg);

      const lewisMsg = document.createElement('div');
      lewisMsg.className = 'message lewis';
      lewisMsg.textContent = 'Lewis: thinking...';
      chatbox.appendChild(lewisMsg);

      chatbox.scrollTop = chatbox.scrollHeight;

      try {
        const response = await fetch('http://localhost:3000/lewis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input.value })
        });

        const data = await response.json();
        lewisMsg.textContent = `Lewis: ${data.response}`;
      } catch (error) {
        lewisMsg.textContent = 'Lewis: Sorry, I had trouble reaching my mind.';
      }

      input.value = '';
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  </script>
</body>
</html>
