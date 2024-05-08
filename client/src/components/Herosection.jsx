import React from 'react'
import image from '../image/OIP.jpeg'

const Herosection = () => {
  return (
    <section class="text-gray-600 body-font">
  <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
    <img class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src={image}/>
    <div class="text-center lg:w-2/3 w-full">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Image Compressor</h1>
      <p class="mb-8 leading-relaxed">At Image Compression, we specialize in providing high-quality image compression solutions to help you optimize your website's performance and improve user experience. Whether you're a professional photographer looking to reduce file sizes without sacrificing image quality or a web developer aiming to optimize website load times, we've got you covered.</p>
      <div class="flex justify-center">
        <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" ><a href='#scroll'>Compress Image </a></button>
      </div>
    </div>
  </div>
</section>
  )
}

export default Herosection