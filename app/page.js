"use client";
import React, { useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  pdf,
} from "@react-pdf/renderer";


export default function Home() {
  const [invoiceData, setInvoiceData] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('invoiceData');
      return savedData ? JSON.parse(savedData) : {
        invoiceNumber: '',
        date: '',
        customerName: '',
        items: [],
      };
    }
    return {
      invoiceNumber: '',
      date: '',
      customerName: '',
      items: [],
    };
  });

  const [currentItem, setCurrentItem] = useState({ name: '', price: '' });
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
  }, [invoiceData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData(prev => {
      const newData = { ...prev, [name]: value };
      localStorage.setItem('invoiceData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({ ...prev, [name]: value }));
  };

  const addItem = () => {
    if (currentItem.name && currentItem.price) {
      setInvoiceData(prev => {
        const newData = {
          ...prev,
          items: [...prev.items, currentItem]
        };
        localStorage.setItem('invoiceData', JSON.stringify(newData));
        return newData;
      });
      setCurrentItem({ name: '', price: '' });
    }
  };

  const generatePDF = async () => {
    const blob = await pdf(<MyDocument data={invoiceData} />).toBlob();
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  const clearData = () => {
    const emptyData = {
      invoiceNumber: '',
      date: '',
      customerName: '',
      items: [],
    };
    setInvoiceData(emptyData);
    setCurrentItem({ name: '', price: '' });
    setPdfUrl(null);
    localStorage.setItem('invoiceData', JSON.stringify(emptyData));
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Invoice Generator</h1>
      <div className="flex flex-col gap-2 w-full max-w-sm">
        <input className="w-full p-2 border rounded" type="text" name="invoiceNumber" placeholder="Invoice Number" value={invoiceData.invoiceNumber} onChange={handleChange} />
        <input className="w-full p-2 border rounded" type="date" name="date" value={invoiceData.date} onChange={handleChange} />
        <input className="w-full p-2 border rounded" type="text" name="customerName" placeholder="Customer Name" value={invoiceData.customerName} onChange={handleChange} />
        
        <h2 className="text-xl mt-4">Add Items</h2>
        <input className="w-full p-2 border rounded" type="text" name="name" placeholder="Item Name" value={currentItem.name} onChange={handleItemChange} />
        <input className="w-full p-2 border rounded" type="number" name="price" placeholder="Price" value={currentItem.price} onChange={handleItemChange} />
        <button onClick={addItem} className="bg-blue-500 text-white p-2 rounded">Add Item</button>
        
        <h3 className="text-lg mt-2">Items:</h3>
        <ul>
          {invoiceData.items.map((item, index) => (
            <li key={index}>{item.name}: ${item.price}</li>
          ))}
        </ul>

        <button onClick={generatePDF} className="bg-green-500 text-white p-2 rounded mt-4">Generate Invoice</button>
        <button onClick={clearData} className="bg-red-500 text-white p-2 rounded mt-2">Clear Data</button>
      </div>

      {pdfUrl && (
        <div className="w-full mt-4">
          <a href={pdfUrl} download="invoice.pdf" className="bg-blue-500 text-white p-2 rounded">Download PDF</a>
          <iframe src={pdfUrl} className="w-full h-screen mt-4" />
        </div>
      )}
    </main>
  );
}


const MyDocument = ({data}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>INVOICE</Text>
        <Text style={styles.text}>Invoice Number: {data.invoiceNumber}</Text>
        <Text style={styles.text}>Date: {data.date}</Text>
        <Text style={styles.text}>Customer: {data.customerName}</Text>
        
        <Text style={styles.subtitle}>Items:</Text>
        {data.items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
          </View>
        ))}
        
        <Text style={styles.total}>Total: ${data.items.reduce((sum, item) => sum + Number(item.price), 0).toFixed(2)}</Text>
      </View>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  total: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});
