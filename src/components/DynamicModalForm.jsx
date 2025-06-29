import React, { useEffect, useState } from 'react';

const DynamicModalForm = ({ sectionKey, onClose }) => {
  const [formConfig, setFormConfig] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch('/formConfig.json')
      .then((res) => res.json())
      .then((data) => setFormConfig(data))
      .catch((err) => console.error('Failed to load config:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    onClose();
  };

  if (!formConfig) return null;

  const section = formConfig[sectionKey];
  if (!section) return <p className="text-red-500">Invalid section</p>;

  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      required: field.required,
      onChange: handleChange,
      className: 'w-full border border-gray-300 rounded-md px-3 py-2 text-sm',
    };

    switch (field.type) {
      case 'text':
      case 'number':
      case 'url':
      case 'email':
      case 'date':
        return <input type={field.type} {...commonProps} />;

      case 'textarea':
        return <textarea {...commonProps} rows={3} placeholder='Type here' />;

      case 'select':
        return (
          <select {...commonProps} defaultValue="">
            <option value="" disabled>Choose an option</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );

      case 'multiselect':
        return (
          <select {...commonProps} multiple>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );

      case 'checkbox':
        return <input type="checkbox" onChange={handleChange} className="mr-2" />;
        
  case 'search':
  return <input type="search" {...commonProps} placeholder="Search amenities" />;

      case 'radio':
        return (
          <div className="space-x-4">
            {field.options.map((opt) => (
              <label key={opt} className="inline-flex items-center">
                <input
                  type="radio"
                  name={field.name}
                  value={opt}
                  onChange={handleChange}
                  className="mr-1"
                />
                {opt}
              </label>
            ))}
          </div>
        );

      case 'file':
        return <input type="file" accept={field.accept || '*'} {...commonProps} />;

      default:
        return null;
    }
  };

  return (
<div className="fixed inset-0 bg-black/40 backdrop-blur-none z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl  relative">
        <div className="flex justify-between items-center mb-4 bg-gray-100 rounded-md p-2">
          <h2 className="text-sm font-medium text-gray-500 ">{section.title}</h2>
          <button onClick={onClose} className="text-gray-500 text-xl font-bold">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {section.fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}

          <div className="md:col-span-3 flex justify-end items-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white  px-4 py-2 text-sm rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicModalForm;
