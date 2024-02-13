
import { Head } from '@inertiajs/react'

export default function Header({ title, user }) {
  return (
    <div>
      <Head title={title} />
      <div className="relative sm:flex sm:justify-center sm:items-center h-16 bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
        <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right z-10">

          {user ? (
            <a href="/home" className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
              Home
            </a>
          ) : (
            <>
              <a href="/login" className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Log in
              </a>

              
              <a href="/register" className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Register
              </a>
              
            </>
          )}
        </div>

      </div>
    </div>
  )
}