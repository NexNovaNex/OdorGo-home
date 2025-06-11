'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Playfair_Display, Inter } from 'next/font/google'
import Image from 'next/image'
import BuyBox from '../components/BuyBox';

// Add this TypeScript declaration at the top, after imports
// @ts-ignore
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function Page() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Countdown timer logic
  const [timeLeft, setTimeLeft] = useState(2 * 3600 + 22 * 60 + 33); // 2h 22m 33s in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  function formatTime(secs: number) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    document.querySelectorAll('.scroll-animation').forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const loadTally = () => {
      const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = "https://tally.so/widgets/embed.js";
        script.async = true;
        script.onload = () => {
          // @ts-ignore
          if (window.Tally) {
            // @ts-ignore
            window.Tally.loadEmbeds();
          }
        };
        document.body.appendChild(script);
      }
    };

    loadTally();
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-50 to-white">
        <div className="max-w-6xl w-full mx-auto px-2 md:px-4 pt-0 md:pt-0 pb-6 md:pb-16">
          {/* Main Content */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 max-w-xl w-full">
              {/* Headline */}
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-gray-900">
                Transform Your Car From <span className="text-blue-600 font-extrabold">"Smoker's Vehicle"</span> to <span className="text-blue-500 italic">Fresh and Clean</span> in Just 24 Hours — <span className="text-blue-400 underline">Guaranteed</span> or Your Money Back.
              </h1>
              
              {/* Image on Mobile */}
              <div className="md:hidden w-full flex justify-center mb-6">
                <div className="rounded-2xl overflow-hidden shadow-lg bg-white p-2">
                  <Image src="/OG-placeholder.jpg" alt="Woman holding sc product" className="w-[340px] h-[420px] object-cover rounded-xl" width={340} height={420} />
                </div>
              </div>

              {/* Subheading */}
              <div className="flex items-center gap-2 text-blue-600 font-medium mb-2">
                <span className="text-lg">🚗</span>
                The First Device Specifically Created to Eliminate Car Smoke Odor at the Molecular Level
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-blue-200">
                  <span className="text-2xl mt-1">🔬</span>
                  <div>
                    <div className="font-semibold text-gray-900">Advanced Molecular Technology</div>
                    <div className="text-gray-500 text-sm">Breaks down smoke particles at their source - not just masking the smell.</div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-blue-200">
                  <span className="text-2xl mt-1">⚡</span>
                  <div>
                    <div className="font-semibold text-gray-900">Works in 30 minutes</div>
                    <div className="text-gray-500 text-sm">Leave OdorGo running for 30 Minutes and your car will be smell free</div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-blue-200">
                  <span className="text-2xl mt-1">💎</span>
                  <div>
                    <div className="font-semibold text-gray-900">Preserves Vehicle Value</div>
                    <div className="text-gray-500 text-sm">Protect your investment by eliminating "smoker car" depreciation.</div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-blue-200">
                  <span className="text-2xl mt-1">♻️</span>
                  <div>
                    <div className="font-semibold text-gray-900">Long-Lasting Results</div>
                    <div className="text-gray-500 text-sm">Continuous protection against new smoke odors.</div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-4 text-blue-700 font-semibold text-center">
                Drive With Pride Again<br/>
                <span className="text-blue-500 font-normal">No more embarrassment. No more excuses. Just a fresh, clean car.</span>
              </div>
              <div className="text-xs text-gray-400 mb-4">Backed by molecular odor elimination technology proven effective in homes, apartments, and cars.</div>
              <div className="flex justify-center mb-6">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition w-full md:w-auto" onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}>Remove Smoke Smells Now</button>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500 items-center justify-center md:justify-center mt-2">
                <div className="flex items-center gap-1"><span className="text-lg">🚗</span> Built for Vehicles</div>
                <div className="flex items-center gap-1"><span className="text-lg">🔬</span> Driving Freedom Restored</div>
                <div className="flex items-center gap-1"><span className="text-lg">🗝️</span> No Social Judgment</div>
                <div className="flex items-center gap-1"><span className="text-lg">🎯</span> Targets Car Smoke</div>
              </div>
            </div>

            {/* Image on Desktop */}
            <div className="hidden md:flex flex-1 items-center justify-center">
              <div className="rounded-2xl overflow-hidden shadow-lg bg-white p-2">
                <Image src="/SC-placeholder.jpg" alt="Woman holding sc product" className="w-[340px] h-[420px] object-cover rounded-xl" width={340} height={420} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Reviews Section */}
      <section className="w-full flex justify-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-2xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">Real Car Smokers Share Their OdorGo Results</h2>
          <div className="flex flex-col gap-4 mb-8">
            {/* Review 1 */}
            <div className="flex gap-3 bg-gray-50 rounded-2xl shadow p-2 md:p-4 items-start">
              <Image src="/profile1.jpg" alt="David M." className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
              <div>
                <div className="font-semibold text-gray-800">David M. - Real Estate Agent</div>
                <div className="text-gray-700 text-sm">"I used to panic every time a client needed a ride. The awkward silence when they got in my car was crushing my deals. 3 weeks with OdorGo and my last client actually complimented how fresh my BMW smells. Professional game-changer."</div>
              </div>
            </div>
            {/* Review 2 */}
            <div className="flex gap-3 bg-gray-50 rounded-2xl shadow p-2 md:p-4 items-start">
              <Image src="/profile2.jpg" alt="Lisa K." className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
              <div>
                <div className="font-semibold text-gray-800">Lisa K. - Night Shift Nurse</div>
                <div className="text-gray-700 text-sm">"Tried $300 detailing, every air freshener made, even ozone shock treatments. Nothing lasted. OdorGo is the first thing that made my car feel like a non-smoker's again. Worth every penny."</div>
              </div>
            </div>
            {/* Review 3 */}
            <div className="flex gap-3 bg-gray-50 rounded-2xl shadow p-2 md:p-4 items-start">
              <Image src="/profile3.jpg" alt="Tom A." className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
              <div>
                <div className="font-semibold text-gray-800">Tom A. - Construction Foreman</div>
                <div className="text-gray-700 text-sm">"My kids actually asked to come with me to the store last weekend — first time in months they didn't make excuses. My daughter even fell asleep in the backseat. Haven't felt this good about driving in years."</div>
              </div>
            </div>
            {/* Review 4 */}
            <div className="flex gap-3 bg-gray-50 rounded-2xl shadow p-2 md:p-4 items-start">
              <Image src="/profile4.jpg" alt="Marcus R." className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
              <div>
                <div className="font-semibold text-gray-800">Marcus R. - Sales Manager</div>
                <div className="text-gray-700 text-sm">"It wasn't just eliminating the smell. It was getting my social life back. Not feeling like a pariah at work events. OdorGo gave me my confidence back behind the wheel."</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition" onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}>Get Your OdorGo Today</button>
          </div>
        </div>
      </section>
      {/* Jake's Story Introduction */}
      <section className="w-full flex flex-col items-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">Meet Jake — A Dad Who Thought He'd Lost His Freedom Forever</h2>
          
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="flex-1">
              <div className="prose prose-lg text-gray-700">
                <p className="mb-4">
                  Jake's 45-minute commute home from his construction management job used to be sacred. Those twenty minutes with a cigarette were his only chance to decompress before walking into chaos with three kids under 12. 
                  </p>
                <p className="mb-4">
                  But what started as stress relief had become its own nightmare.
                </p>
                <p className="mb-4">
                  The smell wasn't just clinging to his clothes anymore — it had invaded every fiber of his truck's interior. 
                  </p>
                <p className="mb-4">
                  His wife Sarah would wrinkle her nose the moment she opened the passenger door. 
                  </p>
                <p className="mb-4">
                  His 8-year-old son started breathing through his shirt during car rides. Other parents at school pickup gave him those looks — the ones that said they knew exactly what kind of driver he was.
                </p>
                <p className="mb-4">
                  The breaking point came on a Tuesday morning. Jake was running late for a client meeting and offered to drive. The moment his colleague slid into the passenger seat, Jake watched his face change. The polite smile. The subtle lean toward the window. The excuse about "preferring to meet at the office next time."
                </p>
                <p className="mb-4">
                  That afternoon, Sarah demanded Jake make a change. "STOP SMOKING IN THE CAR".
                </p>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="relative w-full max-w-sm aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                  <Image src="/jake-intro.jpg" alt="Jake in his truck" className="object-cover" width={400} height={300} />
                </div>
                <div className="mt-4 text-center text-gray-600 italic text-sm">
                  "Every time someone got in my truck, I could see it in their face. The judgment. The discomfort. It was killing me inside."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Jake's Discovery Section */}
      <section className="w-full flex flex-col items-center bg-blue-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">Jake's Last Resort: The Discovery That Changed Everything</h2>
          
          {/* Initial Situation */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="flex-1">
              <div className="text-gray-700 mb-6">
                Jake was at his breaking point. Sarah's ultimatum was still ringing in his ears, and his son breathing through his shirt had shattered something inside him. He'd tried everything else — maybe it was time to quit smoking entirely.
              </div>
              <div className="text-gray-700 mb-6">
                But the timing couldn't have been worse. Work stress was at an all-time high, three kids were pushing him to his limit, and that 20-minute drive home was literally his only sanctuary. Quitting now felt impossible.
              </div>
              <div className="text-gray-700">
                That's when his buddy Marcus offered him a ride to a job site.
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                <Image src="/Solutions.jpg" alt="Jake at breaking point" className="object-cover" layout="fill" />
              </div>
            </div>
          </div>

          {/* The Ride */}
          <div className="bg-white rounded-2xl p-6 mb-12">
            <h3 className="text-xl font-bold text-blue-800 mb-4">The Ride That Changed His Perspective</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="text-gray-700 mb-4">
                  Jake slid into Marcus's passenger seat, bracing himself for the familiar smoke smell. Marcus had been smoking in his truck for years — Jake had seen him.
                </div>
                <div className="text-gray-700 mb-4">
                  But there was nothing. No smoke. No air freshener trying to mask it. Just... clean air.
                </div>
                <div className="italic text-blue-600 mb-4">"Dude," Jake said, confused. "Did you quit smoking?"</div>
                <div className="text-gray-700">
                  Marcus laughed, lighting up a cigarette right there in the cab. "Nah man, found something online. Guy was selling his car — mentioned he used this device to completely eliminate smoke smell before putting it on the market."
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-full max-w-sm aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                  <Image src="/smokeincar.jpg" alt="Clean truck interior" className="object-cover" layout="fill" />
                </div>
              </div>
            </div>
          </div>

          {/* Research Section */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Jake Went Down a Research Rabbit Hole. Maybe this is what he has been looking for?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-5 shadow">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎥</span>
                  <div>
                    <div className="font-bold text-blue-700 mb-2">YouTube Car Flippers</div>
                    <div className="text-gray-700">Casually mentioning OdorGo in their videos as their "secret weapon"</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💬</span>
                  <div>
                    <div className="font-bold text-blue-700 mb-2">Reddit Threads</div>
                    <div className="text-gray-700">Used car dealers sharing their "trade secrets"</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <div className="font-bold text-blue-700 mb-2">Online Reviews</div>
                    <div className="text-gray-700">Success stories from smoker's car transformations</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <div className="font-bold text-blue-700 mb-2">Facebook Marketplace</div>
                    <div className="text-gray-700">Sellers specifically mentioning OdorGo in listings</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Quotes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <div className="text-gray-700 italic mb-2">"Bought this beater from a chain smoker for $3,000 under market value. Used OdorGo for like 30 minutes. Sold it two weeks later as a non-smoker car for full price. Easiest $3K I ever made."</div>
                <div className="text-blue-600 font-medium">- Car Flipper Review</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <div className="text-gray-700 italic mb-2">"I'm a single mom who smokes. Couldn't afford a new car but couldn't keep subjecting my kids to the smell. This thing saved my relationship with my children. They actually want to ride with me now."</div>
                <div className="text-blue-600 font-medium">- Parent Review</div>
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-white rounded-2xl p-6 mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">The Price That Didn't Make Sense</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="text-gray-700 mb-4">
                  The more Jake researched, the more confused he became. Professional ozone treatments cost $200-500. Detail shops charged $300+ for "odor elimination" that didn't work.
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-4">But OdorGo was under $50.</div>
                <div className="text-gray-700">
                  Then it clicked. Detail shops WANTED repeat customers. Air freshener companies NEEDED ongoing purchases. Car flippers and dealers were the only ones with incentive to actually solve the problem permanently — and they were keeping it quiet.
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                  <div className="text-gray-700 italic mb-2">"Shh... don't tell everyone about this. I've made $50K this year just buying smoker's cars and fixing them with this thing. My secret weapon."</div>
                  <div className="text-blue-600 font-medium">- Professional Car Flipper</div>
                </div>
              </div>
            </div>
          </div>

          {/* Skepticism Section */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">The Skepticism That Almost Stopped Him</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="text-gray-700 mb-6">
                  Jake stared at his laptop screen at 2 AM, credit card in hand, fighting every instinct.
                  "Another gimmick," he thought. "Another waste of money."
                </div>
                <div className="bg-red-50 rounded-xl p-5 border border-red-200">
                  <div className="font-bold text-red-700 mb-4">He'd been burned before:</div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">✕</span>
                      <span className="text-gray-700">The $89 "professional grade" air purifier that did nothing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">✕</span>
                      <span className="text-gray-700">The $40 "odor eliminating" spray that made it worse</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">✕</span>
                      <span className="text-gray-700">The $200 detail that lasted three days</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">✕</span>
                      <span className="text-gray-700">The $75 "shock treatment" that required him to leave his truck overnight</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-full max-w-sm aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                  <Image src="/Solutions.jpg" alt="Late night research" className="object-cover" layout="fill" />
                </div>
              </div>
            </div>
          </div>

          {/* Final Decision */}
          <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">The Order That Changed His Life</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="text-gray-700 mb-4">
                  Jake bought three units. "If it works, I want backup. If it doesn't work, I'm only out $150 instead of another $300 detail session."
                </div>
                <div className="text-gray-700 mb-4">
                  The price point made it a no-brainer risk. Less than one professional detail. Less than two months of premium air fresheners. Less than the gas money he'd wasted driving separately from his family.
                </div>
                <div className="text-gray-700 mb-6">
                  Three days later, his package arrived.
                </div>
                <div className="text-gray-700 mb-4">
                  Jake sat in his driveway, holding the small device, still skeptical. It looked too simple. Too small. Too inexpensive to solve a problem that had cost him thousands and nearly destroyed his relationships.
                </div>
                <div className="italic text-gray-700 mb-6">"This better not be another disappointment," he muttered, plugging it in to charge.</div>
                <div className="text-xl font-bold text-blue-800">Twenty-four hours later, Jake's life was completely different.</div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-full max-w-sm aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                  <Image src="/package-arrival.jpg" alt="OdorGo package arrival" className="object-cover" layout="fill" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* The Underground Solution Section */}
      <section className="w-full flex flex-col items-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">The Underground Solution Car Dealers Don't Want You to Know</h2>
          <div className="text-center text-gray-700 mb-8">The car flippers Marcus mentioned weren't using expensive chemicals or professional services. They were using OdorGo — a compact ozone generator that destroys smoke particles at the molecular level.</div>
          
          <div className="bg-blue-50 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-blue-800 mb-4">How OdorGo Actually Works:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-1">🔬</span>
                <div>
                  <div className="font-bold text-blue-700 mb-1">Ozone Generation</div>
                  <div className="text-gray-700">Creates O₃ molecules that seek out contaminants</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-1">⚛️</span>
                <div>
                  <div className="font-bold text-blue-700 mb-1">Molecular Destruction</div>
                  <div className="text-gray-700">Breaks down smoke particles through oxidation</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-1">🎯</span>
                <div>
                  <div className="font-bold text-blue-700 mb-1">Complete Elimination</div>
                  <div className="text-gray-700">Particles are destroyed, not masked or moved</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-1">♻️</span>
                <div>
                  <div className="font-bold text-blue-700 mb-1">Natural Breakdown</div>
                  <div className="text-gray-700">Ozone converts back to regular oxygen</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jake's Transformation Section */}
      <section className="w-full flex flex-col items-center bg-blue-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">Jake's Transformation: From Shame to Confidence</h2>
          <div className="text-center text-gray-700 mb-8">
            Jake ordered three OdorGo units that night. When they arrived, he followed the simple instructions: charge the device, set it in his truck, run it for 30 minutes while stepping outside.
          </div>
          <div className="bg-white rounded-2xl p-6 mb-8">
            <div className="text-xl text-blue-800 font-bold mb-4">The results were immediate.</div>
            <div className="text-gray-700 mb-6">
              Not "fresher" — completely odor-free. For the first time in years, Jake opened his truck door and smelled... nothing. Clean air. No smoke. No artificial fragrances. Just clean.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="font-bold text-blue-700 mb-2">Week 1: The Professional Breakthrough</div>
              <div className="text-gray-700">That Friday, Jake offered a client a ride without thinking twice. No anxiety. No excuses. When they arrived, the client actually commented on how clean his truck was.</div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="font-bold text-blue-700 mb-2">Week 2: Family Reunion</div>
              <div className="text-gray-700">Sarah got in the passenger seat for the first time in months. No comments about the smell because there wasn't one. Their weekend errands became normal again.</div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="font-bold text-blue-700 mb-2">Week 3: The Ultimate Test</div>
              <div className="text-gray-700">Jake volunteered for school pickup. Kids piled in without hesitation. His son's friend asked if he'd gotten a new car because it "smelled so good."</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-blue-800 mb-4">The emotional impact was profound:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">No more anxiety before giving anyone a ride</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">Professional confidence restored</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">Family harmony returned</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">Social life back to normal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Shame Spiral Section */}
      <section className="w-full flex flex-col items-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">The Shame Spiral That Every Car Smoker Knows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">💼</span>
              <div>
                <div className="font-bold text-blue-700 mb-1">Professional Humiliation</div>
                <div className="text-gray-700 text-sm">
                  • Client meetings became anxiety attacks — will they notice? Will they judge?<br/>
                  • Colleagues declining rides became the norm<br/>
                  • Business opportunities lost because of something as simple as transportation
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">👨‍👩‍👧‍👦</span>
              <div>
                <div className="font-bold text-blue-700 mb-1">Family Fractures</div>
                <div className="text-gray-700 text-sm">
                  • Sarah refusing to ride in his truck anymore<br/>
                  • Kids making excuses to ride with friends instead<br/>
                  • Family road trips requiring her car, cramping everyone into a smaller space
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🚫</span>
              <div>
                <div className="font-bold text-blue-700 mb-1">Social Isolation</div>
                <div className="text-gray-700 text-sm">
                  • Skipping carpools to avoid embarrassment<br/>
                  • Making elaborate excuses to avoid giving anyone rides<br/>
                  • The constant underlying shame of being "that guy" with the smelly car
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">💰</span>
              <div>
                <div className="font-bold text-blue-700 mb-1">Financial Drain</div>
                <div className="text-gray-700 text-sm">
                  • $200 detail sessions that lasted three days<br/>
                  • Endless air fresheners that made it smell like "pine tree smoke"<br/>
                  • Even considering trading in a perfectly good truck just to escape the odor
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Root Causes Section */}
      <section className="w-full flex flex-col items-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">Here's what actually happens when you smoke in your car</h2>
          <p className="text-center text-blue-700 font-medium mb-8">And why it lingers even after expensive sprays <span className="italic">cause…</span></p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🧲</span>
              <div>
                <div className="font-bold text-blue-700 mb-1">Molecular Bonding</div>
                <div className="text-gray-700 text-sm">Smoke particles chemically attach to car surfaces at the molecular level — air fresheners just layer more smell on top of embedded odor.</div>
              </div>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🏠</span>
              <div>
                <div className="font-bold text-indigo-700 mb-1">Enclosed Saturation</div>
                <div className="text-gray-700 text-sm">Unlike outdoor smoking, car interiors trap and concentrate smoke with no escape route, creating permanent odor absorption in every surface.</div>
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">♨️</span>
              <div>
                <div className="font-bold text-orange-700 mb-1">Heat Reactivation</div>
                <div className="text-gray-700 text-sm">Daily sun exposure turns your car into an oven, "cooking" trapped smoke molecules back into the air — explaining why the smell returns after cleaning.</div>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🌪️</span>
              <div>
                <div className="font-bold text-purple-700 mb-1">Ventilation Circulation</div>
                <div className="text-gray-700 text-sm">Your car's AC system becomes a smoke distribution network, pulling odor from vents and spreading it to every surface, recontaminating constantly.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="w-full flex flex-col items-center bg-blue-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">Your Car Can Smell Fresh Again — Starting Today</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-4 shadow">
              <h3 className="text-lg font-bold text-red-700 mb-3">No More:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  <span className="text-gray-700">Expensive detail sessions that don't last</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  <span className="text-gray-700">Embarrassing moments with passengers</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  <span className="text-gray-700">Family arguments about the car smell</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  <span className="text-gray-700">Lost business opportunities due to odor</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  <span className="text-gray-700">Avoiding giving people rides</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-4 shadow">
              <h3 className="text-lg font-bold text-green-700 mb-3">Instead, Experience:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Immediate, permanent odor elimination</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Professional confidence in any driving situation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Family harmony restored</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Social freedom without shame</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Preserved vehicle value</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-8 text-center">
            <h3 className="text-xl font-bold text-blue-800 mb-4">OdorGo works in any vehicle:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 justify-center">
                <span className="text-blue-500">🚗</span>
                <span className="text-gray-700">Cars & Trucks</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-blue-500">🚐</span>
                <span className="text-gray-700">SUVs & Vans</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-blue-500">🏠</span>
                <span className="text-gray-700">RVs</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-blue-500">🚙</span>
                <span className="text-gray-700">Fleet Vehicles</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold mb-2">90-Day Risk-Free Guarantee</h3>
              <p>Try OdorGo in your vehicle for 90 days. If it doesn't completely eliminate smoke odor — if you're not driving with total confidence — return it for a full refund.</p>
            </div>
            <div className="text-center text-lg font-medium">
              You have nothing to lose except the shame, embarrassment, and isolation.
            </div>
          </div>

          <div className="text-center">
            <blockquote className="italic text-gray-700 text-lg mb-8">
              "I spent years feeling ashamed of my own truck. Thousands on solutions that didn't work. If you smoke in your car, this is the only thing that actually solves the problem. I wish I'd found it years ago."
              <footer className="text-blue-700 font-medium mt-2">- Jake's advice to other car smokers</footer>
            </blockquote>
            
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-12 rounded-full text-xl transition" onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Order OdorGo Today and Get Your Freedom Back
            </button>
          </div>
        </div>
      </section>

      {/* Move BuyBox here */}
      <BuyBox />
    </div>
  )
}