import { cookies } from 'next/headers';
export default async function Home() {
  const cookieStore = cookies();
  const pwd = cookieStore.get('pwd');
  if (pwd && pwd.value === process.env.PASS) {
    return (
      <main className="p-4 flex flex-col items-center justify-center h-screen">
        <form method="POST" action="/api/execute" className="flex flex-col">
          <textarea name="execute" id="execute" className="p-2 border border-white mb-5 bg-stone-800 rounded-md" />
          <input name="pass" id="pass" type="hidden" value={pwd.value} />
          <button type="submit" className="p-2 border border-white bg-stone-800 rounded-md">Execute</button>
        </form>
      </main>
    )
  }
  return <NotValid />
}

function NotValid() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl">403 L bozo</h1>
    </main>
  )
}
