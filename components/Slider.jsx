"use client"
import Glide from "@glidejs/glide";
import { useEffect } from "react";

 export default function Slider({ images =[] }) {
    useEffect(() => {
        new Glide(".glide").mount();
    });

    return (
        <div className="glide">
            <div className="glide__arrows" data-glide-el="controls">
            <button className="glide__arrow glide__arrow--left bg-slate-900 text-white" data-glide-dir="<">{"<"}</button>
            </div>
            <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
                {
                    images.map((image, index) => (
                        <li className="glide__slide" key={index}>
                            <img className="w-full" src={image} alt="" />
                        </li>
                    ))
                }
            </ul>
            </div>
            <div className="glide__arrows" data-glide-el="controls">
            <button className="glide__arrow glide__arrow--right bg-slate-900 text-white" data-glide-dir=">">{">"}</button>
            </div>
        </div>
    )
  }
  