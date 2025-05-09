import cron from 'node-cron';
import Consumer from '../models/consumer.model.js'; // adjust path
import { createLedger } from '../services/ledger.service.js'; // assume you have this
import { getPartnerAccessToken } from '../services/linkcy.service.js';

cron.schedule('*/1 * * * *', async () => {
  console.log("🔄 Running KYC status check...");

  try {
    const query = new URLSearchParams({
        sortAttribute: 'CREATION_DATE',
        personType: 'CONSUMER',
        kycStatus: 'VALIDATED',
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
      
      const response = await resp.json();
      

    const kycApps = response.content;



    for (const app of kycApps) {
      const { personId } = app;

      console.log(personId)

      const consumer = await Consumer.findOne({ linkcyId: personId });
          


      if (consumer && !consumer.ledgerCreated) {
        console.log(`✅ Validated KYC for ${consumer.firstName}. Creating ledger...`);

      const createdLedger =   await createLedger(consumer.linkcyId); 
     
      console.log(createdLedger)
        if(createdLedger){
            console.log(createdLedger)
            console.log("hjbjh")
            consumer.ledgerCreated = true;
        await consumer.save();
        }
      }
    }

  } catch (err) {
    console.error("❌ Cron job error:", err.response?.data || err.message);
  }
});
