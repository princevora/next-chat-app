import React from 'react'
import Sidebar from '@/components/chat/sidebar';
import Chat from '@/components/chat/chat';

export default function Page() {
  return (
    <div className='relative'>
      <Sidebar />
      <Chat />
    </div>
  )
}
