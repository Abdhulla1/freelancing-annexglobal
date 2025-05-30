
import axiosInstance from "../axiosInstance";
export async function saveConferenceLandingPage(formdata, id) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/landing/page`,
      formdata
    );
    return response;
  } catch (error) {
   const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Conference LandingPage"
          throw new Error(message);
  }
}
export async function saveWelcomeContent(formdata, id) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/webinar/welcome/content`,
      formdata
    );
    return response;
  } catch (error) {
      const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Conference Welcome Content"
          throw new Error(message);
  }
}
export async function saveVideoSection(formdata, id) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/webinar/video/section`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Video Section"
          throw new Error(message);
  }
}
export async function saveLandingPageSpeakers(formdata, id) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/landing/page/speakers`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Speaker"
          throw new Error(message);
  }
}
export async function UpdateLandingPageSpeakers(formdata, id,speaker_id) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/landing/page/speakers?speaker_id=${speaker_id}`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Update Speaker"
          throw new Error(message);
  }
}
export async function deleteLandingPageSpeaker(formdata, id) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/landing/page/speaker/delete`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Delete Speaker"
          throw new Error(message);
  }
}
export async function saveLocationSection(formdata, id) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/location`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Location"
          throw new Error(message);
  }
}
export async function saveEventDetailsSection(formdata, id) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/event/details/section`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Event Details Section"
          throw new Error(message);
  }
}


  export async function patchPastGallery( id,formdata,imageId = null) {
      const query = imageId ? `?image_id=${imageId}` : "";
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/past/gallery${query}`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Past Gallery Section"
          throw new Error(message);
  }
}
  export async function deletePastGalleryImage( id,formdata) {
   
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/past/gallery/delete`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Delete Past Gallery Section"
          throw new Error(message);
  }
}
  export async function updateSupportingJournal( id,formdata,journal_id = null) {
      const query = journal_id ? `?journal_id=${journal_id}` : "";
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/supporting/journal${query}`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Supporting Journal Section"
          throw new Error(message);
  }
}

  export async function patchTestimonial( id,formdata,testimonialId = null) {
      const query = testimonialId ? `?testimonial_id=${testimonialId}` : "";
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/testimonial${query}`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Testimonial Section"
          throw new Error(message);
  }
}
  export async function deleteTestiMonial(id,formdata) {
   
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/testimonial/delete`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Delete Testimonial Section"
          throw new Error(message);
  }
}
  export async function updateTestiMonialStatus(id,testimonial_id
    ,formdata) {
   
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/testimonial/status?testimonial_id=${testimonial_id}`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Delete Past Gallery Section"
          throw new Error(message);
  }
}

  export async function patchTopic( id,formdata,topic_id = null) {
      const query = topic_id ? `?topic_id=${topic_id}` : "";
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/topics${query}`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Past Gallery Section"
          throw new Error(message);
  }
}
  export async function deleteTopic(id,formdata) {
   
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/topics/delete`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Delete Past Gallery Section"
          throw new Error(message);
  }
}


  export async function patchHeaderPannelImages( id,formdata,imageId = null) {
      const query = imageId ? `?image_id=${imageId}` : "";
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/header/panel/images${query}`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Past Gallery Section"
          throw new Error(message);
  }
}
  export async function deleteHeaderPannelImages( id,formdata) {
   
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/header/panel/images/delete`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Delete Header Pannel Section"
          throw new Error(message);
  }
}

  export async function patchQueriesAns( id,formdata,qus_id = null) {
      const query = qus_id ? `?qus_id=${qus_id}` : "";
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/webinar/qus/answered${query}`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Past Gallery Section"
          throw new Error(message);
  }
}



export async function patchSpeakers( id,formdata,speaker_id = null) {
      const query = speaker_id ? `?speaker_id=${speaker_id}` : "";
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/speakers${query}`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Speakers Section"
          throw new Error(message);
  }
}
  export async function deleteSpeaker(id,formdata) {
   
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/speakers/delete`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Delete Speaker  Section"
          throw new Error(message);
  }
}
  export async function updateSpeakerStatus(id,formdata) {
   
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/speakers/status`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Update SpeakerStatus Section"
          throw new Error(message);
  }
}

export async function patchOCM( id,formdata,ocmId) {
      const query = ocmId ? `?ocm_id=${ocmId}` : "";
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/ocm${query}`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Speakers Section"
          throw new Error(message);
  }
}
  export async function deleteOCM(id,formdata) {
   
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/ocm/delete`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Delete Speaker  Section"
          throw new Error(message);
  }
}
  export async function updateOCMStatus(id,formdata) {
   
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/ocm/status`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Update SpeakerStatus Section"
          throw new Error(message);
  }
}
export async function saveVenueContent(formdata, id) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/venue/content`,
      formdata
    );
    return response;
  } catch (error) {
      const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save  Welcome Content"
          throw new Error(message);
  }
}
export async function saveVenueLocationSection(formdata, id) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/venue/maps/uploads`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Location"
          throw new Error(message);
  }
}
export async function saveEventTimingsSection(formdata, id) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/venue/event/timings`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Location"
          throw new Error(message);
  }
}

  export async function updatefaq( id,formdata,faq_id = null) {
      const query = faq_id ? `?faq_id=${faq_id}` : "";
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/faq${query}`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Supporting Journal Section"
          throw new Error(message);
  }
}
  export async function updateBroucher( id,formdata) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/brochure`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Upload Broucher Section"
          throw new Error(message);
  }
}
  export async function updateAbstract( id,formdata) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/abstract`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Upload Abstract Section"
          throw new Error(message);
  }
}

  export async function patchProgram( id,formdata,program_id = null) {
      const query = program_id ? `?faq_id=${program_id}` : "";
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/scientific/webinar/program${query}`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Progarm  Section"
          throw new Error(message);
  }
}
  export async function deleteProgram(id,formdata) {
   
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/scientific/webinar/program/delete
`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Delete Program  Section"
          throw new Error(message);
  }
}

  export async function patchTopicsHeaderPannelImages( id,formdata) {

  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/topics/landing/page`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Past Gallery Section"
          throw new Error(message);
  }
}


  export async function patchResearchGroundBreaking( id,formdata,topic_id = null) {
      const query = topic_id ? `?topics_id=${topic_id}` : "";
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/topics/research/groundbreaking${query}`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Past Gallery Section"
          throw new Error(message);
  }
}
  export async function deleteResearchGroundBreaking(id,formdata) {
   
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/research/groundbreaking/delete`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Delete Past Gallery Section"
          throw new Error(message);
  }
}
  export async function patchEssentialInnovation( id,formdata,topic_id = null) {
      const query = topic_id ? `?topics_id=${topic_id}` : "";
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/topics/essential/innovation${query}`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Past Gallery Section"
          throw new Error(message);
  }
}
  export async function deleteEssentialInnovation(id,formdata) {
   
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/essential/innovation/delete`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Delete Past Gallery Section"
          throw new Error(message);
  }
}
export async function saveConferenceReport(formdata, id) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/past/conference/report`,
      formdata
    );
    return response;
  } catch (error) {
      const message = error?.response?.data?.detail?.[0]?.msg || "Failed to save Conference Report"
          throw new Error(message);
  }
}
export async function savePastConferenceGallery(formdata, id) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/past/conference/gallery`,
      formdata
    );
    return response;
  } catch (error) {
      const message = error?.response?.data?.detail?.[0]?.msg || "Failed to save Past Conference Gallery"
          throw new Error(message);
  }
}

  export async function patchPastConferenceTestimonial( id,formdata,testimonialId = null) {
      const query = testimonialId ? `?testimonials_id=${testimonialId}` : "";
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/past/conference/testimonials${query}`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Testimonial Section"
          throw new Error(message);
  }
}
  export async function deletePastConfernceTestiMonial(id,formdata) {
   
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/past/conference/testimonials/delete`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Delete Testimonial Section"
          throw new Error(message);
  }
}
  export async function patchConferenceAttendees( id,formdata,attendeesId = null) {
      const query = attendeesId ? `?attendees_id=${attendeesId}` : "";
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/past/conference/attendees${query}`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to conference Attendees Section"
          throw new Error(message);
  }
}
  export async function updateSpecialRegistration( id,formdata) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/special/registration`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Special Registration Section"
          throw new Error(message);
  }
}
  export async function updateRegistrationPersonalDetails( id,formdata) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/registration/personal/details`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to  Registration Personal Section"
          throw new Error(message);
  }
}
  export async function updateAccommodationDetails( id,formdata) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/registration/accomodation`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Accomodation Section"
          throw new Error(message);
  }
}

  export async function updateRegistrationInfo( id,formdata,info_id = null) {
      const query = info_id ? `?info_id=${info_id}` : "";
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/registration/info${query}`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Save Registration Info Section"
          throw new Error(message);
  }
}
  export async function updatePricingDetails( id,formdata) {
  try {
    const response = await axiosInstance.patch(
      `/conference/${id}/registration/pricing`,
      formdata
    );
    return response;
  } catch (error) {
     const message = error?.response?.data?.detail?.[0]?.msg || "Failed to Pricing Section"
          throw new Error(message);
  }
}
