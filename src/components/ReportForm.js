"use client"
import { useState, useRef, useEffect } from "react"
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

import React from 'react'

function ReportForm() {
  const [reports, setReport] = useState({
    name: "",
    description: "",
    academy: "",
    course: "",
    cycle: ""
  })
  const [file, setFile] = useState(null)

  const form = React.useRef(null)
  const router = useRouter()
  const params = useParams()

  const handleChange = e => {
    setReport({
      ...reports,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (params.id){
      axios.get('/api/reports/' + params.id).then(res => {
        setReport({
          name: res.data.name,
          description: res.data.description,
          academy: res.data.academy,
          course: res.data.course,
          cycle: res.data.cycle
        })
      })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!params.id){
      const formData = new FormData()
      formData.append('name', reports.name)
      formData.append('description', reports.description)
      formData.append('academy', reports.academy)
      formData.append('course', reports.course)
      formData.append('cycle', reports.cycle)
      formData.append('file', file)

      if (file) {
        formData.append('file', file)
      }

      const res = await axios.post('/api/reports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(res)
      form.current.reset()
    } else {
      const res = await axios.put('/api/reports/' + params.id, reports)

      console.log(res)
    }

    router.push('/reports')
    router.refresh()
  }

  return (
    <div className="flex">
      <form ref={form} onSubmit={handleSubmit} className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
        <label 
          htmlFor="Nombre del reporte"
          className="block text-gray-700 text-sm font-bold mb-2"
        >Nombre del reporte</label>
        <input
          name="name"
          type="text" 
          placeholder="Nombre del reporte" 
          onChange={handleChange}
          value={reports.name}
          className="shadow text-gray-950 appearance-none border rounded w-full py-2 px-2"
          autoFocus
        />

        <label 
          htmlFor="Descripcion del reporte"
          className="block text-gray-700 text-sm font-bold mb-2"
        >Descripcion del reporte</label>
        <textarea
          name="description"
          row="3" 
          placeholder="Descripcion del reporte" 
          onChange={handleChange}
          value={reports.description}
          className="shadow text-gray-950 appearance-none border rounded w-full py-2 px-2"
        />

        <label 
          htmlFor="Academia del reporte"
          className="block text-gray-700 text-sm font-bold mb-2"
        >Academia</label>
        <input
          name="academy"
          type="text" 
          placeholder="Academia del reporte" 
          onChange={handleChange}
          value={reports.academy}
          className="shadow text-gray-950 appearance-none border rounded w-full py-2 px-2"
        />

        <label 
          htmlFor="Curso del reporte"
          className="block text-gray-700 text-sm font-bold mb-2"
        >Curso</label>
        <input 
          name="course"
          type="text" 
          placeholder="Curso del reporte" 
          onChange={handleChange}
          value={reports.course}
          className="shadow text-gray-950 appearance-none border rounded w-full py-2 px-2"
        />

        <label 
          htmlFor="Ciclo del reporte"
          className="block text-gray-700 text-sm font-bold mb-2"
        >Ciclo</label>
        <input 
          name="cycle"
          type="text" 
          placeholder="Ciclo del reporte" 
          onChange={handleChange}
          value={reports.cycle}
          className="shadow text-gray-950 appearance-none border rounded w-full py-2 px-2"
        />

        <label 
          htmlFor="Ciclo del reporte"
          className="block text-gray-700 text-sm font-bold mb-2"
        >Subir Evidencia</label>
        <input 
          type="file" 
          className="shadow text-gray-950 appearance-none border rounded w-full py-2 px-2 mb-2"
          onChange={(e) => {
            setFile(e.target.files[0])
          }}
        />

      {/* {file && (
        <div className="w-full h-72">
          {file.type.startsWith('image/') ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="bg-white shadow-md rounded-md px-4 pt-2 pb-4 mb-2 w-full h-full object-contain"
            />
          ) : (
            <object
              data={URL.createObjectURL(file)}
              type={file.type}
              className="bg-white rounded px-2 pt-2 pb-2 w-full h-full object-contain"
            >
              <p>Archivo PDF: {file.name}</p>
            </object>
          )}
        </div>
      )} */}

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {params.id ? "Actualizar" : "Crear"}
        </button>
      </form>

      {file && (
        <div className="w-2/4 h-96 mx-4 jstify-center align-middle transform transition">
          {file.type.startsWith('image/') ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="bg-white shadow-md rounded-md px-4 pt-2 pb-4 mb-2 w-full h-full object-contain"
            />
          ) : (
            <object
              data={URL.createObjectURL(file)}
              type={file.type}
              className="bg-white rounded px-2 pt-2 pb-2 w-full h-full object-contain"
            >
              <p>Archivo PDF: {file.name}</p>
            </object>
          )}
        </div>
      )}
    </div>
  )
}

export default ReportForm