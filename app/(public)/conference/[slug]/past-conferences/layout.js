import ConferenceDetails from "@/components/AboutConference/ConferenceDetails/ConferenceDetails";
import { conferenceData } from "@/service/conferenceData";
export default async function layout({ children,params  }) {
   const { slug } = await params; 
 
   
     const selectedConference=conferenceData.find((conf) => conf.id === slug);
     if (!selectedConference) {
       return notFound();
     }
  return (
    <div>
      <ConferenceDetails conference={selectedConference}/>
      {children}
    </div>
  );
}
