import React, { useEffect, useState } from "react";
import API from "./api/axios";

const StatusUpdate = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("authToken"); 

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await API.get("/complaints", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const complaintsData = response.data.map((complaint) => ({
          id: complaint._id,
          text: complaint.text,
          resolved: complaint.resolved,
          rollNumber: complaint.userId?.rollNumber || "N/A",
          name: complaint.userId?.name || "Unknown",
        }));

        setComplaints(complaintsData);
      } catch (err) {
        setError("⚠️ Failed to load complaints. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchComplaints();
    else setError("❌ Unauthorized. Please log in.");
  }, [token]);

  const handleCheckboxChange = async (index) => {
    const updatedComplaints = [...complaints];
    const complaintId = updatedComplaints[index].id;
    const newStatus = !updatedComplaints[index].resolved;

    try {
      await API.put(
        `/complaints/${complaintId}`,
        { resolved: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      updatedComplaints[index].resolved = newStatus;
      setComplaints(updatedComplaints);
      setError("");
    } catch (err) {
      setError(
        "❌ Could not update complaint status. Permission denied or server error."
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white/95 shadow-lg rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
        Status Update
      </h2>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-400 text-red-700 text-center">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <p className="text-center py-6 text-gray-500">
          ⏳ Loading complaints...
        </p>
      ) : complaints.length === 0 ? (
        <p className="text-center py-6 text-gray-500">✅ No complaints found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full border border-gray-200 text-sm text-left text-gray-700">
            <thead className="bg-blue-600 text-white text-sm uppercase">
              <tr>
                <th className="px-4 py-3">Serial Number</th>
                <th className="px-4 py-3">Roll Number</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Complaint</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Mark Resolved</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => (
                <tr
                  key={complaint.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="px-4 py-3 font-medium">{index + 1}</td>
                  <td className="px-4 py-3">{complaint.rollNumber}</td>
                  <td className="px-4 py-3">{complaint.name}</td>
                  <td className="px-4 py-3">{complaint.text}</td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      complaint.resolved ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {complaint.resolved ? "Resolved" : "Pending"}
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={complaint.resolved}
                      onChange={() => handleCheckboxChange(index)}
                      aria-label={`Mark complaint ${index + 1} as resolved`}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-300 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StatusUpdate;
