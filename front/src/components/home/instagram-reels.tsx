"use client"


import React from 'react'
import { InstagramEmbed } from 'react-social-media-embed';

const InstagramReels = () => {
  return (
    <div 
      className="mt-6 animate-fade-up text-center opacity-0 space-y-4 md:flex md:space-x-[8rem]"
      style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
    >
      <InstagramEmbed url="https://www.instagram.com/reel/C_Gh54XOIFH/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==" width={328}/>
      {/* <InstagramEmbed url="https://www.instagram.com/reel/C66pCJVtZC6/?utm_source=ig_web_copy_link" width={328}/> */}
    </div>
  );
}

export default InstagramReels;
