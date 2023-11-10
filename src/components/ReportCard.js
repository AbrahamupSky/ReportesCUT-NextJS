import Link from "next/link";

function ReportCard({ report }) {
  return (
    <Link
      key={report.id} 
      className="bg-white rounded-lg border-gray-800 mb-3 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer"
      href={`/reports/${report.id}`}
    >
        <h1 className="text-gray-800 font-bold">{report.name}</h1>
        <p className="text-gray-800">{report.description}</p>
        <p className="text-gray-800">{report.academy}</p>
        <p className="text-gray-800">{report.course}</p>
        <p className="text-gray-800">{report.cycle}</p>
    </Link>
  )
}

export default ReportCard