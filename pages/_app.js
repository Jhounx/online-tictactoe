import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
  <div className='w-full h-screen overflow-y-auto bg-gray-200 block'>
    <Component {...pageProps} />
  </div> )
}

export default MyApp
