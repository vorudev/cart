import { v4 as uuidv4 } from 'uuid';
interface RawProduct {
  title: string;
  price: number;
  image: string;
  bgImage: string;
}
 const rawData: RawProduct[] = [ 
    {
      
        title: "lumen toning serum",
        price:  140.00, 
        image: "/item1web.webp",
        bgImage: "/item1-hoverfull.webp",
    },
    { 
     
        title: "thera soil body emulsion",
        price: 140.00, 
        image: "/item2web.webp",
        bgImage: "/item2-hoverfull.webp",
       
    }, 
    {
      
        title: "moss bloom hair oil", 
        price: 180.00,
        image: "/item3web.webp",
        bgImage: "/item3-hoverfull.webp",
   
    }, 
    {
        
        title: "aura veil facial cream",
        price: 220.00,
        image: "/item4.webp",
        bgImage: "/item4-hoverfull.webp",
   
    }
];

export const products = rawData.map(item => ({
  id: uuidv4(),
  ...item,
}));