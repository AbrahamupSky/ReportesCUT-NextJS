import axios from "axios";
import Buttons from "./Buttons";

async function loadReport(reportId){
  const { data } = await axios.get(
    "http://localhost:3000/api/reports/" + reportId
  )
  return data
}

async function ReportPage({ params }) {
  const report = await loadReport(params.id)
  console.log(report)
  
  return (
    <section className="flex justify-center">
      <div className="bg-white rounded-lg p-10 text-gray-600">
        <h1>Nombre: {report.name}</h1>
        <p>Descripcion: {report.description}</p>
        <p>Academia: {report.academy}</p>
        <p>Curso: {report.course}</p>
        <p>Ciclo: {report.cycle}</p>

        <Buttons reportId={report.id} />
      </div>
    </section>
  )
}

export default ReportPage