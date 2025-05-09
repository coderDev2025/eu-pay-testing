import { getPartnerAccessToken } from "./linkcy.service.js";

export async function createKycRequest(userLinkcyId) {
    try {
        const resp = await fetch(
            `https://api.sandbox.linkcy.cloud/api/partner/kyc`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getPartnerAccessToken()}`
              },
              body: JSON.stringify({
                "consumerId": userLinkcyId,
                "kycConfiguration": {
                  "accessType": "LINK",
                  "urlOnComplete": "https://google.com",
                  "urlOnFailure": "https://yourapp.com/kyc-failure"
                }
              }
              )
            }
        );
       
        // if(resp.status==201){
            const data =  await resp.json()
            console.log(data)
            return data
        // }
        
        // return new Error (data.message||"something went wrong")
       
          
    } catch (error) {
        throw new Error(error.message||"error while creating document request")
    }
}

export async function updateKycStatus(consumerId) {
    const resp = await fetch(
      `https://api.sandbox.linkcy.cloud/api/partner/kyc/simulate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getPartnerAccessToken()}`
        },
        body: JSON.stringify({
          consumerId: consumerId,
          kycStatus: 'VALIDATED'
        })
      }
    );
    
    const data = await resp.json();
     console.log(data)
     return data
  
}

export async function getKycStatus(kycId) {
  const resp = await fetch(
    `https://api.sandbox.linkcy.cloud/api/partner/kyc/${kycId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getPartnerAccessToken()}`
      }
    }
  );
  
  const data = await resp.json();
  return data
  
}

export async function checkKycStatus() {
  const query = new URLSearchParams({
    sortAttribute: 'CREATION_DATE',
    personType: 'CONSUMER',
    pageSize: '100',
    page: '0',
    sortDirection: 'ASC'
  }).toString();
  
  const resp = await fetch(
    `https://api.sandbox.linkcy.cloud/api/partner/kyc?${query}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getPartnerAccessToken()}`
      }
    }
  );
  const data = await resp.json();
  console.log(data);
}