"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

export default function LogOut() {
  return (
    <button onClick={() => signOut()}> LogOut</button>
  )
}
