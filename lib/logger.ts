import pino from "pino";

const { PINO_LOG_LEVEL } = process.env;
// const isProd = NODE_ENV === "production";

const logger = pino({
  level: PINO_LOG_LEVEL || "info",
  // ...(!isProd && {
  //   transport: {
  //     target: "pino-pretty",
  //   },
  // }),
});

export default logger;
