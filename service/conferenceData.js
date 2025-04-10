export const conferenceData=[
    {
        date: "17 Mar 2026",
        title: "Annual Congress on gynecology, obstetrics & women’s health",
        theme:'“Forging the future of global healthcare through effortless scanning solutions”',
        location: "Dubai, UAE",
        id: "gynecology-conference",
        icon: "/icons/conference/logo.png",
    },
    {
        date: "22 Apr 2026",
        title: "Primary Healthcare, Pain Management & Functional Structure",
        theme:'“Forging the future of global healthcare through effortless scanning solutions”',
        location: "New York, USA",
        id: "primary-healthcare",
        icon: "/icons/conference/primaryHealthcare.png",
    },
    {
        date: "10 May 2026",
        title: "International Conference on global healthcare",
        theme:'“Forging the future of global healthcare through effortless scanning solutions”',
        location: "London, UK",
        id: "neurology-brain-disorders",
        icon: "/icons/conference/ghc.png",
    },
    {
        date: "5 Jun 2026",
        title: "International webinar on global healthcare",
        theme:'“Forging the future of global healthcare through effortless scanning solutions”',
        location: "Sydney, Australia",
        id: "healthcare-webinar",
        icon: "/icons/conference/healthcarewebinar.png",
    },
    {
        date: "18 Jul 2026",
        title: "International webinar on oncology & cancer research",
        theme:'“Forging the future of global healthcare through effortless scanning solutions”',
        location: "Paris, France",
        id: "oncology",
        icon: "/icons/conference/oncology.png",
    },
    {
        date: "23 Aug 2026",
        title: "International Webinar on Gynaecology, Obstetrics and Women’s Healthcare",
        theme:'“Forging the future of global healthcare through effortless scanning solutions”',
        location: "Toronto, Canada",
        id: "gynaecology-webinar",
        icon: "/icons/conference/gynaecologyWebinar.png",
    },
]
export const getSelectedConference = (slug) => {
    const selectedConference = conferenceData.find((conf) => conf.id === slug);
    return selectedConference;
};
export const getAllConference = () => { 
    return conferenceData;
};

  const Sessions = [
    { id: 1, title: "Point Of View: Upcoming Trends And " },
    { id: 2, title: "Diabetes Management: Pharmacology" },
    { id: 3, title: "Innovations In Diabetes Diagnosis" },
    { id: 4, title: "Diabetes Management And Treatment" },
    { id: 5, title: "Infectious Diseases And Preventive" },
    { id: 6, title: "Advance In Clinical Medicine" },
    { id: 7, title: "Mental Health And Psychological " },
    { id: 8, title: "Global Health And Internal Medicine" },
    { id: 9, title: "Public Health And Nutrition" },
    { id: 10, title: "Point Of View: Upcoming Trends And" },
    { id: 11, title: "Diabetes Management: Pharmacology" },
    { id: 12, title: "Innovations In Diabetes Diagnosis" },
    { id: 13, title: "Diabetes Management And Treatment" },
    { id: 14, title: "Infectious Diseases And Preventive" },
    { id: 15, title: "Advance In Clinical Medicine" },
    { id: 16, title: "Mental Health And Psychological " },
    { id: 17, title: "Global Health And Internal Medicine" },
    { id: 18, title: "Public Health And Nutrition" },
    { id: 19, title: "Advance In Clinical Medicine" },
    { id: 20, title: "Mental Health And Psychological " },
    { id: 21, title: "Global Health And Internal Medicine" },
    { id: 22, title: "Public Health And Nutrition" },
    { id: 23, title: "Point Of View: Upcoming Trends And" },
    { id: 24, title: "Diabetes Management: Pharmacology" },
    { id: 25, title: "Innovations In Diabetes Diagnosis" },
    { id: 26, title: "Diabetes Management And Treatment" },
    { id: 27, title: "Infectious Diseases And Preventive" },
    { id: 28, title: "Advance In Clinical Medicine" },
    { id: 29, title: "Mental Health And Psychological " },
    { id: 30, title: "Global Health And Internal Medicine" },
    { id: 31, title: "Public Health And Nutrition" },
  ];
  
  export const getSelectedSessions = (slug) => {
    const selectedConference = Sessions.find((sess) => sess.id == slug);
    return selectedConference;
};
  export const getAllSessions = () => {
    return Sessions;
};