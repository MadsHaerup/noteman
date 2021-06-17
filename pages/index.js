import { signIn, signOut, useSession } from 'next-auth/client'
import Link from 'next/link';
export default function Home() {
  const [ session, loading ] = useSession()

  return (
    <div className="container mx-auto grid place-content-center h-screen justify-items-center">
      <div className="text-center font-semibold">
      {!session && <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
     
    </>}
      </div>
    <div className="text-center font-semibold flex flex-col">
    {session && <>
      <img src={session.user.image} alt={session.user.name} 
      className="rounded-full border-2 border-blue-600 w-8 h8 self-center"
      />
      Signed in as {session.user.name} <br/>
      <button onClick={() => signOut()}>Sign out</button>
      <Link href="/allNotes">
      <a className="grid justify-items-center underline text-purple-600 font-semibold"> Go to notes</a>
      </Link>
    </>}
    </div>
   
    </div>
  )
}



