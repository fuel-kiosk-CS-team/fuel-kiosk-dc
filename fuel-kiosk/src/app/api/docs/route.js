import { NextResponse } from 'next/server';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fuel Kiosk API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Fuel Kiosk application',
    },
    servers: [
      {
        url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
        description: 'API Server',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'session',
        },
      },
    },
  },
  apis: ['./src/app/api/**/*.js'], // Path to the API docs
};

export async function GET() {
  try {
    const spec = swaggerJsdoc(options);
    return NextResponse.json(spec);
  } catch (error) {
    console.error('Error generating Swagger documentation:', error);
    return NextResponse.json({ error: 'Failed to generate documentation' }, { status: 500 });
  }
} 