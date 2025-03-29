"use client";
import React, { useEffect, useState } from "react";
import ItemSkeleton from "@/components/Skeleton/ItemSkeleton";
import ImageSkeleton from "@/components/MSK/ImageSkeleton";
import LoadingImage from "@/components/MSK/Loader/Image";

const genericLoader = () => {
  return (
    <div className="container py-16">
      <ItemSkeleton />
    </div>
  );
};

const blogLoader = () => {
  return (
    <div className="container py-16">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 animate-fade-down mb-8">
        <ImageSkeleton className="col-span-1" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <ImageSkeleton className="col-span-1 h-100" height="150px" />
          <ImageSkeleton className="col-span-1" height="150px" />
          <ImageSkeleton className="col-span-2" height="150px" />
        </div>
      </div>
      <div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-1"></div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 animate-fade-down mt-4">
          <ImageSkeleton className="col-span-1" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ImageSkeleton className="col-span-2" height="150px" />
            <ImageSkeleton className="col-span-2" height="150px" />
          </div>
        </div>
      </div>
    </div>
  );
};

const storeLoader = () => {
  return (
    <>
      <ImageSkeleton className="col-span-1 h-[300px]" />
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <LoadingImage />
          <LoadingImage />
          <LoadingImage />
          <LoadingImage />
          <LoadingImage />
          <LoadingImage />
        </div>
      </div>
    </>
  );
};

const Loading: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState("");
  if (typeof window != "undefined")
    useEffect(() => {
      setCurrentUrl(window.location.pathname);
    }, [window.location]);
  if (currentUrl.includes("blog")) return blogLoader();
  if (currentUrl.includes("tienda")) return storeLoader();
  return genericLoader();
};

export default Loading;
