"use client";
import Accordion from "@/components/Accordion/Accordion";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ContactFormSection from "@/components/MSK/ContactForm";
import NcModal from "@/components/NcModal/NcModal";
import { Topic } from "@/data/types";
import React, { FC, useEffect, useRef, useState } from "react";
import api from "@/services/api";

interface Props {
  topics: Topic;
  hours: any;
  link?: string;
  slug?: string;
}

const ProductCurriculiam: FC<Props> = ({ topics, hours, link, slug }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [accordionContent, setAccordionContent] = useState<any[]>([]);
  const [auxTopics, setAuxTopics] = useState<Topic>(topics);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [isFormSent, setIsFormSent] = useState(false);
  const handleAccordionClick = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const formattedTopics: any[] = [];
    Object.keys(topics).map((key, index) => {
      if (key !== "data") formattedTopics.push(topics[index]);
    });
    setAccordionContent(formattedTopics);
  }, [auxTopics]);

  const parseToHTML = (htmlString: string): JSX.Element => {
    // console.log({ arrHtml: htmlString.split("\n") });
    if (htmlString) {
      const textNodes = htmlString.split("\n").map((line, i) => {
        if (line.includes("<ul>")) {
          line = "<ul class='line-outside'>";
        }
        return (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        );
      });
      return <>{textNodes}</>;
    }

    return <>{htmlString}</>;
  };

  const updateFormSent = async (value: boolean, body: any) => {
    try {
      if (link && slug) await api.temarioDownload(body, link, slug);
      setIsFormSent(value);
    } catch (e) {
      // console.log("error", e);
    }
  };

  const onOpenDownloadModal = () => {
    setIsFormSent(false);
    setShowDownloadModal(true);
  };

  return (
    <div className="my-4">
      <div className="flex flex-col gap-3 pt-7 pb-6">
        <div className="font-semibold text-[16px] sm:text-xl">
          Qué temas verás
        </div>
        <div className="flex items-center justify-between">
          <p className="modules-description">
            {accordionContent.length} módulos <br className="md:hidden" /> <span className="hidden md:inline-block">•</span> {hours?.value} horas estimadas
          </p>
          {link ? (
            <ButtonPrimary
              onClick={() => onOpenDownloadModal()}
              sizeClass="px-4 py-2 sm:px-5"
              className="font-semibold"
              targetBlank
            >
              Descargar Temario
            </ButtonPrimary>
          ) : null}
        </div>
      </div>
      {accordionContent.length ? (
        <div className="modules pb-6">
          {accordionContent.map((item, index) => {
            return (
              <Accordion
                title={item.card_title}
                index={index}
                currentIndex={openIndex}
                setCurrentIndex={() => handleAccordionClick(index)}
                key={`acc_${index}`}
              >
                <div
                  className="accordion-content p-3"
                  dangerouslySetInnerHTML={{ __html: item.card_body }}
                />
              </Accordion>
            );
          })}
        </div>
      ) : null}
      {link ? (
        <NcModal
          isOpenProp={showDownloadModal}
          onCloseModal={() => {
            setShowDownloadModal(false);
          }}
          renderTrigger={() => {
            return null;
          }}
          contentExtraClass={"max-w-screen-md"}
          renderContent={() => (
            <div>
              {isFormSent ? (
                <div
                  className="thank-you-wrp py-16"
                  style={{
                    display: isFormSent ? "block" : "none",
                  }}
                >
                  <h1 className="text-center thank-you-title">¡Listo!</h1>
                  <div className="max-w-2xl mx-auto space-y-6">
                    <p className="text-center text-natural-600 md:px-20 px-8">
                      Ya descargaste el temario completo de este curso en tu
                      dispositivo
                      <ButtonPrimary
                        onClick={() => setShowDownloadModal(false)}
                      >
                        Seguir navegando
                      </ButtonPrimary>
                    </p>
                  </div>
                </div>
              ) : (
                <ContactFormSection
                  updateFormSent={updateFormSent}
                  submitText="Descargar"
                  submitReason="Solicitud de temario"
                  hideContactPreference
                  isDownload
                  hideHeader
                  hideSideInfo
                />
              )}
            </div>
          )}
          modalTitle={isFormSent ? " " : "Descarga el temario completo"}
        />
      ) : null}
    </div>
  );
};

export default ProductCurriculiam;
