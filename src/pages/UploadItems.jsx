import React, { useState } from "react";
import { Package } from "lucide-react";
import VariantForm from "../components/VariantForm";
import SizeChart from "../components/SizeChart";
import CategoryAssign from "../components/CategoryAssign";
import FooterActions from "../components/FooterActions";

const UploadItems = () => {
  // Example state for collecting form data
  const [variants, _setVariants] = useState([]);
  const [sizeChart, setSizeChart] = useState(null);
  const [category, setCategory] = useState(null);

  // This will be called when buttons are clicked
  const handleSave = (status) => {
    const payload = {
      status, // "draft" | "published" | "proceed"
      variants,
      sizeChart,
      category,
      timestamp: new Date().toISOString(),
    };

    console.log("Payload:", payload);
    alert(`Saved as: ${status.toUpperCase()} ✅`);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Upload Items
      </h1>

      <div className="space-y-10">
        {/* Variant 1 */}
        <VariantForm variantNumber={1} />

        {/* Variant 2 */}
        <VariantForm variantNumber={2} />

        {/* Size Chart Section */}
        <SizeChart onChange={setSizeChart} />

        {/* Category Assignment */}
        <CategoryAssign onChange={setCategory} />

        {/* Footer Actions */}
        <FooterActions
          onSaveDraft={() => handleSave("draft")}
          onPublish={() => handleSave("published")}
          onProceed={() => handleSave("proceed")}
        />
      </div>
    </div>
  );
};

export default UploadItems;
