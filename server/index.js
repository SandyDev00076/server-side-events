const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

const PORT = 4600;

const STRING_TO_ANIMATE =
  "This is the long string which will be sent as chunks of data to the client via SSE";

app.get("/events", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const partsOfString = STRING_TO_ANIMATE.split(" ");

  let index = 0;

  const interval = setInterval(() => {
    res.write(`event: receiveWord\ndata: ${partsOfString[index]}\n\n`);
    ++index;
    if (index === partsOfString.length) {
      res.write("event:stop\n\n");
      clearInterval(interval);
    }
  }, 1000);

  req.on("close", () => {
    clearInterval(interval);
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
