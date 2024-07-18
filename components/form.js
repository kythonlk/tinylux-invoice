import React from 'react';

export default function InvoiceForm({ invoiceData, handleChange, addItem, removeItem, handleItemChange, currentItem, handleUpdateItem }) {
 
    return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Invoice</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="invoiceNumber" className="block text-gray-700 font-bold mb-2">Invoice Number</label>
            <input
              type="text"
              id="invoiceNumber"
              name="invoiceNumber"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={invoiceData.invoiceNumber}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="customerName" className="block text-gray-700 font-bold mb-2">Customer Name</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={invoiceData.customerName}
              onChange={handleChange}
            />
          </div>
        </div>

        <h2 className="text-lg font-bold mt-6 mb-4">Add Items</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="itemName" className="block text-gray-700 font-bold mb-2">Item Name</label>
            <input
              type="text"
              id="itemName"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={currentItem.name}
              onChange={handleItemChange}
            />
          </div>

          <div>
            <label htmlFor="itemPrice" className="block text-gray-700 font-bold mb-2">Price</label>
            <input
              type="number"
              id="itemPrice"
              name="price"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={currentItem.price}
              onChange={handleItemChange}
            />
          </div>

          <div>
            <label htmlFor="itemQuantity" className="block text-gray-700 font-bold mb-2">Quantity</label>
            <input
              type="number"
              id="itemQuantity"
              name="quantity"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={currentItem.quantity}
              onChange={handleItemChange}
            />
          </div>
        </div>

        <button
          onClick={addItem}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Add Item
        </button>

        <h3 className="text-lg font-bold mt-6 mb-4">Items:</h3>

        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Item</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-right">Price</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2 text-right">AED{item.price}</td>
                  <td className="px-4 py-2 text-right">
                    <button onClick={() => removeItem(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2">
                      Remove
                    </button>
                    <button onClick={() => handleUpdateItem(index)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-700 font-bold">Delivery Amount:</span>
          <input
            type="number"
            name="deliveryAmount"
            className="shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={invoiceData.deliveryAmount}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}