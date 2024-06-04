import React from 'react'
import AddChat from './add-chat'
import ImportToast from '@/components/import-toast'

export const metadata = {
  title: "Add Chat"
}

export default function Page() {
  return (
    <>
      <ImportToast />
      <AddChat />
    </>
  )
}
