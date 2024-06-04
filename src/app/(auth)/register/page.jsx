import Register from "./register"
import ImportToast from "@/components/import-toast";

export const metadata = {
  title: "Register to ChatApp"
}

export default function page() {
  return (
    <>
      <ImportToast />
      <Register />
    </>
  )
}
