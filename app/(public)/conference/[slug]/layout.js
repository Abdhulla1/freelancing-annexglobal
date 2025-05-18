import CountdownBanner from "@/components/AboutConference/CountdownBanner/CountdownBanner";
export default function layout({ children,params  }) {
    const { slug } = params;
  return (
    <div>
      <CountdownBanner conferenceId={slug} />
      {children}
    </div>
  );
}
