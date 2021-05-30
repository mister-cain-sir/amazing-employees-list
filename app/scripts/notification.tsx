import React, { useEffect, useState } from "react";
const $=require("jquery");
export const Notification=(props)=>{
  const [content,setContent]=useState({
    heading:props.content.heading,
    description:props.content.description
  });
  useEffect(()=>{
    setContent({
      heading:props.content.heading,
      description:props.content.description
    });
  },[props.content]);
  useEffect(()=>{
    if($('.toast').length>0){
      $('.toast').toast('show',{
        animation:true
      })
    }
  },[content]);
  return (content.heading===undefined && content.description===undefined)?null:(
    <div className="position-fixed bottom-0 right-0 p-3" style={{zIndex: 5, right: 0, bottom: 0}}>
      <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false">
        <div className="toast-header">
          <strong className="mr-3">{content.heading}</strong>
          <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="toast-body">
          {content.description}
        </div>
      </div>
    </div>
  );
}