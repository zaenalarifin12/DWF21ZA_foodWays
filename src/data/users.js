// -> email
//     -> password
//     -> fullname
//     -> gender
//     -> phone
//     -> level ( penjual dan pembeli )
// 1 pembeli
// 2 penjual
export const sellers = [
  {
    id: 1,
    email: "burgerking@gmail.com",
    fullname: "Burger King",
    phone: "0891111111",
    image: "images/burger-king.png",
    foods: [
      {
        id: 1,
        name: "Paket Geprek",
        image: "/images/bensu/paket-geprek.png",
        price: 15000,
      },
      {
        id: 2,
        image: "/images/bensu/paket-geprek-keju.png",
        name: "Paket Geprek Keju",
        price: 20000,
      },
      {
        id: 3,
        image: "/images/bensu/paket-geprek-leleh.png",
        name: "Paket geprek leleh",
        price: 25000,
      },
      {
        id: 4,
        image: "/images/bensu/paket-sambel-matah.png",
        name: "Paket Sambel Matah",
        price: 15000,
      },
      {
        id: 5,
        name: "Mie ayam geprek",
        image: "/images/bensu/mie-ayam-geprek.png",
        price: 17000,
      },
      {
        id: 6,
        image: "/images/bensu/mie-ayam-geprek-keju.png",
        name: "Mie Ayam Geprek Keju",
        price: 22000,
      },
      {
        id: 7,
        image: "/images/bensu/mie-ayam-leleh.png",
        name: "Mie Ayam Leleh",
        price: 27000,
      },
      {
        id: 8,
        image: "/images/bensu/mie-ayam-sambel-telur-asin.png",
        name: "Mie Ayam Sambel Telur Asin",
        price: 22000,
      },
    ],
  },
  {
    id: 2,
    email: "startbuck@gmail.com",
    fullname: "StarBucks",
    phone: "0891111111",
    image: "images/starbuck.png",
  },
  {
    id: 3,
    email: "kfc@gmail.com",
    fullname: "KFC",
    phone: "0891111111",
    image: "images/kfc.png",
  },
  {
    id: 4,
    email: "jso@gmail.com",
    fullname: "Jco",
    phone: "0891111111",
    image: "images/jso.png",
  },
];

export const restaurantNear = [
  {
    id: 1,
    image: "/images/bensu/paket-geprek.png",
    name: "Geprek Bensu",
    distance: "0.2 KM",

    foods: [
      {
        id: 1,
        name: "Paket Geprek",
        image: "/images/bensu/paket-geprek.png",
        price: 15000,
      },
      {
        id: 2,
        image: "/images/bensu/paket-geprek-keju.png",
        name: "Paket Geprek Keju",
        price: 20000,
      },
      {
        id: 3,
        image: "/images/bensu/paket-geprek-leleh.png",
        name: "Paket geprek leleh",
        price: 25000,
      },
      {
        id: 4,
        image: "/images/bensu/paket-sambel-matah.png",
        name: "Paket Sambel Matah",
        price: 15000,
      },
      {
        id: 5,
        name: "Mie ayam geprek",
        image: "/images/bensu/mie-ayam-geprek.png",
        price: 17000,
      },
      {
        id: 6,
        image: "/images/bensu/mie-ayam-geprek-keju.png",
        name: "Mie Ayam Geprek Keju",
        price: 22000,
      },
      {
        id: 7,
        image: "/images/bensu/mie-ayam-leleh.png",
        name: "Mie Ayam Leleh",
        price: 27000,
      },
      {
        id: 8,
        image: "/images/bensu/mie-ayam-sambel-telur-asin.png",
        name: "Mie Ayam Sambel Telur Asin",
        price: 22000,
      },
    ],
  },
  {
    id: 2,
    image: "/images/nasi-goreng.png",
    name: "Nasi Goreng Mas Roni",
    distance: "0.6 KM",
    foods : [
      {
        id: 11,
        name: "Paket Geprek",
        image: "/images/bensu/paket-geprek.png",
        price: 15000,
      },
      {
        id: 21,
        image: "/images/bensu/paket-geprek-keju.png",
        name: "Paket Geprek Keju",
        price: 20000,
      },
      {
        id: 31,
        image: "/images/bensu/paket-geprek-leleh.png",
        name: "Paket geprek leleh",
        price: 25000,
      },
      {
        id: 41,
        image: "/images/bensu/paket-sambel-matah.png",
        name: "Paket Sambel Matah",
        price: 15000,
      },
    ]
  },
  {
    id: 3,
    image: "/images/pecel-ayam.png",
    name: "Pecel Ayam Prambanan",
    distance: "0.6 KM",
    foods : []
  },
  {
    id: 4,
    image: "/images/kopi-kenangan.png",
    name: "Kopi Kenangan",
    distance: "1.6 KM",
    foods : []
  },
];
