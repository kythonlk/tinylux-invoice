export default function InvoiceActions({ generatePDF, clearData }) {
  return (
    <div>
      <button onClick={generatePDF} className="bg-green-500 text-white p-2 rounded mt-4">Generate Invoice</button>
      <button onClick={clearData} className="bg-red-500 text-white p-2 rounded mt-2">Clear Data</button>
    </div>
  );
}