"use client"
import axios from 'axios'
import { useRouter } from "next/navigation";

function Buttons({reportId}) {
  const router = useRouter()

  return (
    <div className="flex gap-4 justify-end mt-2">
      <button 
        className="bg-red-500 text-white hover:bg-red-700 py-2 px-4 rounded"
        onClick={async () => {
          if (confirm('Are you sure you want to delete this report?')) {
            const res = await axios.delete('/api/reports/' + reportId)
            console.log(res)
            if (res.status === 204) {
              router.push('/reports')
              router.refresh()
            }
          }
        }}
      >
        Delete
      </button>

      <button 
        className="bg-blue-500 text-white hover:bg-blue-700 py-2 px-4 rounded"
        onClick={() => {
          router.push(`/reports/edit/${reportId}`);
        }}
      >
        Edit
      </button>
    </div>
  )
}

export default Buttons