import express from "express";
import fetch from "node-fetch";

const app = express();
const PLACE_ID = 606849621;

app.get("/", async (req, res) => {
  const api = `https://games.roblox.com/v1/games/${PLACE_ID}/servers/Public?sortOrder=Asc&excludeFullGames=true&limit=100`;
  const data = await fetch(api).then(r => r.json());

  const valid = data.data.find(s => s.playing > 0 && s.playing <= (s.maxPlayers - 4));
  if (!valid) return res.send("No valid job found");

  res.send(valid.id); // <-- plain text output
});

app.listen(3000, () => console.log("Server running"));
