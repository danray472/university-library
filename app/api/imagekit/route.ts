import ImageKit from "imagekit";
import { NextResponse } from "next/server";
import config from "@/lib/config";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

// Log configuration (without sensitive data)
console.log('ImageKit Config:', {
  hasPublicKey: !!publicKey,
  hasPrivateKey: !!privateKey,
  urlEndpoint,
});

const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

export async function GET() {
  try {
    if (!publicKey || !privateKey || !urlEndpoint) {
      throw new Error('Missing required ImageKit configuration');
    }

    const authParams = imagekit.getAuthenticationParameters();
    
    return NextResponse.json(
      authParams,
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  } catch (error) {
    console.error('Detailed ImageKit authentication error:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    return NextResponse.json(
      { error: 'Failed to authenticate with ImageKit' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}
