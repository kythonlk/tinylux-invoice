"use client";
import React, { useState, useEffect } from "react";
import { Invoice } from "@/components/pdf";
import { pdf } from "@react-pdf/renderer";
import InvoiceForm from "@/components/form";
import InvoiceActions from "@/components/buttons";

export default function Page() {
  const [editingItemIndex, setEditingItemIndex] = useState(null);
  const [invoiceData, setInvoiceData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("invoiceData");
      return savedData
        ? JSON.parse(savedData)
        : {
          invoiceNumber: "",
          date: new Date().toISOString().slice(0, 10), 
          customerName: "",
          items: [],
          deliveryAmount: 0,
        };
    }
    return {
      invoiceNumber: "",
      date: new Date().toISOString().slice(0, 10), 
      customerName: "",
      items: [],
      deliveryAmount: 0,
    };
  });

  const handleUpdateItem = (index) => {
    setEditingItemIndex(index);
    setCurrentItem({
      name: invoiceData.items[index].name,
      price: invoiceData.items[index].price,
      quantity: invoiceData.items[index].quantity,
    });
  };

  const updateItem = () => {
    const updatedItems = [...invoiceData.items];
    updatedItems[editingItemIndex] = currentItem;
    setInvoiceData({ ...invoiceData, items: updatedItems });
    setEditingItemIndex(null);
  };

  const [currentItem, setCurrentItem] = useState({
    name: "",
    price: "",
    quantity: 1,
  });
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    localStorage.setItem("invoiceData", JSON.stringify(invoiceData));
  }, [invoiceData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = value === "" ? 0 : name === "deliveryAmount" ? parseFloat(value) : value;
    setInvoiceData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) : value,
    }));
  };

  const addItem = () => {
    if (currentItem.name && currentItem.price) {
      setInvoiceData((prev) => ({
        ...prev,
        items: [...prev.items, currentItem],
      }));
      setCurrentItem({ name: "", price: "", quantity: 1 });
    }
  };

  const removeItem = (index) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const generatePDF = async () => {
    console.log(invoiceData);
    
    const blob = await pdf(<Invoice data={invoiceData} />).toBlob();
    const url = URL.createObjectURL(blob);
    const fileName = `invoice-${invoiceData.invoiceNumber}.pdf`;
    setPdfUrl(url);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };
  const clearData = () => {
    const emptyData = {
      invoiceNumber: "",
      date: "",
      customerName: "",
      items: [],
      deliveryAmount: 0,
    };
    setInvoiceData(emptyData);
    setCurrentItem({ name: "", price: "", quantity: 1 });
    setPdfUrl(null);
    localStorage.setItem("invoiceData", JSON.stringify(emptyData));
  };

  const sharePDF = async () => {
    if (!pdfUrl) {
      await generatePDF();
    }
  
    const blob = await fetch(pdfUrl).then(res => res.blob());
    const fileName = `invoice-${invoiceData.invoiceNumber}.pdf`;
  
    if (navigator.share) {
      try {
        await navigator.share({
          files: [new File([blob], fileName, { type: 'application/pdf' })],
          title: 'Invoice',
          text: 'Here is your invoice',
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Invoice Generator</h1>
      <InvoiceForm
        invoiceData={invoiceData}
        handleChange={handleChange}
        addItem={addItem}
        removeItem={removeItem}
        handleItemChange={handleItemChange}
        currentItem={currentItem}
        handleUpdateItem={handleUpdateItem}
      />
      <InvoiceActions generatePDF={generatePDF} clearData={clearData} sharePDF={sharePDF} />
      {pdfUrl && (
        <div className="w-full mt-4">
          <a
            href={pdfUrl}
            download="invoice.pdf"
            className="bg-blue-500 text-white p-2 rounded"
          >
            Download PDF
          </a>
          <iframe src={pdfUrl} className="w-full h-screen mt-4" />
        </div>
      )}
    </main>
  );
}