import React, { useState } from 'react';
import DynamicModalForm from '../components/DynamicModalForm';
import PropertyGallery from '../components/PropertyGalley';

const sectionList = [
  { key: 'propertyAddress', label: 'Property address (Required)' },
  { key: 'leasingInfo', label: 'Leasing info (Required)' },
  { key: 'charges', label: 'Charges (Required)' },
  { key: 'rentFrequency', label: 'Rent frequency & payment reminder(Required)' },
  { key: 'applicationAgreement', label: 'Application agreement (Optional)' },
  { key: 'aboutProperty', label: 'About the property (Optional)' },
  { key: 'communityAmenity', label: "Community's amenity/features (Optional)" },

];

const sectionList2 = [
  
  { key: 'petFees', label: 'Pet fees (Optional)' },
  { key: 'parking', label: 'Parking (Optional)' },
  { key: 'nearest', label: 'Nearest educational insititution (Optional)' },
  { key: 'nearestStations', label: 'Nearest stations (Optional)' },
  { key: 'nearestLandmark', label: 'Nearest landmark (Optional)' },
  { key: 'utilitiesProvider', label: 'Utilities provider(Optional)' },
];

const mockPreviewData = {
  propertyAddress: "Dallas apartment complex, https:rentyard.com, Total unit:80 1423 esters Rd Dallas",
  leasingInfo: "Leased for 1 year starting July 2025",
  charges: "Utility and maintenance charges apply",
  rentFrequency: "Monthly rent, reminders sent on 25th",
  applicationAgreement: "Must agree to terms before applying",
  aboutProperty: "Spacious 3BHK with balcony",
  communityAmenity: "Gym, Pool, Community Hall",
  petFees: "BDT 500/month per pet",
  parking: "1 car garage included"
};

const mockPreviewData2 = {
  petFees: "BDT 500/month per pet",
  parking: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  nearest: "Elementary school, Institution name, 2mile, High school, Institution name, 2mile",
  nearestLandmark: "Bus, Stations name, 2mile,Train, Stations name, 2mile,Airport, Stations name, 2mile",
  utilitiesProvider: "Dallas apartment complex, https:rentyard.com, Total unit:80 1423 esters Rd Dallas",
};

const PropertyDetail = () => {
  const [previewOpen, setPreviewOpen] = useState(null);
  const [modalOpen, setModalOpen] = useState(null);

  const togglePreview = (key) => {
    setPreviewOpen(prev => (prev === key ? null : key));
  };

  return (
    <div className="p-6 mx-26 space-y-4">
      <h1 className="text-xl font-semibold mb-4">Condominiums Information</h1>
<div className='grid grid-cols-2 gap-6'>
    
      <div className="border border-gray-200 rounded-md p-4 space-y-4">
        {sectionList.map((section) => (
          <div key={section.key} className="border-b border-gray-300 pb-4">
            <div className="flex justify-between items-center py-2">
              {/*  Click to show preview */}
              <span
                onClick={() => togglePreview(section.key)}
                className="cursor-pointer hover:text-blue-600"
              >
                {section.label.replace(/\s*\(Required\)|\s*\(Optional\)/, '')}
                {section.label.includes('(Required)') && (
                  <span className="text-red-500 ml-1">(Required)</span>
                )}
                {section.label.includes('(Optional)') && (
                  <span className="text-gray-400 ml-1">(Optional)</span>
                )}
              </span>

              {/*  Click to open modal */}
              {/* 🟨 Button: + Add or Edit */}
              <button
                onClick={() => setModalOpen(section.key)}
                className="text-blue-600 font-medium hover:underline"
              >
                {previewOpen === section.key ? "Edit" : "+ Add"}
              </button>
            </div>

            {/* 👇 Show static preview */}
            {previewOpen === section.key && (
              <p className="text-sm  bg-gray-50  rounded-md px-4 py-2 mt-2">
                {mockPreviewData[section.key]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="border border-gray-200 rounded-md p-4 space-y-4">
        {sectionList2.map((section) => (
          <div key={section.key} className="border-b border-gray-300 pb-4">
            <div className="flex justify-between items-center py-2">
              {/* ✅ Click to show preview */}
              <span
                onClick={() => togglePreview(section.key)}
                className="cursor-pointer hover:text-blue-600"
              >
                {section.label.replace(/\s*\(Required\)|\s*\(Optional\)/, '')}
                {section.label.includes('(Required)') && (
                  <span className="text-red-500 ml-1">(Required)</span>
                )}
                {section.label.includes('(Optional)') && (
                  <span className="text-gray-400 ml-1">(Optional)</span>
                )}
              </span>

              {/* ✅ Click to open modal */}
              <button
                onClick={() => setModalOpen(section.key)}
                className="text-blue-600 font-medium hover:underline"
              >
                + Add
              </button>
            </div>

            {/* 👇 Show static preview */}
            {previewOpen === section.key && (
              <p className="text-sm text-gray-700 bg-gray-100 rounded-md px-4 py-2 mt-2">
                {mockPreviewData2[section.key]}
              </p>
            )}
          </div>
        ))}
      </div>

</div>
<PropertyGallery/>

      {/* 👇 Modal Show */}
      {modalOpen && (
        <DynamicModalForm
          sectionKey={modalOpen}
          onClose={() => setModalOpen(null)}
        />
      )}
    </div>
  );
};

export default PropertyDetail;
