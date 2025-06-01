// hooks/apiHooks.js
import { useMutation, useQuery } from '@tanstack/react-query';
import {api, mediaApi, paymentApi} from '@/service/api';

export const useWeather = () => {
  return useMutation({
    mutationFn: () => api.post('/fetch/weather').then(res => res.data),
  });
};

export const useBgImage = () => {
  return useQuery({
    queryKey: ['bgImage'],
    queryFn: () => api.get('/bg/image').then(res => res.data),
  });
};


export const useMainPage = () => {
  return useQuery({
    queryKey: ['mainPage'],
    queryFn: () => api.get('/main/page').then(res => res.data),
  });
};


export const useTestimonial = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: () => api.get('/testimonials').then(res => res.data),
  });
}


export const useSocialLinks = () => {
  return useQuery({
    queryKey: ['socialLinks'],
    queryFn: () => api.get('/media/links').then(res => res.data),
  });
}

export const useSpeakers = () => {
  return useQuery({
    queryKey: ['speakers'],
    queryFn: () => api.get('/speakers').then(res => res.data),
  });
}

export const useSubmitBrochure = () => {
  return useMutation({
    mutationFn: (data) =>
      api.post('/submit/contactus', data).then((res) => res.data),
  });
};


export const useVisitor = () => {
  return useQuery({
    queryKey: ['visitor'],
    queryFn: () => api.post('/visitor').then(res => res.data),
  });
}

export const useGalleryImages = () => {
  return useQuery({
    queryKey: ['galleryImages'],
    queryFn: () => api.get('/gallery/images').then(res => res.data),
  });
}

export const useNewsLetter = () => {
  return useMutation({
    mutationFn: (data) =>
      api.post('/submit/news/letter', data).then((res) => res.data),
  });
}

export const useResearchForm = () => {
  return useMutation({
    mutationFn: (data) =>
      api.post('/submit/abstract', data).then((res) => res.data),
  });
} 

export const useBrochure = () => {
  return useMutation({
    mutationFn: (data) =>
      api.post('/submit/brochure', data).then((res) => res.data),
  });
} 

export const useConferenceLandingPage = () => {
  return useQuery({
    queryKey: ['conferenceLandingPage'],
    queryFn: () => api.get('/conferences?conference_type=upcoming').then(res => res.data),
  });
}

export const useUploadPdf = () => {
  return useMutation({
    mutationFn: (data) =>
      mediaApi.post('/save/pdf', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => res.data),
  });
}

export const useRegistration = () => {
  return useMutation({
    mutationFn: (data) =>
      api.post('/registration', data).then((res) => res.data),
  });
}

export const useRazorpayOrder = () => {
  return useMutation({
    mutationFn: (data) =>
      paymentApi.post('/proceed/to/pay/razorpay', data).then((res) => res.data),
  });
}

export const useRazorpayVerify = () => {
  return useMutation({
    mutationFn: (data) =>
      paymentApi.post('/verify/razorpay', data).then((res) => res.data),
  });
}

export const usePayPalOrder = () => {
  return useMutation({
    mutationFn: (data) =>
      paymentApi.post('/proceed/to/pay/paypal', data).then((res) => res.data),
  });
}

export const usePayPalVerify = () => {
  return useMutation({
    mutationFn: (data) =>
      paymentApi.post('/verify/paypal', data).then((res) => res.data),
  });
}

export const useConferenceNames = () => {
  return useQuery({
    queryKey: ['conferenceNames'],
    queryFn: () => api.get('/conferences/names').then(res => res.data),
  });
}