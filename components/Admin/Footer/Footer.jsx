'use client'
import React, { useState,useEffect,Suspense,useRef } from "react";
import FooterTabelAdmin from "./FooterTabelAdmin/FooterTabelAdmin";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner"; 
import { getFooterTableResponse } from "@/service/footerService";

export default function Footer() {
  const toast = useRef(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [footertable, setFooterTable] = useState([]);
  useEffect(()=>{
    async function getFooter(){
       

      try{
        const responseData=await getFooterTableResponse();
        if(responseData.status===200){
          setFooterTable(responseData.data?.detail.data);
        }
        else{
            toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Something Went Wrong!",
          life: 3000,
        });
                setError("Ooops!....Something Went Wrong!");
        }
      }
      catch{
  toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to load Footer data",
          life: 3000,
        });
                setError("Failed to fetch Footer Links . Please try again later.");

      }finally {
        setLoading(false); 
      }
    }
    getFooter();
  },[]);
  return (
    <div className=" p-2">
      <Toast ref={toast} />

      <div className="d-flex col-12 justify-content-between align-items-start flex-wrap gap-2 mb-4">
        {/* Title */}
        <h5 className="fw-bold m-0">Media Links</h5>

        {/* Add New Conference Button */}
        {/* <button className="btn btn-warning text-white col-12 col-md-1">
          Publish
        </button> */}
      </div>

      <div className="row p-1 justify-content-center">
        <div className="col-11 p-2 rounded-2">
              {loading ? (
              <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ minHeight: "200px" }}
                    >
                      <ProgressSpinner
                        style={{ width: "50px", height: "50px" }}
                        strokeWidth="5"
                        fill="var(--surface-ground)"
                        animationDuration=".5s"
                      />
                    </div>
      ): error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) :( 
          <FooterTabelAdmin toast={toast} footertable={footertable} footertableUpdate ={setFooterTable}/>)}
        </div>
      </div>
    </div>
  );
}
