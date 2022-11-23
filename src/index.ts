import { server } from "./server/server";

server.listen(process.env.PORT || 3001, () => {
  console.log(`App is running on the port ${process.env.PORT}`);
});
