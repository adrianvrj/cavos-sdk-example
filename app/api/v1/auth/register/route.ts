import { NextRequest, NextResponse } from 'next/server';
import { CavosAuth } from 'cavos-service-sdk';


export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Aquí puedes agregar la lógica para registrar el usuario
    CavosAuth.signUp(
        email,
        password,
        process.env.CAVOS_API_KEY || ''
    )

    return NextResponse.json(
      { message: 'Usuario registrado exitosamente.' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error procesando la solicitud.' },
      { status: 500 }
    );
  }
}