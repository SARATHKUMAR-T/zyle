"use client";
import axios from "axios";

export default async function getLeads() {
  const token = localStorage.getItem("token");
  const data = axios
    .get("http://localhost:9000/api/get-leads", {
      headers: {
        "x-auth-token": token,
      },
    })
    .catch(error => {
      throw error;
    });

  return data;
}
