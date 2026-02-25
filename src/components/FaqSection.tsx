"use client";
import { useState } from "react";

const FAQS = [
  {
    question: "Where is Queenstown located?",
    answer:
      "Queenstown is located in the southwest of New Zealand's South Island, on the shores of Lake Wakatipu and surrounded by the Southern Alps. It's in the Otago region, about a 2-hour flight from Auckland or 1 hour from Christchurch.",
  },
  {
    question: "Where to stay in Queenstown?",
    answer:
      "Queenstown offers a wide range of accommodation options, from luxury lodges and boutique hotels to holiday parks and backpackers. Popular areas include Queenstown central, Frankton, Arthurs Point, and Arrowtown.",
  },
  {
    question: "Where to eat in Queenstown?",
    answer:
      "Queenstown boasts a thriving food scene with world-class restaurants, vibrant cafes, craft breweries, and award-winning wineries in nearby Gibbston Valley. From fine dining to casual eateries, there's something for every taste.",
  },
  {
    question: "How many days are needed in Queenstown?",
    answer:
      "We recommend at least 3-5 days to experience the best of Queenstown. This gives you time to enjoy adventure activities, explore the surrounding regions, sample local cuisine, and soak in the stunning scenery.",
  },
  {
    question: "What is the best time to visit Queenstown?",
    answer:
      "Queenstown is a year-round destination. Summer (Dec-Feb) is perfect for hiking, biking, and water sports. Winter (Jun-Aug) is ideal for skiing and snowboarding. Autumn (Mar-May) offers stunning golden colours, and spring (Sep-Nov) brings beautiful blooms.",
  },
  {
    question: "What season is Queenstown best known for?",
    answer:
      "While Queenstown is famous as a winter ski destination, it's equally stunning in autumn with its golden foliage. Summer attracts visitors for adventure activities and lake recreation. Each season offers unique experiences.",
  },
  {
    question: "When does it snow in Queenstown?",
    answer:
      "Snow typically falls in Queenstown from June to October, with the heaviest snowfall in July and August. The ski fields at Coronet Peak and The Remarkables usually open in mid-June and close in early October.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-cream py-20 px-8 md:px-20 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-teal tracking-widest-custom uppercase mb-10">
          FAQs
        </h2>

        <div className="space-y-0">
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-gray-300">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="text-gray-800 font-semibold text-lg pr-8">
                  {faq.question}
                </span>
                <span className="text-2xl text-gray-400 shrink-0">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <div className="pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
