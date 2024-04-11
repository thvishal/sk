function klentyFormSubmit(e) {
  let t = "";
  switch (e) {
  case "request-demo-api-form":
      var m = {
        FirstName: document.getElementById("firstname").value,
        LastName: document.getElementById("lastname").value,
        Email: document.getElementById("email").value,
        Phone:
          document.getElementById("phone-code-dropdown").value +
          document.getElementById("phone").value,
        CustomFields: [
          {
            key: "Form Name",
            value: "request-demo-api-form",
          },
          {
            key: "Company Size",
            value: document.getElementById("company_size").value,
          },
          {
            key: "How can we help you",
            value: document.getElementById(
              "how_can_we_help_you_new-input"
            ).value,
          },
          {
            key: "Which countries do you want to hire in",
            value: document.getElementById(
              "countries_you_want_to_enroll"
            ).value,
          },
        ],
      };
      t = "Meetwithourexperts30minutes";
      break;
  case "prequest-demo-api-form":
      var m = {
          FirstName: document.getElementById("pfirstname").value,
          LastName: document.getElementById("plastname").value,
          Email: document.getElementById("pemail").value,
          Phone: document.getElementById("pphone-code-dropdown").value + document.getElementById("pphone").value,
          CustomFields: [{
              key: "Form Name",
              value: "prequest-demo-api-form"
          }, 
            {
            key: "Company Size",
            value: document.getElementById("pcompany_size").value,
          }, ]
      };
      t = "Meetwithourexpertpopup";
      break;
  case "lp-demo-api-form":
      var m = {
          Email: document.getElementById("lpemail").value,
          CustomFields: [{
              key: "Form Name",
              value: "lp-demo-api-form"
          },
       ]
      };
      break;
  case "hmrequest-demo-api-form":
  case "salary-insights-form":{
      var m = {
        FirstName: document.getElementById("hmfirstname").value,
        LastName: document.getElementById("hmlastname").value,
        Email: document.getElementById("hmemail").value,
        Phone:
          document.getElementById("hmphone-code-dropdown").value +
          document.getElementById("hmphone").value,
        CustomFields: [
          {
            key: "Form Name",
            value: "hmrequest-demo-api-form",
          },
          {
            key: "Company Size",
            value: document.getElementById("hmcompany_size").value,
          },
        ],
      };
      t = "Meetwithourexpertoffer";
    }
      break;
  case "request-demo-api-form-v2":
      var m = {
          FirstName: document.getElementById("firstname").value,
          Email: document.getElementById("email").value,
          Phone: document.getElementById("phone-code-dropdown").value + document.getElementById("phone").value,
          CustomFields: [{
              key: "Form Name",
              value: "Demo form v2"
          }, ]
      };
      t = "Meetwithourexpert30minutesv2"
  }
  let a = ()=>{
      //let e = kl.getMeetingId();
      //window.open(`/book-a-meeting?klentyId=${e}&kMeetingId=${t}`, "_self")
      let klentyId = kl.getMeetingId();
      const targetWindow = e === "salary-insights-form" ? "_blank" : "_self";
      window.open(
        `/book-a-meeting?klentyId=${klentyId}&kMeetingId=${t}`,
        targetWindow
      );
      
  }

  

  ;
  t ? kl.onFormSubmit(m, "Skaud Demo Form", a) : kl.onFormSubmit(m, "Skaud Demo Form")
}



window.addEventListener("load", e=>{
  let t = document.getElementById("request-demo-api-form");
  if (t) {
      let m = t.elements.email
        , a = !1
        , o = !1;
      m.addEventListener("blur", ()=>{
          let e = m.value.trim();
          if (/^\S+@\S+\.\S+$/.test(e))
              a = !0;
          else {
              a = !1;
              return
          }
          if (a && !o) {
              let t = new FormData;
              t.append("email", e);
              let l = new Date;
              t.append("datetime", l.toLocaleString()),
              fetch("https://script.google.com/macros/s/AKfycbyPXKjPHC0QGKCtycpkD9sxSB9CZF8GIy-6phXLLKDxeITrNvNxoiSYcMHC4RgipDVjjg/exec", {
                  method: "POST",
                  body: t
              }).then(e=>{
                  if (e.ok)
                      console.log("Thank you! Your email and date/time are submitted successfully."),
                      o = !0;
                  else
                      throw Error("Network response was not ok.")
              }
              ).catch(e=>console.error("Error!", e.message))
          }
      }
      )
  }
}
);
