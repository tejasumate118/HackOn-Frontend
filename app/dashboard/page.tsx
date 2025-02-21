"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import DashboardContent from "@/components/dashboard-content"

export default function DashboardPage() {
  const [userName, setUserName] = useState("")

  useEffect(() => {
    // Retrieve the user's name from localStorage
    const storedName = localStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
    }
  }, [])

  return (
    <>
      <SiteHeader />
      <DashboardContent userName={userName} />
    </>
  )
}

