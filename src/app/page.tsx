"use client"

export default function Home() {
  return (
    <>
      <div>
        <div className="navbar sticky top-0 h-[100px] w-full flex justify-center items-center md:justify-start md:space-x-10 bg-[#FFFFFF] select-none">
          <div className="navbarIcom block md:hidden absolute top-10 left-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="#5c7b7d" className="size-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          <div className="navbarImage w-[70px] h-[70px] md:ml-10 xl:ml-32">
            <img src={"/img/landingPage/uscib_logo_green_type2-square.jpg"} alt="" className="w-full h-full" />
          </div>
          <div className="navbarItems hidden md:block md:flex-grow md:justify-end font-oswald tc1 text-[15px] font-extrabold">
            <div className="flex justify-end space-x-10 pr-10 xl:pr-32">
              <div className="!cursor-pointer">Home</div>
              <div className="!cursor-pointer">About</div>
            </div>
          </div>
        </div>
        <div className="signin" />
        <div className="pageDescription bg-[#f4f4f4] md:px-5 py-1">
          <div className="m-10">
            <h1 className="text-[black] font-bold mb-5">Welcome to USCIB Carnet portal!</h1>
            <div className="mb-5 flex justify-center">
              <div className="bg-gray-200 p-2 md:p-5">
                <div className="flex justify-center">Sign in</div>
                <div className="flex flex-col gap-1">
                  <div className="">Email</div>
                  <div><input type="text" className="bg-[#FFFFFF] w-full" /></div>
                  <div>Password</div>
                  <div><input type="password" className="bg-[#FFFFFF] w-full" /></div>
                  <div className="flex justify-end"><button type="button" className="bg-[#FFFFFF] p-0.5 w-[3.5rem]  rounded-sm">Login</button></div>
                  <div className="flex justify-end text-[0.7rem]">Forgot Password?</div>
                  <div className="text-sm">Dont have an account? Register</div>
                </div>
              </div>
            </div>
            <h2 className="text-[black] font-bold mb-5">ATA Carnet: Your Passport for Duty-Free Global Trade</h2>
            <div className="flex-col gap-y-10">
              <p className="text-justify">ATA Carnet, also known as the "Merchandise Passport," is an international customs document that simplifies temporary exports to over 79 countries and territories. It allows businesses—especially micro, small, and medium-sized enterprises (MSMEs)—to explore new markets, showcase products at trade shows, and attend global conferences without paying duties or taxes. Save time, reduce costs, and expand your business effortlessly with the ATA Carnet.</p>
              <p className="text-justify">It simplifies customs procedures for the temporary movement of goods and allows goods to enter Customs territories of the ATA Carnet system free of customs duties and taxes for up to one year.</p>
            </div>
          </div>
          <div className="m-10 text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis eos libero ad tempora placeat. Fuga sapiente repudiandae adipisci dolorem voluptatum atque non nobis temporibus nemo maiores, quis ut nihil ipsum!
            Neque perspiciatis, totam minima eveniet illum nemo accusamus facere tempore aut nostrum ab magni repellat ipsam laborum assumenda reiciendis modi. Libero repudiandae ab unde fugit iusto obcaecati? Repudiandae, autem magnam.
            Hic totam culpa in numquam alias consectetur non, doloremque eveniet cum at nesciunt rem odio recusandae nihil consequuntur, possimus dolorem, placeat eum aspernatur sint. Assumenda, officia. Atque enim unde quod.
            Earum labore ea placeat dolores, dolorum amet iure reprehenderit obcaecati voluptate nobis molestiae omnis officiis fuga architecto deserunt illum dignissimos debitis itaque quidem repellendus porro perspiciatis? Blanditiis earum voluptatibus placeat?
            Facere eveniet harum itaque consectetur ipsum vero non? Aliquid nesciunt amet aut explicabo quisquam voluptas voluptatibus voluptatum consequatur officiis quasi. Minus, voluptatem! Perferendis provident rerum neque veritatis. Incidunt, ad corrupti.
            Dolorum reprehenderit molestiae maiores commodi impedit minus nam blanditiis laudantium libero tempora nulla nesciunt, temporibus vel. Non asperiores deserunt amet, doloremque eaque molestiae optio laboriosam maiores ratione. Reiciendis, placeat repellendus.
            Suscipit, possimus iusto! Porro quae dolores fuga quas voluptatem optio consequuntur exercitationem fugit deleniti libero officia voluptas distinctio obcaecati facilis repellat, ab sequi expedita molestiae non totam est dolorem sint!
            Accusantium aliquid nihil quo est quod animi, id, rerum, laborum velit odit aut. Ipsum exercitationem quasi deserunt esse nostrum debitis, suscipit, nihil laboriosam, repellendus ut consequuntur ratione minima voluptatum accusantium?
            Accusantium, provident est quas cum veritatis architecto unde qui tempora nihil ut quaerat commodi eligendi illo velit beatae eveniet distinctio quam corporis vel sequi dolorem itaque! Laborum dignissimos non nihil?
            Ex maxime, quibusdam, nulla odit similique laboriosam, voluptatem id porro aliquam ducimus cupiditate dolore quas minima voluptas saepe sint explicabo. In ipsum vitae quibusdam quae doloribus doloremque a tempore consequuntur.</div>
        </div>
      </div>
    </>
  );
}
