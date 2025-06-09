import React from "react";
import ConferenceCardStyle from "./ConferenceCard.module.css";
import Link from "next/link";
import Image from "next/image";
const ConferenceCard = ({
  image,
  date,
  location,
  heading,
  desc,
  buylink,
  slug,
}) => {
  return (
    <div className={` ${ConferenceCardStyle["container"]}`}>
      <div className={ConferenceCardStyle["image-section"]}>
        <Image src={image} height={220} width={370} alt={heading} objectFit="cover"/>
        <div className={ConferenceCardStyle["overlay"]}>
          {date} &nbsp;&nbsp; | &nbsp;&nbsp; {location}
        </div>
      </div>
      <div className={ConferenceCardStyle["content"]}>
        <h2>{heading}</h2>
        <p>{desc}</p>
        {buylink && <Link
          href={"/conference/" + buylink}
          className={`btn-sm ${ConferenceCardStyle["btn"]}`}
        >
          BUY TICKETS
        </Link>}
      </div>
    </div>
  );
};

export default ConferenceCard;
