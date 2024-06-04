import ImportToast from "@/components/import-toast";
import Login from "./login";

export const metadata = {
  title: "Login To ChatApp"
}

function Page() {
  return (
    <>
      <ImportToast />
      <Login />
    </>
  )
}

export default Page;
