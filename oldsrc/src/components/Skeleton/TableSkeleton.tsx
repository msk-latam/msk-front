import React, { FC } from "react";

const TableSkeleton: FC = () => {
  return (
    <>
      <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800 animate-pulse">
          <thead className="bg-neutral-50 dark:bg-neutral-800">
            <tr className="text-left text-xs text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
              <th scope="col" className="px-6 py-3 font-medium">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full "></div>
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full "></div>
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full "></div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
            <tr>
              <td className="px-2 py-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full my-2"></div>
              </td>
              <td className="px-2 py-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full my-2"></div>
              </td>
              <td className="px-2 py-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full my-2"></div>
              </td>
            </tr>
            <tr>
              <td className="px-2 py-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full my-2"></div>
              </td>
              <td className="px-2 py-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full my-2"></div>
              </td>
              <td className="px-2 py-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full my-2"></div>
              </td>
            </tr>
            <tr>
              <td className="px-2 py-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full my-2"></div>
              </td>
              <td className="px-2 py-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full my-2"></div>
              </td>
              <td className="px-2 py-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full my-2"></div>
              </td>
            </tr>
            <tr>
              <td className="px-2 py-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full my-2"></div>
              </td>
              <td className="px-2 py-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full my-2"></div>
              </td>
              <td className="px-2 py-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full my-2"></div>
              </td>
            </tr>
            <tr>
              <td className="px-2 py-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full my-2"></div>
              </td>
              <td className="px-2 py-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full my-2"></div>
              </td>
              <td className="px-2 py-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full my-2"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableSkeleton;
