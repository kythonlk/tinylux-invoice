export default function InvoiceActions ({ generatePDF, clearData, sharePDF }) {
  return(
  <div className="flex gap-4">
    <button onClick={generatePDF} className="bg-green-500 text-white p-2 rounded">
      Generate PDF
    </button>
    <button onClick={sharePDF} className="bg-blue-500 text-white p-2 rounded">
      Share PDF
    </button>
    <button onClick={clearData} className="bg-red-500 text-white p-2 rounded">
      Clear Data
    </button>
  </div>
  )
};