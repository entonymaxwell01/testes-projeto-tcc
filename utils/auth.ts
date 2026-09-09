import fs from "fs";
import path from "path";

export function getAuthToken(): string {
  const authFile = path.resolve(__dirname, "../playwright/.auth/user.json");
  if (!fs.existsSync(authFile)) return "";
  const authData = JSON.parse(fs.readFileSync(authFile, "utf-8"));
  const origin = authData.origins[0];
  const tokenObj = origin?.localStorage.find(
    (item: any) => item.name === "@TCC:token",
  );
  return tokenObj ? tokenObj.value : "";
}
