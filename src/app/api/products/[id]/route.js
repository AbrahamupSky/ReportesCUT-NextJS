import { NextResponse } from 'next/server'
import { conn } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const result = await conn.query('SELECT * FROM reportes WHERE id = ?', [params.id])

    if (result.length === 0) {
      return NextResponse.json(
        { 
          message: 'Reporte no encontrado' 
        }, 
        { 
          status: 404 
        })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    return NextResponse.json(
      { 
        message: error.message
      }, 
      { 
        status: 500 
      }
    )
  }
}

export async function DELETE() {
  const result = await conn.query('DELETE FROM reportes WHERE id = ?', [params.id])

  console.log(result)
  
  return new Response(null, {
    status: 204
  })
}

export function PUT() {
  return NextResponse.json({ message: 'Actualizando un reporte' })
}