'use client';
import Link from "next/link";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import CartItemComponent from "./cartprop";
import { useInView } from "react-intersection-observer";
import { useCart } from './contexts/CartContext';
import Image from "next/image";
export const Header: React.FC = () => { 
  const [isVisible, setIsVisible] = useState(false);
       const { cart, clearCart, distinctItems } = useCart();
      
       
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
    const menuVariants = {
    hidden: { opacity: 0, filter: "blur(10px)"},
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.3,    // ждем, пока меню откроется
    staggerChildren: 0.1, } },
    exit: { opacity: 0, filter: "blur(10px)"},
    
  }
  const childVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};
 const handleToggleCart = () => {
    setIsVisible(prev => !prev);
  };
   const controls = useAnimation();
      const [ref, inView] = useInView({
        triggerOnce: true,   // Animate only the first time it appears
        threshold: 0.2,      // Percentage of element visibility to trigger
      });
    
      useEffect(() => {
        if (inView) {
          controls.start("visible");
        }
      }, [controls, inView]);
    const headerRef = useRef<HTMLDivElement>(null);






    
    return (
         <>
         
        <AnimatePresence>
                {isVisible && (
                  <motion.div
                   initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={menuVariants}
                    transition={{ duration: 0.3 }}
                    style={{ position: 'fixed' }}
                    className="w-full h-screen z-16"
                  >
         <div className={`z-15  w-full h-screen  `}>
                     <div className="w-full h-full bg-black/50 flex justify-end" onClick={handleToggleCart}>
         <div className=" lg:w-[480px]  w-full h-full bg-[rgb(251,251,239)] text-[rgb(35,25,22)] " onClick={(e) => e.stopPropagation()}>
         <div className="pb-[16px] lg:px-[16px] px-[20px] h-full relative ">
             <div className="lg:pt-[32px] pb-[16px] pt-[25px] w-full flex items-center justify-between md:text-[12px] text-[11px] bdog uppercase">
                 <p>cart</p>
                 <button onClick={handleToggleCart} className="md:text-[12px] text-[11px] bdog uppercase cursor-pointer">close</button>
         
             </div>
              
               {cart.length === 0 ? (
                 <div className="w-full h-full flex items-center justify-center">
                 <p className="bdog md:text-[12px] text-[11px] uppercase">cart is empty</p>
                 </div>
               ) : (
              
                 <ul style={{ listStyle: 'none', padding: 0 }}  >
                   {cart.map((item) => (
                     <CartItemComponent key={item.id} item={item} />
                   ))}
                 </ul>
               )}
               {cart.length > 0 && (
                 <div className="absolute bottom-0 lg:w-[480px] w-full pb-[16px] ">
                     <div className="flex-col flex gap-[16px] lg:w-[480px] pr-[32px] ">
                   <div className="w-full flex flex-row justify-between">
                     <h2 className="text-[12px] uppercase bdog">subtotal</h2>
                     <h2 className="text-[12px] uppercase bdog">$ {total.toFixed(2)} USD</h2>
                     </div>
                   <button
                   className="bg-[rgb(35,25,22)] text-[rgb(251,251,239)] w-full h-[48px] bdog text-[12px] uppercase"
                 onClick={clearCart}>Clear Cart</button>
                     </div>
                 </div>
                 
               )}
              
             </div>
                     </div>
                     </div>
                     
         
                  </div>
                  </motion.div>
                )}
                </AnimatePresence>
      {/* Мобильная версия хедера: до lg */}
      <div
        
        className={`w-full fixed z-10 px-[20px] py-[20px] transition duration-500 antialiased 
                    leading-[20px] bg-[rgb(251,251,239)] lg:hidden`}
      >
        <div className="flex items-center justify-between">
          {/* Кнопка меню слева */}
          
          {/* Логотип по центру */}
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 h-[20px] w-auto ">
          <img
            src='/brown.svg' 
            alt="Логотип"
            className="h-[20px] w-auto "
          />
          </Link>
          {/* Корзина справа */}
          <button 
          onClick={handleToggleCart}
            className={`cursor-pointer md:text-xs text-[11px] bdog uppercase 
               text-[rgb(35,25,22)]
            `}
          >
            cart<span className="ml-[4px]">{distinctItems > 0 && 
              `${distinctItems}`
              } </span>
          </button>
        </div>
      </div>

      {/* Десктоп версия хедера: lg и выше */}
      <div
        ref={headerRef}
        className={`w-full fixed z-10 px-6 py-6 transition duration-500 antialiased 
                    leading-[20px]  bg-[rgb(251,251,239)]  hidden lg:flex`}
      >
        {/* Левая колонка с логотипом и навигацией */}
        <div className="w-1/2 flex items-center gap-20">
        <Link href="/">
          <img
            src='/brown.svg'
            alt="Логотип"
            className="h-6 w-auto"
          />
          </Link>
          <nav className="text-xs flex flex-row gap-8 uppercase">
            <Link href="/shop"
              className={`cursor-pointer bdog2 
                 text-[rgb(35,25,22)] underline-hover 
              `}
            >
              shop
            </Link>
            <Link href="/journal"
              className={`cursor-pointer bdog2  
                text-[rgb(35,25,22)] underline-hover 
              `}
            >
              journal
            </Link>
            <Link href="/store" 
              className={`cursor-pointer bdog2 
                text-[rgb(35,25,22)] underline-hover 
              `}
            >
              store
            </Link>
            <Link href="/about"
              className={`cursor-pointer bdog2 
                 text-[rgb(35,25,22)] underline-hover 
              `}
            >
              about
            </Link>
          </nav>
        </div>
        {/* Правая колонка с корзиной и кнопкой меню */}
        <div className="w-1/2 flex justify-end items-center">
          <div className="flex items-center gap-8 uppercase text-xs bdog">
            <button 
            onClick={handleToggleCart}
              className={`cursor-pointer uppercase bdog2 
                  text-[rgb(35,25,22)]
                `}
            >
              cart<span className="ml-[4px]">{distinctItems > 0 && 
              `${distinctItems}`
              } </span>
            </button>
           
          </div>
        </div>
      </div>
    </>
    );
}