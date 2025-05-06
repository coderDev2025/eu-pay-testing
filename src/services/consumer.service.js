import { getPartnerAccessToken } from './linkcy.service.js';

// ✅ CREATE CONSUMER + SEND OTP
export async function createConsumer(userData) {
  try {
    const token = getPartnerAccessToken();

    const response = await fetch(`${process.env.LINKCY_BASE_URL}/api/partner/consumers`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    console.log(data)
    if (!response.ok) {
      throw new Error(data.message || 'Consumer creation failed');
    }

    // Send OTP immediately after creation
    await sendOTP(data.id);
    console.log(`✅ Consumer created and OTP sent: ${data.id}`);
    
    return data;

  } catch (error) {
    console.error('❌ Error in createConsumer:', error.message);
    throw error;
  }
}

// ✅ SEND OTP
async function sendOTP(consumerId) {
  const response = await fetch(`${process.env.LINKCY_BASE_URL}/api/partner/verifications/phone/send`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getPartnerAccessToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ consumerId })
  });

    const data = await response.json();
    console.log(`📲 OTP sent successfully to consumer ${consumerId}`);
    return { message: "OTP sent successfully" };
}

// ✅ VERIFY OTP
export async function verifyOTP(consumerId, code) {
  const response = await fetch(`${process.env.LINKCY_BASE_URL}/api/partner/verifications/phone/verify`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getPartnerAccessToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ consumerId, code })
  });

  if (response.status === 204) {
    console.log(`🔐 OTP verified for consumer ${consumerId}`);
    return { message: "OTP verified successfully" };
  }

  const error = await response.json();
  throw new Error(error.message || 'OTP verification failed');
}

// ✅ GET CONSUMER INFO BY ID
export async function getConsumerInformationById(consumerId) {
  try {
    const resp = await fetch(`${process.env.LINKCY_BASE_URL}/api/partner/consumers/${consumerId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getPartnerAccessToken()}`
      }
    });

    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(data.message || 'Failed to fetch consumer data');
    }

    console.log(`📋 Retrieved consumer info: ${consumerId}`);
    return data;

  } catch (error) {
    console.error(`❌ Error while getting consumer info: ${error.message}`);
    throw error;
  }
}
