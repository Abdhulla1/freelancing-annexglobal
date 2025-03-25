import CountdownBanner from "@/components/AboutConference/CountdownBanner/CountdownBanner";
export default function layout({ children }) {
  return (
    <div>
      <CountdownBanner />
      {children}
    </div>
  );
}
