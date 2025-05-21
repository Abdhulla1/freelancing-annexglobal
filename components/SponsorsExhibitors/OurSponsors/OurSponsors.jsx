import React from 'react'
import style from './OurSponsors.module.css'
import Link from 'next/link';

const OurSponsors=()=>{
    return (
        <div className={`p-3 p-md-5 `}>
        <h3 className="text-center fw-bold">Our Sponsors</h3>
  
        <div className={`mt-5 container-md  ${style.cardWraper}`}>
            <Card cardName={"Diamond"} buttonLink={"#"} imageLink={'/images/conferences/SponsorsExhibitors/card.png'}  cardContent={"Three workshop slots, Two complimentary display booths, Four complimentary registrations, 30% discount on Delegate Registrations."}/>
            <Card cardName={"GOLD"} buttonLink={"#"} imageLink={'/images/conferences/SponsorsExhibitors/goldCard.png'} textColor='#000000' cardContent={"Three workshop slots, Two complimentary display booths, Four complimentary registrations, 30% discount on Delegate Registrations."}/>
            <Card cardName={"SILVER"} buttonLink={"#"} imageLink={'/images/conferences/SponsorsExhibitors/silverCard.png'}  textColor='#000000' cardContent={"Three workshop slots, Two complimentary display booths, Four complimentary registrations, 30% discount on Delegate Registrations."}/>
        </div>
      </div>
    )
  }
  
export default  OurSponsors;

const Card=({cardName,cardContent,buttonLink,imageLink,textColor="#FFFFFF"})=>{
    return (
        <div className={` ${style.card}`} style={{ "--bg-image": `url(${imageLink})` }}
>
            <h4 className='text-center text-uppercase mb-3'style={{ color: textColor }}>{cardName}</h4>
            <p className={`text-center `} style={{ color: textColor }}>{cardContent}</p>
            <Link href={buttonLink} className={`text-uppercase fw-bold px-2 ${style.getMember}`} >Get Membership</Link>
        </div>
    );
}