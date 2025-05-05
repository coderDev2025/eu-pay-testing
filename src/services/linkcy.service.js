import env from "dotenv"
env.config();


let partnerAccessToken = null;
let partnerRefreshToken = null;

export function getPartnerAccessToken() {
  return partnerAccessToken;
}
export function getPartnerRefreshToken() {
  return partnerRefreshToken;
}


export async function partnerLogin(){
try {
    const response = await fetch(`${process.env.LINKCY_BASE_URL}/api/partner/login`,{
        method:"POST",
        body:JSON.stringify({
            partnerName:process.env.LINKCY_PARTNER_NAME,
            username:process.env.LINKCY_USERNAME,
            password:process.env.LINKCY_PASSWORD,
        }),
        headers:{
            'Content-Type': 'application/json',
        }
    })

    const data = await response.json();
    if (response.status === 200 && data.token) {
        partnerAccessToken = data.token; 
        partnerRefreshToken = data.refreshToken;
        console.log('Partner login successful!');
      } else {
        console.error('Partner login failed:', data);
      }  
} catch (error) {
    console.error('Error logging in as partner:', error);
}
} 

export async function refreshPartnerToken() {
    try {
         
        const response =  await fetch(`${process.env.LINKCY_BASE_URL}/api/partner/refresh`,{
            body:
                JSON.stringify({
                    refreshToken:partnerRefreshToken
                })
            ,
            headers:{
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json();
        if (response.status === 200 && data.token) {
            console.log(data)
            partnerAccessToken = data.token; 
            partnerRefreshToken = data.refreshToken;
            console.log("Token refreshed!");
        } else {
            console.error("Token refresh failed:", data);
        }  


    } catch (error) {
        console.error("Error refreshing token:", error);

    }
}

