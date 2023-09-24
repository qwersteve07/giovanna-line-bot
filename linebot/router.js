const https = require("https");
const Router = require("@koa/router");
const router = new Router();

const TOKEN =
  "hQPr0Gavcur1dAUQ4g/YC4BsLPL1ibUoQlZW3XxKhX5VFx3yJYd0kBx+DyVkq8+NRFYqHjJM0R1gnzkHmI4mikmqDlciNNl9Q0UT1LPq46MLTYD5amNDopOCEC9sKByAY+mqnZV69/PI/wiZ7J2OKQdB04t89/1O/w1cDnyilFU=";

router.get("/", () => {
  ctx.body = "index";
  ctx.status = 200;
});

router.post("/webhook", async (ctx) => {
  if (ctx.request.body.events.length === 0) {
    // webhook verification
    ctx.status = 200;
    return;
  }

  const { type, message, replyToken } = ctx.request.body.events[0];

  if (type === "message") {
    let messages = [];
    const { text } = message;

    const mentionText = ["嫂子", "gio", "余盈希"];

    const selectedMentionText = mentionText.find((x) => text.includes(x));

    if (text.match(`${selectedMentionText} 問 `)) {
      const question = text.replace(`${selectedMentionText} 問 `, "");
      const reply = await fetch("http://localhost:3003/query", {
        method: "POST",
        body: JSON.stringify({ query: question }),
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.text();
      });

      messages = [
        {
          type: "text",
          text: "要懂的自主思考，不要只是聽別人說。",
        },
        {
          type: "text",
          text: reply,
        },
      ];
    } else if (mentionText.some((item) => text.includes(item))) {
      //  receive message from backend

      messages = [
        {
          type: "text",
          text: "Emma 你東西處理好了沒？",
        },
      ];
    }

    const dataString = JSON.stringify({
      replyToken,
      messages,
    });

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + TOKEN,
    };

    // Options to pass into the request, as defined in the http.request method in the Node.js documentation
    const webhookOptions = {
      hostname: "api.line.me",
      path: "/v2/bot/message/reply",
      method: "POST",
      headers: headers,
      body: dataString,
    };

    const request = https.request(webhookOptions, (res) => {
      res.on("data", (d) => {
        process.stdout.write(d);
      });
    });

    // Handle error
    // request.on() is a function that is called back if an error occurs
    // while sending a request to the API server.
    request.on("error", (err) => {
      console.error(err);
    });

    // Finally send the request and the data we defined
    request.write(dataString);
    request.end();
  }
});

module.exports = router;
