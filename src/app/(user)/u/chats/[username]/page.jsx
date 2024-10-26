import React from 'react'
import Sidebar from '@/components/chat/sidebar';
import Chat from '@/components/chat/chat';

export function generateMetadata({ params }) {
  // Get username from params
  const { username } = params;

  // Return Username in title
  return {
    title: username
  }
}

export default function Page({ params }) {
  return (
    <div className='relative'>
      <Sidebar />
      <Chat username={params.username}/>
    </div>
  )
}
