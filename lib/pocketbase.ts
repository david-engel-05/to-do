import PocketBase from "pocketbase";

export function createPB() {
  return new PocketBase(process.env.PB_URL);
}