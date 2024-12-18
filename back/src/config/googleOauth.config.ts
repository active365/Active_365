import { registerAs } from "@nestjs/config";

export default registerAs("googleOauth", () => ({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackForUsers: process.env.GOOGLE_CALLBACK_USERS_URL,
    callbackForGyms: process.env.GOOGLE_CALLBACK_GYMS_URL,
}));