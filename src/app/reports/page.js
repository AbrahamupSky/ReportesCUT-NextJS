import ReportCard from "@/components/ReportCard";
import { conn } from "@/libs/mysql";
import axios from "axios";

async function loadReports() {
  const { data } = await axios.get('http://localhost:3000/api/reports')
  return data
}

async function ReportsPage() {
  const reports = await loadReports()
  console.log(reports)

  return (
    <div className="grid gap-4 grid-cols-4">
      {reports.map(report => (
        <ReportCard report={report} key={report.id} />
      ))}
    </div>
  )
}

export default ReportsPage