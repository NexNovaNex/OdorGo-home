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
      <div className="bg-gradient-to-r from-pink-50 to-white">
        <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center gap-8 px-2 md:px-4 pt-0 md:pt-0 pb-6 md:pb-16">
          {/* Left: Text Content */}
          <div className="flex-1 max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-gray-900">
              If You're Still Awake at 3AM With <span className="text-pink-600 font-extrabold">RLS</span> — <span className="text-pink-500 italic">Rubbing Your Legs</span>, Watching the Clock, and Wondering Why <span className="text-pink-400 underline">Nothing's Working</span>… I've Been There.
            </h1>
            <div className="flex items-center gap-2 text-pink-600 font-medium mb-2">
              <span className="text-lg">❤️</span>
              The First Formula Specifically Created to Calm Restless Legs at the True Source
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-pink-200">
                <span className="text-2xl mt-1">🧬</span>
                <div>
                  <div className="font-semibold text-gray-900"> Made Specifically for RLS Sufferers*</div>
                  <div className="text-gray-500 text-sm">Targets the neurological misfires behind RLS — not just the leg symptoms.</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-pink-200">
                <span className="text-2xl mt-1">🧖‍♀️</span>
                <div>
                  <div className="font-semibold text-gray-900">Fewer Nighttime Jolts*</div>
                  <div className="text-gray-500 text-sm">No more kicking, pacing, or sleepless nights.</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-pink-200">
                <span className="text-2xl mt-1">🌸</span>
                <div>
                  <div className="font-semibold text-gray-900">Sleep More Peacefully*</div>
                  <div className="text-gray-500 text-sm">Calmer nerves. More stillness. Better rest</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-pink-200">
                <span className="text-2xl mt-1">🌱</span>
                <div>
                  <div className="font-semibold text-gray-900">Relief from Within*</div>
                  <div className="text-gray-500 text-sm">Supports brain-body balance so your legs stay still and calm.</div>
                </div>
              </div>
            </div>
            <div className="bg-pink-50 border border-pink-200 rounded-xl px-4 py-3 mb-4 text-pink-700 font-semibold text-center">
              Feel Like Yourself Again*<br/>
              <span className="text-pink-500 font-normal">More energy. More clarity. More you.</span>
            </div>
            <div className="text-xs text-gray-400 mb-4">Backed by clinical insights into dopamine, glutamate, and circadian rhythm disruption.</div>
            <div className="flex justify-center mb-6">
              <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full text-lg transition w-full md:w-auto" onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}>Start Calming the Chaos From Within</button>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 items-center justify-center md:justify-center mt-2">
              <div className="flex items-center gap-1"><span className="text-lg">🧬</span> Formulated for RLS</div>
              <div className="flex items-center gap-1"><span className="text-lg">🔬</span> Neuroscience-Inspired</div>
              <div className="flex items-center gap-1"><span className="text-lg">🚫</span> Non-Sedating, Drug-Free</div>
              <div className="flex items-center gap-1"><span className="text-lg">🇺🇸</span> Made in the USA</div>
            </div>
          </div>
          {/* Right: Image */}
          <div className="flex-1 flex items-center justify-center">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white p-2">
              <Image src="/SC-placeholder.jpg" alt="Woman holding sc product" className="w-[340px] h-[420px] object-cover rounded-xl" width={340} height={420} />
            </div>
          </div>
        </div>
      </div>
      {/* Reviews Section */}
      <section className="w-full flex justify-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-2xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">Confidence with SerenityCore</h2>
          <p className="text-center text-gray-600 mb-8">"See how real people with RLS are finally sleeping through the night, quieting their legs, and feeling like themselves again — without sedation, meds, or side effects.</p>
          <div className="flex flex-col gap-4 mb-8">
            {/* Review 1 */}
            <div className="flex gap-3 bg-gray-50 rounded-2xl shadow p-2 md:p-4 items-start">
              <Image src="/profile1.jpg" alt="Tasha P." className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
              <div>
                <div className="font-semibold text-gray-800">Tasha P.</div>
                <div className="text-gray-700 text-sm">I used to dread going to bed — not because I wasn't tired, but because I knew the twitching would start. 2 weeks in and for the first time in forever, I actually fell asleep before midnight. I cried. Real, grateful tears 🥹</div>
              </div>
            </div>
            {/* Review 2 */}
            <div className="flex gap-3 bg-gray-50 rounded-2xl shadow p-2 md:p-4 items-start">
              <Image src="/profile2.jpg" alt="Marie S." className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
              <div>
                <div className="font-semibold text-gray-800">Marie S.</div>
                <div className="text-gray-700 text-sm">Tried every 'hack' I read online — magnesium, socks, leg rubs, even weird old wives' tricks. Nothing touched the restlessness. SerenityCore is the first thing that helped my *nights* feel normal again. Finally.</div>
              </div>
            </div>
            {/* Review 3 */}
            <div className="flex gap-3 bg-gray-50 rounded-2xl shadow p-2 md:p-4 items-start">
              <Image src="/profile3.jpg" alt="Maya R." className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
              <div>
                <div className="font-semibold text-gray-800">Jillian F.</div>
                <div className="text-gray-700 text-sm">It's not magic. It's just that I finally slept 4 nights in a row — next to my husband — without kicking him or pacing the floor. It's been years since I've felt this hopeful about sleep.</div>
                      </div>
                    </div>
            {/* Review 4 */}
            <div className="flex gap-3 bg-gray-50 rounded-2xl shadow p-2 md:p-4 items-start">
              <Image src="/profile4.jpg" alt="Elise M." className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
                    <div>
                <div className="font-semibold text-gray-800">Elise M.</div>
                <div className="text-gray-700 text-sm">Why is no one talking about RLS like this?! I thought I was the only one who was up pacing at 2AM every night. This made me feel human again. And not crazy.😳🙌</div>
              </div>
                            </div>
            {/* Review 5 */}
            <div className="flex gap-3 bg-gray-50 rounded-2xl shadow p-2 md:p-4 items-start">
              <Image src="/profile5.jpg" alt="Shannon R." className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
              <div>
                <div className="font-semibold text-gray-800">Shannon R.</div>
                <div className="text-gray-700 text-sm">It wasn't just the leg relief. It was waking up with energy. It was not feeling broken. SerenityCore gave me *me* back. That's what makes it worth it.</div>
                      </div>
                    </div>
                  </div>
          <div className="flex justify-center">
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full text-lg transition" onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}>Reclaim Your Nights</button>
                        </div>
                      </div>
      </section>
      {/* Founder Story Section */}
      <section className="w-full flex justify-center bg-pink-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-10 items-start">
          {/* Left: Story */}
          <div className="flex-1 min-w-0 flex flex-col items-start md:items-start">
            <div className="flex items-center gap-3 mb-2">
              <Image src="/founder-avatar.jpg" alt="Lina founder avatar" className="w-12 h-12 rounded-full object-cover border-2 border-pink-300" width={48} height={48} />
              <span className="text-lg font-semibold text-pink-700">Hey, I'm Bella — I'm the one who started <span className='text-pink-600 font-bold'>SerenityCore.</span></span>
                        </div>
            <div className="text-gray-700 mb-4">
            Not because I dreamed of launching a brand, but because I couldn't take another night of feeling like a stranger in my own body.<br/><br/>
              For years, I thought I just had 'bad sleep habits' or maybe anxiety. But no matter what I tried — nothing prepared me for the constant, silent chaos that is RLS.<br/><br/>
              It started small — just a little twitching. Then full-on pacing. Sleepless nights. Separate beds. I was exhausted, embarrassed, and honestly — angry.
                        </div>
            <div className="bg-white border-l-4 border-pink-400 rounded-r-xl p-2 md:p-4 mb-4 text-pink-700 font-medium shadow">
            I'd lay in bed, exhausted — and cry. Because I knew what was coming. The twitching. The restlessness. The shame. The night I'd lose — again.
                        </div>
            <div className="text-gray-700 mb-4">
            I tried everything — magnesium, iron, stretching, TikTok tricks, soap under the sheets. Some worked for a week. Most did nothing.<br/><br/>
              <ul className="list-none pl-0 mb-4">
                <li className="flex items-center gap-2 text-pink-600 font-medium"><span className="text-xl">✗</span> I dreaded bedtime</li>
                <li className="flex items-center gap-2 text-pink-600 font-medium"><span className="text-xl">✗</span> I paced circles through the living room at 2AM</li>
                <li className="flex items-center gap-2 text-pink-600 font-medium"><span className="text-xl">✗</span> My partner moved to the guest room</li>
                <li className="flex items-center gap-2 text-pink-600 font-medium"><span className="text-xl">✗</span> I started apologizing for who I'd become</li>
              </ul>
              Then one night, I stumbled across a Tiktok — someone said RLS wasn't really a leg issue. It was neurological. A signal problem. And suddenly... it all made sense. —
                        </div>
                      </div>
          {/* Right: Before/After */}
          <div className="flex-1 min-w-0 flex flex-col items-center justify-center md:items-center">
            <div className="bg-white rounded-2xl shadow-lg p-4 w-full max-w-xs mx-auto">
              <Image src="/before-after.jpg" alt="PCOS Hair Transformation" className="rounded-xl w-full object-cover mb-2" width={400} height={300} />
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Before<br/>3 months ago</span>
                <span>After<br/>Today</span>
              </div>
              <div className="text-center text-pink-700 font-semibold text-sm">My RLS Transformation</div>
              <div className="text-center text-gray-500 text-xs">After just 12 weeks using SerenityCore</div>
                        </div>
                      </div>
                    </div>
      </section>
      {/* Root Causes Section */}
      <section className="w-full flex flex-col items-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">And Just Like That… It All Finally Made Sense</h2>
          <p className="text-center text-pink-700 font-medium mb-8">Turns out my RLS was due to this root <span className="italic">cause…</span></p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-pink-50 border border-pink-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🧬</span>
              <div>
                <div className="font-bold text-pink-700 mb-1">Dopamine Deficiency</div>
                <div className="text-gray-700 text-sm">Low dopamine in the brain disrupts motor control and the ability to stay still at night — a key RLS trigger.</div>
              </div>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🩸</span>
              <div>
                <div className="font-bold text-indigo-700 mb-1">Glutamate Overactivity</div>
                <div className="text-gray-700 text-sm">Excess excitatory neurotransmitters (like glutamate) overstimulate nerves, leading to nighttime leg activity.</div>
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🔥</span>
              <div>
                <div className="font-bold text-orange-700 mb-1">Circadian Disruption</div>
                <div className="text-gray-700 text-sm">RLS sufferers often have a misaligned body clock — unable to properly recognize when to rest vs. stay alert.</div>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🧬</span>
              <div>
                <div className="font-bold text-purple-700 mb-1">Neuro-sensitivity</div>
                <div className="text-gray-700 text-sm">Many people with RLS have a hypersensitive nervous system — making small imbalances feel overwhelming at night.</div>
                      </div>
                    </div>
                  </div>
                </div>
        <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <div className="italic text-2xl md:text-3xl text-pink-800 font-bold mb-4">For the first time, I understood: nothing worked because everything I tried ignored what was really going wrong inside my brain.</div>
            <div className="text-gray-700">
            So after that  Tiktok video, I went full rabbit hole mode. PubMed. YouTube. Forums. 2AM science dives. Obsessing. I just needed to know what actually helped people like me.<br/><br/>
            Someone mentioned dopamine. Another said magnesium only worked with tyrosine. One person swore by this weird old Chinese formula. I was like — what is this even treating?<br/><br/>
            But then I kept seeing the same ingredients. Again and again. Different brands. Same core. Same signals. Same science.
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <Image src="/founder-avatar.jpg" alt="Root cause research" className="rounded-2xl shadow-lg w-full max-w-xs object-cover" width={320} height={320} />
          </div>
        </div>
      </section>
      {/* Key Ingredients Section */}
      <section className="w-full flex flex-col items-center bg-purple-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-5xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-900 mb-2">I Kept Seeing the Same Ingredients — Over and Over — And It Finally Clicked</h2>
          <p className="text-center text-purple-700 mb-10">These weren't trendy sleep hacks. They were backed by real neuroscience — and made for people like me who were desperate to stop pacing the floor at 3AM.</p>
          <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8">
            {/* Saw Palmetto */}
            <div className="flex flex-col items-center text-center">
              <Image src="/ingredient-saw-palmetto.jpg" alt="Paeoniae Radix (Bai Shao)" className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover mb-2 md:mb-4 border-4 border-purple-200" width={96} height={96} />
              <div className="font-bold text-purple-800 mb-1">Paeoniae Radix (Bai Shao)</div>
              <div className="text-gray-700 text-sm">💤 Acts as a muscle relaxant and blood nourisher, traditionally used to reduce spasms and restore nighttime ease.</div>
            </div>
            {/* Myo + D-Chiro Inositol */}
            <div className="flex flex-col items-center text-center">
              <Image src="/ingredient-inositol.jpg" alt="L-Tyrosine" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-purple-200" width={112} height={112} />
              <div className="font-bold text-purple-800 mb-1">L-Tyrosine</div>
              <div className="text-gray-700 text-sm">🧠 Supports healthy dopamine levels — one of the most critical calming signals that goes missing in RLS sufferers at night.</div>
            </div>
            {/* Berberine */}
            <div className="flex flex-col items-center text-center">
              <Image src="/ingredient-berberine.jpg" alt="Angelica sinensis (Dang Gui)" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-purple-200" width={112} height={112} />
              <div className="font-bold text-purple-800 mb-1">Angelica sinensis (Dang Gui)</div>
              <div className="text-gray-700 text-sm">🌿 Enhances circulation and nourishes blood — used in traditional formulas to reduce stagnation and support calm legs.</div>
            </div>
            {/* Curcumin */}
            <div className="flex flex-col items-center text-center">
              <Image src="/ingredient-curcumin.jpg" alt="Ligusticum chuanxiong" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-purple-200" width={112} height={112} />
              <div className="font-bold text-purple-800 mb-1">Ligusticum chuanxiong</div>
              <div className="text-gray-700 text-sm">💓 Promotes blood flow and helps clear tension in the lower limbs. Often used to support conditions involving restless movement.</div>
            </div>
            {/* Zinc */}
            <div className="flex flex-col items-center text-center">
              <Image src="/ingredient-zinc.jpg" alt="Bupleurum (Chai Hu)" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-purple-200" width={112} height={112} />
              <div className="font-bold text-purple-800 mb-1">Bupleurum (Chai Hu)</div>
              <div className="text-gray-700 text-sm">🔥 Helps regulate liver qi and relieve emotional tension — both contributors to the stress-induced flare-ups common in RLS.</div>
            </div>
            {/* New Ingredient */}
            <div className="flex flex-col items-center text-center">
              <Image src="/ingredient-placeholder.jpg" alt="Poria (Fu Ling)" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-purple-200" width={112} height={112} />
              <div className="font-bold text-purple-800 mb-1">Poria (Fu Ling)</div>
              <div className="text-gray-700 text-sm">🌙 Calms the Shen (spirit), promotes emotional stability, and supports fluid balance for uninterrupted, grounded sleep.</div>
            </div>
          </div>
        </div>
      </section>
      {/* System Failure & Solution Section */}
      <section className="w-full flex justify-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-10 items-center">
          {/* Left: Text */}
          <div className="flex-1">
            <div className="text-2xl md:text-3xl font-bold text-purple-800 mb-4">It started to feel less like a personal failing… and more like a neurological system failure.</div>
            <div className="text-gray-700 mb-4">That's when it hit me — no one had actually put this together. Everything out there felt generic, half-dosed, or completely blind to what RLS really is.</div>
            <div className="text-2xl font-bold text-purple-700 italic mb-2">So I created it myself.</div>
            <div className="text-gray-700 mb-4">I partnered with a clinical formulation lab, spent months obsessing over studies, talking to neuroscientists, refining dosages, and starting over more times than I can count. I didn't want fluff. I wanted something I'd actually take — something that actually worked for RLS.</div>
            <div className="text-gray-700">SerenityCore wasn't whipped up in my kitchen. It was developed with real experts, third-party tested, made with clean, traceable ingredients — and built on top of decades of sleep, dopamine, and neuro-calming research.</div>
          </div>
          {/* Right: Image */}
          <div className="flex-1 flex justify-center items-center">
            <Image src="/root-cause-.jpg" alt="I got this" className="rounded-xl w-full max-w-xs object-cover" width={320} height={320} />
          </div>
        </div>
      </section>
      {/* What Makes SerenityCore Different Section */}
      <section className="w-full flex flex-col items-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-900 mb-10">What Makes SerenityCore Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Not built for the masses */}
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-1">✅</span>
              <div>
                <div className="font-bold text-gray-900 mb-1">Not built for the sleep disorder crowd</div>
                <div className="text-gray-600 text-sm">Made specifically for those of us with Restless Legs Syndrome — who've tried everything and still can't stay still at night.</div>
              </div>
            </div>
            {/* Not another gimmick */}
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-1">❌</span>
              <div>
                <div className="font-bold text-gray-900 mb-1">Not another "calm blend"</div>
                <div className="text-gray-600 text-sm">No fluffy claims. No generic herbs. Just ingredients that match the actual brain-body disconnect happening in RLS.</div>
              </div>
            </div>
            {/* Not for people who've never been dismissed by doctors */}
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-1">🧑‍⚕️</span>
              <div>
                <div className="font-bold text-gray-900 mb-1">Not for people who've never been told to just "live with it"</div>
                <div className="text-gray-600 text-sm">This is for the ones who were dismissed, medicated, or misdiagnosed — and still kept searching for answers.</div>
              </div>
            </div>
            {/* Created because nothing else worked */}
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-1">🟦</span>
              <div>
                <div className="font-bold text-gray-900 mb-1">Created because nothing else worked</div>
                <div className="text-gray-600 text-sm">Born out of pacing nights, real science, and the refusal to settle for sedation as a "solution."</div>
              </div>
            </div>
          </div>
          {/* Made for us — not them */}
          <div className="flex items-start gap-3 mt-8">
            <span className="text-2xl mt-1">❤️</span>
            <div>
              <div className="font-bold text-gray-900 mb-1">Made for us — not them</div>
              <div className="text-gray-600 text-sm">For the ones who watched the clock hit 3AM again… who apologized for being tired… and who still believe real rest is possible.</div>
            </div>
          </div>
        </div>
      </section>
      {/* Product Introduction Section */}
      <section className="w-full flex justify-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-10 items-center">
          {/* Left: Product Image and Badges */}
          <div className="flex-1 flex flex-col items-center md:items-start relative mb-8 md:mb-0 w-full">
            <div className="w-full text-center mb-4">
              <span className="text-2xl align-middle">🔥</span>
              <span className="text-purple-700 font-extrabold text-lg sm:text-xl md:text-2xl align-middle ml-2">Introducing...</span>
            </div>
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-[3/4] bg-gray-100 rounded-xl flex items-center justify-center mb-2 mx-auto">
              <Image src="/bottle-placeholder.png" alt="Product bottle" className="w-full h-auto object-contain rounded-xl" width={320} height={400} />
              <span className="absolute top-3 right-3 bg-pink-200 text-pink-700 text-xs font-bold px-3 py-1 rounded-full shadow">Clinically Tested</span>
            </div>
          </div>
          {/* Right: Product Details */}
          <div className="flex-1">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Just 2 Capsules a Night</div>
            <div className="text-pink-600 font-semibold text-lg mb-2">Support Your Brain's Calm Signals, Still Your Legs, and Sleep Like You Again</div>
            <div className="text-gray-700 mb-3">Finally — something that actually targets the neurological root of Restless Legs Syndrome.
            Not another sedative. Not another guess. Just ingredients that help your system reset — from the inside out.</div>
            <div className="italic text-gray-600 mb-6">Formulated by real people who've lived through RLS. For those who are still living it.</div>
            <button
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-full text-lg transition mb-2 flex items-center justify-center gap-2 shadow text-center"
              onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              SUBSCRIBE & SAVE <span>🛒</span>
            </button>
            <div className="flex gap-6 mt-2">
              <div className="flex items-center gap-2 text-green-600 text-sm"><span>●</span> 60-Day Money Back Guarantee</div>
              <div className="flex items-center gap-2 text-green-600 text-sm"><span>●</span> Free Shipping</div>
            </div>
          </div>
        </div>
      </section>
      {/* Transformation Experience Section */}
      <section className="w-full flex flex-col items-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">Here's What You'll Feel With <span className='text-pink-600'>SerenityCore</span></h2>
          <div className="text-center text-gray-500 text-sm mb-8">(Not our opinion. Simply the conclusion from 1,000+ clinical studies.)</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {/* Peaceful Showers Again */}
            <div className="bg-pink-50 border border-pink-200 rounded-xl p-2 md:p-4 relative">
              <span className="absolute top-3 right-3 bg-pink-200 text-pink-700 text-xs font-bold px-2 py-1 rounded-full">🛏️</span>
              <div className="font-bold text-pink-700 mb-1">Still Nights Again</div>
              <div className="text-gray-700 text-sm">No more pacing. No more dread. Just still legs — and sleep.</div>
            </div>
            {/* Full, Feminine Hair */}
            <div className="bg-pink-50 border border-pink-200 rounded-xl p-2 md:p-4 relative">
              <span className="absolute top-3 right-3 bg-pink-200 text-pink-700 text-xs font-bold px-2 py-1 rounded-full">💤</span>
              <div className="font-bold text-pink-700 mb-1">Rest That Feels Real</div>
              <div className="text-gray-700 text-sm">You wake up and think: "Wait… did I actually sleep through the night?"</div>
            </div>
            {/* Mirror Moments */}
            <div className="bg-pink-50 border border-pink-200 rounded-xl p-2 md:p-4 relative">
              <span className="absolute top-3 right-3 bg-pink-200 text-pink-700 text-xs font-bold px-2 py-1 rounded-full">🪞</span>
              <div className="font-bold text-pink-700 mb-1">Morning Peace</div>
              <div className="text-gray-700 text-sm">You see your reflection — and don't look tired, irritated, or broken. You look like you.</div>
            </div>
            {/* Self-Love Again */}
            <div className="bg-pink-50 border border-pink-200 rounded-xl p-2 md:p-4 relative">
              <span className="absolute top-3 right-3 bg-pink-200 text-pink-700 text-xs font-bold px-2 py-1 rounded-full">🫶</span>
              <div className="font-bold text-pink-700 mb-1">Emotional Reset</div>
              <div className="text-gray-700 text-sm">This isn't just rest. It's your stability. Your spark. Your softness coming back.</div>
            </div>
            {/* Made for PCOS Warriors */}
            <div className="bg-pink-50 border border-pink-200 rounded-xl p-2 md:p-4 relative">
              <span className="absolute top-3 right-3 bg-pink-200 text-pink-700 text-xs font-bold px-2 py-1 rounded-full">🧠</span>
              <div className="font-bold text-pink-700 mb-1">Made for RLS Sufferers</div>
              <div className="text-gray-700 text-sm">This isn't for everyone. It's for the ones who were dismissed, sedated, and still searching.</div>
            </div>
            {/* Dating Confidence */}
            <div className="bg-pink-50 border border-pink-200 rounded-xl p-2 md:p-4 relative">
              <span className="absolute top-3 right-3 bg-pink-200 text-pink-700 text-xs font-bold px-2 py-1 rounded-full">💬</span>
              <div className="font-bold text-pink-700 mb-1">Confidence to Connect Again</div>
              <div className="text-gray-700 text-sm">When your nights feel steady, your days feel safe — and you can show up again.</div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full text-lg transition shadow" onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}>RECLAIM YOUR HAIR & HORMONES</button>
            </div>
          </div>
        </section>
      {/* SerenityCore Transformation Journey Section */}
      <section className="w-full flex flex-col items-center bg-pink-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-2xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-900 mb-2">Your RLS Transformation Journey</h2>
          <div className="text-center text-gray-600 mb-10">This isn't instant. But it's real. Here's what starts to shift as your body learns how to rest again.</div>
          <div className="flex flex-col gap-8 mb-8">
            {/* Day 1 */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center min-w-[32px]">
                <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold mb-1">1</div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-pink-600 mb-1 flex items-center gap-2"><span role="img" aria-label="calendar">🗓️</span> Day 1</div>
                <div className="bg-white rounded-lg p-2 md:p-4 text-gray-700 shadow">Your body begins absorbing ingredients that support calm dopamine signals and reduce nighttime neural overactivity. You may not feel it yet, but something's shifting.</div>
              </div>
            </div>
            {/* Week 2 */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center min-w-[32px]">
                <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold mb-1">2</div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-pink-600 mb-1 flex items-center gap-2"><span role="img" aria-label="calendar">🗓️</span> Week 2</div>
                <div className="bg-white rounded-lg p-2 md:p-4 text-gray-700 shadow">Your legs feel a bit quieter. You're not pacing as long. Falling asleep doesn't feel like a fight every night.</div>
              </div>
            </div>
            {/* Month 1 */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center min-w-[32px]">
                <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold mb-1">3</div>
                </div>
              <div className="flex-1">
                <div className="font-bold text-pink-600 mb-1 flex items-center gap-2"><span role="img" aria-label="calendar">🗓️</span> Month 1</div>
                <div className="bg-white rounded-lg p-2 md:p-4 text-gray-700 shadow">You're not waking up in panic anymore. The twitches are fewer. You've slept through the night once — maybe even twice.</div>
              </div>
            </div>
            {/* Month 3 */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center min-w-[32px]">
                <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold mb-1">4</div>
                </div>
              <div className="flex-1">
                <div className="font-bold text-pink-600 mb-1 flex items-center gap-2"><span role="img" aria-label="calendar">🗓️</span> Month 3</div>
                <div className="bg-white rounded-lg p-2 md:p-4 text-gray-700 shadow">You've slept next to your partner again. No separate rooms. No shame. Just real, restful nights — and quiet legs.</div>
              </div>
            </div>
            {/* Month 12 */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center min-w-[32px]">
                <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold mb-1">5</div>
                </div>
              <div className="flex-1">
                <div className="font-bold text-pink-600 mb-1 flex items-center gap-2"><span role="img" aria-label="calendar">🗓️</span> Month 12</div>
                <div className="bg-white rounded-lg p-2 md:p-4 text-gray-700 shadow">Your nights are yours again. You sleep. You focus. You feel steady, grounded, and back in control of your body. This is your normal now.</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full text-lg transition shadow" onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}>RECLAIM YOUR HAIR & HORMONES</button>
          </div>
        </div>
      </section>
      {/* Old Way vs New Way Section */}
      <section className="w-full flex justify-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Old Way */}
          <div className="bg-red-50 rounded-2xl p-3 md:p-6 flex flex-col items-center">
            <div className="text-2xl font-bold text-red-500 mb-6">THE OLD WAY</div>
            <div className="flex flex-col gap-6 w-full relative">
              <div className="bg-white rounded-lg p-2 md:p-4 text-center text-gray-700 shadow">Late-night pacing, stretching, and leg massages that barely help</div>
              <div className="h-4 w-1 bg-red-200 mx-auto"></div>
              <div className="bg-white rounded-lg p-2 md:p-4 text-center text-gray-700 shadow">Stacking magnesium, iron, and random TikTok hacks with no lasting relief</div>
              <div className="h-4 w-1 bg-red-200 mx-auto"></div>
              <div className="bg-white rounded-lg p-2 md:p-4 text-center text-gray-700 shadow">Prescription meds that knock you out or cause rebound RLS</div>
              <div className="h-4 w-1 bg-red-200 mx-auto"></div>
              <div className="bg-white rounded-lg p-2 md:p-4 text-center text-gray-700 shadow">Sleeping in separate beds, feeling ashamed and exhausted</div>
              <div className="h-4 w-1 bg-red-200 mx-auto"></div>
              <div className="bg-white rounded-lg p-2 md:p-4 text-center text-gray-700 shadow">Watching the clock hit 3AM, then 4, then 5… again
              </div>
              <div className="h-4 w-1 bg-red-200 mx-auto"></div>
              <div className="bg-white rounded-lg p-2 md:p-4 text-center text-gray-700 shadow">Doctors telling you it's 'just anxiety' or 'age' and offering no real answers</div>
            </div>
          </div>
          {/* New Way */}
          <div className="bg-green-50 rounded-2xl p-3 md:p-6 flex flex-col items-center">
            <div className="text-2xl font-bold text-green-600 mb-6">THE NEW WAY</div>
            <div className="flex flex-col gap-6 w-full relative">
              <div className="bg-green-100 rounded-lg p-2 md:p-4 text-center text-green-900 shadow">Support from within — where RLS actually begins: the brain's sleep signals</div>
              <div className="h-4 w-1 bg-green-200 mx-auto"></div>
              <div className="bg-green-100 rounded-lg p-2 md:p-4 text-center text-green-900 shadow">Backed by neuroscience, not random hacks or myths</div>
              <div className="h-4 w-1 bg-green-200 mx-auto"></div>
              <div className="bg-green-100 rounded-lg p-2 md:p-4 text-center text-green-900 shadow">One nightly formula built specifically for RLS relief (not generic sleep aids)</div>
              <div className="h-4 w-1 bg-green-200 mx-auto"></div>
              <div className="bg-green-100 rounded-lg p-2 md:p-4 text-center text-green-900 shadow">Calm neural overactivity, restore dopamine balance, and realign circadian rhythm</div>
              <div className="h-4 w-1 bg-green-200 mx-auto"></div>
              <div className="bg-green-100 rounded-lg p-2 md:p-4 text-center text-green-900 shadow">Fewer nighttime twitches, more restorative sleep</div>
              <div className="h-4 w-1 bg-green-200 mx-auto"></div>
              <div className="bg-green-100 rounded-lg p-2 md:p-4 text-center text-green-900 shadow">Wake up rested, connected, and in control of your nights</div>
            </div>
          </div>
        </div>
      </section>
      {/* Real Women Testimonials Section */}
      <section className="w-full flex flex-col items-center bg-pink-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-5xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-900 mb-10">What Real RLS Sufferers Are Saying After Finding SerenityCore</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Testimonial 1 */}
            <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow p-3 md:p-6 gap-4 md:gap-6">
              <Image src="/profile2.jpg" alt="Layla M." className="w-32 h-32 object-cover rounded-xl mb-4 md:mb-0" width={128} height={128} />
              <div className="flex-1">
                <div className="flex gap-1 mb-1">{[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-lg">★</span>))}</div>
                <div className="font-bold text-pink-600 mb-1 flex items-center gap-2"><span role="img" aria-label="quote">🗣️</span> "I used to lie awake crying at 2AM… now I sleep through the night without pacing."</div>
                <div className="font-semibold text-gray-700 mb-1">- Tasha L.</div>
                <div className="text-gray-600 text-sm">"This is the first thing that actually made a difference. By week three, my legs were finally quiet enough to rest. I don't dread bedtime anymore."</div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow p-3 md:p-6 gap-4 md:gap-6">
              <div className="flex-1 order-2 md:order-1">
                <div className="flex gap-1 mb-1">{[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-lg">★</span>))}</div>
                <div className="font-bold text-pink-600 mb-1 flex items-center gap-2"><span role="img" aria-label="quote">🗣️</span> "My partner moved to the guest room. I was embarrassed. Now we sleep next to each other again."</div>
                <div className="font-semibold text-gray-700 mb-1">- Dena M.</div>
                <div className="text-gray-600 text-sm">""I didn't even realize how bad it had gotten. I'd wake up ashamed and exhausted. Now I sleep through most nights. My body's still, my mind's quiet. I feel human again."</div>
              </div>
              <Image src="/profile3.jpg" alt="Rina D." className="w-32 h-32 object-cover rounded-xl mb-4 md:mb-0 order-1 md:order-2" width={128} height={128} />
            </div>
            {/* Testimonial 3 */}
            <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow p-3 md:p-6 gap-4 md:gap-6">
              <Image src="/profile1.jpg" alt="Samira F." className="w-32 h-32 object-cover rounded-xl mb-4 md:mb-0" width={128} height={128} />
              <div className="flex-1">
                <div className="flex gap-1 mb-1">{[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-lg">★</span>))}</div>
                <div className="font-bold text-pink-600 mb-1 flex items-center gap-2"><span role="img" aria-label="quote">🗣️</span> "I used to try everything — magnesium, socks, hot baths. Nothing worked longer than a week. SerenityCore is different."</div>
                <div className="font-semibold text-gray-700 mb-1">- Theresa G.</div>
                <div className="text-gray-600 text-sm">"It's not hype. It's just finally something that works with my body. It took time — but I'm calmer, less wired, and I actually look forward to sleep now."</div>
              </div>
            </div>
            {/* Testimonial 4 (placeholder image) */}
            <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow p-3 md:p-6 gap-4 md:gap-6">
              <div className="flex-1 order-2 md:order-1">
                <div className="flex gap-1 mb-1">{[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-lg">★</span>))}</div>
                <div className="font-bold text-pink-600 mb-1 flex items-center gap-2"><span role="img" aria-label="quote">🗣️</span> "I thought this was just my life now — tired, twitchy, ashamed. I was wrong."</div>
                <div className="font-semibold text-gray-700 mb-1">- Linda T.</div>
                <div className="text-gray-600 text-sm">"This isn't a magic cure. But my legs don't jolt like they used to. And when I wake up now, I feel like me. That's something I didn't think I'd get back."</div>
              </div>
              <Image src="/profile4.jpg" alt="Placeholder" className="w-32 h-32 object-cover rounded-xl mb-4 md:mb-0 order-1 md:order-2" width={128} height={128} />
            </div>
          </div>
        </div>
      </section>
      {/* Urgency Section */}
      <section className="w-full flex flex-col items-center bg-white py-6 md:py-12 px-2 md:px-4">
        <div className="max-w-3xl w-full flex flex-col items-center">
          <div className="w-full bg-purple-700 rounded-2xl flex flex-row items-center p-3 md:p-8 mb-6">
            {/* Image and badge */}
            <div className="relative w-24 h-24 bg-white/20 rounded-xl flex items-center justify-center mr-6">
              <Image src="/bottle-placeholder.png" alt="Limited Supply" className="w-16 h-16 object-contain" width={64} height={64} />
              <span className="absolute top-2 left-2 bg-pink-200 text-pink-700 text-xs font-bold px-2 py-1 rounded-full shadow">Limited Supply</span>
            </div>
            {/* Text */}
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-yellow-300 text-lg">⚠️</span>
                <span className="font-bold text-lg md:text-xl">June has a high risk of selling out</span>
              </div>
              <div className="text-white/90 text-sm md:text-base">RLS-specific ingredients — including hard-to-source botanicals like Bai Shao and Chai Hu — are produced in small, controlled quantities to maintain purity and effectiveness.</div>
            </div>
          </div>
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-full text-lg transition mb-2 flex items-center justify-center gap-2 shadow"
            onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            UNLOCK YOUR TRUE POWER <span>🛒</span>
          </button>
          <div className="flex gap-6 mt-2">
            <div className="flex items-center gap-2 text-green-600 text-sm"><span>●</span> 60-Day Money Back</div>
            <div className="flex items-center gap-2 text-green-600 text-sm"><span>●</span> Free Shipping</div>
          </div>
        </div>
      </section>
      {/* Relatable Problems Section */}
      <section className="w-full flex flex-col items-center bg-purple-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-900 mb-2">If Any of This Sounds Familiar… You're Not Alone</h2>
          <div className="text-center text-purple-700 mb-10">Restless Legs Syndrome isn't just annoying. It's exhausting, isolating, and quietly devastating.</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Problem 1 */}
            <div className="bg-white rounded-xl p-3 md:p-5 shadow flex flex-col items-center text-center">
              <span className="text-3xl mb-2">🛏️</span>
              <div className="font-bold text-purple-800 mb-1">Dreading bedtime</div>
              <div className="text-gray-600 text-sm">You want to sleep — but you already know your legs will ruin it.</div>
            </div>
            {/* Problem 2 */}
            <div className="bg-white rounded-xl p-3 md:p-5 shadow flex flex-col items-center text-center">
              <span className="text-3xl mb-2">🌀</span>
              <div className="font-bold text-purple-800 mb-1">Pacing the house at 3AM</div>
              <div className="text-gray-600 text-sm">You've done laps through the kitchen, down the hall, in circles — night after night.</div>
            </div>
            {/* Problem 3 */}
            <div className="bg-white rounded-xl p-3 md:p-5 shadow flex flex-col items-center text-center">
              <span className="text-3xl mb-2">💔</span>
              <div className="font-bold text-purple-800 mb-1">Sleeping in separate beds</div>
              <div className="text-gray-600 text-sm">Not because you want to — but because you can't bear keeping them up anymore.</div>
            </div>
            {/* Problem 4 */}
            <div className="bg-white rounded-xl p-3 md:p-5 shadow flex flex-col items-center text-center">
              <span className="text-3xl mb-2">🙄</span>
              <div className="font-bold text-purple-800 mb-1">Being dismissed</div>
              <div className="text-gray-600 text-sm">Doctors call it anxiety. Friends don't get it. You've heard "just move more" more times than you can count.</div>
            </div>
            {/* Problem 5 */}
            <div className="bg-white rounded-xl p-3 md:p-5 shadow flex flex-col items-center text-center">
              <span className="text-3xl mb-2">💔</span>
              <div className="font-bold text-purple-800 mb-1">Losing confidence</div>
              <div className="text-gray-600 text-sm">You feel less like yourself and worry about what others see.</div>
            </div>
            {/* Problem 6 */}
            <div className="bg-white rounded-xl p-3 md:p-5 shadow flex flex-col items-center text-center">
              <span className="text-3xl mb-2">🧪</span>
              <div className="font-bold text-purple-800 mb-1">Trying everything</div>
              <div className="text-gray-600 text-sm">Magnesium. Iron. Creams. Socks. Soap under the sheet. It all blends together now.</div>
              </div>
            </div>
          </div>
        </section>
      {/* Let Down Story Section */}
      <section className="w-full flex flex-col items-center bg-white py-8 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
            Why People With RLS Have Been <span className="text-pink-500">LET DOWN</span> For Years…
          </h2>
          <div className="flex flex-col md:flex-row gap-8 mb-8 items-center">
            <Image src="/letdown1.jpg" alt="RLS story" className="w-48 h-48 object-cover rounded-xl grayscale" width={192} height={192} />
            <div className="bg-pink-50 rounded-xl p-3 md:p-6 flex-1 text-gray-800 shadow">
              <style jsx>{`
                .letdown-strong-text { color: #1a1a1a; }
              `}</style>
              <span className="letdown-strong-text">For decades, people with Restless Legs Syndrome were told it was just a "quirk."
              Something mild. Harmless. A little night twitch. Just stretch more. Just relax.<br/><br/>
              Doctors shrugged.<br/><br/>
              Prescriptions sedated.<br/><br/>
              TikTok offered baths, socks, and soap tricks.<br/><br/>
              But none of it worked — because none of it addressed what was actually happening inside the body.</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-pink-600 text-lg">●</span>
            <span className="font-bold text-lg md:text-xl text-gray-900">RLS Isn't Just "Twitchy Legs" — It's a Signal Storm.</span>
          </div>
          <div className="text-gray-900 mb-4">The truth is, people with RLS face a perfect storm inside their nervous system:</div>
          <ul className="mb-4">
            <li className="flex items-center gap-2 mb-1 text-gray-900"><span className="text-purple-600">✔</span> <span className="font-bold">Dopamine disruption</span> — the signal that tells your legs "you can stop now" just... doesn't arrive.</li>
            <li className="flex items-center gap-2 mb-1 text-gray-900"><span className="text-pink-600">✔</span> <span className="font-bold">Glutamate overactivity</span> — the brain's excitatory chemicals go into overdrive, keeping everything buzzing.</li>
            <li className="flex items-center gap-2 mb-1 text-gray-900"><span className="text-red-500">✔</span> <span className="font-bold">Circadian misfire</span> — your body can't tell when it's time to rest, and sleep becomes impossible.</li>
          </ul>
          <div className="font-bold text-gray-900 mb-8">No stretch, sock, or supplement can fix that — unless it works at the source.</div>
          <div className="w-full border-2 border-red-400 bg-red-50 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4 mb-4">
            <span className="text-3xl text-red-500 mr-2">❌</span>
            <div>
              <div className="font-bold text-gray-900 mb-1 text-lg md:text-xl">But for years, no one built a solution for us.</div>
              <div className="text-gray-900 text-sm md:text-base">Most "sleep aids" just knock you out.<br/><br/>Most "magnesium blends" barely scratch the surface.<br/><br/>And the rest? Random TikTok fixes that treat symptoms, not signals.</div>
            </div>
          </div>
          </div>
        </section>
      {/* Informative Formula Section */}
      <section className="w-full flex flex-col items-center bg-white py-4 md:py-12 px-2 md:px-4">
        <div className="max-w-3xl w-full">
          <h2 className="text-xl md:text-2xl font-bold text-pink-600 flex items-center gap-2 mb-2">
            <span role="img" aria-label="formula">🧬</span> Finally, A Formula That Works From the Inside Out.
          </h2>
          <div className="text-gray-600 mb-6">Built on neuroscience, traditional medicine, and real-world RLS outcomes — with ingredients like:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            {/* Paeoniae Radix (Bai Shao) */}
            <div className="bg-purple-50 rounded-xl p-2 md:p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-green-500 text-lg">🧠</span>
                <span className="font-bold text-green-700">Paeoniae Radix (Bai Shao)</span>
              </div>
              <div className="text-gray-700 text-sm">(used to calm spasms and nourish blood in traditional neurology formulas)</div>
            </div>
            {/* L-Tyrosine */}
            <div className="bg-purple-50 rounded-xl p-2 md:p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-purple-500 text-lg">🌿</span>
                <span className="font-bold text-purple-700">L-Tyrosine</span>
              </div>
              <div className="text-gray-700 text-sm">(supports dopamine — the "stillness signal" missing in RLS)</div>
            </div>
            {/* Berberine + Curcumin */}
            <div className="bg-purple-50 rounded-xl p-2 md:p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-pink-500 text-lg">🧠</span>
                <span className="font-bold text-pink-700">Berberine + Curcumin</span>
              </div>
              <div className="text-gray-700 text-sm">(calms inflammation + regulates hormones)</div>
            </div>
            {/* Paeoniae Radix (Bai Shao) */}
            <div className="bg-purple-50 rounded-xl p-2 md:p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-yellow-500 text-lg">⚡</span>
                <span className="font-bold text-yellow-700">Paeoniae Radix (Bai Shao)</span>
              </div>
              <div className="text-gray-700 text-sm">(used to calm spasms and nourish blood in traditional neurology formulas)</div>
            </div>
          </div>
          <div className="italic text-gray-600 mt-2">All combined in one nightly formula made specifically to help calm the neurological storm behind Restless Legs Syndrome.</div>
          </div>
        </section>
      {/* Pricing/Package Choice Section */}
      <BuyBox />
      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 py-4 md:py-8 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-gray-500">
          <div className="mb-2">© {new Date().getFullYear()} getserenitycore.com. All rights reserved.</div>
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}