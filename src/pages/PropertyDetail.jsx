import { useState } from 'react';
import DynamicModalForm from '../components/DynamicModalForm';
import PropertyGallery from '../components/PropertyGalley';
import edit from '../assets/edit.png';
import bin from '../assets/bin.png';

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
  { key: 'nearest', label: 'Nearest educational institution (Optional)' },
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
  aboutProperty: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};

const mockPreviewData2 = {
  petFees: "Dog, Max weight: 20lb, Monthly per rent: $100 One time pet fee: $100, Pet security deposit: $100 ",
  parking: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  nearest: "Elementary school, Institution name, 2mile...",
  nearestStations:"Bus, Train station...",
  nearestLandmark: "Bus, Stations name...",
  utilitiesProvider: "Dallas apartment complex info...",
};

const PropertyDetail = () => {
  const [previewOpen, setPreviewOpen] = useState(null);
  const [modalOpen, setModalOpen] = useState(null);
  const [communityAmenities, setCommunityAmenities] = useState([
    "Air conditioning", "Cable ready", "Ceiling fan",
    "High ceilings", "Private balcony", "Refrigerator", "Wooded views"
  ]);

  const togglePreview = (key) => {
    setPreviewOpen(prev => (prev === key ? null : key));
  };

  const handleRemoveAmenity = (itemToRemove) => {
    setCommunityAmenities(prev => prev.filter(item => item !== itemToRemove));
  };

  return (
    <div className="p-6 mx-26 space-y-4">
      <h1 className="text-xl font-semibold mb-4">Condominiums Information</h1>
      <div className='grid grid-cols-2 gap-6'>
        <div className="border border-gray-200 rounded-md p-4 space-y-4">
          {sectionList.map((section) => (
            <div key={section.key} className="border-b border-gray-300 pb-4">
              <div className="flex justify-between items-center py-2">
                <span onClick={() => togglePreview(section.key)} className="cursor-pointer hover:text-blue-600">
                  {section.label.replace(/\s*\(Required\)|\s*\(Optional\)/, '')}
                  {section.label.includes('(Required)') && (
                    <span className="text-red-500 ml-1">(Required)</span>
                  )}
                  {section.label.includes('(Optional)') && (
                    <span className="text-gray-400 ml-1">(Optional)</span>
                  )}
                </span>

                <button onClick={() => setModalOpen(section.key)} className="text-blue-600 font-medium hover:underline">
                  {previewOpen === section.key ? "Edit" : "+ Add"}
                </button>
              </div>

              {previewOpen === section.key && (
                section.key === 'communityAmenity' ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {communityAmenities.map((item) => (
                      <div key={item} className="flex items-center gap-1 border border-gray-300 bg-white px-3 py-1 rounded-full shadow-sm">
                        <span className="text-sm">{item}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAmenity(item)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm bg-gray-50 rounded-md px-4 py-2 mt-2">
                    {mockPreviewData[section.key]}
                  </p>
                )
              )}
            </div>
          ))}
        </div>

        <div className="border border-gray-200 rounded-md p-4 space-y-4">
          {sectionList2.map((section) => (
            <div key={section.key} className="border-b border-gray-300 pb-4">
              <div className="flex justify-between items-center py-2">
                <span onClick={() => togglePreview(section.key)} className="cursor-pointer hover:text-blue-600">
                  {section.label.replace(/\s*\(Required\)|\s*\(Optional\)/, '')}
                  {section.label.includes('(Required)') && (
                    <span className="text-red-500 ml-1">(Required)</span>
                  )}
                  {section.label.includes('(Optional)') && (
                    <span className="text-gray-400 ml-1">(Optional)</span>
                  )}
                </span>

                <button onClick={() => setModalOpen(section.key)} className="text-blue-600 font-medium hover:underline">
                  + Add
                </button>
              </div>

              {previewOpen === section.key && (
                <div className='flex justify-between items-center p-4'>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-md mr-14 py-2 mt-2 w-96">
                    {mockPreviewData2[section.key]}
                  </p>
                  <div className='flex h-5 gap-2 cursor-pointer'>
                    <img onClick={() => setModalOpen(section.key)} src={edit} alt="edit" />
                    <img src={bin} alt="delete" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <PropertyGallery />

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
