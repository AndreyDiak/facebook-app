import { getProviders, signIn } from "next-auth/react"
import Link from "next/link";

// @ts-ignore
const SignIn = ({ providers }) => {
  console.log(providers)
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="space-y-2 border-2 p-5 rounded-md border-blue-500 text-center">
        <h1 className="font-bold mb-5 text-gray-700">You can authorize with different social media</h1>
        {providers &&
          Object.values(providers).map((provider: any) => (
            <div key={provider.name}>
                <button
                  className="bg-blue-500 w-48 py-2 rounded-full text-white font-bold hover:bg-blue-600"
                  onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}
                </button>

            </div>
          ))}
      </div>
    </div>
  )
}

export default SignIn

export async function getServerSideProps(context: any) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}