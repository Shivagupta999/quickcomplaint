import React from "react";
import {
  FaPlug,
  FaTools,
  FaExclamationTriangle,
  FaClock,
  FaBan,
} from "react-icons/fa";

const GuideLines = () => {
  return (
    <div className="max-w-3xl mx-auto my-10 bg-gray-50 p-8 rounded-2xl shadow-lg text-gray-700 font-sans leading-relaxed">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#507599] mb-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 rounded-xl shadow">
        Hostel Safety Guidelines: Electrical Items
      </h1>

      {/* Intro */}
      <p className="mb-4">Dear Hostel Residents,</p>
      <p className="mb-6">
        For your safety and the safety of others, please follow these guidelines
        when dealing with electrical items in your room:
      </p>

      {/* Guidelines List */}
      <ul className="space-y-5">
        <li className="flex items-start gap-3 bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <FaTools className="text-blue-600 text-2xl mt-1 flex-shrink-0 hover:scale-110 transition-transform" />
          <p>
            <span className="font-semibold text-blue-700">
              Do Not Attempt Repairs:
            </span>{" "}
            If you find any electrical item (such as lights, fans, sockets,
            etc.) not working properly, do not attempt to fix it yourself.
            Tampering with electrical items can lead to accidents, including
            electric shocks, fires, or damage to property.
          </p>
        </li>

        <li className="flex items-start gap-3 bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <FaExclamationTriangle className="text-yellow-600 text-2xl mt-1 flex-shrink-0 hover:scale-110 transition-transform" />
          <p>
            <span className="font-semibold text-yellow-700">
              Report the Issue Immediately:
            </span>{" "}
            Please report any malfunctioning electrical items to the hostel
            maintenance team immediately (via office, app, or complaint form).
          </p>
        </li>

        <li className="flex items-start gap-3 bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <FaClock className="text-blue-500 text-2xl mt-1 flex-shrink-0 hover:scale-110 transition-transform" />
          <p>
            <span className="font-semibold text-blue-600">Exercise Patience:</span>{" "}
            Malfunctioning electrical items can be inconvenient, but do not use
            them until inspected by a qualified technician. The maintenance team
            will resolve your issue promptly.
          </p>
        </li>

        <li className="flex items-start gap-3 bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <FaPlug className="text-green-600 text-2xl mt-1 flex-shrink-0 hover:scale-110 transition-transform" />
          <p>
            <span className="font-semibold text-green-700">
              Unplug When Not in Use:
            </span>{" "}
            Always unplug electrical appliances when not in use. This reduces
            risks of hazards and keeps you safe.
          </p>
        </li>

        <li className="flex items-start gap-3 bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <FaBan className="text-red-600 text-2xl mt-1 flex-shrink-0 hover:scale-110 transition-transform" />
          <p>
            <span className="font-semibold text-red-700">
              Follow Hostel Rules:
            </span>{" "}
            Unauthorized use of high-wattage appliances or overloading sockets
            is strictly prohibited. Adhere to hostel rules for everyone’s safety.
          </p>
        </li>
      </ul>

      {/* Conclusion */}
      <p className="mt-8">
        Your cooperation is crucial in maintaining a safe and secure living
        environment for everyone. If you have any concerns or questions, please
        reach out to hostel management.
      </p>

      {/* Footer */}
      <p className="text-center mt-8 text-sm text-gray-500">
        Thank you for your understanding and patience. <br />
        <strong>— Hostel Management</strong>
      </p>
    </div>
  );
};

export default GuideLines;
