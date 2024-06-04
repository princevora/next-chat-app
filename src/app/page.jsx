"use client";

import Chat from "@/components/chat";
import LandingPage from "@/components/home/landing";
import MessageInput from "@/components/message-input";
import SetUsername from "@/components/set-username";

export default function Home() {
  return (
    <LandingPage />
    // <SetUsername />
    // <main className="flex flex-col h-screen p-4 relative">
    //   <div className="flex-1 w-full max-w-6xl mx-auto relative px-4 sm:px-6 lg:px-8">
    //     <div className="absolute inset-20 max-h-full overflow-auto py-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
    //       <Chat />
    //     </div>
    //     <div className="absolute bottom-0 w-full p-4">
    //       <MessageInput />
    //     </div>
    //   </div>
    // </main>
  );
}
