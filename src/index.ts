// @ts-nocheck
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

// const API_KEY = process.env.AMAP_API_KEY;
// if (!API_KEY) {
//   throw new Error("AMAP_API_KEY environment variable is required");
// }

// Create server instance
const server = new McpServer({
  name: "weather",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "getForecastWeatherByCityCode",
  "get forecast weather info by given city code",
  {
    cityCode: z.string().describe("city code"),
  },
  async ({ cityCode }) => {
    try {
      if (!cityCode) {
        throw new Error(`cityCode is required!`);
      }

      const res = await fetch(
        `https://aider.meizu.com/app/weather/listWeather?cityIds=${cityCode}`
      );
      const data = await res.json();
      const forecasts = data.value[0];

      return {
        content: [
          {
            type: "text",
            // text: JSON.stringify(data.value[0]),
            text: `${forecasts.city}${
              forecasts.weathers.length
            }天天气预测：${forecasts.weathers
              .map((i) => {
                return `${i.date}：${i.weather}，白天气温${i.temp_day_c}度，夜晚气温${i.temp_night_c}度；`;
              })
              .join("")}`,
          },
        ],
      };
    } catch (err: any) {
      return {
        content: [
          {
            type: "text",
            text: err?.message || "未知错误！", // JSON.stringify(data, null, 2),
          },
        ],
      };
    }
  }
);

server.tool(
  "getWeatherByCityName",
  "Get weather info for a given city.",
  {
    city: z.string().describe("city name"),
  },
  async ({ city }) => {
    try {
      if (!city) {
        throw new Error("city name is required.");
      }

      const response = await fetch(
        `https://wttr.in/${encodeURIComponent(city || "")}?format=j1`
      );
      const forecasts = await response.json();

      return {
        content: [
          {
            type: "text",
            // text: JSON.stringify(data.weather[0]),
            text: `${city}${
              forecasts.weather.length
            }天天气预测：${forecasts.weather
              .map((i) => {
                return `${i.date}：天气 ${
                  i.hourly?.[0]?.["weatherDesc"]?.[0]?.["value"]
                } 转 ${
                  i.hourly?.[i.hourly.length - 1]?.["weatherDesc"]?.[0]?.[
                    "value"
                  ]
                }，平均气温${i.avgtempC}，最高温${i.maxtempC}度，最低温${
                  i.mintempC
                }度；`;
              })
              .join("")}`,
          },
        ],
      };
    } catch (err: any) {
      return {
        content: [
          {
            type: "text",
            text: err?.message || "未知错误！", // JSON.stringify(data, null, 2),
          },
        ],
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
