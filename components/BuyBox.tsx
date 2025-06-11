import React, { useState } from 'react';

const pricing = {
  1: { price: 49, old: 59, label: 'Single Unit' },
  2: { price: 89, old: 118, label: 'Most Popular' },
  4: { price: 169, old: 236, label: 'Family Pack' },
  6: { price: 229, old: 354, label: 'Best for Home Use' }
};

const checkoutLinks = {
  1: 'https://odorgo.store/cart/49806135329108:1',
  2: 'https://odorgo.store/cart/49806135329108:2',
  4: 'https://odorgo.store/cart/49806135329108:4',
  6: 'https://odorgo.store/cart/49806135329108:6'
};

const BuyBox = () => {
  const [units, setUnits] = useState<1 | 2 | 4 | 6>(4);
  const priceData = pricing[units as 1 | 2 | 4 | 6];

  const handleAddToCart = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'AddToCart', {
        value: priceData.price,
        currency: 'USD',
        contents: [{ id: `odorgo-${units}`, quantity: 1 }],
        content_type: 'product',
      });
    }
  };

  return (
    <section id="pricing-section" className="w-full flex flex-col items-center bg-white py-8 md:py-16 px-2 md:px-4">
      <div className="max-w-3xl w-full mx-auto rounded-2xl shadow-2xl bg-gradient-to-br from-blue-50 via-white to-blue-50 border-2 border-blue-200 p-0 md:p-0">
        <div className="px-6 md:px-12 pt-8 pb-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-2">Choose How Many You Need</h2>
          <div className="text-lg text-blue-500 mb-2 font-semibold">Mid-Summer Special Offer</div>
          
          {/* Product Image */}
          <div className="flex justify-center -mx-6 md:-mx-12 mb-4">
            <img 
              src="/product-image.jpg" 
              alt="OdorGo device" 
              className="w-full max-w-[500px] h-auto object-contain" 
              width={500} 
              height={500} 
            />
          </div>

          {/* Unit Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            {[1, 2, 4, 6].map((n) => (
              <div
                key={n}
                className={`unit-option border-2 rounded-2xl p-4 text-center cursor-pointer transition relative ${
                  units === n
                    ? 'border-blue-600 bg-blue-100 text-blue-900 shadow-lg'
                    : 'border-blue-300 bg-white text-blue-700 hover:shadow-lg'
                }`}
                onClick={() => setUnits(n as 1 | 2 | 4 | 6)}
              >
                {n === 2 && (
                  <div className="absolute -top-3 md:-top-3 left-1/2 -translate-x-1/2 bg-yellow-300 text-yellow-900 text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow-lg border border-yellow-400">MOST POPULAR</div>
                )}
                {n === 6 && (
                  <div className="absolute -top-3 md:-top-3 left-1/2 -translate-x-1/2 bg-green-200 text-green-900 text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow-lg border border-green-400">BEST VALUE</div>
                )}
                <div className="font-bold text-lg mt-4 md:mt-0">{n} x OdorGo</div>
                <div className="text-sm mb-1">{pricing[n as 1 | 2 | 4 | 6].label}</div>
                <div className="text-xl font-extrabold mb-1">
                  <span className="line-through text-gray-400 text-sm mr-1">${pricing[n as 1 | 2 | 4 | 6].old}</span>
                  <span>${pricing[n as 1 | 2 | 4 | 6].price}</span>
                </div>
                <div className="text-xs text-blue-600">
                  {n === 1 ? 'Perfect for single room' : 
                   n === 2 ? 'Perfect for living areas and Car' : 
                   n === 4 ? 'Perfect for whole home and Car' : 
                   'Perfect for whole house and multiple cars'}
                </div>
              </div>
            ))}
          </div>

          {/* Add to Cart Button */}
          <a
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-full text-xl transition flex items-center justify-center gap-2 shadow-lg mt-2 mb-2"
            href={checkoutLinks[units]}
            onClick={handleAddToCart}
          >
            GET YOUR ODORGO NOW
          </a>

          {/* Money Back Guarantee */}
          <div className="text-sm text-gray-600 mt-4 flex items-center justify-center gap-2 mb-4">
            <span>🛡️</span>
            <span>90-Day Money Back Guarantee</span>
          </div>

          {/* Features/Benefits Box */}
          <div className="w-full max-w-lg mx-auto">
            <ul className="border-2 border-blue-200 bg-white rounded-xl px-6 py-4 grid grid-cols-1 gap-2 text-base font-medium shadow">
              <li className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-green-600 font-bold">✔ Mid-Year Discount</span>
                <span className="line-through text-blue-400">$20</span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-blue-600">🎁 <span className="font-bold">FREE</span> Gift When Ordering 2 or More</span>
                <span className="line-through text-blue-400">$18</span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-blue-600">🎧 <span className="font-bold">FREE</span> Home Smoke Remover Guide</span>
                <span className="line-through text-blue-400">$21</span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-blue-600">🚚 <span className="font-bold">FREE</span> Priority Shipping</span>
                <span className="line-through text-blue-400">$9</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex items-center gap-2 text-green-600 font-bold">✔ VIP Access to New Tips & Tricks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyBox; 
