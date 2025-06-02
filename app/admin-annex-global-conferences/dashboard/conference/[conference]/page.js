
import AdminConferenceView from "@/components/Admin/AdminConferences/AdminConferenceView/AdminConferenceView";
import { cookies } from 'next/headers';

import React from "react";
export default async function page({ params }) {
  const { conference } = await params;
    const cookieStore = await cookies(); // ✅ await is required here
    const userData = cookieStore.get('userContext');
    const parsed = userData ? JSON.parse(userData.value) : null;

     const shouldRender =
    parsed?.isRoleUser === false || 
    (parsed?.isRoleUser === true && parsed?.conferenceId !== null);

  return  shouldRender ? (
    <AdminConferenceView conference={conference} userData={parsed} />
  ) : (
    <div className="text-center p-5 text-muted">
      <h4>No Conference Assigned</h4>
      <p>
        You don't have a conference assigned yet. Please contact the admin team
        to get access.
      </p>
    </div>
  );
}
