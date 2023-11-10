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

export async function DELETE(request, {params}) {
  try {
    const result = await conn.query('DELETE FROM reportes WHERE id = ?', [params.id])

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { 
          message: 'Reporte no encontrado' 
        }, 
        { 
          status: 404 
        }
      )
    }
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

  return new Response( null, { status: 204 })
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json()
    const result = await conn.query('UPDATE reportes SET ? WHERE id = ?', [data, params.id])
    console.log(result)

    if (result.affectedRows === 0){
      return NextResponse.json(
        { 
          message: 'Reporte no encontrado' 
        }, 
        { 
          status: 404 
        }
      )
    }

    const updatedReport = await conn.query('SELECT * FROM reportes WHERE id = ?', [params.id])

    return NextResponse.json(updatedReport[0])
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