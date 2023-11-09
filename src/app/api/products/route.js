import { NextResponse } from 'next/server'
import { conn } from "@/libs/mysql";

export async function GET() {
  try {
    const results = await conn.query('SELECT * FROM reportes;')
    return NextResponse.json(results)
  } catch (error) {
    console.log(error)
    return NextResponse.json({
        message: error.message
      },
      {
        status: 500
      }
    )
  }
}

export async function POST(request) {
  try{
    const { name, description, academy, course, cycle } = await request.json()

    const result = await conn.query('INSERT INTO reportes SET ?', {
      name,
      description,
      academy,
      course,
      cycle
    })

    return NextResponse.json({
      name,
      description,
      academy,
      course,
      cycle,
      id: result.insertId
    })
  } catch(error) {
    console.log(error)
    return NextResponse.json({
      message: 'Error creando reporte'
    },
    {
      status: 500
    })
  }
}