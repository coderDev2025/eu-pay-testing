import { getPartnerAccessToken } from "./linkcy.service.js";

export async function createLedger(consumerId,selectedType="EUR_BELGIUM") {
        const resp = await fetch(
            `https://api.sandbox.linkcy.cloud/api/partner/ledgers`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getPartnerAccessToken()}`
              },
              body: JSON.stringify({
                endUserId: consumerId,
                type: selectedType,
                autoUpgrade: true,
                friendlyName: 'jhon'
              })
            }
          );
    
          const data = await resp.json();
        if(resp.status==201){
          return data;
        }
        console.log(data);
          
        return ;
          
}