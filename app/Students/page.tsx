"use server";
import React from 'react'
import Navbar from '../../components/Navbar'

const StudentJobs = async () => {
    // const res = await fetch("https://localhost:3000/students/jobs", {
    //     method: "GET",
    // });
    // if(res.status === 401 || res.status === 403){
    //     throw new Error("Unauthorized");
    //     useRouter().push("/Login");
    // }
    // const data = await res.json();
    
    const desc = "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
    return (
        <>
            <Navbar />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-black min-h-screen p-6">

  {/* LEFT COLUMN — Dashboard */}
  <div className="text-white bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-6 rounded-xl shadow-md lg:col-span-1">
    <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
    <p>Welcome back 👋</p>
    <p>Total Applications: 12</p>
    <p>Saved Jobs: 5</p>
  </div>

  {/* RIGHT COLUMN — Job Listings */}
  <div className="space-y-4 lg:col-span-2">
    {[...Array(10)].map((_, index) => (
      <div
        key={index}
        className="bg-gray text-white p-5 rounded-xl shadow-md hover:shadow-lg transition border border-gray-700"
      >

        {/* Title + Applicants */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-white">
          <h3 className="text-lg font-semibold">
            Frontend Developer {index + 1}
          </h3>

          <p className="text-sm  mt-2 sm:mt-0 text-white">
            Applicants: 20
          </p>
        </div>

        {/* Company Info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-gray-500">
          <p className="text-white">Company Name</p>
          <p>Location • Full Time</p>
          <p>Deadline • 2024-12-31</p>
        </div>

        {/* Description */}
        <p className="text-white mt-3">
          {desc.length > 120
            ? desc.slice(0, 120) + "..."
            : desc}
        </p>

      </div>
    ))}
  </div>

</div>

        </>
    )
}

export default StudentJobs
