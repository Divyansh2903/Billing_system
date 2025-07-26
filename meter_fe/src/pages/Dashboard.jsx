import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Eye, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { API_ENDPOINTS } from '../constants/api_consts';

function Dashboard() {

  const [data, setData] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    console.log(API_ENDPOINTS.GET_DASHBOARD_DATA)
    const fetchData = async () => {

      try {
        const data = await axios.get(API_ENDPOINTS.GET_DASHBOARD_DATA)
        console.log("Data" + data)
        setData(data.data)
      } catch (e) {
        alert("Some error occured")
      }
    }
    fetchData();
  }, [])
  // const [data] = useState([
  //   {
  //     "_id": "6883ec380590fc26337de777",
  //     "orderId": "order_QxR6CoKYKmZLK7",
  //     "reading": "0000",
  //     "billImageURL": "https://metersbucket.845b746e501141a8d1850034fec0eba8.r2.cloudflarestorage.com/IMG_3062.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=5b4676a3b6e6a6e392e839fbb733a078%2F20250725%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250725T204231Z&X-Amz-Expires=3600&X-Amz-Signature=e4c0bcc1971d3e2e7d0a296c8facd5cf33b662e4be7524f48723993ab8cfcad4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
  //     "roomNumber": 27,
  //     "totalAmount": 50000,
  //     "failureReason": null,
  //     "paymentStatus": "paid",
  //     "orderDate": "2025-07-25T20:42:46.000Z",
  //     "paymentMethod": "upi"
  //   }
  // ]);




  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount / 100);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1>Billing Dashboard</h1>
        </div>



        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Bills</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((bill) => (
                  <tr key={bill._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {bill.orderId}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(bill.orderDate)}
                        </div>
                        <div className="text-xs text-gray-400">
                          Reading: {bill.reading}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          {bill.roomNumber}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        {formatCurrency(bill.totalAmount)}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        via {bill.paymentMethod}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bill.paymentStatus)}`}>
                        {getStatusIcon(bill.paymentStatus)}
                        <span className="capitalize">{bill.paymentStatus}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedBill(bill)}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        {selectedBill && (
          <div className="fixed inset-0 bg-bgColor bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Bill Details</h3>
                <button
                  onClick={() => setSelectedBill(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Order ID</label>
                    <span className="text-sm text-gray-900">{selectedBill.orderId}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Room Number</label>
                    <span className="text-sm text-gray-900">{selectedBill.roomNumber}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Reading</label>
                    <span className="text-sm text-gray-900">{selectedBill.reading}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <span className="text-sm text-gray-900">{selectedBill.totalAmount}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                    <span className="text-sm text-gray-900">{selectedBill.paymentMethod}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBill.paymentStatus)}`}>
                      {getStatusIcon(selectedBill.paymentStatus)}
                      <span className="capitalize">{selectedBill.paymentStatus}</span>
                    </div>
                  </div>
                </div>

                {selectedBill.billImageURL && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bill Image</label>
                    <img
                      src={selectedBill.billImageURL}
                      alt="Bill"
                      className="w-full h-64 object-cover rounded-lg border border-gray-200 object-top "
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden w-full h-64 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Image not available</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;