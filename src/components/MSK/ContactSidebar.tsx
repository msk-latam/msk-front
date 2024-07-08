"use client";
import { CountryContext } from "@/context/country/CountryContext";
import React, { useContext, useEffect } from "react";

const ContactSidebar = () => {
  const { countryState } = useContext(CountryContext);
  const [phone, setPhone] = React.useState<string | null>(null);
  const [secondaryPhone, setSecondaryPhone] = React.useState<string | null>(
    null
  );
  useEffect(() => {
    if (countryState.country) {
      switch (countryState.country) {
        case "ec":
          setPhone("(+593) 2 4016114");
        case "mx":
          setPhone("(+52) 5590586200");
        case "cl":
          setPhone("(+56) 224875300");
        case "ar":
          setPhone("0800-220-6334");
          setSecondaryPhone("011-5263-0582");
      }
    }
  }, [countryState.country]);

  return (
    <div className="sidebar-widget-wrapper">
      <div className="support-contact mb-30">
        <div className="support-contact-inner">
          {phone && (
            <div className="support-item">
              <div className="support-icon">
                <img src="/images/icons/phone.svg" alt="" width="20" />
              </div>
              <div className="support-info-phone">
                <span>Teléfono</span>
                <p>{phone}</p>
                {secondaryPhone && <p>{secondaryPhone}</p>}
              </div>
            </div>
          )}

          {/* <div className="support-item">
            <div className="support-icon">
              <img src="/images/icons/whatsapp.svg" alt="" width="20" />
            </div>
            <div className="support-info-whatsapp">
              <span>Whatsapp</span>
              {PhoneElement()}
            </div>
          </div> */}
          <div className="support-item">
            <div className="support-icon">
              <img src="/images/icons/email.svg" alt="" width="20" />
            </div>
            <div className="support-info-email">
              <span>E-mail</span>
              <a href="mailto:hola@msklatam.com">hola@msklatam.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSidebar;
