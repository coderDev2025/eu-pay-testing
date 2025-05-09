import jwt from "jsonwebtoken"
import { getPartnerAccessToken, refreshPartnerToken } from "../services/linkcy.service.js";

export async function ensureToken(req,res,next) {
    try {
        let token = getPartnerAccessToken();
    
        if(!token){
            console.warn("🔐 No partner access token found. Attempting to refresh...");
            await refreshPartnerToken();
            token = getPartnerAccessToken();
        }
        const decoded = jwt.decode(token);
        const now = Math.floor(Date.now() / 1000);

        if (decoded?.exp && decoded.exp < now) {
            console.warn("🔁 Partner token expired. Refreshing...");
            await refreshPartnerToken();
            token = getPartnerAccessToken();
          }
          req.partnerAccessToken = token;
          
          next();

    } catch (error) {
        next(error)
    }
}