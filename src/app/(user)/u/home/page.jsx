"use client";

import React, { useEffect } from 'react'
import Sidebar from '@/components/chat/sidebar';
import { socket } from '@/app/socket';

export default function Page() {
  return (
    <div className='relative'>
      <Sidebar />
    </div>
  )
}
