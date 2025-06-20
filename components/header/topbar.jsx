import { PiPhoneCallLight } from "react-icons/pi";
import { IoIosAdd } from "react-icons/io";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getAPI } from "@/services/fetchAPI";
export const TopBar = () => {
  const { data } = useSession();

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState([]);
  const [contact, setContact] = useState(""); // Değişken ismi düzeltildi, küçük harf kullanıldı
  useEffect(() => {
    const contactData = getAPI("/home/HomeContact"); // textColorData tanımlandı
    contactData
      .then(function (result) {
        setContact(result[0]);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });

    const imageData = getAPI("/home/HomeImage");
    imageData
      .then(function (result) {
        setImage(result[0]);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });

    const Data = getAPI("/home/HomeCategories");
    Data.then(function (result) {
      setCategories(result);
    }).catch(function (error) {
      console.error("Hata oluştu:", error);
    });
  }, []);

  const { logo } = image;
  const { phone } = contact;
  return (
    <div className=" flex justify-between h-28 items-center mx-1 md:mx-6 my-2 max-w-full">
      <div>
        <a href="#">
          <Image
            className="h-auto max-w-ful mb-4"
            src={logo}
            width={250}
            height={250}
            alt="Logo"
          />
        </a>
      </div>
    {/* {data &&  <div className="relative rounded-md hidden lg:flex">
        <div className="absolute inset-y-0 left-5 flex items-center">
          <Popover.Group className="lg:gap-x-12">
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm leading-6 text-gray-900">
               Ara
                <ChevronDownIcon
                  className="h-5 w-5 flex-none text-gray-400 ml-5"
                  aria-hidden="true"
                />
                <span className="pl-4 text-border">|</span>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-40 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {categories.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-start gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                      >
                        <div className="flex-auto">
                          <a href={item.href} className="text-gray-900">
                            {item.name}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </Popover.Group>
        </div>
        <input
          type="text"
          name="price"
          id="price"
          className=" bg-[#fff] w-full min-w-[480px] hidden lg:block  rounded-full border-0 py-4 pl-40 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          placeholder="Kursları buradan arayabilrsiniz."
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <button className="flex gap-2 px-3 py-2 items-center bg-buttonColor rounded-3xl text-white text-lg hover:bg-cst_purple">
            <IoIosAdd style={{ fontSize: "25px" }} /> Ekle
          </button>
        </div>
      </div>} */}
      <div className="flex items-center">

        <div className="gap-5 pt-5 lg:pt-0 hidden lg:flex pr-3">
          {!data ? (
            <>
              <button
                onClick={() => signIn()}
                className="flex-shrink-0 rounded-3xl px-6 py-3 border border-border text-sm text-[#241442] transition-all duration-200 hover:bg-cst_purple hover:text-white text-center"
              >
                Giriş/Kayıt
              </button>
            </>
          ) : (
            <>
              {data?.user?.role === "admin" && (
                <Link
                  href="/dashboard/admin"
                  className="flex-shrink-0 rounded-3xl px-6 py-3 border transition-all duration-200 border-border text-sm bg-cst_purple text-white hover:bg-buttonColor text-center"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={() => signOut()}
                className="flex-shrink-0 rounded-3xl px-6 py-3 border transition-all duration-200 border-border text-sm bg-cst_red text-white hover:bg-buttonColor text-center"
              >
                Çıkış yap
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
