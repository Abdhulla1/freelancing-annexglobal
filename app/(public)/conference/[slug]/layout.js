import CountdownBanner from "@/components/AboutConference/CountdownBanner/CountdownBanner";
export default async function layout({ children,params  }) {
   const { slug } = await params; 
  return (
    <div>
      <CountdownBanner conferenceId={slug} />
      {children}
    </div>
  );
}
